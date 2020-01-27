---
title: Adding simple org-mode support to my site
---

Ok, so I as I am getting more serious about this site, or rather, as I slowly become more and more desperate to do anything at all, I consider what I want:

#### I want to be flexible in both *how* and *when* I update the site.  
I am just having fun, aspiring to build some quirky monolith, and learning about frontend development.  I want to populate this space with mostly my experiments and maybe occasional writings.  I dont want to be tied to a simple ritual of making a markdown file, writing something, and then posting it.  *c'est non un blog*.  (is "blog" masculine in french?)  

#### I am all over the place in my projects, this site can conform to that, not the other way around
I do not want to form a linear narrative with my day to day fixations.  I want to supply myself with a space where I can do a little here, and a little there, and have that patchwork represented transparently on ~beep boop site~.  

#### I like using org-mode, and I think it will be a way to satisfy much of the above points 
I am not quite sure what it is that attracts me to org-mode.  Perhaps its kind of open domain of utility.  That is, it is not really for one thing or another: it does, on first glance, a collection of arbitrary things that seem to relate to note taking and scheduling, but really it is just a simple format for relating bits of text and data together in human ways.  I like this, and it suits how I think well.

So in these reflections I wanted to see how I could get some of my big org files, and automate the rendering of them in ways I can control to make this website.  Allowing me to be flexible in how I update this site, and provide a true organic represantation of my creative output.  

## SSGs, eleventy, org

SSGs like eleventy offer a way to abstract content from form and code, so that people can worry about the former more.  So, the markdown file I am writing offers me a straightforward way to write natural language and **format** *it* in simple ways.  The markdown-mode in my emacs config provides additional layers of convenient abstraction as well, but thats another story. 

So what does this mean?  Well, every time I build this site, the eleventy executable I have locally installed in the project looks at its ~.eleventy.js~ file in the root folder and is instructed how to coordinate a whole bunch of different types of content and markdown into a static website.  Namely, there is a bunch of actual content, like the text I am writing at this moment in a markdown file, and a bunch of templates/layouts that that content is put into.  Once I run the eleventy program, which has all the powers of node and npm modules, all the files in one folder get picked up, and then spit out into another folder of clean (minified) HTML/js/CSS.

{% highlight "js" %}
{
//requiring an npm module
const org = require('org-mode-parser');

module.exports = function(config) {
    // pass some assets right through
    config.addPassthroughCopy("./src/site/images");
    config.addPassthroughCopy("./src/site/videos");
    
    //using the npm package
    config.addDataExtension('org', contents =>{
        let orgs= org.parseBigString(contents); 
        let queryObject = new org.OrgQuery(orgs);
        return queryObject;
    });
    //where the action happens, producing things
    return {
        dir: {
            input: "src/site",
            output: "dist",
            data: `_data/${env}`
        },
        templateFormats : ["njk", "md", "11ty.js"],
        htmlTemplateEngine : "njk",
        markdownTemplateEngine : "njk",
        passthroughFileCopy: true
    };

};
}
{% endhighlight %}


That in principle is simple enough, but my task right now is not simply to find the right layout for my content, but to really try and breakdown a prior issue of first of all *getting* the content, to then fit into whatever.

## eleventy and org

In the markdown file I am writing now, the distinction between form and content is somewhat obscured.  Here, when I say form, I am simply talking about all the HTML that exists outside of my markdown file, \<head\> and \<header\> and CSS and footer and all that.

{% highlight "html 14-16" %}
<code>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/styles.css">
    <title>{{ title }}</title>
  </head>
  <body {% if bodyClass %}class="{{ bodyClass }}"{% endif %}>
    <div class="container">
    {% raw %}
       <!-- Here is where stuff gets injected. -->
       {% include "header.njk" %}
       {{ content | safe }}
       {% include "footer.njk" %}
       {% endraw %}
    </div>
  </body>
</html>
</code>
{% endhighlight %}

But with the org mode stuff, I am asking for a greater degree of abstraction from the simple way we have thus far been dealing with form/content,  in fact I am asking for the org mode file to be first of all parsed away from itself as my life document, and then reformed into a different format.  My org file will become *data*, removed from its context of my writing and made available to be injected into layouts I have also made.  

That is to say, that my one org file will not correspond to one page on the site, but will in fact contain within it the data of multiple pages.

## Making an org file into data

I suspect I haven't been that clear yet, and this is a highly specific thing and I am not really writing for you.  But anyway, here it goes.

This is what an org file looks like:

<image src="/images/org-mode-example.png" alt="a picture of org mode"></image>

Its really just kinda a way to make outlines.  And its fun because you can collapse and open up things, relate things to each other, give things schedules and deadlines.  Stuff like that.  

Each of the left most headings, for my purposes will be page, and the headings after that will be sections in the page.  

Eleventy has no native support for org-mode files, although as of the most recent version, it gives users an easy way to add instructions for how to deal with file extensions not natively recognized by eleventy.

{% highlight "js 0,06-10" %}
const orgParse = require('./src/utils/org/org_parser');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function(config) {

    config.addDataExtension('org', contents =>{
        let parsed =orgParse(contents);
        // console.log(parsed);
        return parsed;
    });
    
    
    // ...
    // configuration, filters, etc
    // ...
    
    
    // make the seed target act like prod
    env = (env=="seed") ? "prod" : env;
    return {
        dir: {
            input: "src/site",
            output: "dist",
            data: `_data/${env}`
        },
        templateFormats : ["njk", "md", "11ty.js", "html"],
        htmlTemplateEngine : "njk",
        markdownTemplateEngine : "njk",
        passthroughFileCopy: true
    };

};

{% endhighlight %}

The `addDataExtension` here deals specifically (as far as I can tell with the way files in the *data* folder are held.
### site directory structure
<div style="line-height: 1.1em" class="file-directory">

* src/
  * utils/
    * org/
      * test.js
      * **org_parser.js** <--------
    * filters/
    * minify-html.js
  * site/
    * videos/
    * posts/
    * images/
    * css/
    * __includes/
    * __data/
      * **projects.org** <---------
    * projects.njk
  * functions/
* dist/ 
* package.json
* **.eleventy.js** <--------

</div>

And then the custom function required in the config file is what does the magic of turning an org file into something I can use throughout the site:

{% highlight "js" %}
const unified = require('unified');
const parse = require('orga-unified');
const mutate = require('orga-rehype');
const html = require('rehype-stringify');
const visit = require('unist-util-visit');
const {select, selectAll} = require('unist-util-select');

module.exports=function(contents){
    const tree = unified().use(parse).parse(contents);
    const htmlize = unified()
          .use(mutate)
          .use(html);
    let sectionArr = [];
    visit(tree, function(node) {
        if(node.type==='section' && node.level ===1){
            const title =select(':root headline text',node).value;
            const {tags, keyword, priority}= select(':root headline',node);
            const orgText = selectAll(':scope > section',node);
            let htmlString = "";
            for (let i=0;i<orgText.length;i++){
                let hast = orgText[i] ? htmlize.runSync(orgText[i]) : null ;
                htmlString += hast ? htmlize.stringify(hast): null;
            }
            sectionArr.push({
                title: title,
                keyword: keyword,
                tags: tags,
                priority: priority,
                html: htmlString
            });
        }
    });
    return sectionArr;
}

{% endhighlight %}

I use [unified](https://github.com/unifiedjs/unified) and [orga](https://github.com/orgapp/orgajs) for my parsing, mutating, and converting-to-html needs.

The function takes in a big string, directed from eleventy's build process and my custom data extension method. This is then turned into a AST tree.  The `visit` function then looks for top level headings/sections in the org file, and for each one adds an object to an array.  

Once this process is done, I have availble all the data I need to render my html.  I have two template files, `projects.njk` and `project.njk` for both the index page that links to all the projects, but the generation of separate pages for each top level heading marked "DONE" in the org file.  I can use org-modes built in TODO system to control what pages I have published or not from within the org file.  I can also easily just generate the entire page as on html page, just a simple nunjucks iteration for that if needed!

#### projects.njk ####

{% highlight "liquid" %}
---

layout: layouts/base.njk

---
{% raw %}
<ul class="listing">
    {%- for project in projects -%}
        <li>
            <a href="{{ project.title | slug }}">{{ project.title }}</a> 
        </li>
    {%- endfor -%}
</ul>
{% endraw %}
{% endhighlight %}

#### project.njk ####

{% highlight "liquid" %}
{% raw %}

---
layout: layouts/base.njk
pagination:
   data: projects
   size: 1
   alias: project
permalink: "projects/{{ project.title | slug }}/"
---
<h2>{{project.title}}</h2>

{{project.html | safe }}
{% endraw %}
{% endhighlight %}

#### example concantenated file ####

{% highlight "liquid" %}
{% raw %}

---
layout: layouts/base.njk
pagination:
   data: projects
   size: 1
   alias: project
permalink: "projects/{{ project.title | slug }}/"
---
    {%- for project in projects -%}
       <h1>{{ project.title }}</h1>
       {{ project.html | safe }}
    {%- endfor -%}
{% endraw %}
{% endhighlight %}
