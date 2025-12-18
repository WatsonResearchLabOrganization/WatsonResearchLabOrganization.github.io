import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import grantsData from '../data/research-generated.json'
import ReactMarkdown from 'react-markdown'

export default function Research() {
  const [selectedGrant, setSelectedGrant] = useState(null)
  
  // Format date as "Month YYYY"
  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  
  // Separate current and past grants based on dates
  const { currentGrants, pastGrants } = useMemo(() => {
    const now = new Date()
    const current = []
    const past = []
    
    grantsData.forEach(grant => {
      let isCurrent = true
      
      if (grant.endDate) {
        // Has explicit end date - check if it's in the future
        let endDate
        if (grant.endDate.includes('/')) {
          const [month, year] = grant.endDate.split('/')
          endDate = new Date(year, parseInt(month) - 1)
        } else {
          endDate = new Date(grant.endDate)
        }
        
        isCurrent = endDate >= now
      } else if (grant.startDate) {
        // No end date, but has start date - check if start is in the future
        const startDate = new Date(grant.startDate)
        isCurrent = startDate >= now
      }
      
      if (isCurrent) {
        current.push(grant)
      } else {
        past.push(grant)
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
            <h2 className="text-center text-uva-blue mb-12">Active Research Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentGrants.map((grant, index) => (
                <motion.div
                  key={grant.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedGrant(grant)}
                  className="card p-6 cursor-pointer hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  {grant.image && (
                    <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={grant.image} 
                        alt={grant.title}
                        className="w-full h-48 object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Agency */}
                  {grant.agencies && grant.agencies.length > 0 && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                        {grant.agencies[0]}
                      </span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2">{grant.title}</h3>
                  
                  {/* End Date */}
                  {grant.endDate && (
                    <div className="mb-3 flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">{formatDate(grant.endDate)}</span>
                    </div>
                  )}
                  
                  {/* Summary */}
                  {grant.summary && (
                    <p className="text-sm text-gray-600 line-clamp-3">{grant.summary}</p>
                  )}
                  
                  {/* Click to learn more */}
                  <div className="mt-4 text-uva-blue text-sm font-medium">
                    Click to learn more →
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastGrants.map((grant, index) => (
                <motion.div
                  key={grant.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedGrant(grant)}
                  className="card p-6 cursor-pointer hover:shadow-xl transition-shadow opacity-75"
                >
                  {/* Image */}
                  {grant.image && (
                    <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={grant.image} 
                        alt={grant.title}
                        className="w-full h-48 object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Agency */}
                  {grant.agencies && grant.agencies.length > 0 && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {grant.agencies[0]}
                      </span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 text-gray-700 line-clamp-2">{grant.title}</h3>
                  
                  {/* End Date */}
                  {grant.endDate && (
                    <div className="mb-3 flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">{formatDate(grant.endDate)}</span>
                    </div>
                  )}
                  
                  {/* Summary */}
                  {grant.summary && (
                    <p className="text-sm text-gray-500 line-clamp-3">{grant.summary}</p>
                  )}
                  
                  {/* Click to learn more */}
                  <div className="mt-4 text-gray-600 text-sm font-medium">
                    Click to learn more →
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedGrant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGrant(null)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
            >
              {/* Modal Header with Image */}
              {selectedGrant.image && (
                <div className="w-full h-64 bg-gray-100 overflow-hidden rounded-t-xl">
                  <img 
                    src={selectedGrant.image} 
                    alt={selectedGrant.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              {/* Modal Content */}
              <div className="p-8">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedGrant(null)}
                  className="float-right text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
                
                {/* Agencies and Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedGrant.agencies && selectedGrant.agencies.map((agency, i) => (
                    <span key={i} className="text-xs font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                      {agency}
                    </span>
                  ))}
                  {selectedGrant.tags && selectedGrant.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* End Date */}
                {selectedGrant.endDate && (
                  <div className="mb-4 flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-base font-medium">{formatDate(selectedGrant.endDate)}</span>
                  </div>
                )}
                
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedGrant.title}</h2>
                
                {/* Summary */}
                {selectedGrant.summary && (
                  <p className="text-lg text-gray-700 mb-6 italic">{selectedGrant.summary}</p>
                )}
                
                {/* Authors */}
                {selectedGrant.authors && selectedGrant.authors.length > 0 && (
                  <div className="mb-6 pb-6 border-b">
                    <h4 className="font-semibold text-gray-900 mb-2">Research Team</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedGrant.authors.map((author, i) => (
                        <span key={i} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                          {author}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Description with Markdown */}
                {selectedGrant.description && (
                  <div className="prose prose-sm max-w-none text-gray-600 mb-6">
                    <ReactMarkdown
                      components={{
                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-2 mb-4" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-600" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />
                      }}
                    >
                      {selectedGrant.description}
                    </ReactMarkdown>
                  </div>
                )}
                
                {/* Funding Amount */}
                {selectedGrant.amount && (
                  <div className="text-sm text-gray-700 mt-6 pt-6 border-t">
                    <strong>Funding:</strong> {selectedGrant.amount}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
