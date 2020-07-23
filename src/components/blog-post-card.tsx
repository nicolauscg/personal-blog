import React, { useContext } from "react"
import UnstyledLink from "../components/unstyled-link"
import Hero from "../components/hero"
import BlogPostSubtitle from "../components/blog-post-subtitle"
import { IsSmallScreenOrAboveContext } from "../layout/index"

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export default function BlogPostCard({ heroImageUrl, title, createDate, updateDate, tags, slug}) {
  const isSmallScreenOrAbove = useContext(IsSmallScreenOrAboveContext)

  return (
    <Grid container className="p-1 mb-3">
      <Grid xs={12} sm={3}>
        <Box mr={isSmallScreenOrAbove ? 3 : 0}>
          <UnstyledLink to={`/blog/${slug}`}>
            <Box width="100%">
              <Hero imageUrl={heroImageUrl} />
            </Box>
          </UnstyledLink>
        </Box>
      </Grid>
      <Grid xs={12} sm={9}>
        <Typography variant="h4" className="normal-case" color="textSecondary">
          <UnstyledLink to={`/blog/${slug}`}>
            <Box width="100%">
              {title}
            </Box>
          </UnstyledLink>
        </Typography>
        <BlogPostSubtitle tags={tags} createDate={createDate} updateDate={updateDate} variant="subtitle2" />
      </Grid>
    </Grid>
  )
}
