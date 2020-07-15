import React from "react"
import NavBar from "../components/navbar"

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import grey from "@material-ui/core/colors/grey"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"

const Layout = ({ children, location }) => {
  return (
    // prepend tailwind css id for increased specificity
    <div id="tw">
      <MuiThemeProvider theme={theme}>
        <NavBar location={location} />
        <Container>
          <Box mt={2}>
            {children}
          </Box>
        </Container>
      </MuiThemeProvider>
    </div>
  )
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: green[500],
    },
    text: {
      primary: grey[900],
      secondary: grey[600]
    }
  },
})

export default Layout
