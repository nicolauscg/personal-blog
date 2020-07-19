import React from "react"
import UnstyledLink from "../components/unstyled-link"

import Typography from "@material-ui/core/Typography";

export default function BlogPostSubtitle({ tags, createDate, updateDate, variant }) {
  return (
    <Typography variant={variant} className="not-italic">
      {tags.map(({ name }, index) =>
        <>
          {index !== 0 ? ", " : ""}
          <Typography color="secondary" display="inline">
            <UnstyledLink to={name === "all" ? "/blog" : `/blog/tag/${name}`}>{name}</UnstyledLink>
          </Typography>
        </>
      )}
      &nbsp;• created {createDate}{updateDate !== createDate && ` • updated ${updateDate}`}
    </Typography>
  )
}