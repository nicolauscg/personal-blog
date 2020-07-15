const Promise = require("bluebird")
const path = require("path")
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulBlogPostTag {
              edges {
                node {
                  name
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, _) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: path.resolve("./src/templates/blog-post.tsx"),
            context: {
              slug: post.node.slug,
            },
          })
        })

        const tags = result.data.allContentfulBlogPostTag.edges
        tags.forEach(tag => {
          createPage({
            path: `/blog/tag/${_.kebabCase(tag.node.name)}`,
            component: path.resolve("./src/pages/blog.tsx"),
            context: {
              tag: tag.node.name,
            },
          })
        })
      })
    )
  })
}
