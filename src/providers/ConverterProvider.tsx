import React, { ContextType, createContext, ReactNode, useState } from 'react'


const convertContext = createContext();
}
export default function ConverterProvider({children}: {children:ReactNode}) {
    const [jsonContent, setJsonContent] = useState<string>("");
    const [htmlContent, setHtmlContent] = useState<string>("");

    const convertJsonToHTML = () => {

    }

    const updateJson = (content: string) => {
      setJsonContent(content) 
    }
    const values = {updateJson}
  return (
    <convertContext.Provider value={values}>
      {children}
    </convertContext.Provider>
  )
}