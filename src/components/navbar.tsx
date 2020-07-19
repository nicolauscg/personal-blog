import React from "react"
import PropTypes from "prop-types"
import UnstyledLink from "./unstyled-link"
import { mainColor, secondaryColor } from "../styles/color"

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Slide from "@material-ui/core/Slide"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

export default function NavBar(props) {
  const classes = useNavBarStyle(props)
  const isActive = pageName => props.location.pathname.startsWith(`/${pageName}`)

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Container>
            <Toolbar>
              <Box mr={5}>
                <Typography variant="h5" color="secondary">
                  <UnstyledLink to={`/blog`}>
                    <Box fontWeight="fontWeightBold" px={2} py={1}>
                      nicolauscg
                    </Box>
                  </UnstyledLink>
                </Typography>
              </Box>
              {/* {["blog", "project"].map(pageName => ( */}
              {[].map(pageName => (
                <UnstyledLink
                  key={pageName}
                  to={`/${pageName}`}
                  className={`${classes.menuLink} ${isActive(pageName) && classes.activeMenuLink}`}
                >
                  <Button
                    color="inherit"
                    disableRipple={true}
                    className={classes.transparentBackground}
                  >
                    <Box px={2} py={1}>
                      <Typography variant="body1" color="inherit">
                        {pageName}
                      </Typography>
                    </Box>
                  </Button>
                </UnstyledLink>
              ))}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  )
}

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const useNavBarStyle = makeStyles({
  menuLink: {
    color: secondaryColor[900],
    "&:hover": {
      color: mainColor[500],
    },
  },
  activeMenuLink: {
    color: `${mainColor[500]} !important`,
    borderBottom: `3px solid ${mainColor[500]}`,
  },
  transparentBackground: {
    backgroundColor: "transparent !important",
  },
})

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}
