import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404 not found" />
      <Box display="flex" justifyContent="center">
        <Typography variant="h2" display="inline">404 not found</Typography>
      </Box>
    </Layout>
  )
}

export default NotFoundPage
