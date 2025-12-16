import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicationsDir = path.join(__dirname, '../public/publications')
const outputFile = path.join(__dirname, '../src/data/publications-generated.json')

// Parse author names to display format
const parseAuthorName = (author) => {
  if (author === 'admin') return 'Amanda Watson'
  return author.replace(/_/g, ' ')
}

const generatePublications = () => {
  const publications = []
  
  // Get all publication folders
  const folders = fs.readdirSync(publicationsDir).filter(file => {
    return fs.statSync(path.join(publicationsDir, file)).isDirectory()
  })
  
  folders.forEach(folder => {
    try {
      const folderPath = path.join(publicationsDir, folder)
      
      // Read index.md
      const indexPath = path.join(folderPath, 'index.md')
      if (!fs.existsSync(indexPath)) {
        console.warn(`No index.md found for ${folder}`)
        return
      }
      
      const mdContent = fs.readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(mdContent)
      
      // Read citation if exists
      let citation = null
      const citePath = path.join(folderPath, 'cite.bib')
      if (fs.existsSync(citePath)) {
        citation = fs.readFileSync(citePath, 'utf-8')
      }
      
      // Extract year from date
      const year = data.date ? new Date(data.date).getFullYear() : new Date().getFullYear()
      
      // Check for featured image
      const featuredImagePath = path.join(folderPath, 'featured.jpg')
      const featuredPngPath = path.join(folderPath, 'featured.png')
      let featuredImage = null
      if (fs.existsSync(featuredImagePath)) {
        featuredImage = `/publications/${folder}/featured.jpg`
      } else if (fs.existsSync(featuredPngPath)) {
        featuredImage = `/publications/${folder}/featured.png`
      }
      
      // Build publication object
      publications.push({
        id: folder,
        title: data.title,
        authors: data.authors ? data.authors.map(parseAuthorName).join(', ') : '',
        venue: data.publication || '',
        year: year,
        date: data.date,
        publicationTypes: data.publication_types || [],
        abstract: content.trim() || '',
        pdf: data.url_pdf || `/publications/${folder}/${folder}.pdf`,
        poster: data.url_poster || '',
        slides: data.url_slides || '',
        code: data.url_code || '',
        citation: citation,
        featuredImage: featuredImage,
        folder: folder
      })
      
      console.log(`✓ Processed ${folder}`)
    } catch (error) {
      console.error(`✗ Error processing ${folder}:`, error.message)
    }
  })
  
  // Sort by date (newest first)
  publications.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0)
    const dateB = b.date ? new Date(b.date) : new Date(0)
    return dateB - dateA
  })
  
  // Write to JSON file
  fs.writeFileSync(outputFile, JSON.stringify(publications, null, 2))
  console.log(`\n✓ Generated ${publications.length} publications to ${outputFile}`)
}

generatePublications()
