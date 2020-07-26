import React, { useEffect, useState, ReactNode, Children } from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import _ from "lodash";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { secondaryColor } from "../styles/color"

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

interface CodeBlockHeadingInfo {
  caption?: string;
  language?: string;
  text: string;
  isInline: boolean;
}

export default function RichTextRenderer({ content, appendHeading, setIsReady, onFinish = ()=>{} }) {
  const [reactComponent, setReactComponent] = useState(<React.Fragment /> as ReactNode)
  const classes = useRichTextRendererStyle()
  
  useEffect(() => {
    const generateId = text => _.kebabCase(text)
    const isCodeBlock = text => {
      const newLineIndex = text.indexOf('\n')
      if (newLineIndex === -1) {
        return {text, isInline: true} as CodeBlockHeadingInfo
      }
      const firstLine = text.slice(0, newLineIndex)
      try {
        return {...JSON.parse(firstLine), text: text.slice(newLineIndex+1), isInline: false} as CodeBlockHeadingInfo
      } catch(err) {
        return {text, isInline: false} as CodeBlockHeadingInfo
      }
    }
    const options = {
      renderMark: {
        [MARKS.CODE]: (text) => {
          const {language, caption, text: contentText, isInline} = isCodeBlock(text)

          return (
            isInline ? 
            (<Paper className={clsx("inline", "px-2", classes.inlineCode)}>
              <code>{text}</code>
            </Paper>) : 
            (<Box mb={2} className={classes.syntaxHighlighter}>
              <Paper>
                <SyntaxHighlighter language={language || "plaintext"} style={dark}>
                  {contentText}
                </SyntaxHighlighter>
                {caption && <Box textAlign="center" px={2} className={clsx(classes.codeCaption, "text-base")}>{caption}</Box>}
              </Paper>
            </Box>)
          )
        }
      },
      renderNode: {
        [BLOCKS.HEADING_1]:
          (_, children) => {
            const headingId = generateId(children[0]);
            appendHeading({id: headingId, text: children[0]})

            return (
              <Typography id={headingId} variant="h3" component="h2" gutterBottom={true} data-scrollspy>
                {children}
              </Typography>
            )
          },
        [BLOCKS.PARAGRAPH]: (_, children) => {
          return (
            <Typography variant="body1" paragraph={true} className="custom-display-inherit" 
              classes={{body1: classes.body1}}>{children}</Typography>
          )
        },
        [INLINES.HYPERLINK]: (node, children) => {
          return (
            <Link color="secondary" href={node.data.uri} target="_blank">{children}</Link>
          )
        },
        [BLOCKS.UL_LIST]: (_, children) => {
          return (
            <div className={clsx("list-disc", classes.body1)}>{children}</div>
          )
        },
        [BLOCKS.OL_LIST]: (_, children) => {
          return (
            <div className={clsx("list-decimal", classes.body1)}>{children}</div>
          )
        },
        [BLOCKS.LIST_ITEM]: (_, children) => {
          return (
            <li><Box display="inline">{children}</Box></li>
          )
        },
        [BLOCKS.HR]: () => <Box my={2}><Divider className={classes.hr}/></Box>,
        [BLOCKS.QUOTE]: (_, children) => <Box my={2}><blockquote>{children}</blockquote></Box>,
        [BLOCKS.EMBEDDED_ASSET]: node => 
          <Paper className="mb-2">
            <img src={`https:${node.data.target.file.url}`} className={classes.embeddedAsset} />
            {node.data.target.description && 
              <Box textAlign="center" className={classes.codeCaption} px={2}>
                <Typography variant="body1">{node.data.target.description}</Typography>
              </Box>
            }
          </Paper>
      },
    };
    [BLOCKS.HEADING_2, BLOCKS.HEADING_3, BLOCKS.HEADING_4, BLOCKS.HEADING_5, BLOCKS.HEADING_6].map(blockHeading => {
      options.renderNode[blockHeading] = options.renderNode[BLOCKS.HEADING_1]
    })
    setReactComponent(renderRichText(content, options))
    
    return onFinish
  }, [])

  useEffect(() => {
    if ((reactComponent as any).length) {
      setIsReady(true)
    }
  }, [reactComponent])

  return (
    <>
     {reactComponent}
    </>
  )
}

const useRichTextRendererStyle = makeStyles({
  body1: {
    fontSize: "1.3rem"
  },
  codeCaption: {
    backgroundColor: secondaryColor[300]
  },
  hr: {
    height: "3px",
    backgroundColor: secondaryColor[900]
  },
  inlineCode: {
    backgroundColor: secondaryColor[300]
  },
  embeddedAsset: {
    objectFit: "contain",
    maxHeight: "300px",
    width: "100%",
    marginBottom: 0
  },
  syntaxHighlighter: {
    "& pre": {
      padding: "1rem !important",
      fontSize: "1rem"
    }
  },
})
