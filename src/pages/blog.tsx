import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import BlogPostCard from "../components/blog-post-card"

import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import grey from "@material-ui/core/colors/grey"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from "@material-ui/core"

const BlogIndex = ({ data, location }) => {
  const { pathname } = location;
  const activeTag = pathname.startsWith("/blog/tag/") ? pathname.split("/").pop() : "all"

  return (
    <Layout location={location}>
      <Grid container spacing={3}>
        <Grid container xs={4} alignItems="center" direction="column">
          <Box width="15rem" maxWidth="100%" mt={6}>
            <Sidebar dataEdges={data.allContentfulBlogPostTag.edges} activeTag={activeTag} />
          </Box>
        </Grid>
        <Grid container xs={8}>
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: green[500],
    },
    text: {
      primary: grey[900],
      secondary: grey[600]
    }
  },
})

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
