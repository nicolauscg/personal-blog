import Link from "next/link";
import { Paper, Chip, Grid, Stack, Typography } from "@mui/material";
import { RichText } from "../components/RichText";
import { NotionTag } from "../lib/types";
import { parseNotionTextColor, parseDateTime } from "../lib/notionHelpers";

interface InfoCardProps {
  title: any;
  link: string;
  tags?: NotionTag[];
  dateTime: string;
  thumbnailUrl?: string | null;
}

export default function InfoCard(props: InfoCardProps) {
  const { title, link, tags = [], dateTime, thumbnailUrl = null } = props;

  return (
    <Link href={link}>
      <a>
        <Paper className="p-2" elevation={2}>
          <Grid container>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={9}>
              <Stack direction="row" spacing={1}>
                {tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    className="border-2"
                    label={tag.name}
                    variant="outlined"
                    size="small"
                    color={parseNotionTextColor(tag.color)}
                  />
                ))}
              </Stack>
              <Typography variant="h5" component="h2">
                <RichText text={title} />
              </Typography>
              <Typography variant="subtitle1" component="h3">
                {parseDateTime(dateTime)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </a>
    </Link>
  );
}
