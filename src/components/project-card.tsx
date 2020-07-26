import React from "react"
import InfoCard from "./info-card"

export default function ProjectCard({
  title,
  techStackList,
  contentList,
  links
}) {
  return (
    <InfoCard
      title={title}
      contentList={contentList}
      techStackList={techStackList}
      links={links}
    />
  )
}