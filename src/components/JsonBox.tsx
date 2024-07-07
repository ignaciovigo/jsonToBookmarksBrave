import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import useConverter from '../hook/useConverter';

type Props = {
  type: string;
}

export default function JsonBox({ type }: Props) {
  const [fileContent, setfileContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("")
  const { updateJson } = useConverter()
  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];
    if(file){
      setFileName(file.name)

      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target?.result){
          const content = e.target.result as string
          setfileContent(content)
          updateJson(content)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleChange:React.ChangeEventHandler<HTMLElement> = (value) => {
      updateJson(value)
  }

  const handleEditorValidation = (markers) => {
    if(markers.length == 0){
      setError("")
    } else{
      setError(markers[0]?.message)
    }
  }
  return (
    <>

<div className='w-full h-full max-h-[600px] flex flex-col'>
    <div className="flex items-center border justify-between px-3 py-2 border-b rounded-t-md border-green-900">
      <div className="flex flex-wrap items-center sm:divide-x sm:rtl:divide-x-reverse divide-green-600">
        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
          <label
          htmlFor='file'
            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 20"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
              />
            </svg>
            <span className="ml-2 sr-only">Attach JSON file</span>
            <input type="file" accept='.json' name='file' id='file' hidden onChange={handleFileSelect}/>
          </label>
          <p id="error" className='text-xs text-red-600'>
            {error? error : ""}
          </p>
        </div>
      </div>
    </div>
<Editor  className='w-full h-full max-h-[600px]' onValidate={handleEditorValidation} path={fileName} value={fileContent} theme='vs-dark' defaultLanguage={type} onChange={handleChange} defaultValue={`{\n"comment": "some comment"\n}`} />
</div>

  </>
  )
}