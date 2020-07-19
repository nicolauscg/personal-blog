import React from "react"
import NavBar from "../components/navbar"
import { baseThemePalette } from "../styles/color"
import Footer from "../components/footer"

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
        <Box display="flex" flexDirection="column" className="min-h-screen">
          <NavBar location={location} />
          <Container className="flex-grow">
            <Box mt={2}>
              {children}
            </Box>
          </Container>
          <Footer />
        </Box>
      </MuiThemeProvider>
    </div>
  )
}

const theme = createMuiTheme(baseThemePalette)

export default Layout
