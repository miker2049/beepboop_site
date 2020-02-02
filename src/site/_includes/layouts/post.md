---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---
<main class="posts">
<span>
<h1 class="posts"> {{title}} </h1>
<p class="date">
Posted on 
<time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
</span>
<div class="posts">
<div class="text-content">
{{ content | safe }}
</div>
</div>
<div class="footnote">
<!-- <p> -->
<!--   This page is part of the posts section. -->
<!-- </p> -->
</div>
</main>
