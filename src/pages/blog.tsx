import React, { useContext } from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Sidebar, { SelectBar } from "../components/sidebar"
import BlogPostCard from "../components/blog-post-card"
import { baseThemePalette } from "../styles/color"
import { IsMediumScreenOrAboveContext, LocationContext } from "../layout/index"

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const BlogIndex = ({ data }) => {
  const { pathname } = useContext(LocationContext);
  const activeTag = pathname.startsWith("/blog/tag/") ? pathname.split("/").pop() : "all"
  const isMediumScreenOrAbove = useContext(IsMediumScreenOrAboveContext)

  return (
    <>
      <SEO title="all posts" />
      <Grid container spacing={3}>
        <Grid container xs={12} md={4} alignItems="center" direction="column">
          {isMediumScreenOrAbove ? (
            <Box width="15rem" maxWidth="100%" mt={2} position="fixed">
              <Sidebar
                heading="tags"
                data={["all"].concat(data.allContentfulBlogPostTag.edges.map(({ node }) => node.name))}
                tagNameDisplayFunc={elem => elem}
                linkToFunc={tagName => tagName === "all" ? "/blog" : `/blog/tag/${tagName}`}
                isActiveFunc={tagName => activeTag === tagName}
              />
            </Box>
          ) : (
            <Box width="100%">
              <SelectBar
                heading="tags"
                data={["all"].concat(data.allContentfulBlogPostTag.edges.map(({ node }) => node.name))}
                tagNameDisplayFunc={elem => elem}
                linkToFunc={tagName => tagName === "all" ? "/blog" : `/blog/tag/${tagName}`}
                isActiveFunc={tagName => activeTag === tagName}
              />
            </Box>
          )}
        </Grid>
        <Grid container xs={12} md={8}>
          <Box width="100%" mt={isMediumScreenOrAbove ? 0 : 2}>
            <MuiThemeProvider theme={theme}>
              {data.allContentfulBlogPost.edges.map(({ node }) => {
                return <BlogPostCard
                  heroImageUrl={node.hero.file.url}
                  title={node.title}
                  createDate={node.createdAt}
                  updateDate={node.updatedAt}
                  tags={node.tags}
                  key={node.slug}
                  slug={node.slug}
                />
              })}
            </MuiThemeProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const theme = createMuiTheme(baseThemePalette)

export default BlogIndex

export const pageQuery = graphql`
  query BlogPostsByTag($tag: String) {
    allContentfulBlogPost(
      sort: {fields: createdAt, order: DESC}
      filter: {tags: {elemMatch: {name: {eq: $tag}}}}
    ) {
      edges {
        node {
          title
          slug
          hero {
            file {
              url
            }
          }
          tags {
            name
          }
          createdAt(formatString: "Do MMMM YYYY")
          updatedAt(formatString: "Do MMMM YYYY")
        }
      }
    }
    allContentfulBlogPostTag(sort: {fields: name, order: ASC}) {
      edges {
        node {
          name
        }
      }
    }
  }
`
