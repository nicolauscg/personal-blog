import Emoji from "@/components/Emoji"
import { Container, Typography } from "@mui/material"
import Head from "next/head"

export default function Page404() {
  return (
    <>
      <Head>
        <title>nicolauscg | 404</title>
      </Head>
      <Container
        maxWidth="md"
        classes={{
          root: "flex flex-col justify-center flex-1",
        }}
      >
        <Typography variant="h2" component="h1" className="font-thin text-center">
          404 not found
          <Emoji label="warning" symbol="⚠️" />
        </Typography>
      </Container>
    </>
  )
}
