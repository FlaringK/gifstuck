const clearcanvas = context => { 
  const fill = context.fillStyle
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = fill
}

const randomGreyHex = () => {
  const v = (Math.random()*(256)|0).toString(16)
  return "#" + v + v + v
}

const finishGif = blob => {
  const result = document.getElementById('finalOutput')
  result.src = URL.createObjectURL(blob)
  
  loading.style.display = "none"
}

const generatorFunctions = {
  entername: (context, canvas, uploadList, optionList, assetList) => {
    const [nameplate, tick, cross] = optionList[0] == "human" ? assetList.slice(0, 3) : assetList.slice(3, 6)
    const [style, name, react, quip] = optionList

    // Gotta draw letter individually because fontstuck isn't monospace >:(
    const direction = optionList[0] == "human" ? 1 : -1
    const lw = optionList[0] == "human" ? 32 : 26
    const lh = optionList[0] == "human" ? 82 : 74
    const startpos = 325 - name.length * lw * 0.5 * direction
  
    const drawbg = index => {
      context.drawImage(uploadList[index], 0, 0)
      context.drawImage(nameplate, 0, 0)
    }

    const drawScene = text => {
      let newstartpos = 325 - text.length * lw * 0.5 * direction
      clearcanvas(context);
      drawbg(1);
      for (let i = 0; i < text.length; i ++) {
        let letterpos = newstartpos + (i + 0.5) * lw * direction
        context.fillText(text[i], letterpos, lh)
      }
    }
  
    context.font = optionList[0] == "human" ? "32px fontstuck" : "32px alternian"
    context.fillStyle = optionList[0] == "human" ? "black" : "white"
    context.textAlign = "center";
  
    // BEGIN GIF
    let gif = new GIF({
      workers: 2,
      quality: 4
    })
  
    // First frame
    clearcanvas(context)
    drawbg(0)
    gif.addFrame(canvas, {copy: true, delay: 1000})
    
    // Write text 1 letter at a time
    for (let i = 0; i < name.length; i ++) {

      const letterpos = startpos + ((i + 0.5) * lw) * direction
      context.fillText(name[i], letterpos, lh)
      gif.addFrame(canvas, {copy: true, delay: name[i + 1] ? 100 : 1000})

    }
  
    //If correct name
    if (react == "no") {
      
      // blur effect
      // For 4 frames
      for (let l = 0; l < 4; l ++) {

        // Generate grey blocks
        for (let i = 0; i < name.length + 1; i ++) {
          const letterpos = startpos + ((i + 0.5) * lw) * direction

          for (let j = 0; j < 3; j ++) {
            for (let k = 0; k < 4; k ++) {
              const x = letterpos - j * (lw / 3)
              const y =  82 - ((k + 0.5) * 10)

              context.fillStyle = randomGreyHex()
              context.fillRect(x, y, 10, 10)
            }
          }
        }

        // Add frame
        gif.addFrame(canvas, {copy: true, delay: 50})
      }

      // Draw quip
      context.fillStyle = "red"
      drawScene(quip);
  
      gif.addFrame(canvas, {copy: true, delay: 2000})
  
    } else {

      const symbol = react == "yes" ? tick : cross
      const xpos = optionList[0] == "human" ? startpos - 70 : startpos + 10
      
      drawScene(name);
      context.drawImage(symbol, xpos, 38)
      gif.addFrame(canvas, {copy: true, delay: 50})
      drawScene(name);
      gif.addFrame(canvas, {copy: true, delay: 50})
      context.drawImage(symbol, xpos, 38)
      gif.addFrame(canvas, {copy: true, delay: 50})
      drawScene(name);
      gif.addFrame(canvas, {copy: true, delay: 50})
      context.drawImage(symbol, xpos, 38)
      gif.addFrame(canvas, {copy: true, delay: 2000})
      
    } 
  
    // DISPLAY RESULT!!!
    gif.render()
    gif.on('finished', finishGif);
  },
  specibus: (context, canvas, uploadList, optionList, assetList) => {
    const [greenblank, greentype, greyblank] = assetList
    const hasLowLetter = /[jygpq]/gi.test(optionList[0])
  
    context.textAlign = "center"
    context.textBaseline = "alphabetic"
    context.fillStyle = "#00E371"
    context.font = hasLowLetter ? "56px captchacard" : "60px captchacard"
  
    // BEGIN GIF
    let gif = new GIF({
      workers: 2,
      quality: 4
    });
  
    //First frame
    clearcanvas(context);
    context.drawImage(greyblank, 0, 0)
    gif.addFrame(canvas, {copy: true, delay: 500})
  
    //Drag function
    let dragCaptcha = xpos => {
      context.drawImage(greyblank, 0, 0)
      context.drawImage(uploadList[2], xpos, 110)
      context.drawImage(uploadList[0], xpos + 13, 140, 100, 125)
      context.drawImage(uploadList[3], xpos + 54, 260)
    }
  
    dragCaptcha(-64)
    gif.addFrame(canvas, {copy: true, delay: 200})
    dragCaptcha(72)
    gif.addFrame(canvas, {copy: true, delay: 200})
    dragCaptcha(182)
    gif.addFrame(canvas, {copy: true, delay: 200})
    dragCaptcha(220)
    gif.addFrame(canvas, {copy: true, delay: 1000})
  
    context.drawImage(greenblank, 0, 0)
    gif.addFrame(canvas, {copy: true, delay: 50})
    context.drawImage(greyblank, 0, 0)
    gif.addFrame(canvas, {copy: true, delay: 50})
    context.drawImage(greenblank, 0, 0)
    gif.addFrame(canvas, {copy: true, delay: 50})
    context.drawImage(greyblank, 0, 0)
    gif.addFrame(canvas, {copy: true, delay: 50})
  
    context.drawImage(greentype, 0, 0)
    context.drawImage(uploadList[1], 197, 85, 185, 215)
    context.drawImage(uploadList[0], 309, 327, 24, 30)
  
    context.fillText(optionList[0].toLowerCase(), 325, hasLowLetter ? 402 : 407);
  
    gif.addFrame(canvas, {copy: true, delay: 5000})
  
    // DISPLAY RESULT!!!
    gif.render()
    gif.on('finished', finishGif);
  },
  alchemy: (context, canvas, uploadList, optionList, assetList) => {
    const bg = assetList[0]
    const box = assetList[1]
    const equal = assetList[21]

    // BEGIN GIF
    let gif = new GIF({
      workers: 2,
      quality: 1
    });
  
    // Clear screen
    context.drawImage(bg, 0, 0)
    let boxpos = []
  
    // Draw boxes and items
    switch (optionList[0]) {
      case "0":
        boxpos = [280]
  
        uploadList = [uploadList[3]]
        break;
      case "2":
        boxpos = [127, 283, 435]
  
        context.drawImage(assetList[parseInt(optionList[1]) + 19], 222, 119)
        context.drawImage(equal, 374, 119)
    
        uploadList.splice(2, 1)
        break;
      case "3":
        boxpos = [56, 204, 351, 500]
  
        context.drawImage(assetList[parseInt(optionList[1]) + 19], 146, 119)
        context.drawImage(assetList[parseInt(optionList[2]) + 19], 294, 119)
        context.drawImage(equal, 441, 119)
        break;
    
      default:
        break;
    }
  
    boxpos.forEach((e, i) => {
      context.drawImage(box, e, 92)
      context.drawImage(uploadList[i], e + 5, 97, 80, 80)
    })
  
    // Write Name
    context.font = "16.7pt Verdana"
    context.fillStyle='#C6C7C7';
    context.textAlign='center';
    context.textBaseline='alphabetic';
    
    context.fillText(optionList[3], 325, 236);
    
    // Write Cost
    const imgs = assetList.slice(2, 20)
    let types = []
    let costs = []

    for (let i = 5; i < optionList.length; i++) {
      if (i % 2) types.push(optionList[i])
      else costs.push(optionList[i])
    }

    let gristLengths = []
  
    context.textAlign = 'left';
    context.fillStyle = '#21AFEE';
  
    let totalLength = 0
    costs.forEach(e => {
      const length = e.length * 14 + 36
      gristLengths.push(length)
      totalLength += length
    })

    console.log(optionList)
    
    const startpos = 325 - (totalLength / 2)
    let currentpos = startpos
    gristLengths.forEach((e, i) => {
      context.fillText(costs[i], currentpos + 32, 267)
      context.drawImage(imgs[types[i]], currentpos + 3, 248, 24, 24);
      currentpos += e + 1
    })

    // DISPLAY RESULT!!!
    gif.addFrame(canvas, {copy: true, delay: 50})
    gif.render()
    gif.on('finished', finishGif);
  },
  guardian: (context, canvas, uploadList, optionList, assetList) => {

    const clearFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const drawUnder = (img, x, y) => {
      context.globalCompositeOperation = 'destination-over';
      context.drawImage(img, 0, 0, x ? x : 0, y ? y : 0)
      context.globalCompositeOperation='source-over';
    }

    const colorFrame = color => {
      context.globalCompositeOperation = 'source-in';
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation='source-over';
    }

    const drawImg = (scale, x, y) => {
      context.drawImage(uploadList[0], 325 - 325 * scale + (x ? x : 0), 225 - 225 * scale + (y ? y : 0), 650 * scale, 450 * scale)
    }

    const saveImg = () => {
      const newCanvas = document.createElement("canvas")
      newCanvas.style.display = "none"
      newCanvas.height = "450"
      newCanvas.width = "650"

      document.body.appendChild(newCanvas)
      
      const newContext = newCanvas.getContext("2d")
      newContext.drawImage(canvas, 0, 0)

      return newCanvas
    }

    const addFrame = delayIndex => {
      // Draw bg
      context.filter = "blur(0px)";
      context.globalCompositeOperation = 'destination-over';
      context.drawImage(uploadList[1], 0, 0)
      context.globalCompositeOperation='source-over';
      // Add frame
      gif.addFrame(canvas, {copy: true, delay: optionList[delayIndex ? 1 : 0]})
      // Clear canvas
      clearFrame()
    }

    const drawGreenSun = index => {
      context.globalCompositeOperation = 'source-in'
      context.filter = `hue-rotate(${optionList[2]}deg)`
      const x = (650 - uploadList[index + 2].naturalWidth) / 2 + parseInt(optionList[3])
      const y = (450 - uploadList[index + 2].naturalHeight) / 2
      context.drawImage(uploadList[index + 2], x, y)
      context.filter = "hue-rotate(0deg)"
      context.globalCompositeOperation='source-over'
    }

    // BEGIN GIF
    let gif = new GIF({
      workers: 2,
      quality: 10
    });

    // Preload frames
    drawImg(1.05)
    colorFrame("#FFFFFF30")
    const whiteTrans = saveImg()
    clearFrame()

    const f8offset = [-40, -20]
    drawUnder(whiteTrans, f8offset, f8offset)
    for (let i = 1; i <= 2; i++) {
      context.drawImage(uploadList[0], f8offset[0] + i, f8offset[1] + i, 650 * 1.1, 450 * 1.1)
      context.drawImage(uploadList[0], f8offset[0] + i, f8offset[1] - i, 650 * 1.1, 450 * 1.1)
      context.drawImage(uploadList[0], f8offset[0] - i, f8offset[1] + i, 650 * 1.1, 450 * 1.1)
      context.drawImage(uploadList[0], f8offset[0] - i, f8offset[1] - i, 650 * 1.1, 450 * 1.1)
    }
    colorFrame("#FFFFFF30")
    const whiteTransBig = saveImg()
    clearFrame()

    drawImg(1.1)
    colorFrame("white")
    const bigwhite = saveImg()
    clearFrame()

    context.filter = "blur(4px)";
    drawImg(1)
    colorFrame("black")
    context.filter = "blur(0px)";
    const blackshad = saveImg()
    clearFrame()

    context.filter = "blur(4px)";
    drawImg(1)
    colorFrame("#00000030")
    context.filter = "blur(0px)";
    const blackTrans = saveImg()
    clearFrame()

    // RENDER FRAMES
    // 1
    drawImg(1)
    addFrame()

    // 2
    drawImg(1)
    // colorFrame("black")
    // addLightning(3)
    addFrame()

    // 3
    drawImg(1)
    // addLightning(2)
    addFrame()

    // 4
    drawImg(1)
    // addLightning(1)
    addFrame()

    // 5
    drawImg(1)
    addFrame()
    
    // 6
    drawImg(1.05)
    colorFrame("white")
    addFrame()
    
    // 7
    drawImg(1.05)
    drawImg(1, 0, 5)
    drawImg(1, 0, -5)
    colorFrame("#292929")
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(whiteTrans, 0, 0)
    context.globalCompositeOperation='source-over';
    addFrame(0)

    // 8
    context.filter = "blur(4px)";
    drawImg(1)
    colorFrame("#212121")
    context.filter = "blur(0px)";
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(whiteTransBig, 0, 0)
    context.globalCompositeOperation='source-over';
    addFrame()

    // 9
    drawImg(1.1)
    drawGreenSun(0)
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(blackshad, 15, 0)
    context.globalCompositeOperation='source-over';
    addFrame()

    // 10
    drawImg(1.05)
    drawGreenSun(1)
    addFrame()

    // 11
    drawImg(1)
    drawGreenSun(2)
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(blackshad, -15, -5)
    context.globalCompositeOperation='source-over';
    addFrame()

    // 12
    drawImg(1)
    drawGreenSun(3)
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(blackTrans, -15, -5)
    context.globalCompositeOperation='source-over';
    addFrame()

    // 13
    drawImg(1)
    drawGreenSun(4)
    addFrame()

    // 14
    drawImg(1)
    drawGreenSun(5)
    context.globalAlpha = 0.32; 
    drawImg(1)
    context.globalAlpha = 1; 
    addFrame()

    // 15
    drawImg(1)
    drawGreenSun(6)
    context.globalAlpha = 0.70; 
    drawImg(1)
    context.globalAlpha = 1; 
    addFrame()

    // DISPLAY RESULT!!!
    context.drawImage(uploadList[0], 0, 0)
    addFrame(1)

    gif.render()
    gif.on('finished', finishGif);

  }
}