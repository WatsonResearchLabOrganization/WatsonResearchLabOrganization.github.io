import { motion } from 'framer-motion'
import newsData from '../data/news.json'

export default function News() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-uva-blue to-uva-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            News & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100"
          >
            Latest achievements and announcements from the lab
          </motion.p>
        </div>
      </section>

      {/* News Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {newsData.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 relative pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-uva-blue rounded-full border-4 border-white shadow"></div>
                
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-uva-blue">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  {item.category && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.content}</p>

                {item.image && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {item.link && (
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-uva-blue font-medium hover:text-uva-dark"
                  >
                    Read more →
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
