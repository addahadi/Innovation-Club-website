import { Target } from "lucide-react"



export default function WhoWeAre({
    language
} : {
    language : Record<string , any>
}) {
    return (
         <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-8">Who We Are</h2>
          
          <p className="text-xl text-gray-400 mb-8 leading-relaxed ">
            We are a team of passionate innovators dedicated to creating meaningful solutions that 
            transform how people work and connect. Founded with a vision to make technology accessible 
            and impactful, we've grown into a dynamic organization committed to excellence.
          </p>

          {/* Three Column Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Mission Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Our Mission</h3>
              <p className="text-gray-600 text-center">
                To empower businesses and individuals by providing innovative solutions that drive 
                growth and foster meaningful connections in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}