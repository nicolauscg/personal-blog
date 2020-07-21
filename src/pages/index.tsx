import React, { useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { navigate } from "gatsby"

const HomePage = ({ location }) => {
  useEffect(() => {
    navigate("/blog")
  })

  return (
    <Layout location={location}>
      <SEO title="home" />
      {/* <h1>home page: education, experience, projects, about</h1> */}
    </Layout>
  )
}

export default HomePage
