---
draft: true
title: "Tailwind : rendering markdown appropriately"
summary: Most site generators allow you to advantageously use markdown to write content. However, by default, tailwind does not generate styles for usual html tags like h1s, etc. Let's see how to fix this by configuring tailwind with its typography plugin.
date: 2023-10-03
tags:
  - howto
  - markdown
  - tailwindcss
  - SSG
  - tools
  - tuto
---

## Good to know

You can customize the style with appropriate modifiers :

```html
<article class="prose prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600">
  {{ markdown }}
</article>
```

## Context

Following the Lume’s documentation, I have set up this configuration :

- posts content written in Markdown
- templating with Nunjucks
- styling with TailwindCSS

## Problem

Posts doesn’t display as I expected, it looks like there is no css.

I inspect the HTML rendered in the browser, and I realize that all is right :
the html tags are present, and they correspond to the markdown.

|                md | html                    |
|------------------:|:------------------------|
|      `# My title` | `<h1>My title</h1>`     |
| `## My sub-title` | `<h2>My sub-title</h2>` |
|     `A paragraph` | `<p>A paragraph</p>`    |

But… all of it is displayed the same ! No CSS.

## Explanation : the TailwindCSS preflight

The [documentation of TailwindCSS](https://tailwindcss.com/docs/preflight) tells
that a _reset_ is applied. Among tags normalized by the preflight : h1, etc. The
TailwindCSS philosophy should be to set manually some classes to create the
wanted style.

We should do something like this :

```html
<h1 class="text-xl">My title</h1>
```

## Solutions

### Solution 1 : typography-plugin

Use the [typography-plugin](https://tailwindcss.com/docs/typography-plugin) of
TailwindCSS and apply the `prose` class to render any markdown content.

```html
<!-- example from Tailwind documentation -->
<article class="prose">
  {{ markdown }}
</article>

<!-- example applied to Lume -->
<article class="prose">
  {{ content | safe }}
</article>
```

This is the solution I implemented.

### Solution 2

cf.
[https://tailwindcss.com/docs/plugins#adding-base-styles](https://tailwindcss.com/docs/plugins#adding-base-styles).

We can set the configuration to apply certain specific styles to certain tags. I
did not try it. It would be interesting in order not to install the
typography-plugin.

```js
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        "h1": { fontSize: theme("fontSize.2xl") },
        "h2": { fontSize: theme("fontSize.xl") },
        "h3": { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
```

## Epilogue

I submitted to Lume’s maintainer a
<a href="https://lume.land/plugins/tailwindcss/#mix-with-markdown-%3A-%40tailwindcss%2Ftypography-plugin" 
aria-label="Open new tab & reach lume.land/plugins/tailwindcss/#mix-with-markdown-%3A-%40tailwindcss%2Ftypography-plugin" target="_blank">
pull-request
</a> to add these details to the documentation.
