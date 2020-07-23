import React from "react"
import InfoCard from "./info-card"

export default function ProjectCard({
  title,
  repoLink,
  techStackList,
  contentList
}) {
  return (
    <InfoCard
      title={title}
      contentList={contentList}
      techStackList={techStackList}
      industryName={repoLink ? "repository" : null}
      industryLink={repoLink}
    />
  )
}