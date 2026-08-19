import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const grantsDir = path.join(__dirname, '../public/research')
const publicationsDir = path.join(__dirname, '../public/publications')
const outputFile = path.join(__dirname, '../src/data/research-generated.json')

const resolveRelatedPublication = (entry) => {
  const id = typeof entry === 'string' ? entry : entry?.id
  if (!id) return null

  const indexPath = path.join(publicationsDir, id, 'index.md')
  if (!fs.existsSync(indexPath)) {
    console.warn(`Related publication not found: ${id}`)
    return null
  }

  const { data } = matter(fs.readFileSync(indexPath, 'utf-8'))
  const publicationFolder = path.join(publicationsDir, id)
  const localPdf = fs.existsSync(path.join(publicationFolder, `${id}.pdf`))
    ? `/publications/${id}/${id}.pdf`
    : ''

  return {
    id,
    title: data.title || id,
    venue: (data.publication || '').replace(/\*/g, ''),
    year: data.date ? new Date(data.date).getFullYear() : '',
    url: data.url_pdf || localPdf,
    relationship: typeof entry === 'object' ? entry.relationship || '' : ''
  }
}

const generateResearch = () => {
  const grants = []
  
  // get all folders
  const folders = fs.readdirSync(grantsDir).filter(file => {
    const filePath = path.join(grantsDir, file)
    return fs.statSync(filePath).isDirectory()
  })
  
  folders.forEach(folder => {
    try {
      const folderPath = path.join(grantsDir, folder)
      
      // retrieve index.md in each folder 
      const indexPath = path.join(folderPath, 'index.md')
      if (!fs.existsSync(indexPath)) {
        console.warn(`No index.md found for ${folder}`)
        return
      }
      
      const mdContent = fs.readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(mdContent)
      
      // parse start and end dates
      const startDate = data.start_date || data.startDate || ''
      const endDate = data.end_date || data.endDate || data.date || ''
      
      // see if there is an image
      let featuredImage = ''
      const files = fs.readdirSync(folderPath)
      const featuredFile = files.find(file => {
        const name = file.toLowerCase()
        return name === 'featured.jpg' || name === 'featured.jpeg' || name === 'featured.png'
      })
      
      if (featuredFile) {
        featuredImage = `/research/${folder}/${featuredFile}`
      }

      // build grant object
      const relatedPublications = (data.related_publications || data.relatedPublications || [])
        .map(resolveRelatedPublication)
        .filter(Boolean)

      grants.push({
        id: folder,
        title: data.title || '',
        summary: data.summary || '',
        agency: data.agencies?.[0] || data.agency || '',
        agencies: data.agencies || (data.agency ? [data.agency] : []),
        amount: data.amount || '',
        startDate: startDate,
        endDate: endDate,
        duration: `${startDate}${endDate ? ' - ' + endDate : ''}`,
        description: content.trim() || data.description || '',
        tags: data.tags || [],
        authors: data.authors || [],
        relatedPublications: relatedPublications,
        image: featuredImage,
        folder: folder
      })
      
      console.log(`✓ Processed ${folder}`)
    } catch (error) {
      console.error(`Error processing ${folder}:`, error)
    }
  })
  
  // sort by start date descending
  grants.sort((a, b) => {
    const dateA = new Date(a.startDate || '1900-01-01')
    const dateB = new Date(b.startDate || '1900-01-01')
    return dateB - dateA
  })
  
  // get output directory
  const outputDir = path.dirname(outputFile)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // write to file
  fs.writeFileSync(outputFile, JSON.stringify(grants, null, 2))
  console.log(`\n✅ Generated ${grants.length} grants to ${outputFile}`)
}

generateResearch()
