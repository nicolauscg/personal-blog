import dynamic from 'next/dynamic'
import { ExtendedRecordMap } from "notion-types"
import { ReactNode } from "react"
import { NotionRenderer } from "react-notion-x"
// PrismJS imports for code snippet highlighting.
// These are moved outside the dynamic Code to try avoid hydration mismatch on Vercel
import 'prismjs';
import "prismjs/components/prism-bash.js"
import "prismjs/components/prism-docker.js"
import "prismjs/components/prism-java.js"
import "prismjs/components/prism-js-templates.js"
import "prismjs/components/prism-diff.js"
import "prismjs/components/prism-git.js"
import "prismjs/components/prism-go.js"
import "prismjs/components/prism-makefile.js"
import "prismjs/components/prism-markdown.js"
import "prismjs/components/prism-python.js"
import "prismjs/components/prism-sql.js"
import "prismjs/components/prism-yaml.js"
import "prismjs/components/prism-lua.js"

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(
    (m) => m.Code
  )
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

export function NotionPage({
  recordMap,
  pageHeader,
  className,
}: {
  recordMap: ExtendedRecordMap,
  pageHeader?: ReactNode,
  className?: string,
}) {
  return <NotionRenderer
    recordMap={recordMap}
    fullPage={true}
    darkMode={false}
    pageHeader={pageHeader}
    components={{
      Code,
      Collection,
    }}
    className={className}
    mapPageUrl={(pageId: string) => {
      return `/blog/${pageId}`
    }}
  />
}
