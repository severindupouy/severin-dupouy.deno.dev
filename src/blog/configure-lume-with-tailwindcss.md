---
title: Configure Lume + TailwindCSS + Markdown
summary: How to configure Lume & TailwindCSS to work with Markdown ? The official Lume documentation misses some tips.
date: 2023-07-23
tags:
  - howto
  - lume
  - tailwindcss
  - tools
  - tuto
---

## Contexte

Lume permet de mettre en place un site :

- avec des fichiers markdown pour les contenus
- des templates pour le rendu (par exemple, Nunjucks)

Dans mon cas, j’ai suivi la documentation pour mettre en œuvre la configuration
suivante :

- des posts écrits en Markdown
- un template de post en Nunjucks
- du style avec TailwindCSS

## Problème

Le Markdown est correctement parsé (les balises sont présentes) mais aucun style
n’est appliqué.

Exemple :

```md
# Mon titre

--> <h1>Mon titre</h1>

## Mon sous-titre

--> <h2>Mon sous-titre</h2> Un paragraphe --> <p>Un paragraphe</p>
```

s’affichent de la même façon.

## Solution

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

## Épilogue

J’ai fait une pull-request pour ajouter ces informations à la
<a href="https://lume.land/plugins/tailwindcss/#mix-with-markdown-%3A-%40tailwindcss%2Ftypography-plugin" target="_blank">
documentation officielle
</a>.
