require("dotenv").config({
  path: ".env",
})

module.exports = {
  siteMetadata: {
    title: `nicolauscg`,
    author: {
      name: `Nicolaus Christian Gozali`,
      summary: `computer science student in University of Queensland`,
    },
    description: `nicolauscg's personal portfolio and blog about tech`,
    siteUrl: `https://www.nicolauscg.com/`,
    social: {
      email: `nicolauscg@gmail.com`,
      linkedin: `https://www.linkedin.com/in/nicolauscg`,
      github: `https://github.com/nicolauscg`,
      gitlab: `https://gitlab.com/nicolauscg`,
      twitter: `nicolauscg`,
    },
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `nicolauscg`,
        short_name: `nicolauscg`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `static/android-chrome-192x192.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layout/index.tsx`),
      },
    },
  ],
}
