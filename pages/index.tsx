import Head from "next/head";
import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";
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
        <div>
          <div className="text-4xl mb-4">
            <Emoji label="hand wave" symbol="👋" />
          </div>
          <Typography variant="h6" component="h2" className="font-thin">
            <span className="realistic-marker-highlight">Hello!</span> I&apos;m
            Nicolaus.
          </Typography>
          <Typography variant="h4" component="h1" className="font-thin mb-4">
            I am a final year computer science student in Australia with a keen
            interest in <StyledMark>software engineering</StyledMark> and{" "}
            <StyledMark>web development</StyledMark>.
          </Typography>
          <div className="flex flex-wrap items-center">
            <Typography variant="h6" component="h2" className="font-thin mr-2">
              Feel free to reach out at
            </Typography>
            <Button
              variant="outlined"
              classes={{
                root: "rounded-3xl",
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
        </div>
      </Container>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      navs={[
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <PulsatingCircle />
          Currently working at{" "}
          <Link href="https://www.csgi.com/">
            <a target="_blank">
              <span className="text-red-500 font-bold">CSG</span>
            </a>
          </Link>
        </Typography>,
      ]}
    >
      {page}
    </Layout>
  );
};
