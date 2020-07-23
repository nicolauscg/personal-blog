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
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Layout = ({ children, location }) => {
  const isMediumScreenOrAbove = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallScreenOrAbove = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    // prepend tailwind css id for increased specificity
    <div id="tw">
      <MuiThemeProvider theme={theme}>
        <IsMediumScreenOrAboveContext.Provider value={isMediumScreenOrAbove}>
          <IsSmallScreenOrAboveContext.Provider value={isSmallScreenOrAbove}>
            <LocationContext.Provider value={location}>
              <Box display="flex" flexDirection="column" className="min-h-screen">
                <NavBar />
                <Container className="flex-grow">
                  <Box pt={5} px={2}>
                    {children}
                  </Box>
                </Container>
                <Footer />
              </Box>
            </LocationContext.Provider>
          </IsSmallScreenOrAboveContext.Provider>
        </IsMediumScreenOrAboveContext.Provider>
      </MuiThemeProvider>
    </div>
  )
}

const theme = createMuiTheme(baseThemePalette)
export const IsMediumScreenOrAboveContext = React.createContext(null);
export const IsSmallScreenOrAboveContext = React.createContext(null);
export const LocationContext = React.createContext(null);

export default Layout
