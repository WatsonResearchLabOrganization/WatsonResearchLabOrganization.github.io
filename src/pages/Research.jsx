import { motion } from 'framer-motion'
import { useMemo } from 'react'
import grantsData from '../data/research-generated.json'

export default function Research() {
  // Separate current and past grants based on end date
  const { currentGrants, pastGrants } = useMemo(() => {
    const now = new Date()
    const current = []
    const past = []
    
    grantsData.forEach(grant => {
      if (grant.endDate) {
        // Parse end date (handle MM/YYYY or YYYY-MM-DD formats)
        let endDate
        if (grant.endDate.includes('/')) {
          const [month, year] = grant.endDate.split('/')
          endDate = new Date(year, parseInt(month) - 1)
        } else {
          endDate = new Date(grant.endDate)
        }
        
        if (endDate >= now) {
          current.push(grant)
        } else {
          past.push(grant)
        }
      } else {
        // No end date means ongoing
        current.push(grant)
      }
    })
    
    return { currentGrants: current, pastGrants: past }
  }, [])
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-uva-blue to-uva-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            Research
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-100 max-w-3xl"
          >
            Advancing wearable health technology through innovative, funded research
          </motion.p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-uva-blue mb-12">Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              '⌚ Wearable Technology',
              '🏥 Smart Health',
              '🔬 Wearable Biosensors',
              '🏃 High Performance Athletics',
              '🤖 Machine Learning',
              '📡 Internet of Medical Things'
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-6 text-center hover:border-uva-blue border-2 border-transparent transition-all"
              >
                <span className="text-4xl mb-2 block">{area.split(' ')[0]}</span>
                <h4 className="text-gray-900">{area.substring(2)}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Grants */}
      {currentGrants.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-uva-blue mb-12">Current Research Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentGrants.map((grant, index) => (
                <motion.div
                  key={grant.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-8"
                >
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {grant.agencies && grant.agencies.length > 0 ? (
                        grant.agencies.map((agency, i) => (
                          <span key={i} className="text-xs font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                            {agency}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                          {grant.agency}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{grant.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{grant.title}</h3>
                  {grant.description && (
                    <p className="text-gray-600 mb-4">{grant.description}</p>
                  )}
                  
                  {grant.tags && grant.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {grant.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {grant.amount && (
                    <div className="text-sm text-gray-600 mt-4 pt-4 border-t">
                      <strong>Funding:</strong> {grant.amount}
                    </div>
                  )}
                  
                  {grant.image && (
                    <div className="mt-4 bg-gray-200 rounded-lg p-4">
                      <img 
                        src={grant.image} 
                        alt={grant.title}
                        className="w-full h-48 object-contain rounded-lg"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Grants */}
      {pastGrants.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-gray-600 mb-12">Past Research Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pastGrants.map((grant, index) => (
                <motion.div
                  key={grant.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-8 opacity-75"
                >
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {grant.agencies && grant.agencies.length > 0 ? (
                        grant.agencies.map((agency, i) => (
                          <span key={i} className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {agency}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {grant.agency}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{grant.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">{grant.title}</h3>
                  {grant.description && (
                    <p className="text-gray-500 mb-4">{grant.description}</p>
                  )}
                  
                  {grant.tags && grant.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {grant.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {grant.amount && (
                    <div className="text-sm text-gray-500 mt-4 pt-4 border-t">
                      <strong>Funding:</strong> {grant.amount}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Collaboration CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-uva-blue mb-6">Collaborate With Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            We welcome collaborations with academic researchers, industry partners, 
            healthcare providers, and government agencies.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us About Collaboration
          </a>
        </div>
      </section>
    </div>
  )
}
