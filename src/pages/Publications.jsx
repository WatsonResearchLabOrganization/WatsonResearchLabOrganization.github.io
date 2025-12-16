import { useState } from 'react'
import { motion } from 'framer-motion'
import publicationsData from '../data/publications.json'

export default function Publications() {
  const [filter, setFilter] = useState('all')
  
  const years = ['all', ...new Set(publicationsData.map(p => p.year))].sort((a, b) => b - a)
  
  const filteredPubs = filter === 'all' 
    ? publicationsData 
    : publicationsData.filter(p => p.year.toString() === filter)

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
            Publications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100"
          >
            {publicationsData.length}+ peer-reviewed publications in top-tier venues
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 sticky top-20 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setFilter(year)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === year
                    ? 'bg-uva-blue text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year === 'all' ? 'All Years' : year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {filteredPubs.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                    {pub.year}
                  </span>
                  <span className="text-sm text-gray-500">{pub.venue}</span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-900">{pub.title}</h3>
                <p className="text-gray-600 mb-3">{pub.authors}</p>
                
                {pub.abstract && (
                  <p className="text-gray-600 text-sm mb-4">{pub.abstract}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  {pub.pdf && (
                    <a 
                      href={pub.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm bg-uva-blue text-white px-4 py-2 rounded-lg hover:bg-uva-dark transition-colors"
                    >
                      📄 PDF
                    </a>
                  )}
                  {pub.slides && (
                    <a 
                      href={pub.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      📊 Slides
                    </a>
                  )}
                  {pub.code && (
                    <a 
                      href={pub.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      💻 Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
