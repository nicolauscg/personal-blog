import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import NameIcon from "../components/NameIcon";

interface LayoutProps {
  children: ReactNode;
  navs?: ReactNode[];
}

export default function Layout({ children, navs = [] }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col flex-1">
        <AppBar position="static" color="transparent">
          <Container maxWidth="xl" disableGutters>
            <Toolbar>
              <Link href="/">
                <a>
                  <NameIcon width="10rem" />
                </a>
              </Link>
              <div className="flex-1" />
              {navs}
            </Toolbar>
          </Container>
        </AppBar>
        <main className="flex flex-col flex-1">{children}</main>
      </div>
      <footer>
        <Container
          maxWidth="xl"
          classes={{
            root: "flex",
          }}
        >
          <div>
            <Typography variant="subtitle1" component="span">
              more elsewhere
            </Typography>
            <span className="ml-2">
              <Link href="mailto:nicolauscg@gmail.com">
                <a target="_blank">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </a>
              </Link>
              <Link href="https://www.linkedin.com/in/nicolauscg/">
                <a target="_blank">
                  <IconButton>
                    <LinkedInIcon />
                  </IconButton>
                </a>
              </Link>
              <Link href="https://github.com/nicolauscg">
                <a target="_blank">
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
                </a>
              </Link>
            </span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
