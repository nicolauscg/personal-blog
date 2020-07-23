import React, { useContext } from "react"
import Hero from "./hero";
import { IsMediumScreenOrAboveContext } from "../layout/index"

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

export default function InfoCard({
  title,
  contentList,
  dateFromTo = null,
  iconUrl = null,
  industryLink = null,
  industryName = null,
  place = null,
  techStackList = null
}) {
  const isMediumScreenOrAbove = useContext(IsMediumScreenOrAboveContext)

  return (
    <Grid container spacing={3} className="mb-2">
      <Grid item xs={10} md={3} className={isMediumScreenOrAbove ? "order-1" : "order-2"}>
        <Box textAlign={isMediumScreenOrAbove ? "right" : "left"}>
          {place && (<Typography variant="body1">{place}</Typography>)}
          {dateFromTo && (<Typography variant="body1">{dateFromTo}</Typography>)}
        </Box>
      </Grid>
      <Grid item xs={2} md={1} className={clsx("flex", "justify-center", isMediumScreenOrAbove ? "order-2" : "order-1")}>
        {iconUrl && (
          <Box width="40px">
            <Hero imageUrl={iconUrl} widthToHeightRatio={1} />
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={8} className="order-3">
        <Typography variant="h6" component="h3" gutterBottom>
          {title} {industryName && industryLink && 
            <> — <Link href={industryLink} target="_blank" color="secondary">{industryName}</Link></>
          }
        </Typography>
        <ul className="list-disc list-inside pl-2">
          {contentList.map(text => <li className="mb-1">
            <Typography variant="body1" display="inline">{text}</Typography>
          </li>)}
        </ul>
        {techStackList && (
          <Box mt={2}>
            {techStackList.map(techStack => 
              <Chip label={techStack} variant="outlined" className="mr-1"/>
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
