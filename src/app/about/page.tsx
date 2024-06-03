"use client"

export default function AboutPage() {
    return (
        <div className='mb-10'>
      <section id="hero">
        <div
          className="flex flex-col-reverse items-center space-y-0 md:space-y-0 md:flex-row"
        >
          <div className="w-full">
            <div className="relative max-w ">
              <img className='h-full w-screen object-cover rounded-md' src='https://user-images.githubusercontent.com/36345325/78325084-81350300-752b-11ea-8571-032ed04b3018.png' alt="sce collage" />
              <div className="absolute inset-0 bg-gray-900 opacity-80 rounded-md">

              </div>
              <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                <h1
                  className="w-1/2 text-xl md:text-4xl font-bold text-left px-5 md:px-10"
                >
                  The Next Frontier of Innovation at San José State.
                </h1>
                <h3 className="w-1/2 text-left text-xs md:text-lg font-bold px-5 md:px-10">
                  The Software and Computer Engineering Society aims
                  to provide students with sense of community, industry-relevant
                  experience and mentorship.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}