import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import grey from "@material-ui/core/colors/grey"
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

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Container>
            <Toolbar>
              <Box mr={5}>
                <Typography variant="h5" color="secondary">
                  <UnstyledLink to={`/`}>
                    <Box fontWeight="fontWeightBold" px={2} py={1}>
                      nicolauscg
                    </Box>
                  </UnstyledLink>
                </Typography>
              </Box>
              {["blog", "project"].map(pageName => (
                <UnstyledLink
                  key={pageName}
                  to={`/${pageName}`}
                  className={classes.menuLink}
                  activeClassName={classes.activeMenuLink}
                >
                  <Button
                    color="inherit"
                    disableRipple={true}
                    className={classes.transparentBackground}
                  >
                    <Box px={2} py={1}>
                      <Typography variant="p" color="inherit">
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
    </MuiThemeProvider>
  )
}

const UnstyledLink = props => {
  const classes = useUnstyledLinkStyle(props)
  const className = props.className || ""
  return <Link {...props} className={`${classes.root} ${className}`} />
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: green[500],
    },
  },
})

const useNavBarStyle = makeStyles({
  menuLink: {
    color: grey[900],
    "&:hover": {
      color: green[500],
    },
  },
  activeMenuLink: {
    color: `${green[500]} !important`,
    borderBottom: `3px solid ${green[500]}`,
  },
  transparentBackground: {
    backgroundColor: "transparent !important",
  },
})

const useUnstyledLinkStyle = makeStyles({
  root: {
    color: "inherit",
    textDecoration: "inherit",
    boxShadow: "initial",
    fontStyle: "initial",
  },
})

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}
