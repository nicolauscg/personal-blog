import React from "react"
import NavBar from "../components/navbar"

import Container from "@material-ui/core/Container"

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
