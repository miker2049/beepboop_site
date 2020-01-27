---
title: Posts
layout: layouts/base.njk
---
## Posts
<ul class="listing">
{%- for page in collections.post -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
  </li>
{%- endfor -%}
</ul>
