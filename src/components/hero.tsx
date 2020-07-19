import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Box from '@material-ui/core/Box';

export default function Hero({ imageUrl }) {
  const classes = useHerotyle()
  return (
    <Box borderRadius={10} position="relative" className={classes.hero} style={{backgroundImage: `url(${imageUrl})`}} />
  )
}

const useHerotyle = makeStyles({
  hero: {
    width: "100%",
    paddingBottom: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
})