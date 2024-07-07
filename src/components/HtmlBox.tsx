import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'

type Props = {
  type: string;
}

export default function HtmlBox({ type }: Props) {
  const [fileContent, setfileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];
    if(file){
      setFileName(file.name)

      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target?.result){
          const content = e.target.result as string
          setfileContent(content)
        }
      }
      reader.readAsText(file)
    }
  }
  return (
    <>

<div className='w-full h-full max-h-[600px] flex flex-col'>
    <div className="flex items-center border justify-between px-3 py-2 border-b rounded-t-md border-green-900">
      <div className="flex flex-wrap items-center sm:divide-x sm:rtl:divide-x-reverse divide-green-600">
        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
          <button
            type="button"
            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
  className="w-4 h-4"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width={24}
  height={24}
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path
    fillRule="evenodd"
    d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
    clipRule="evenodd"
  />
  <path
    fillRule="evenodd"
    d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
    clipRule="evenodd"
  />
</svg>


            <span className="sr-only">Format code</span>
          </button>
         
        </div>
      </div>
    </div>
    {/*  */}
<Editor  className='w-full h-full max-h-[600px]' path={fileName} value={fileContent} theme='vs-dark' defaultLanguage={type} defaultValue="<!-- some comment -->" />
</div>

  </>
  )
}