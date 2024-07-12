export default function Loading() {
  return (
    <main className="flex min-h-screen bg-gray-950 w-full flex-col items-center">
      <header className="h-20 bg-gray-850 w-full ">
        <div className="container mx-auto flex items-center h-full justify-between">
          <h1 className="text-3xl font-bold text-white"></h1>

          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex flex-col items-end border-r border-newBlue-100 pr-2"></div>
          </div>
        </div>
      </header>

      <section className="w-full h-[500px]">
        <div className="relative h-full top-0"></div>
      </section>
      <div className="w-full ">
        <div className="container mx-auto">
          <div className="w-full bg-gray-850 relative -mt-28  z-20  p-10 rounded-lg">
            {/* <FolderFilter /> */}
            <div className="flex items-center border-gray-500 gap-4 border-b-2 pb-4 ">
              {[1, 2, 3].map((value) => (
                <div key={value}></div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                <button
                  key={value}
                  className="w-full h-[260px] overflow-hidden rounded-md"
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
