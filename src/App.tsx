import Container from "./components/Container"
import TypewriterTitle from "./components/TypewriterTitle"

function App() {
  return (
    <>
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
