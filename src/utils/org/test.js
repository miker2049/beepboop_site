const parser = require('./org_parser');
const fs = require('fs');
const rawtext = fs.readFileSync('../../site/_data/projects.org');
console.log(parser(rawtext)[0].html);