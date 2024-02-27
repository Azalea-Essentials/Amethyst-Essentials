const fs = require('fs');
let data = [];
fs.readdir('icontextures', (err,files)=>{
    for(const file of files) {
        data.push({
            path: `azalea_icons/icontextures/${file.split('.')[0]}`,
            name: `${file.split('.')[0]}`
        })
    }
    fs.writeFile("icontextures.json", JSON.stringify(data, null, 2), err=>{

    })
    // fs.writeFile("icontextures.json", data.map(_=>_.name).join('\n'), err=>{
        
    // })
})