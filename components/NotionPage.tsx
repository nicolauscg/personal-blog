import dynamic from 'next/dynamic'
import { ExtendedRecordMap } from "notion-types"
import { ReactNode } from "react"
import { NotionRenderer } from "react-notion-x"

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-markup-templating.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-markup.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-bash.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-c.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-cpp.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-csharp.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-docker.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-java.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-js-templates.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-coffeescript.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-diff.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-git.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-go.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-graphql.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-handlebars.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-less.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-makefile.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-markdown.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-objectivec.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-ocaml.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-python.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-reason.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-rust.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-sass.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-scss.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-solidity.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-sql.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-stylus.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-swift.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-wasm.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-yaml.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-lua.js')
    ])
    return m.Code
  })
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
