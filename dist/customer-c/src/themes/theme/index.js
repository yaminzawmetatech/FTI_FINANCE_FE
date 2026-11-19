// // ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

// const Theme = (colors) => {
//   const { blue, red, gold, cyan, green, grey } = colors;

//   const greyColors = {
//     0: grey[0],
//     50: grey[1],
//     100: grey[2],
//     200: grey[3],
//     300: grey[4],
//     400: grey[5],
//     500: grey[6],
//     600: grey[7],
//     700: grey[8],
//     800: grey[9],
//     900: grey[10],
//     A50: grey[15],
//     A100: grey[11],
//     A200: grey[12],
//     A400: grey[13],
//     A700: grey[14],
//     A800: grey[16],
//   };
//   const contrastText = "#fff";

//   return {
//     primary: {
//       lighter: blue[0],
//       100: blue[1],
//       200: blue[2],
//       light: blue[3],
//       400: blue[4],
//       main: blue[5],
//       dark: blue[6],
//       700: blue[7],
//       darker: blue[8],
//       900: blue[9],
//       contrastText,
//     },
//     submitted: {
//       lighter: "#B2DFDB",
//       100: "#B2DFDB",
//       200: "#80CBC4",
//       light: "#4DB6AC",
//       400: "#26A69A",
//       main: "#009688",
//       600: "#00897B",
//       dark: "#00796B",
//       800: "#00695C",
//       darker: "#004D40",
//       A100: "#A7FFEB",
//       A200: "#64FFDA",
//       A300: "#1DE9B6",
//       contrastText: "#FFFFFF",
//     },

//     secondary: {
//       lighter: greyColors[100],
//       100: greyColors[100],
//       200: greyColors[200],
//       light: greyColors[300],
//       400: greyColors[400],
//       main: greyColors[500],
//       600: greyColors[600],
//       dark: greyColors[700],
//       800: greyColors[800],
//       darker: greyColors[900],
//       A100: greyColors[0],
//       A200: greyColors.A400,
//       A300: greyColors.A700,
//       contrastText: greyColors[0],
//     },

//     error: {
//       lighter: red[0],
//       light: red[2],
//       main: red[4],
//       dark: red[7],
//       darker: red[9],
//       contrastText,
//     },
//     warning: {
//       lighter: gold[0],
//       light: gold[3],
//       main: gold[5],
//       dark: gold[7],
//       darker: gold[9],
//       contrastText: greyColors[100],
//     },
//     info: {
//       lighter: cyan[0],
//       light: cyan[3],
//       main: cyan[5],
//       dark: cyan[7],
//       darker: cyan[9],
//       contrastText,
//     },
//     success: {
//       lighter: green[0],
//       light: green[3],
//       main: green[5],
//       dark: green[7],
//       darker: green[9],
//       contrastText,
//     },
//     grey: greyColors,
//   };
// };

// export default Theme;


// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors) => {
  const { red, gold, cyan, green, grey } = colors;

  // ==============================|| ORANGE PALETTE ||============================== //

  const orange = {
    0: "#FFF7ED",
    1: "#FFEDD5",
    2: "#FED7AA",
    3: "#FDBA74",
    4: "#FB923C",
    5: "#F97316",
    6: "#EA580C",
    7: "#C2410C",
    8: "#9A3412",
    9: "#7C2D12",
  };

  // ==============================|| GREY PALETTE ||============================== //

  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };

  const contrastText = "#fff";

  return {
    // ==============================|| PRIMARY - ORANGE ||============================== //

    primary: {
      lighter: orange[0],
      100: orange[1],
      200: orange[2],
      light: orange[3],
      400: orange[4],
      main: orange[5],
      dark: orange[6],
      700: orange[7],
      darker: orange[8],
      900: orange[9],
      contrastText,
    },

    // ==============================|| SUBMITTED ||============================== //

    submitted: {
      lighter: "#B2DFDB",
      100: "#B2DFDB",
      200: "#80CBC4",
      light: "#4DB6AC",
      400: "#26A69A",
      main: "#009688",
      600: "#00897B",
      dark: "#00796B",
      800: "#00695C",
      darker: "#004D40",
      A100: "#A7FFEB",
      A200: "#64FFDA",
      A300: "#1DE9B6",
      contrastText: "#FFFFFF",
    },

    // ==============================|| SECONDARY ||============================== //

    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500],
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0],
    },

    // ==============================|| ERROR ||============================== //

    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      darker: red[9],
      contrastText,
    },

    // ==============================|| WARNING ||============================== //

    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100],
    },

    // ==============================|| INFO ||============================== //

    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText,
    },

    // ==============================|| SUCCESS ||============================== //

    success: {
      lighter: green[0],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText,
    },

    // ==============================|| GREY ||============================== //

    grey: greyColors,
  };
};

export default Theme;