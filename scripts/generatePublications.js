import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicationsDir = path.join(__dirname, '../public/publications')
const outputFile = path.join(__dirname, '../src/data/publications-generated.json')

// change admin to amanda's name
const parseAuthorName = (author) => {
  if (author === 'admin') return 'Amanda Watson'
  return author.replace(/_/g, ' ')
}

const generatePublications = () => {
  const publications = []
  
  // get all folders
  const folders = fs.readdirSync(publicationsDir).filter(file => {
    return fs.statSync(path.join(publicationsDir, file)).isDirectory()
  })
  
  folders.forEach(folder => {
    try {
      const folderPath = path.join(publicationsDir, folder)
      
      // retrieve index.md in each folder
      const indexPath = path.join(folderPath, 'index.md')
      if (!fs.existsSync(indexPath)) {
        console.warn(`No index.md found for ${folder}`)
        return
      }
      
      const mdContent = fs.readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(mdContent)
      
      // read citation file if exists
      let citation = null
      const citePath = path.join(folderPath, 'cite.bib')
      if (fs.existsSync(citePath)) {
        citation = fs.readFileSync(citePath, 'utf-8')
      }
      
      // get year from date
      const year = data.date ? new Date(data.date).getFullYear() : new Date().getFullYear()
      
      // see if there is an image
      const featuredImagePath = path.join(folderPath, 'featured.jpg')
      const featuredPngPath = path.join(folderPath, 'featured.png')
      let featuredImage = null
      if (fs.existsSync(featuredImagePath)) {
        featuredImage = `/publications/${folder}/featured.jpg`
      } else if (fs.existsSync(featuredPngPath)) {
        featuredImage = `/publications/${folder}/featured.png`
      }
      
      // build publication object
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
        video: data.url_video || '',
        dataset: data.url_dataset || '',
        citation: citation,
        featuredImage: featuredImage,
        folder: folder
      })
      
      console.log(`✓ Processed ${folder}`)
    } catch (error) {
      console.error(`✗ Error processing ${folder}:`, error.message)
    }
  })
  
  // sort by date descending
  publications.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0)
    const dateB = b.date ? new Date(b.date) : new Date(0)
    return dateB - dateA
  })
  
  // get output directory
  const outputDir = path.dirname(outputFile)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // write to file
  fs.writeFileSync(outputFile, JSON.stringify(publications, null, 2))
  console.log(`\n✓ Generated ${publications.length} publications to ${outputFile}`)
}

generatePublications()
