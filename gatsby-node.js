const Promise = require('bluebird')
const path = require('path')


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
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
