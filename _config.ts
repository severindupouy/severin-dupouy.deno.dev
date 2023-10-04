import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import filterPages from "lume/plugins/filter_pages.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import metas from "lume/plugins/metas.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import postcss from "lume/plugins/postcss.ts";
import readInfo from "lume/plugins/reading_info.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import sitemap from "lume/plugins/sitemap.ts";
import sourceMaps from "lume/plugins/source_maps.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import typography from "npm:@tailwindcss/typography";

const site = lume(
  {
    src: "./src",
    location: new URL("https://severin-dupouy.deno.dev/"),
    server: { page404: "/pages/404/" },
  },
  { search: { returnPageData: true } },
);

site
  .copy("static")
  .use(favicon())
  .use(filterPages({ fn: (page) => !page.data.draft }))
  .use(readInfo())
  .use(jsx())
  .use(date())
  .use(codeHighlight())
  .use(tailwindcss({
    extensions: [".html", ".tsx"],
    options: {
      darkMode: "class",
      plugins: [typography],
    },
  }))
  .use(postcss())
  .use(lightningCss())
  .use(inline())
  .use(metas())
  .use(esbuild())
  .use(resolveUrls())
  .use(sitemap())
  .use(sourceMaps())
  .use(minifyHTML())
  .use(feed({
    output: ["/rss/feed.rss", "/rss/feed.json"],
    query: "type=post",
    info: { title: "=site.title", description: "=site.description" },
    items: { title: "=title", description: "=excerpt" },
  }));

export default site;
