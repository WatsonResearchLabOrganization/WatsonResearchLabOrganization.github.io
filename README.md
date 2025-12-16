# Watson Research Lab Website

A modern, responsive website built with React, Vite, and Tailwind CSS for the Watson Research Lab at the University of Virginia.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd watson-lab-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 📁 Project Structure

```
watson-lab-react/
├── public/
│   ├── videos/          # Background videos
│   └── images/          # Team photos, news images
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Main pages
│   │   ├── Home.jsx
│   │   ├── Research.jsx
│   │   ├── Publications.jsx
│   │   ├── Team.jsx
│   │   ├── News.jsx
│   │   └── Contact.jsx
│   ├── data/            # JSON content files
│   │   ├── grants.json
│   │   ├── publications.json
│   │   ├── team.json
│   │   └── news.json
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## ✏️ Content Management

All website content is managed through JSON files in the `src/data/` directory. This makes it easy to update content without touching the code.

### Adding/Editing Team Members

Edit `src/data/team.json`:

```json
{
  "id": "unique-id",
  "name": "Jane Doe",
  "role": "PhD Students",  // Options: Faculty, PhD Students, MS Students, Undergraduate Students, Alumni
  "title": "PhD Candidate",
  "image": "/images/avatars/jane-doe.jpg",  // Optional
  "bio": "Short bio about research interests",
  "fullBio": "Extended biography shown in modal when clicked",  // Optional
  "email": "jane@virginia.edu",  // Optional
  "website": "https://janedoe.com",  // Optional
  "linkedin": "https://linkedin.com/in/janedoe",  // Optional
  "github": "https://github.com/janedoe",  // Optional
  "scholar": "https://scholar.google.com/citations?user=...",  // Optional
  "twitter": "https://twitter.com/janedoe",  // Optional
  "interests": ["Machine Learning", "Biosensors"],  // Optional
  "education": [  // Optional
    {
      "degree": "PhD in Computer Science",
      "institution": "University Name",
      "year": "Expected 2026",
      "status": "current"  // Optional: "current" for ongoing education
    }
  ],
  "organization": {  // Optional
    "name": "University of Virginia",
    "department": "Electrical and Computer Engineering"
  }
}
```

**Team Member Modal**: Click on any team member card to view their full profile in a detailed modal, including:
- Extended biography
- Complete education history
- All social/academic links (email, website, Google Scholar, GitHub, Twitter, LinkedIn)
- Research interests

**Adding images**: Place team photos in `public/images/avatars/` and reference them as `/images/avatars/filename.jpg`

### Adding/Editing News Posts

Edit `src/data/news.json`:

```json
{
  "id": "unique-id",
  "title": "News Title",
  "date": "2024-12-15",  // YYYY-MM-DD format
  "category": "Awards",  // Options: Awards, Publications, Conferences, Presentations, Achievements
  "content": "Full description of the news...",
  "image": "/images/news-image.jpg",  // Optional
  "link": "https://external-link.com"  // Optional
}
```

### Adding/Editing Research Grants

Edit `src/data/grants.json`:

```json
{
  "id": "unique-id",
  "title": "Grant Title",
  "agency": "Funding Agency",
  "amount": "$500,000",
  "status": "Active",  // or "Completed"
  "period": "2023-2028",
  "description": "Brief description of the research project",
  "tags": ["Topic1", "Topic2", "Topic3"]
}
```

### Adding/Editing Publications

Edit `src/data/publications.json`:

```json
{
  "id": "unique-id",
  "title": "Paper Title",
  "authors": "A. Author, B. Author, C. Author",
  "venue": "Conference/Journal Name, Year",
  "year": 2024,
  "pdf": "/publications/paper.pdf",  // Optional
  "slides": "/publications/slides.pdf",  // Optional
  "poster": "/publications/poster.pdf",  // Optional
  "code": "https://github.com/user/repo",  // Optional
  "citation": "Full citation text..."
}
```

**Adding PDFs**: Place publication files in `public/publications/` and reference as `/publications/filename.pdf`

## 🎨 Customization

### Colors

UVA brand colors are defined in `tailwind.config.js`:

```js
colors: {
  'uva-blue': '#0077b6',
  'uva-dark': '#023e8a',
  'uva-light': '#0096c7',
}
```

### Homepage Video

1. Place your video file in `public/videos/`
2. Update the video source in `src/pages/Home.jsx`:
```jsx
<source src="/videos/your-video.mp4" type="video/mp4" />
```

Recommended video format: MP4 (H.264), 1920x1080, under 20MB for optimal loading

### Social Media Links

Update social media URLs in `src/components/Footer.jsx`:

```jsx
const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/...' },
  { name: 'Instagram', url: 'https://instagram.com/...' },
  // ...
]
```

## 📱 Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern animations with Framer Motion
- ✅ Fast development with Vite HMR
- ✅ Easy content management via JSON
- ✅ UVA brand colors throughout
- ✅ Social media integration
- ✅ Publication filtering by year
- ✅ Contact form
- ✅ Video background support
- ✅ **Interactive team member modals** with detailed profiles
- ✅ **Comprehensive team member profiles** (education, bio, social links)

## 🔧 Tech Stack

- **React 18.3** - UI framework
- **Vite 5.1** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11** - Animations
- **Lucide React** - Icon library

## 📄 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite configuration
4. Deploy!

## 🐛 Common Issues

### Video not playing
- Ensure video file is in `public/videos/`
- Check video codec (use MP4/H.264)
- Verify file path in Home.jsx starts with `/`

### Images not showing
- Place images in `public/images/`
- Use paths starting with `/` (e.g., `/images/photo.jpg`)
- Check file extensions match exactly

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 18 or higher: `node --version`

## 📞 Support

For issues or questions, contact:
- **Email**: aawatson@virginia.edu
- **GitHub**: [watson-research-lab](https://github.com/watson-research-lab)

## 📝 License

© 2024 Watson Research Lab, University of Virginia
