import * as readline from "readline/promises";
import * as fs from "fs";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const option = process.argv[2];


async function parseJson(filepath){

  if(fs.existsSync(filepath)){
    let content  = await fs.promises.readFile(filepath,'utf-8')
    const contentParsed = JSON.parse(content);
    const allExtensionsName = contentParsed.map(e => {
      return {name: e.identifier.id}
    })
    await fs.promises.writeFile('./names.json', JSON.stringify(allExtensionsName,null,2))
  }else{
    console.log('Filepath doesnt exist')
  }
} 

async function generateBookmarkHTML(filepath){ 
  if(fs.existsSync(filepath)){
    try {
      let content  = await fs.promises.readFile(filepath,'utf-8')
      content = JSON.parse(content)
      let html = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n';
      html += '<!-- This is an automatically generated file.\n';
      html += '     It will be read and overwritten.\n';
      html += '     DO NOT EDIT! -->\n';
      html += '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n';
      html += '<TITLE>Bookmarks</TITLE>\n';
      html += '<H1>Bookmarks</H1>\n';
      html += '<DL><p>\n';
      let flag = true
      function processBookmarks(objeto){
         if(flag){
           html += `    <DT><H3 ADD_DATE="${objeto.date_added}" LAST_MODIFIED="${objeto.date_modified}" PERSONAL_TOOLBAR_FOLDER="true" >${objeto.name}</H3>\n`;
           html += '    <DL><p>\n';
           flag = false;
         }
        objeto.children.forEach((e,i) => {
          if (e.type === 'folder') {
            html += `    <DT><H3 ADD_DATE="${e.date_added}" LAST_MODIFIED="${e.date_modified}" >${e.name}</H3>\n`;
            html += '    <DL><p>\n';
            processBookmarks(e);
            html += '    </DL><p>\n';

        } else if (e.type === 'url') {
          html += `    <DT><A HREF="${e.url}" ADD_DATE="${e.date_added}" LAST_MODIFIED="${e.date_last_used}" ICON="">${e.name}</A>\n`;
        }
        });
      }
      processBookmarks(content.roots.bookmark_bar)
      if (content.roots.other && content.roots.other) {
        html += '<DT><H3>Other</H3>\n';
        html += '    <DL><p>\n';
        processBookmarks(content.roots.other);
        html += '    </DL><p>\n';
      }
    
      html += '</DL><p>\n';
      await fs.promises.writeFile('./bookmarks.html', html)
      
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('The path doesnt exist');
  }
}
generateBookmarkHTML(option)