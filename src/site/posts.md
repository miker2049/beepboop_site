---
title: Posts
layout: layouts/base.njk
---
## Posts
<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}{{page.date.templateContent}}</a> -
  </li>
{%- endfor -%}
</ul>
