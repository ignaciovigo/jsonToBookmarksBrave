import {ReactNode} from 'react'
import useConverter from '../hook/useConverter'

type Props = {children?: ReactNode}

export default function Btn({ children }: Props) {
  const {convertJsonToHTML} = useConverter()
  const handleClick = () => {
    convertJsonToHTML();
  }
  return (
    <>
    <button className="relative inline-flex h-10 min-h-10 overflow-hidden rounded-full p-[1px] focus:outline-none active:scale-95 group/btn transition-all duration-75 ease-out text-nowrap min-w-fit" onClick={handleClick}>
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#28FF4A_50%,#28FF4A_100%)] group-active/btn:opacity-50" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-4 py-1 text-sm font-normal text-white backdrop-blur-3xl group-active/btn:text-gray-400">
            {children}
        </span>
      </button>

    </>
  )
}