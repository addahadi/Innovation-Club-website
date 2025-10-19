



function About({
  language
} : {
  language : Record<string , any>
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-neutral-950 p-12 flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-8">{language.Get_to.title}</h1>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {language.Get_to.left_content}
          </p>

          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src="../../../public/about1.jpg"
              alt="Innovation Team"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="bg-neutral-950 p-12 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center mb-8">
            <img
              src="../../../public/about2.jpg"
              alt="Innovation Team"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {language.Get_to.right_content}
            </p>

            <button className="border border-green-500 text-green-400 px-8 py-3 rounded hover:bg-green-700 hover:border-green-400 transition cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;