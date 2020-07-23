import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Box from '@material-ui/core/Box';

// can be used as icon as well
export default function Hero({ imageUrl, widthToHeightRatio = 2 }) {
  const classes = useHerotyle({ widthToHeightRatio })
  return (
    <Box borderRadius={10} position="relative" className={classes.hero} style={{backgroundImage: `url(${imageUrl})`}} />
  )
}

const useHerotyle = makeStyles({
  hero: {
    width: "100%",
    paddingBottom: (props: UseHerotyleProps) => `${100/props.widthToHeightRatio}%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
})

interface UseHerotyleProps {
  widthToHeightRatio: number;
}