---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<p class="date">
Posted on 
<time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
<main class="posts">
   <div class="pasts">
      {{ content | safe }}
   </div>
   <div class="footnote">
      <!-- <p> -->
      <!--   This page is part of the posts section. -->
      <!-- </p> -->
   </div>
</main>
