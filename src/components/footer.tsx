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
import EmailIcon from '@material-ui/icons/Email';
import logo from "./../icons/gitlab-icon.svg"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
          social {
            email
            linkedin
            github
            gitlab
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
          <Typography variant="subtitle1" display="inline">{data.site.siteMetadata.author.name}</Typography>
        </Box>
        <Box display="inline">
          <Link href={`mailto:${data.site.siteMetadata.social.email}`}>
            <IconButton>
              <EmailIcon />
            </IconButton>
          </Link>
          <Link href={data.site.siteMetadata.social.linkedin} target="_blank">
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Link>
          <Link href={data.site.siteMetadata.social.github} target="_blank">
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </Link>
          <Link href={data.site.siteMetadata.social.gitlab} target="_blank">
            <IconButton>
              <img src={logo} className="m-0" width="24px" />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}