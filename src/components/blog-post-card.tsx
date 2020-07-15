import React from "react"
import UnstyledLink from "../components/unstyled-link"

import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function BlogPostCard({ heroImageUrl, title, createDate, updateDate, tags, slug}) {
  const classes = useBlogPostCardStyle()

  return (
    <Box width="100%" display="flex" p={1} mb={3}>
      <Box mr={3}>
        <UnstyledLink to={`/blog/${slug}`}>
          <Box borderRadius={10} className={classes.hero} style={{backgroundImage: `url(${heroImageUrl})`}}></Box>
        </UnstyledLink>
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h4" className="normal-case" color="textSecondary">
          <UnstyledLink to={`/blog/${slug}`}>
            <Box width="100%">
              {title}
            </Box>
          </UnstyledLink>
        </Typography>
        <Typography variant="subtitle2" className="not-italic">
          {tags.map(({ name }, index) =>
            <>
              {index !== 0 ? ", " : ""}
              <Typography color="secondary" display="inline">
                <UnstyledLink to={name === "all" ? "/blog" : `/blog/tag/${name}`}>{name}</UnstyledLink>
              </Typography>
            </>
          )}
          &nbsp;• created {createDate}{updateDate !== createDate && ` • updated ${updateDate}`}
        </Typography>
      </Box>
    </Box>
  )
}

const useBlogPostCardStyle = makeStyles({
  hero: {
    width: "200px",
    height: "100px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
})