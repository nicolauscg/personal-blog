import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data }) => {
  return (
    <Layout>
      <SEO title="All posts" />
      {data.allContentfulBlogPost.edges.map(({ node }) => {
        return (
          <article key={node.title}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={"/blog/" + node.slug}>
                  {node.title}
                </Link>
              </h3>
              <p>tags:</p>
              <ul>
                {node.tags.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
              <img src={"https:" + node.hero.file.url} />
              <small>
                created at {node.createdAt}; updated at {node.updatedAt}
              </small>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost {
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
  }
`
