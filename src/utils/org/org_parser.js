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
            const title =select(':scope headline text',node).value;
            const {tags, keyword, priority}= select(':root headline',node);
            const  planningNode = select(':scope headline planning',node);
            const date = planningNode ? planningNode.date : null;
            const orgText = selectAll(':scope > :not(headline)',node);
            // console.log("////////////////////////////////////////////////////////////////////////////////////////////////");
            // console.log();
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
                html: htmlString,
                date:date
            });
        }
    });
    return sectionArr;
}
