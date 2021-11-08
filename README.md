# personal-blog

Statically generated portfolio and blog with [Next.js](https://nextjs.org/) and [Notion](https://www.notion.so/) as CMS. [Official Private Notion API](https://developers.notion.com/docs/getting-started) is used for listing blog posts and [Unofficial Public Notion API](https://github.com/NotionX/react-notion-x) is used to render individual posts.

## Develop

Create Notion internal integration to get token by following steps [here](https://www.notion.so/my-integrations) then add it to `.env` file.

Ensure blog posts have expected properties by using [this template](https://splashy-hygienic-9ed.notion.site/personal-blog-template-96f39e79b6944d478a495b57931970a3).

Add integration to the database and share it to the public for the private and public API to work.

Finally, run development server.

```bash
yarn
yarn dev
```
