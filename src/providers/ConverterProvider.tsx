import React, { ContextType, createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify';


export const convertContext = createContext();
export default function ConverterProvider({children}: {children:ReactNode}) {
    const [jsonContent, setJsonContent] = useState<string | any>("");
    const [htmlContent, setHtmlContent] = useState<string | any>("");
    
    const convertJsonToHTML = () => {
      try {
        
      
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
      processBookmarks(jsonContent.roots.bookmark_bar)
      if (jsonContent.roots.other && jsonContent.roots.other) {
        html += '<DT><H3>Other</H3>\n';
        html += '    <DL><p>\n';
        processBookmarks(jsonContent.roots.other);
        html += '    </DL><p>\n';
      }
    
      html += '</DL><p>\n';
      setHtmlContent(html)

    } catch (error) {
      console.log(error);
      if( error instanceof TypeError){
        toast("The json file must match with the bookmark.json structure",{type:'error'})
      }else{
        toast(error.message,{type:'error'})}       
      }
    }

    const updateJson = (content: string) => {
      setJsonContent(JSON.parse(content))
    }
    const values = {updateJson, convertJsonToHTML, htmlContent}
  return (
    <convertContext.Provider value={values}>
      {children}
    </convertContext.Provider>
  )
}