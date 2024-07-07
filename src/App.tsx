import { ToastContainer } from "react-toastify"
import Container from "./components/Container"
ToastContainer
import TypewriterTitle from "./components/TypewriterTitle"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
     <ToastContainer  closeOnClick autoClose={2000} theme="dark" className="text-xs font-normal" limit={5} />
      <main className="flex w-full h-full flex-col items-center justify-start py-16 gap-3 ">
      <h1 className={`text-3xl sm:text-4xl md:text-5xl max-w-xs md:max-w-full text-white text-balance font-semibold text-center`}>
        bookmarks.json <span className='text-green-600 font-bold drop-shadow-[0px_0px_10px]'>converter to</span> HTML Bookmars
      </h1>
      <h2>
      <TypewriterTitle />
      </h2>
        <Container />
      </main>
    </>
  )
}

export default App
