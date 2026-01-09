import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const newsDir = path.join(__dirname, '../public/news')
const outputFile = path.join(__dirname, '../src/data/news-generated.json')

const generateNews = () => {
  const newsItems = []
  
  // get all folders
  const folders = fs.readdirSync(newsDir).filter(file => {
    const filePath = path.join(newsDir, file)
    return fs.statSync(filePath).isDirectory()
  })
  
  folders.forEach(folder => {
    try {
      const folderPath = path.join(newsDir, folder)
      
      // retrieve index.md in each folder
      const indexPath = path.join(folderPath, 'index.md')
      if (!fs.existsSync(indexPath)) {
        console.warn(`No index.md found for ${folder}`)
        return
      }
      
      const mdContent = fs.readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(mdContent)
      
      // get year from date
      const year = data.date ? new Date(data.date).getFullYear() : new Date().getFullYear()
      
      // see if there is an image
      let featuredImage = ''
      const files = fs.readdirSync(folderPath)
      const featuredFile = files.find(file => {
        const name = file.toLowerCase()
        return name === 'featured.jpg' || name === 'featured.jpeg' || name === 'featured.png'
      })
      
      if (featuredFile) {
        featuredImage = `/news/${folder}/${featuredFile}`
      }
      
      // build news object
      newsItems.push({
        id: folder,
        title: data.title || '',
        date: data.date || '',
        year: year,
        category: data.category || (data.tags && data.tags.length > 0 ? data.tags[0] : ''),
        tags: data.tags || [],
        summary: data.summary || content.trim() || '',
        content: content.trim() || '',
        image: data.image || featuredImage || '',
        link: data.link || data.url || '',
        folder: folder
      })
      
      console.log(`✓ Processed ${folder}`)
    } catch (error) {
      console.error(`Error processing ${folder}:`, error)
    }
  })
  
  // sort by date descending
  newsItems.sort((a, b) => {
    const dateA = new Date(a.date || 0)
    const dateB = new Date(b.date || 0)
    return dateB - dateA
  })
  
  // get output directory
  const outputDir = path.dirname(outputFile)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // write to file
  fs.writeFileSync(outputFile, JSON.stringify(newsItems, null, 2))
  console.log(`\n✅ Generated ${newsItems.length} news items to ${outputFile}`)
}

generateNews()
