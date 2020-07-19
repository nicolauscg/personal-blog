import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            linkedin
            github
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Divider />
        <Box display="inline" mt={2}>
          <Typography variant="subtitle1" display="inline">Nicolaus Christian Gozali</Typography>
        </Box>
        <Box display="inline">
          <Link href={data.site.siteMetadata.social.linkedin}>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Link>
          <Link href={data.site.siteMetadata.social.github}>
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}