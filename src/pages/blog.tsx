import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Sidebar, { SelectBar } from "../components/sidebar"
import BlogPostCard from "../components/blog-post-card"
import { baseThemePalette } from "../styles/color"

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const BlogIndex = ({ data, location }) => {
  const { pathname } = location;
  const activeTag = pathname.startsWith("/blog/tag/") ? pathname.split("/").pop() : "all"
  const isMediumScreenOrAbove = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Layout location={location}>
      <SEO title="all posts" />
      <Grid container spacing={3}>
        <Grid container xs={12} md={4} alignItems="center" direction="column">
          {isMediumScreenOrAbove ? (
            <Box width="15rem" maxWidth="100%" mt={6} position="fixed">
              <Sidebar
                heading="tags"
                data={["all"].concat(data.allContentfulBlogPostTag.edges.map(({ node }) => node.name))}
                tagNameDisplayFunc={elem => elem}
                linkToFunc={tagName => tagName === "all" ? "/blog" : `/blog/tag/${tagName}`}
                isActiveFunc={tagName => activeTag === tagName}
              />
            </Box>
          ) : (
            <Box mt={2} width="100%">
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
          <Box mt={7} width="100%">
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
    </Layout>
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
