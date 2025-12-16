import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import newsData from '../data/news-generated.json'

export default function News() {
  const [yearFilter, setYearFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef(null)
  
  const years = ['all', ...new Set(newsData.map(n => n.year))].sort((a, b) => b - a)
  
  const filteredNews = newsData.filter(item => {
    // Year filter
    if (yearFilter !== 'all' && item.year.toString() !== yearFilter) return false
    
    // Text search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase()
      const searchableText = [
        item.title,
        item.summary,
        item.category,
        item.year.toString()
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

      {/* Sentinel for detecting sticky state */}
      <div ref={sentinelRef} className="h-0" />

      {/* Filters */}
      <section 
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
                    placeholder="Search news by title, summary, or keyword..."
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
                  placeholder="Search news..."
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
              </>
            )}

            {/* Clear & Results */}
            {(yearFilter !== 'all' || searchText) && (
              <button
                onClick={() => {
                  setYearFilter('all')
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
                Showing {filteredNews.length} of {newsData.length} news items
              </div>
            )}
            
            {isSticky && (
              <span className="text-xs text-gray-500">
                {filteredNews.length}/{newsData.length}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* News Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredNews.map((item, index) => (
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
                {item.summary && (
                  <div 
                    className="text-gray-600 mb-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.summary.replace(/\[Link to Article\.\]\((.*?)\)/, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-uva-blue hover:text-uva-dark">Link to Article.</a>') }}
                  />
                )}

                {item.image && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-auto object-contain"
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
