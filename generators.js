let generators = {
  // sylladex: {
  //   name: "Sylladex",
  //   upload: [
  //     {
  //       title: "Upload backgrounds (Must be 650 x 450 pixels)",
  //       desc: ["first background image", "second background image"],
  //       placeholder: ["./assets/sylladex/placeholders/temp bgA.png", "./assets/sylladex/placeholders/temp bgB.png"]
  //     },
  //     {
  //       title: "Upload Sylladex Items (Must 100x125 pixels or 4:5)",
  //       desc: ["image for card %d"],
  //       variableAmount: true,
  //       placeholder: ["./assets/sylladex/placeholders/temp item.png"]
  //     }
  //   ],
  //   userOptions: [
  //     {
  //       title: "Choose a sylladex action",
  //       type: "select",
  //       options: [
  //         ["openclose", "Open and Close"],
  //         ["open", "Open sylladex"],
  //         ["close", "Close sylladex"],
  //         ["none", "Do Nothing"],
  //       ]
  //     },
  //     {
  //       title: "Choose an item action",
  //       type: "select",
  //       options: [
  //         ["pick", "Pick up Item"],
  //         ["drop", "Drop Item"],
  //       ]
  //     },
  //     {
  //       title: "Choose a modus",
  //       type: "select",
  //       options: [
  //         ["fifo", "Stack (FIFO)"],
  //         ["filo", "Queue (FILO)"],
  //         ["array", "Array"],
  //         ["wallet", "Wallet"],
  //         ["walletNoBar", "Wallet (No card bar)"],
  //       ]
  //     },
  //     {
  //       title: "Number of extra blank cards",
  //       type: "number"
  //     }
  //   ],
  //   assets: [
  //     "./assets/sylladex/array/0.png",
  //     "./assets/sylladex/array/1.png",
  //     "./assets/sylladex/array/2.png",
  //     "./assets/sylladex/fifo/0.png",
  //     "./assets/sylladex/fifo/1.png",
  //     "./assets/sylladex/fifo/2.png",
  //     "./assets/sylladex/filo/0.png",
  //     "./assets/sylladex/filo/1.png",
  //     "./assets/sylladex/filo/2.png",
  //     "./assets/sylladex/wallet/0.png",
  //     "./assets/sylladex/wallet/1.png",
  //     "./assets/sylladex/wallet/2.png",
  //     "./assets/sylladex/wallet/3.png",
  //   ]
  // },
  entername: {
    name: "Enter Name",
    upload: [
      {
        title: "Upload backgrounds (Must be 650 x 450 pixels)",
        desc: ["first background image", "second background image (reaction)"],
        placeholder: ["./assets/entername/bgB.png", "./assets/entername/bgA.png"]
      },
    ],
    userOptions: [
      {
        title: "Choose a style ",
        type: "select",
        options: [
          ["human", "Human"],
          ["troll", "Alternian"],
        ]
      },
      {
        title: "Choose a name",
        type: "text",
        placeholder: "Stinklord Dillweed",
      },
      {
        title: "Choose a reaction",
        type: "select",
        options: [
          ["no", "Incorrect name"],
          ["yes", "Correct name"],
          ["maybe", "Unknown name"],
        ]
      },
      {
        title: "If incorrect, choose a quip",
        type: "text",
        placeholder: "Wow, real funny",
      }
    ],
    assets: [
      "./assets/entername/human/Entername.png",
      "./assets/entername/human/Tick.png",
      "./assets/entername/human/Question.png",
      "./assets/entername/troll/Entername.png",
      "./assets/entername/troll/Tick.png",
      "./assets/entername/troll/Cross.png",
    ],
    fonts: [
      "fontstuck",
      "alternian"
    ]
  },
  specibus: {
    name: "Specibus Allocation",
    upload: [
      {
        title: "Upload Images",
        desc: [
          "Weapon (100x125 pixels or 4:5)",
          "Specibus Kind Icon (Must be 185x215 pixels)",
          "Captcha card",
          "Cursor",
        ],
        placeholder: [
          "./assets/specibus/HammerItem.png",
          "./assets/specibus/HammerIcon.png",
          "./assets/specibus/card.png",
          "./assets/specibus/Cursor.png",
        ],
      },
    ],
    userOptions: [
      {
        title: "Choose the specibus kind",
        type: "text",
        placeholder: "hammerkind",
      }
    ],
    assets: [
      "./assets/specibus/Green blank.png",
      "./assets/specibus/Green type.png",
      "./assets/specibus/Grey blank.png",
    ],
    fonts: [
      "captchacard"
    ]
  },
  alchemy: {
    name: "Alchemy Equation",
    height: 300,
    upload: [
      {
        title: "Upload items (Must be square)",
        desc: [
          "First item",
          "Second item",
          "Third item (if applicable)",
          "Alchemised item",
        ],
        placeholder: [
          "./assets/alchemy/1.png",
          "./assets/alchemy/2.png",
          "./assets/alchemy/mark.png",
          "./assets/alchemy/3.png",
        ],
      },
    ],
    userOptions: [
      {
        title: "Choose how many items are alchemised",
        type: "select",
        options: [
          ["2", "2"],
          ["3", "3"],
          ["0", "None"],
        ]
      },
      {
        title: "Choose an alchemy operation (if applicable)",
        type: "select",
        options: [
          ["0", "&&"],
          ["1", "||"],
          ["2", "="],
          ["3", "^^"],
        ]
      },
      {
        title: "Choose a second alchemy operation (if applicable)",
        type: "select",
        options: [
          ["0", "&&"],
          ["1", "||"],
          ["2", "="],
          ["3", "^^"],
        ]
      },
      {
        title: "Choose the Alchemised item's name",
        type: "text",
        placeholder: "Number the III",
      },
      {
        title: "Choose the ammount of grist types<br>Then each of their type and cost",
        variableAmount: true,
        type: "select number",
        options: [
          ["0", "Amber"],
          ["1", "Amethyst"],
          ["2", "Artifact"],
          ["3", "Build"],
          ["4", "Caulk"],
          ["5", "Chalk"],
          ["6", "Cobalt"],
          ["7", "Diamond"],
          ["8", "Garnet"],
          ["9", "Iron"],
          ["10", "Marble"],
          ["11", "Rainbow"],
          ["12", "Ruby"],
          ["13", "Shale"],
          ["14", "Tar"],
          ["15", "Uranium"],
          ["16", "Zillium"],
        ],
        placeholder: "20",
      }
    ],
    assets: [
      "./assets/alchemy/blank.png",
      "./assets/alchemy/box.png",
      "./assets/alchemy/AMBER.png",
      "./assets/alchemy/AMETHYST.png",
      "./assets/alchemy/ARTIFACT.png",
      "./assets/alchemy/BUILD.png",
      "./assets/alchemy/CAULK.png",
      "./assets/alchemy/CHALK.png",
      "./assets/alchemy/COBALT.png",
      "./assets/alchemy/DIAMOND.png",
      "./assets/alchemy/GARNET.png",
      "./assets/alchemy/IRON.png",
      "./assets/alchemy/MARBLE.png",
      "./assets/alchemy/RAINBOW.png",
      "./assets/alchemy/RUBY.png",
      "./assets/alchemy/SHALE.png",
      "./assets/alchemy/TAR.png",
      "./assets/alchemy/URANIUM.png",
      "./assets/alchemy/ZILLIUM.png",
      "./assets/alchemy/and.png",
      "./assets/alchemy/or.png",
      "./assets/alchemy/equal.png",
      "./assets/alchemy/not.png",
    ],
    fonts: [
      "Verdana"
    ]
  },
  guardian: {
    name: "First Guardian effect",
    upload: [
      {
        title: "Upload Images (Must be 650 x 450)",
        desc: [
          "Character",
          "Background",
        ],
        placeholder: [
          "./assets/guardian/kitty.png",
          "./assets/basic.png",
        ],
      },
      {
        title: "Upload Green Sun frames (Should fit your Character)",
        desc: [
          "Frame 1",
          "Frame 2",
          "Frame 3",
          "Frame 4",
          "Frame 5",
          "Frame 6",
          "Frame 7",
        ],
        placeholder: [
          "./assets/guardian/greensun1.png",
          "./assets/guardian/greensun2.png",
          "./assets/guardian/greensun3.png",
          "./assets/guardian/greensun4.png",
          "./assets/guardian/greensun5.png",
          "./assets/guardian/greensun6.png",
          "./assets/guardian/greensun7.png",
        ],
      }
    ],
    userOptions: [
      {
        title: "Frame rate (ms)",
        type: "number",
        placeholder: "100",
        min: 10,
      },
      {
        title: "Delay between loops (ms)",
        type: "number",
        placeholder: "1000",
        min: 10,
      },
      {
        title: "Hue shift green sun (deg)",
        type: "number",
        placeholder: "0",
        min: 0,
        max: 360,
      },
      {
        title: "Character Position X Offset (0 is center)",
        type: "number",
        placeholder: "0",
      },
    ],
    assets: [
      "./assets/guardian/greensun1.png",
      "./assets/guardian/greensun2.png",
      "./assets/guardian/greensun3.png",
      "./assets/guardian/greensun4.png",
      "./assets/guardian/greensun5.png",
      "./assets/guardian/greensun6.png",
      "./assets/guardian/greensun7.png",
    ],
  }
}