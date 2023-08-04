---
title: "[Lume] How to configure TailwindCSS to work with Markdown ?"
summary: One of the main and interesting features of Lume is to allow content to be written in Markdown. However, the documentation was missing some tips about using markdown with TailwindCSS.
date: 2023-07-23
tags:
  - howto
  - lume
  - markdown
  - tailwindcss
  - tools
  - tuto
---

## Contexte

J’ai suivi la documentation de Lume pour mettre en œuvre la configuration
suivante :

- des posts écrits en Markdown
- un template de post en Nunjucks
- du style avec TailwindCSS

## Problème

Les posts ne s’affichent pas comme je veux, on dirait qu’il n’y a pas de CSS.

J’inspecte l’html rendu dans le navigateur, et je me rend compte que les balises
html sont bien présentes, et qu’elles correspondent au markdown.

|                  md | html                   |
| ------------------: | :--------------------- |
|       `# Mon titre` | `<h1>Mon titre</h1>`   |
| `## Mon sous-titre` | `<h2>Mon titre</h2>`   |
|     `Un paragraphe` | `<p>Un paragraphe</p>` |

Mais tout s’affiche de la même façon, pas de CSS.

## Explications : TailwindCSS Preflight

Je vous renvoie vers la
[documentation de TailwindCSS](https://tailwindcss.com/docs/preflight). En gros,
un _reset_ est appliqué au CSS, et la logique veut que l’on applique
manuellement des classes pour créer le CSS. Parmi les balises normalisées par le
_preflight_, les h1, etc.

Si on veut agrandir un titre, il faut faire quelque chose comme ça :

```html
<h1 class="text-xl">Mon titre</h1>
```

## Solutions

Il y en a plusieurs.

### Solution 1 : typography-plugin

Utiliser le plugin [typography](https://tailwindcss.com/docs/typography-plugin)
de TailwindCSS et appliquer la classe `prose` à tout rendu d’un fichier
markdown.

```html
<!-- exemple de la documentation Tailwind -->
<article class="prose">
  {{ markdown }}
</article>

<!-- exemple appliqué à Lume -->
<article class="prose">
  {{ content | safe }}
</article>
```

C’est celle que j’ai mis en place.

### Solution 2

[Configurer TailwindCSS](https://tailwindcss.com/docs/plugins#adding-base-styles)
pour appliquer un certain style à certaines balises. Je n’ai pas testé, mais ça
serait intéressant pour éviter d’installer le plugin typography.

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

## Épilogue

J’ai fait une
<a href="https://lume.land/plugins/tailwindcss/#mix-with-markdown-%3A-%40tailwindcss%2Ftypography-plugin" target="_blank">
pull-request
</a> pour mettre à jour la documentation de Lume.
