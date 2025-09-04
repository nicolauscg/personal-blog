# personal-blog

My personal website and blog.
It uses [Next.js](https://nextjs.org/), and [Notion](https://www.notion.so/) as the content management system (CMS).

## Details

The source Notion page containing my blog posts can be found [here](https://nicolauscg.notion.site/Blog-posts-259c99d865758031b87ee339dfc5b8e6).

The following Notion libraries are used:
- [react-notion-x](https://github.com/NotionX/react-notion-x) is used to get a Notion page's content and render it.
- The official [Notion API](https://developers.notion.com/docs/getting-started) is used for:
    - Getting a list of blog post page ids to be statically generated.
    - Checking that the page id in the url is accessible by the Notion API token, ensuring that only your own Notion pages are rendered. 

The blog post index page is also a Notion page.
To show non-public blog posts on development, a separate Notion page is rendered, that has different filters compared to the page used in production.

[nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) is used as a reference for rendering the Notion pages (it only uses react-notion-x and not the official Notion API).

## Develop

`.env.example` is populated with my read only Notion token, to get started quickly, just copy content to `.env`.

Otherwise, to use your own Notion page:
- Duplicate the top-level page of the Notion page containing my blog posts (linked above).
- Share the top-level page publicly so that `react-notion-x` works without authentication.
- Create a [Notion internal integration](https://www.notion.so/my-integrations) with access to the top-level page, and take note of the token.
- Setup the `.env` file by setting your token, blog database id, and blog index page id.

Finally, run development server.

```bash
yarn install
yarn dev
```
