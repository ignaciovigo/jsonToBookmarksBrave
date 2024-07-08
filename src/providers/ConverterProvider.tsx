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

        function processBookmarks(folder) {
          folder.children?.forEach(bookmark => {
            if (bookmark.type === 'folder') {
              html += `    <DT><H3 ADD_DATE="${bookmark.date_added}" LAST_MODIFIED="${bookmark.date_modified}">${bookmark.name}</H3>\n`;
              html += '    <DL><p>\n';
              processBookmarks(bookmark); // recursive call to processa subfolders
              html += '    </DL><p>\n';
            } else if (bookmark.type === 'url') {
              html += `    <DT><A HREF="${bookmark.url}" ADD_DATE="${bookmark.date_added}" LAST_MODIFIED="${bookmark.date_last_used}" ICON="">${bookmark.name}</A>\n`;
            }
          });
        }

        // Process the folder bookmar_bar
        if (jsonContent.roots.bookmark_bar) {
          html += `    <DT><H3 ADD_DATE="${jsonContent.roots.bookmark_bar.date_added}" LAST_MODIFIED="${jsonContent.roots.bookmark_bar.date_modified}" PERSONAL_TOOLBAR_FOLDER="true">${jsonContent.roots.bookmark_bar.name}</H3>\n`;
          html += '    <DL><p>\n';
          processBookmarks(jsonContent.roots.bookmark_bar);
          html += '    </DL><p>\n';
        }

        // Process other folders if they exist
        Object.keys(jsonContent.roots).forEach(rootKey => {
          if (rootKey !== 'bookmark_bar' && jsonContent.roots[rootKey].children) {
            html += `    <DT><H3>${jsonContent.roots[rootKey].name}</H3>\n`;
            html += '    <DL><p>\n';
            processBookmarks(jsonContent.roots[rootKey]);
            html += '    </DL><p>\n';
          }
        });

        html += '</DL><p>\n';
        setHtmlContent(html);
      } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
          toast("The JSON file must match with the bookmark.json brave structure", { type: 'error' });
        } else {
          toast(error.message, { type: 'error' });
        }
      }
    };

    const updateJson = (content: string) => {
      try {
        setJsonContent(JSON.parse(content))
      } catch (error) {

      }
    }
    const values = {updateJson, convertJsonToHTML, htmlContent, jsonContent}
  return (
    <convertContext.Provider value={values}>
      {children}
    </convertContext.Provider>
  )
}