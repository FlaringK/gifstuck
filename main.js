const titleHeader = document.getElementById("title")

const genWrap = document.getElementById("generator")
const uploadWrap = document.getElementById("upload")
const optionsWrap = document.getElementById("options")
const loadHeader = document.getElementById("loadStatus")
const fontWrap = document.getElementById("fonts")

const homeWrap = document.getElementById("home")
const genList = document.getElementById("genList")

const canvas = document.getElementById('bitmap');
const context = canvas.getContext('2d');

const canvas2 = document.getElementById('bitmapCopy');
const context2 = canvas2.getContext('2d');

const loading = document.getElementById('loading');

const preloadWrap = document.getElementById("preload")
let maxPreload = 0

const getUrlGenerator = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const gen = urlParams.get("gen")
  return gen ? gen : 0
}

const setTitle = text => {
  titleHeader.innerHTML += ` <span class="emph1">${text}</span>`
}

const loadHomepage = () => {
  homeWrap.style.display = "block"

  Object.keys(generators).forEach((e, i) => {
    genList.innerHTML += `<a href="?gen=${e}" class="clean"><div class="genSelect">> ${generators[e].name}</div></a>`
  })

  setTitle("https://flaringk.github.io/gifstuck/")
}

const genVarAmountFunc = el => () => {
  // Get sibling count
  let siblingCount = 1
  let nextSibling = el.nextElementSibling
  while (nextSibling.nextElementSibling) {
    siblingCount += 1
    nextSibling = nextSibling.nextElementSibling
  }
  let lastSibling = nextSibling

  if (el.value > siblingCount) { // If value is increased
    for (let i = 0; i < el.value - siblingCount; i++) {
      el.parentNode.append(lastSibling.cloneNode(true))
    }
  }

  if (el.value < siblingCount) { // If value is decreased
    for (let i = 0; i < siblingCount - el.value; i++) {
      lastSibling = lastSibling.previousSibling
      lastSibling.nextElementSibling.remove()
    }
  }
}

const loadGenerator = genKey => {
  if (!generators[genKey])  return

  genWrap.style.display = "block"
  const generator = generators[genKey]

  setTitle("/?gen=" + genKey)

  // Height and width
  if ("height" in generator) canvas.height = generator.height
  if ("width" in generator) canvas.width = generator.width

  // UPLOAD
  generator.upload.forEach(uploader => {
    const div = document.createElement("div")
    div.className = "uploadSec"
    div.innerHTML += `<h2>${uploader.title}</h2>`

    uploader.desc.forEach((desc, i) => {
      div.innerHTML += `
        Upload ${desc}: <input type="file" accept="image/*" onchange="previewUpload(event, this, 0)">
        <img src="${uploader.placeholder[i]}" alt="" class="uploadImg">
      `
    })

    uploadWrap.append(div)
  })

  // USER OPTIONS
  generator.userOptions.forEach((option, i) => {
    
    const divWrap = document.createElement("div")
    divWrap.className = "optionSec"
    divWrap.innerHTML += `<h2>${option.title}</h2>`

    const div = document.createElement("div")

    let dup

    if (option.variableAmount) {
      const variableAmountCounter = document.createElement("input")
      variableAmountCounter.className = "variableAmountCounter"
      variableAmountCounter.type = "number"
      variableAmountCounter.value = option.defaultAmount ? option.defaultAmount : 1
      variableAmountCounter.min = 1

      variableAmountCounter.onchange = genVarAmountFunc(variableAmountCounter)
      dup = variableAmountCounter.onchange

      divWrap.appendChild(variableAmountCounter)
    }

    switch (option.type) {
      case "select":

        const radioWrap = document.createElement("div")
        radioWrap.className = "radioWrap"

        option.options.forEach((radio, j) => {
          radioWrap.innerHTML += `
            <input type="radio" id="option${i + "-" + j}" name="option${i}" value="${radio[0]}" ${j ? "" : "checked"}>
            <label for="option${i + "-" + j}">${radio[1]}</label>
          `
        })

        div.appendChild(radioWrap)

        break;
      case "text":
        
        div.innerHTML += `<input type="text" name="option${i}" value="${option.placeholder}" class="wide">`

        break;
      case "number":
        
        div.innerHTML += `<input type="number" name="option${i}" value="${option.placeholder}" class="wide" ${option.min ? "min=" + option.min : ""} ${option.max ? "max=" + option.max : ""}>`

        break;
      case "select number":

        const selectNumber = document.createElement("select")
        for (let i = 0; i < option.options.length; i++) {
          const values = option.options[i];
          const selectoption = document.createElement("option")
          selectoption.value = values[0]
          selectoption.innerText = values[1]
          selectNumber.append(selectoption)
        }
        div.append(selectNumber)

        div.innerHTML += `<input type="number" name="option${i}" value="${option.placeholder}" class="">`

        break;
      default:
        break;
    }
    
    divWrap.append(div)
    optionsWrap.append(divWrap)

    if (dup) dup()
  })

  // ASSETS
  maxPreload = generator.assets.length
  generator.assets.forEach(asset => {
    preloadWrap.innerHTML += `<img src="${asset}" alt="" onload="updateLoadStatus()">`
  })

  // FONTS
  if (generator.fonts) generator.fonts.forEach(fontname => {
    fontWrap.innerHTML += `<div style="font-family: ${fontname}; font-weight: 400; height: 0px; overflow: hidden">${fontname}</div>`
  })
}

const updateLoadStatus = () => {
  const curPreload = Array.from(document.querySelectorAll("#preload img")).filter(e => e.complete).length
  loadHeader.innerHTML = `⌛ Assets loaded: ${curPreload} / ${maxPreload}`
}

const previewUpload = (event, element, key) => {
  var output = element.nextElementSibling;
  var source = URL.createObjectURL(event.target.files[0])
  output.src = source;
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
}

// Load parameters
const primeGif = () => {

  const uploadList = Array.prototype.slice.call(document.querySelectorAll("#upload img"));
  const optionList = Array.prototype.slice.call(document.querySelectorAll(`
    #options select,
    #options input:not([type="radio"]), 
    #options input[type="radio"]:checked
  `)).map(e => e.value);
  const assetList = Array.prototype.slice.call(document.querySelectorAll("#preload img"));

  console.log(uploadList, optionList, assetList)
  
  generatorFunctions[getUrlGenerator()](context, canvas, uploadList, optionList, assetList)
  loading.style.display = "block"
} 

// Load page
if (!getUrlGenerator()) loadHomepage()
else loadGenerator(getUrlGenerator())