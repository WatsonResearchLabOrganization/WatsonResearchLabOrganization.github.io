import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const grantsDir = path.join(__dirname, '../public/research')
const outputFile = path.join(__dirname, '../src/data/research-generated.json')

const generateResearch = () => {
  const grants = []
  
  // Get all grant folders
  const folders = fs.readdirSync(grantsDir).filter(file => {
    const filePath = path.join(grantsDir, file)
    return fs.statSync(filePath).isDirectory()
  })
  
  folders.forEach(folder => {
    try {
      const folderPath = path.join(grantsDir, folder)
      
      // Read index.md
      const indexPath = path.join(folderPath, 'index.md')
      if (!fs.existsSync(indexPath)) {
        console.warn(`No index.md found for ${folder}`)
        return
      }
      
      const mdContent = fs.readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(mdContent)
      
      // Parse dates
      const startDate = data.start_date || data.startDate || ''
      const endDate = data.end_date || data.endDate || ''
      
      // Check for featured image
      let featuredImage = ''
      const files = fs.readdirSync(folderPath)
      const featuredFile = files.find(file => {
        const name = file.toLowerCase()
        return name === 'featured.jpg' || name === 'featured.jpeg' || name === 'featured.png'
      })
      
      if (featuredFile) {
        featuredImage = `/research/${folder}/${featuredFile}`
      }
      
      // Build grant object
      grants.push({
        id: folder,
        title: data.title || '',
        agency: data.agencies?.[0] || data.agency || '',
        agencies: data.agencies || (data.agency ? [data.agency] : []),
        amount: data.amount || '',
        startDate: startDate,
        endDate: endDate,
        duration: `${startDate}${endDate ? ' - ' + endDate : ''}`,
        description: content.trim() || data.description || '',
        tags: data.tags || [],
        image: featuredImage,
        folder: folder
      })
      
      console.log(`✓ Processed ${folder}`)
    } catch (error) {
      console.error(`Error processing ${folder}:`, error)
    }
  })
  
  // Sort by start date (newest first)
  grants.sort((a, b) => {
    const dateA = new Date(a.startDate || '1900-01-01')
    const dateB = new Date(b.startDate || '1900-01-01')
    return dateB - dateA
  })
  
  // Write to file
  fs.writeFileSync(outputFile, JSON.stringify(grants, null, 2))
  console.log(`\n✅ Generated ${grants.length} grants to ${outputFile}`)
}

generateResearch()
