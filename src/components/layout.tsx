import React from "react"
import NavBar from "../components/navbar"
import { baseThemePalette } from "../styles/color"

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles"
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

const theme = createMuiTheme(baseThemePalette)

export default Layout
