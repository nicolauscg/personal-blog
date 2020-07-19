import React from "react"
import UnstyledLink from "../components/unstyled-link"
import Hero from "../components/hero"
import BlogPostSubtitle from "../components/blog-post-subtitle"

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function BlogPostCard({ heroImageUrl, title, createDate, updateDate, tags, slug}) {
  return (
    <Box width="100%" display="flex" p={1} mb={3}>
      <Box mr={3}>
        <UnstyledLink to={`/blog/${slug}`}>
          <Box width="200px">
            <Hero imageUrl={heroImageUrl} />
          </Box>
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
        <BlogPostSubtitle tags={tags} createDate={createDate} updateDate={updateDate} variant="subtitle2" />
      </Box>
    </Box>
  )
}
