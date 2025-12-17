import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import teamData from '../data/team-generated.json'

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null)

  const groupedTeam = teamData.reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = []
    acc[member.role].push(member)
    return acc
  }, {})

  const roleOrder = ['Faculty', 'PhD Students', 'MS Students', 'Undergraduate Students', 'Alumni']

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-uva-blue to-uva-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-3"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-100"
          >
            Meet the researchers advancing wearable health technology
          </motion.p>
        </div>
      </section>

      {/* Team Members */}
      {roleOrder.map((role, roleIndex) => {
        if (!groupedTeam[role]) return null
        
        return (
          <section key={role} className={roleIndex % 2 === 0 ? 'section-padding bg-white' : 'section-padding bg-gray-50'}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-center text-uva-blue mb-12">{role}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedTeam[role].map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-uva-light to-uva-blue flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-6xl text-white">👤</div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 text-gray-900">{member.name}</h3>
                      <p className="text-uva-blue text-sm font-medium mb-2">{member.title}</p>
                      
                      {member.bio && (
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{member.bio}</p>
                      )}

                      {member.interests && member.interests.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {member.interests.slice(0, 3).map((interest, i) => (
                              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {interest}
                              </span>
                            ))}
                            {member.interests.length > 3 && (
                              <span className="text-xs text-gray-400">+{member.interests.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 justify-center">
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="text-gray-600 hover:text-uva-blue transition-colors"
                            title="Email"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        )}
                        {member.website && (
                          <a 
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-uva-blue transition-colors"
                            title="Personal Website"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        )}
                        {member.linkedin && (
                          <a 
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-uva-blue transition-colors"
                            title="LinkedIn"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Join CTA */}
      <section className="section-padding bg-uva-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 text-gray-100">
            We're looking for motivated PhD students interested in wearable health technology
          </p>
          <a href="/contact" className="btn-primary bg-white text-uva-blue hover:bg-gray-100">
            Learn About Opportunities
          </a>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black bg-opacity-50 rounded-full p-2 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="aspect-[3/1] bg-gradient-to-br from-uva-light to-uva-blue flex items-center justify-center overflow-hidden">
                  {selectedMember.image ? (
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name}
                      className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <div className="text-6xl text-gray-400">👤</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                  <p className="text-xl text-uva-blue font-medium">{selectedMember.title}</p>
                  {selectedMember.organization && (
                    <p className="text-gray-600 mt-2">
                      {selectedMember.organization.department && `${selectedMember.organization.department}, `}
                      {selectedMember.organization.name}
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-8">
                  {selectedMember.email && (
                    <a 
                      href={`mailto:${selectedMember.email}`}
                      className="text-gray-600 hover:text-uva-blue transition-colors"
                      title="Email"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                  {selectedMember.website && (
                    <a 
                      href={selectedMember.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-uva-blue transition-colors"
                      title="Personal Website"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                  {selectedMember.scholar && (
                    <a 
                      href={selectedMember.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-uva-blue transition-colors"
                      title="Google Scholar"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
                      </svg>
                    </a>
                  )}
                  {selectedMember.github && (
                    <a 
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-uva-blue transition-colors"
                      title="GitHub"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {selectedMember.twitter && (
                    <a 
                      href={selectedMember.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-uva-blue transition-colors"
                      title="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a 
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-uva-blue transition-colors"
                      title="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Biography */}
                {selectedMember.fullBio && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Biography</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedMember.fullBio}</p>
                  </div>
                )}

                {/* Education */}
                {selectedMember.education && selectedMember.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
                    <div className="space-y-3">
                      {selectedMember.education.map((edu, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-uva-blue mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">
                              {edu.degree}
                              {edu.status === 'current' && <span className="ml-2 text-sm text-uva-blue">(Current)</span>}
                            </p>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-500">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Research Interests */}
                {selectedMember.interests && selectedMember.interests.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Research Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.interests.map((interest, i) => (
                        <span key={i} className="bg-uva-light text-uva-blue px-4 py-2 rounded-full text-sm font-medium">
                          {interest}
                        </span>
                      ))}
                    </div>
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
