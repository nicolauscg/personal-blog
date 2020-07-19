import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import RichTextRenderer from "../components/rich-text-renderer"
import BlogPostSubtitle from "../components/blog-post-subtitle"
import { ScrollSpySideBar } from "../components/sidebar"

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hero from "../components/hero"
import { Typography } from "@material-ui/core"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost
  const [headingIds, setHeadingIds] = useState([])
  const [isReady, setIsReady] = useState(false)

  return (
    <Layout location={location}>
      <Grid container spacing={3}>
        <Grid container xs={4} alignItems="center" direction="column">
          <Box width="15rem" maxWidth="100%" mt={6} position="fixed">
            <ScrollSpySideBar
              ids={headingIds.map(e => e.id)}
              offset={0}
              isReady={isReady}
            />
          </Box>
        </Grid>
        <Grid container xs={8}>
          <Box mt={7} width="100%">
            <article key={post.title}>
              <header>
                <Box mb={3}>
                  <Hero imageUrl={`https:${post.hero.file.url}`} />
                  <Typography variant="h2" component="h1" color="textSecondary">{post.title}</Typography>
                  <BlogPostSubtitle tags={post.tags} createDate={post.createdAt} updateDate={post.updatedAt} variant="subtitle1" />
                </Box>
              </header>
              <section>
                <RichTextRenderer
                  json={post.content.json}
                  appendHeading={(headingId) => setHeadingIds(prevHeadingIds => prevHeadingIds.concat(headingId))}
                  setIsReady={setIsReady}
                  onFinish={() => setHeadingIds(prevHeadingIds => [])}
                />
              </section>
            </article>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
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
      content {
        json
      }
    }
  }
`
