import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost

  return (
    <Layout location={location}>
      <SEO title={post.title} />
      <article key={post.title}>
        <header>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            {post.title}
          </h3>
          <small>
            create {post.createdAt}; update {post.updatedAt}
          </small>
        </header>
        <section>{documentToReactComponents(post.content.json, {})}</section>
      </article>
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
