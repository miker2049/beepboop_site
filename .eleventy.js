const orgParse = require('./src/utils/org/org_parser');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function(config) {

    // A useful way to reference the context we are runing eleventy in
    let env = process.env.ELEVENTY_ENV;

    // Layout aliases can make templates more portable
    config.addLayoutAlias('default', 'layouts/base.njk');

    config.addDataExtension('org', contents =>{
        let parsed =orgParse(contents);
        // console.log(parsed);
        parsed = parsed.filter(project=>{return project.keyword==="DONE" });
        return parsed;
    });

    // Add some utility filters
    config.addFilter("squash", require("./src/utils/filters/squash.js") );
    config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );


    // add support for syntax highlighting
    config.addPlugin(syntaxHighlight);

    // minify the html output
    config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

    // compress and combine js files
    config.addFilter("jsmin", function(code) {
        const UglifyJS = require("uglify-js");
        let minified = UglifyJS.minify(code);
        if( minified.error ) {
            console.log("UglifyJS error: ", minified.error);
            return code;
        }
        return minified.code;
    });


    // pass some assets right through
    config.addPassthroughCopy("./src/site/images");
    config.addPassthroughCopy("./src/site/videos");

    // make the seed target act like prod
    env = (env=="seed") ? "prod" : env;
    return {
        dir: {
            input: "src/site",
            output: "dist",
            data: `_data`
        },
        templateFormats : ["njk", "md", "11ty.js", "html"],
        htmlTemplateEngine : "njk",
        markdownTemplateEngine : "njk",
        passthroughFileCopy: true
    };

};
