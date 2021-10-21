import Link from "next/link";
import { Paper, Chip, Grid, Stack, Typography } from "@mui/material";
import { RichText } from "../components/RichText";
import { NotionTag, NotionTextColor } from "../lib/types";

interface InfoCardProps {
  title: any;
  link: string;
  tags?: NotionTag[];
  dateTime: string;
  thumbnailUrl?: string | null;
}

export default function InfoCard(props: InfoCardProps) {
  const { title, link, tags = [], dateTime, thumbnailUrl = null } = props;

  const parseDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const notionTagColorToMuiColor: {
    [key in NotionTextColor]:
      | "default"
      | "success"
      | "warning"
      | "info"
      | "error"
      | "primary"
      | "secondary"
      | undefined;
  } = {
    default: "default",
    gray: "default",
    brown: "success",
    orange: "warning",
    yellow: "warning",
    green: "success",
    blue: "info",
    purple: "info",
    pink: "error",
    red: "error",
  };

  return (
    <Link href={link}>
      <a>
        <Paper className="p-2" elevation={2}>
          <Grid container>
            <Grid xs={12} sm={3}>
              <div className="static pr-4">
                <div
                  className="w-full aspect-w-2 aspect-h-1 rounded-lg"
                  style={{
                    ...(thumbnailUrl
                      ? {
                          backgroundImage: `url(${thumbnailUrl})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }
                      : {
                          backgroundColor: "grey",
                        }),
                  }}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={9}>
              <Stack direction="row" spacing={1}>
                {tags.map((tag) => (
                  <Chip
                    className="border-2"
                    label={tag.name}
                    variant="outlined"
                    size="small"
                    color={notionTagColorToMuiColor[tag.color]}
                  />
                ))}
              </Stack>
              <Typography variant="h5" component="h2">
                <RichText text={title} />
              </Typography>
              <Typography variant="subtitle1" component="h3">
                {parseDate(dateTime)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </a>
    </Link>
  );
}
