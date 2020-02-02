const fs = require("fs");
const path = require("path");


let files =  fs.readdirSync(path.join(__dirname,'files/'));
let paths=[];


files.forEach((file)=>{
    paths.push(
        {
            path:"./files/"+file,
            title: file.replace(/.js$/,""),
        }
    );
});

module.exports = {sketches:paths};
