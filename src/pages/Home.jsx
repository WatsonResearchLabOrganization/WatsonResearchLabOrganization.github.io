import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  // Major sponsors/funders
  const sponsors = [
    { name: 'National Institutes of Health', abbr: 'NIH' },
    { name: 'National Science Foundation', abbr: 'NSF' },
    { name: 'Coulter Foundation', abbr: 'Coulter' },
    { name: 'UVA School of Data Science', abbr: 'SDS' }
  ]
  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/videos/voltera.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        
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
            <Link to="/contact" className="btn-secondary bg-white/10 hover:bg-white border-white">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-uva-blue mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Watson Research Lab develops innovative wearable technology and biosensors 
              that make continuous health monitoring accessible, accurate, and equitable for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏥',
                title: 'Smart Health',
                description: 'Non-invasive biosensing technology for continuous health monitoring'
              },
              {
                icon: '⚡',
                title: 'Real-Time Monitoring',
                description: 'Advanced signal processing and machine learning for instant insights'
              },
              {
                icon: '🌍',
                title: 'Equitable Technology',
                description: 'Sensors that work accurately across diverse populations'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-uva-blue mb-12">Research Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Continuous Glucose Monitoring',
                description: 'Non-invasive CGM technology through Luminosity Wearables',
                link: '/research'
              },
              {
                title: 'Skin Tone-Aware Sensing',
                description: 'Equitable biosensors that work accurately for all skin tones',
                link: '/research'
              },
              {
                title: 'Athletic Performance',
                description: 'Wearables for high-performance sports monitoring',
                link: '/research'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 border-l-4 border-uva-blue"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link to={item.link} className="text-uva-blue font-medium hover:text-uva-dark">
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/research" className="btn-primary">
              View All Research Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-uva-blue mb-6">Supported By</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Our research is generously supported by federal agencies, foundations, and industry partners
          </p>
          
          <div className={`grid grid-cols-2 md:grid-cols-${Math.min(sponsors.length, 4)} gap-8 items-center`}>
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gray-100 rounded-lg p-8 h-32 flex items-center justify-center mb-3 hover:bg-gray-200 transition-colors">
                  <span className="text-2xl font-bold text-gray-400">{sponsor.abbr}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{sponsor.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-uva-blue to-uva-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 text-gray-100">
            We're always looking for talented students and collaborators passionate about wearable health technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/team" className="btn-primary bg-white text-uva-blue hover:bg-gray-100">
              Meet the Team
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-uva-blue">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
