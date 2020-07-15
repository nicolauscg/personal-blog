import React from "react"
import { Link } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

export default function UnstyledLink(props) {
  const classes = useUnstyledLinkStyle()
  const className = props.className || ""
  return <Link {...props} className={`${classes.root} ${className}`} />
}

const useUnstyledLinkStyle = makeStyles({
  root: {
    color: "inherit",
    textDecoration: "inherit",
    boxShadow: "initial",
    fontStyle: "initial",
  },
})