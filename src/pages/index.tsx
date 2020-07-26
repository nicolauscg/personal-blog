import React from "react"
import { graphql } from "gatsby"
import InfoCard from "../components/info-card"
import SEO from "../components/seo"
import ProjectCard from "../components/project-card"

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const HomePage = ({ data }) => {
  return (
    <>
      <SEO title="home" />
      <Grid xs={12}>
          {data.allContentfulPage.edges[0].node.sections.map(
            ({ name, contents }) => 
              <Box component="section" mb={4}>
                <Typography variant="h4" component="h2" gutterBottom={true}>{name}</Typography>
                <Box mt={2}>
                  {contents.map(({internal: { type }, ...rest }) => (
                    type === "ContentfulSectionInfoCard" ? (
                      <InfoCard
                        title={rest.title}
                        contentList={rest.contentList}
                        dateFromTo={rest.dateFromTo}
                        iconUrl={'https:'+rest.icon.file.url}
                        place={rest.place}
                        techStackList={rest.techStackList}
                        links={[{name: rest.industryName, link: rest.industryLink}]}
                      />
                    ) : (
                      <ProjectCard
                        title={rest.title}
                        links={[]
                          .concat(rest.repoLink ? {name: "repository", link: rest.repoLink} : [])
                          .concat(rest.webLink ? {name: "website", link: rest.webLink} : [])
                        }
                        techStackList={rest.techStackList}
                        contentList={rest.contentList}
                      />
                    )
                  ))}
                </Box>
              </Box>
          )}
      </Grid>
    </>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allContentfulPage(filter: {name: {eq: "home"}}) {
      edges {
        node {
          sections {
            contents {
              ... on ContentfulSectionInfoCard {
                title
                internal {
                  type
                }
                contentList
                dateFromTo
                icon {
                  file {
                    url
                  }
                }
                industryLink
                industryName
                place
                techStackList
              }
              ... on ContentfulProject {
                title
                internal {
                  type
                }
                contentList
                repoLink
                webLink
                techStackList
              }
            }
            name
          }
        }
      }
    }
  }
`