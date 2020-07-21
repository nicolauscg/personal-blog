import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProjectPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="all projects" />
      <h1>project page</h1>
    </Layout>
  )
}

export default ProjectPage
