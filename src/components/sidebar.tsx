import React from "react"
import UnstyledLink from "../components/unstyled-link"

import { makeStyles } from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

export default function SideBar({ dataEdges, activeTag }) {
  const classes = useSideBarStyle()
  const isActive = node => activeTag === node.name

  return (
    <>
      <Box mb={2}>
        <Typography color="textSecondary" className="uppercase">tags</Typography>
      </Box>
      {[{ node: { name: "all" }}].concat(dataEdges).map(({ node }) => {
        return (
          <Typography gutterBottom={true}>
            <UnstyledLink to={node.name === "all" ? "/blog" : `/blog/tag/${node.name}`}>
              <Button classes={{ label:  "justify-start" }} fullWidth={true} className={`${classes.tagButton} ${isActive(node) ? "active" : ""}`}>
                {node.name}
              </Button>
            </UnstyledLink>
          </Typography>
        )
      })}
  </>
  )
}

const useSideBarStyle = makeStyles({
  tagButton: {
    "&:hover, &.active": {
      color: green[500],
      backgroundColor: green[50],
      borderRadius: "15px"
    }
  }
})