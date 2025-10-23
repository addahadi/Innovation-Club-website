import { Target } from "lucide-react"



export default function WhoWeAre({
    language
} : {
    language : Record<string , any>
}) {
    return (
         <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-8">
            {language.title}
          </h2>
          
          <p className="text-2xl text-gray-400 mb-8 leading-relaxed ">
            {
              language.content
            }
          </p>

        </div>
      </section>
    )
}