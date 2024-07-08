import { Editor } from "@monaco-editor/react";
import * as React from "react";
import { toast } from "react-toastify";
import useConverter from "../hook/useConverter";

type Props = {
  type: string;
};

export default function HtmlBox({ type }: Props) {
  const { htmlContent } = useConverter();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: "text/hmtl" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "bookmarks.html";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } else {
      toast("HTML empty", { type: "error" });
    }
  };
  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (htmlContent) {
      navigator.clipboard.writeText(htmlContent);
      toast("HTML copied", { type: "success" });
    } else {
      toast("HTML empty", { type: "error" });
    }
  };
  return (
    <>
      <div className="w-full h-full max-h-[600px] flex flex-col">
        <div className="flex items-center border justify-between px-3 py-2 border-b rounded-t-md border-green-900">
          <div className="flex flex-wrap items-center sm:divide-x sm:rtl:divide-x-reverse divide-green-600">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <button
                onClick={handleCopy}
                className="p-2 flex gap-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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

                <span className="text-xs">Copy to clipboard</span>
              </button>
              <button
                type="button"
                className="p-2 flex gap-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleClick}
              >
                <svg
                  className="w-4 h-4 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs">Download HTML</span>
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <Editor
          className="w-full h-full max-h-[600px]"
          path={"bookmarks.html"}
          value={htmlContent}
          theme="vs-dark"
          defaultLanguage={type}
          defaultValue="<!-- some comment -->"
        />
      </div>
    </>
  );
}
