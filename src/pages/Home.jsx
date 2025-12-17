import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import newsData from '../data/news-generated.json'
import publicationsData from '../data/publications-generated.json'

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [selectedCitation, setSelectedCitation] = useState(null)
  
  // Videos from public/videos folder - add more videos here to auto-include them
  const videos = [
    { src: '/videos/voltera.mp4', type: 'video/mp4' }
  ]
  
  // Sponsors with their logos from research folders
  const sponsors = [
    { name: 'National Institutes of Health', logo: '/research/2025_nih_vipc/featured.png' },
    { name: 'Coulter Foundation', logo: '/research/2024_coulter/featured.png' },
    { name: 'UVA School of Data Science', logo: '/research/2025_sds/featured.png' },
    { name: 'Research Innovation Award', logo: '/research/2024_ria/featured.png' }
  ]
  
  // Get recent news (top 3)
  const recentNews = newsData.slice(0, 3)
  
  // Get recent publications (top 3)
  const recentPublications = publicationsData.slice(0, 3)
  
  // Auto-rotate videos every 10 seconds if there are multiple
  useEffect(() => {
    if (videos.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [videos.length])

  const copyCitation = (citation) => {
    navigator.clipboard.writeText(citation)
    alert('Citation copied to clipboard!')
  }
  
  return (
    <div>
      {/* Hero Section with Video Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {videos.map((video, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src={video.src} type={video.type} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
          </div>
        ))}
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Watson Research Lab
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Advancing Wearable Health Technology at the University of Virginia
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/research" className="btn-primary">
              Explore Our Research
            </Link>
            <Link to="/team" className="btn-secondary bg-white text-uva-blue hover:bg-gray-100 border-white">
              Meet the Team
            </Link>
            <Link to="/contact" className="btn-secondary bg-white text-uva-blue hover:bg-gray-100 border-white">
              Get in Touch
            </Link>
          </motion.div>
        </div>
        
        {/* Video indicators */}
        {videos.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentVideoIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
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

      {/* Sponsors */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-uva-blue mb-12">Supported By</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="w-full h-32 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  title={sponsor.name}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-uva-blue mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Watson Research Lab develops innovative wearable technology and biosensors 
              that make continuous health monitoring accessible, accurate, and equitable for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recent News */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-uva-blue">Recent News</h2>
            <Link to="/news" className="text-uva-blue hover:text-uva-dark font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                {item.image && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                  {item.summary && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-uva-blue">Recent Publications</h2>
            <Link to="/publications" className="text-uva-blue hover:text-uva-dark font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                {pub.featuredImage && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img 
                      src={pub.featuredImage} 
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1">{pub.title}</h3>
                    <span className="text-sm font-semibold text-uva-blue bg-blue-50 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                      {pub.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pub.authors}</p>
                  <div className="flex flex-wrap gap-2">
                    {pub.pdf && (
                      <a 
                        href={pub.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-uva-blue text-white px-3 py-1.5 rounded hover:bg-uva-dark transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        Dataset
                      </a>
                    )}
                    {pub.citation && (
                      <button
                        onClick={() => setSelectedCitation(pub)}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Cite
                      </button>
                    )}
                    {pub.project && (
                      <a 
                        href={pub.project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Project
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
