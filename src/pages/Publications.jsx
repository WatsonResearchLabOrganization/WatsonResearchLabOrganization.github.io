import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import publicationsData from '../data/publications-generated.json'

export default function Publications() {
  const [yearFilter, setYearFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedCitation, setSelectedCitation] = useState(null)
  const [isSticky, setIsSticky] = useState(false)
  const filterRef = useRef(null)
  const sentinelRef = useRef(null)
  
  const years = ['all', ...new Set(publicationsData.map(p => p.year))].sort((a, b) => b - a)
  
  // Get unique publication types
  const types = ['all', ...new Set(publicationsData.flatMap(p => p.publicationTypes || []))]
  
  // Type labels mapping
  const typeLabels = {
    'all': 'All Types',
    'paper-conference': 'Conference Paper',
    'article-journal': 'Journal Article',
    'paper-journal': 'Journal Paper',
    'book': 'Book',
    'manuscript': 'Manuscript'
  }
  
  const filteredPubs = publicationsData.filter(pub => {
    // Year filter
    if (yearFilter !== 'all' && pub.year.toString() !== yearFilter) return false
    
    // Type filter
    if (typeFilter !== 'all' && !pub.publicationTypes?.includes(typeFilter)) return false
    
    // Text search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase()
      const searchableText = [
        pub.title,
        pub.authors,
        pub.venue,
        pub.abstract,
        pub.year.toString()
      ].join(' ').toLowerCase()
      
      if (!searchableText.includes(searchLower)) return false
    }
    
    return true
  })
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )
    
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  const copyCitation = (citation) => {
    navigator.clipboard.writeText(citation)
    alert('Citation copied to clipboard!')
  }

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

      {/* Sentinel for detecting sticky state */}
      <div ref={sentinelRef} className="h-0" />

      {/* Filters */}
      <section 
        ref={filterRef}
        className={`bg-white sticky top-20 z-40 border-b shadow-sm transition-all duration-300 ${
          isSticky ? 'py-3' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex flex-wrap items-center justify-center transition-all duration-300 ${
            isSticky ? 'gap-3' : 'gap-4'
          }`}>
            {/* Search Bar */}
            {!isSticky && (
              <div className="w-full flex justify-center mb-2">
                <div className="relative w-full max-w-2xl">
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search publications by title, author, venue, or keyword..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uva-blue focus:border-transparent outline-none"
                  />
                </div>
              </div>
            )}
            
            {isSticky && (
              <div className="relative flex-1 min-w-[300px] max-w-md">
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-uva-blue focus:border-transparent outline-none"
                />
              </div>
            )}

            {/* Dropdowns with labels */}
            {!isSticky ? (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Year:</label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uva-blue focus:border-transparent outline-none bg-white"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 'all' ? 'All Years' : year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uva-blue focus:border-transparent outline-none bg-white"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {typeLabels[type] || type}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-uva-blue focus:border-transparent outline-none bg-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year === 'all' ? 'All Years' : year}
                    </option>
                  ))}
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-uva-blue focus:border-transparent outline-none bg-white"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {typeLabels[type] || type}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Clear & Results */}
            {(yearFilter !== 'all' || typeFilter !== 'all' || searchText) && (
              <button
                onClick={() => {
                  setYearFilter('all')
                  setTypeFilter('all')
                  setSearchText('')
                }}
                className={`text-uva-blue hover:text-uva-dark font-medium flex items-center gap-1 ${
                  isSticky ? 'text-xs' : 'text-sm'
                }`}
              >
                <svg className={isSticky ? 'w-3 h-3' : 'w-4 h-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {isSticky ? 'Clear' : 'Clear Filters'}
              </button>
            )}
            
            {!isSticky && (
              <div className="w-full text-center text-sm text-gray-600 mt-2">
                Showing {filteredPubs.length} of {publicationsData.length} publications
              </div>
            )}
            
            {isSticky && (
              <span className="text-xs text-gray-500">
                {filteredPubs.length}/{publicationsData.length}
              </span>
            )}
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
                <div className="flex gap-6">
                  {pub.featuredImage && (
                    <div className="flex-shrink-0 w-48 h-48">
                      <img 
                        src={pub.featuredImage} 
                        alt={pub.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                        {pub.date ? new Date(pub.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : pub.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{pub.title}</h3>
                    <p className="text-gray-600 mb-2">{pub.authors}</p>
                    <p className="text-sm text-gray-500 italic mb-4">{pub.venue}</p>
                    
                    {pub.abstract && (
                      <p className="text-gray-600 text-sm mb-4">{pub.abstract}</p>
                    )}

                    <div className="flex flex-wrap gap-3">
                  {pub.pdf && (
                    <a 
                      href={pub.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm bg-uva-blue text-white px-4 py-2 rounded-lg hover:bg-uva-dark transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      PDF
                    </a>
                  )}
                  {pub.poster && (
                    <a 
                      href={pub.poster}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Poster
                    </a>
                  )}
                  {pub.slides && (
                    <a 
                      href={pub.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Slides
                    </a>
                  )}
                  {pub.code && (
                    <a 
                      href={pub.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Code
                    </a>
                  )}
                  {pub.video && (
                    <a 
                      href={pub.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Video
                    </a>
                  )}
                  {pub.dataset && (
                    <a 
                      href={pub.dataset}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      Dataset
                    </a>
                  )}
                  {pub.citation && (
                    <button
                      onClick={() => setSelectedCitation(pub)}
                      className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Cite
                    </button>
                  )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation Modal */}
      <AnimatePresence>
        {selectedCitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCitation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Citation</h3>
                <button
                  onClick={() => setSelectedCitation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">{selectedCitation.title}</h4>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">BibTeX</label>
                <div className="bg-gray-50 rounded-lg p-4 relative">
                  <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap font-mono">
                    {selectedCitation.citation}
                  </pre>
                  <button
                    onClick={() => copyCitation(selectedCitation.citation)}
                    className="absolute top-2 right-2 bg-uva-blue text-white px-3 py-1 rounded text-sm hover:bg-uva-dark transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => copyCitation(selectedCitation.citation)}
                  className="btn-primary flex-1"
                >
                  Copy Citation
                </button>
                <button
                  onClick={() => setSelectedCitation(null)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
