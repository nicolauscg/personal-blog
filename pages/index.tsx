import Head from "next/head";
import Link from "next/link";
import { Button, Container, Typography, Link as MuiLink } from "@mui/material";
import Emoji from "../components/Emoji";
import StyledMark from "../components/StyledMark";
import { ReactElement } from "react";
import Layout from "../components/Layout";
import PulsatingCircle from "../components/PulsatingCircle";

export default function Home() {
  return (
    <>
      <Head>
        <title>nicolauscg</title>
        <meta name="description" content="Nicolaus Gozali's personal blog" />
      </Head>
      <Container
        maxWidth="md"
        classes={{
          root: "flex flex-col justify-center flex-1",
        }}
      >
        <div className="my-6">
          <div className="text-4xl mb-4">
            <Emoji label="hand wave" symbol="👋" />
          </div>
          <Typography variant="h6" component="h2" className="font-thin">
            <span className="realistic-marker-highlight">Hi!</span> I&apos;m
            Nicolaus.
          </Typography>
          <Typography variant="h4" component="h1" className="font-thin mb-4">
            A software engineer in Australia working primarily with <StyledMark>Python</StyledMark>.
            with professional experience in <StyledMark>Golang</StyledMark> and <StyledMark>Kubernetes</StyledMark>,
            and a passion for <StyledMark>web development</StyledMark>.
          </Typography>
          <Typography variant="h6" component="h2" className="font-thin">
            I write about my projects and experiences on my{" "}
            <Link href="/blog">
              <Typography variant="h5" component="span">
                <MuiLink component="span">
                  <span className="font-bold cursor-pointer">/blog</span>
                </MuiLink>
              </Typography>
            </Link>
            .
          </Typography>
          <Typography variant="h6" component="h2" className="font-thin mr-2">
            To reach out, greet me at
          </Typography>
          <Button
            variant="outlined"
            classes={{
              root: "rounded-3xl mt-2",
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              classes={{
                root: "normal-case",
              }}
            >
              nicolauscg@gmail.com
            </Typography>
          </Button>
        </div>
      </Container>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    // <div>{page}</div>
    <Layout
      navs={[
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          key="work"
        >
          <PulsatingCircle />
          Currently working at{" "}
          <Link href="https://www.deswik.com/" target="_blank">
            <span className="text-blue-500 font-bold">Deswik</span>
          </Link>
        </Typography>,
      ]}
    >
      {page}
    </Layout>
  );
};
