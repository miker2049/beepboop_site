---
title: beep boop site
subtitle: Made by <a href="https://twitter.com/miker2049">mike</a> for <a href="https://twitter.com/miker2049">turtle</a>.
layout: layouts/home.njk
tags: home
---

A web home for all things beep boop, a.k.a Mike Russo.
## Bloggey pages

Various posts that are more journal than techincal or fiction.

<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay("LLLL d, y") }}</time>
  </li>
{%- endfor -%}
</ul>
