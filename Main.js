const translate = require('@vitalets/google-translate-api');  //https://github.com/vitalets/google-translate-api
const fs = require('fs');
const path_module = require('path');


if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];

fs.readdir(path, function(err, items) {
    for (let i=0; i<items.length; i++) {
        let file = path + '/' + items[i];

       const ext = path_module.extname(file);
        if (ext === ".png" ||
            ext ===  ".git" ||
            ext === ".pro" ||
            ext === ".md")
                continue;

        try {
            const data = fs.readFileSync(file, "utf8");
            if(data.length > 4500){
                //split request
                //need sync request see https://github.com/franciscop/translate
            }
            translate_decorator(data, file);
        }catch (e) {
            console.log("READ ERROR", e);
        }

            // if(data){
            //     console.log("ERROR READ", data);
            //     return;
            // }



        // file, function(err, stats) {
        //     console.log(file);
        //     console.log(stats["size"]);
        // });
    }
});

function  translate_decorator(text, file){
    translate(text, {from: 'ru', to: 'en'}).then(res => {
        //console.log(res.text);
        rewrite_file(text, file);

        //console.log(res.from.language.iso);
        //=> nl
    }).catch(err => {
        console.error(err);
    });
}

function rewrite_file(text, file){
    fs.writeFile(file, data, function (err) {
        if(error) throw error;

    })
}