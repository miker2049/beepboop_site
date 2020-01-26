const unified = require('unified');
const parse = require('orga-unified');
const mutate = require('orga-rehype');
const html = require('rehype-stringify');
const visit = require('unist-util-visit');
const select = require('unist-util-select').select;

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
            const orgText = select(':root section',node);
            const hast = orgText ? htmlize.runSync(orgText) : null;
            const htmlString = hast ? htmlize.stringify(hast): null;
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
