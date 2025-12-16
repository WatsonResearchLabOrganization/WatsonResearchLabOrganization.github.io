import { motion } from 'framer-motion'
import grantsData from '../data/grants.json'

export default function Research() {
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
              '🔬 Wearable Biosensors',
              '🎨 Equitable Health Tech',
              '💉 Glucose Monitoring',
              '🏃 Athletic Performance',
              '🤖 Machine Learning',
              '📡 IoT Medical Devices'
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

      {/* Active Grants */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-uva-blue mb-12">Active Research Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {grantsData.map((grant, index) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm font-semibold text-uva-blue bg-blue-50 px-3 py-1 rounded-full">
                      {grant.agency}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{grant.duration}</span>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{grant.title}</h3>
                <p className="text-gray-600 mb-4">{grant.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {grant.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {grant.amount && (
                  <div className="text-sm text-gray-600 mt-4 pt-4 border-t">
                    <strong>Funding:</strong> {grant.amount}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
