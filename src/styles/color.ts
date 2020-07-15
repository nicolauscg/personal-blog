import indigo from "@material-ui/core/colors/indigo"
import grey from "@material-ui/core/colors/grey"

export const mainColor = indigo
export const secondaryColor = grey

export const baseThemePalette = {
  palette: {
    primary: {
      main: secondaryColor[50],
    },
    secondary: {
      main: mainColor[500],
    },
    text: {
      primary: secondaryColor[900],
      secondary: mainColor[900]
    }
  },
}