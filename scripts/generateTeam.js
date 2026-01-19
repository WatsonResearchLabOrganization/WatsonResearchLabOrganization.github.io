import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const teamDir = path.join(__dirname, '../public/team')
const outputFile = path.join(__dirname, '../src/data/team-generated.json')

const generateTeam = () => {
  const teamMembers = []
  
  // get all folders
  const folders = fs.readdirSync(teamDir).filter(file => {
    const filePath = path.join(teamDir, file)
    return fs.statSync(filePath).isDirectory()
  })
  
  folders.forEach(folder => {
    try {
      const folderPath = path.join(teamDir, folder)
      
      // retrieve _index.md in each folder
      const indexPath = path.join(folderPath, '_index.md')
      if (!fs.existsSync(indexPath)) {
        console.warn(`No _index.md found for ${folder}`)
        return
      }
      
      const mdContent = fs.readFileSync(indexPath, 'utf-8')
      const { data, content } = matter(mdContent)
      
      // generate id from folder name
      const id = folder.toLowerCase().replace(/_/g, '-')
      
      // generate display name from folder name if not provided
      const nameParts = folder.split('_')
      const displayName = nameParts.length > 1 
        ? `${nameParts[1]} ${nameParts[0]}` 
        : folder.replace(/_/g, ' ')
      
      // see if there is an avatar image
      let avatarImage = ''
      const files = fs.readdirSync(folderPath)
      const avatarFile = files.find(file => {
        const name = file.toLowerCase()
        return name === 'avatar.jpg' || name === 'avatar.jpeg' || name === 'avatar.png'
      })
      
      if (avatarFile) {
        avatarImage = `/team/${folder}/${avatarFile}`
      }
      
      // parse education
      let education = []
      if (data.education?.courses) {
        education = data.education.courses.map(course => {
          const courseName = String(course.course)
          const isCurrent = courseName.toLowerCase().includes('current') || 
                           courseName.toLowerCase().includes('expected') ||
                           String(course.year).toLowerCase().includes('expected')
          
          // clean degree name
          const cleanDegree = courseName.replace(/^(Current|Expected)\s+/i, '')
          
          return {
            degree: cleanDegree,
            institution: course.institution,
            year: String(course.year).replace(/^(Expected|Current)\s+/i, ''),
            status: isCurrent ? 'current' : undefined
          }
        })
      } else if (data.education) {
        education = data.education
      }
      
      // parse social links
      let email = data.email || ''
      let website = data.website || data.external_link || ''
      let linkedin = data.linkedin || ''
      let github = data.github || ''
      let scholar = data.scholar || data.google_scholar || ''
      let twitter = data.twitter || ''
      
      if (data.social && Array.isArray(data.social)) {
        data.social.forEach(social => {
          if (!social.link) return
          
          const link = social.link
          const icon = social.icon?.toLowerCase() || ''
          
          // determine type based on icon or link pattern
          if (icon === 'envelope' || link.startsWith('mailto:')) {
            email = link.replace('mailto:', '')
          } else if (icon === 'linkedin' || link.includes('linkedin.com')) {
            linkedin = link
          } else if (icon === 'github' || link.includes('github.com')) {
            github = link
          } else if (icon === 'google-scholar' || icon === 'scholar' || link.includes('scholar.google.com')) {
            scholar = link
          } else if (icon === 'twitter' || link.includes('twitter.com') || link.includes('x.com')) {
            twitter = link
          } else if (icon === 'globe' || icon === 'link') {
            website = link
          }
        })
      }
      
      // build team member object
      teamMembers.push({
        id: id,
        name: data.name || displayName,
        role: data.user_groups?.[0] || data.role || '',
        title: data.role || data.title || '',
        image: avatarImage,
        bio: data.bio || data.summary || '',
        fullBio: content.trim() || data.bio || '',
        email: email,
        website: website,
        linkedin: linkedin,
        github: github,
        scholar: scholar,
        twitter: twitter,
        interests: data.interests || [],
        education: education,
        organization: data.organization || {
          name: data.organizations?.[0]?.name || 'University of Virginia',
          department: data.organizations?.[0]?.url || ''
        },
        folder: folder
      })
      
      console.log(`✓ Processed ${folder}`)
    } catch (error) {
      console.error(`Error processing ${folder}:`, error)
    }
  })
  
  // sort by role and name
  const rolePriority = {
    'Faculty': 1,
    'PhD Students': 2,
    'MS Students': 3,
    'Masters Students': 3,
    'Undergraduate Students': 4,
    'Alumni': 5
  }
  
  teamMembers.sort((a, b) => {
    const priorityA = rolePriority[a.role] || 99
    const priorityB = rolePriority[b.role] || 99
    if (priorityA !== priorityB) return priorityA - priorityB
    return a.name.localeCompare(b.name)
  })
  
  // get output directory
  const outputDir = path.dirname(outputFile)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // write to file
  fs.writeFileSync(outputFile, JSON.stringify(teamMembers, null, 2))
  console.log(`\n✅ Generated ${teamMembers.length} team members to ${outputFile}`)
}

generateTeam()
