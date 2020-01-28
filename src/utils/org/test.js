const parser = require('./org_parser');
const fs = require('fs');
const rawtext = fs.readFileSync('../../site/_data/projects.org');
parser(rawtext);
