# Portfolio Components Documentation

## Components Overview

### 1. Header Component
**Location:** `src/components/Header.jsx`

Navigation bar displayed at the top of every page.

**Features:**
- Logo/Brand name linking to home
- Navigation links (Home, Certificate, Contact)
- Responsive design
- Hover effects on links

**Usage:**
```jsx
import Header from './components/Header'

<Header />
```

---

### 2. Footer Component
**Location:** `src/components/Footer.jsx`

Footer displayed at the bottom of every page.

**Features:**
- Social media links (GitHub, LinkedIn, Twitter)
- Copyright notice
- Centered layout

**Usage:**
```jsx
import Footer from './components/Footer'

<Footer />
```

**Customization:**
Update the social links in the component:
```jsx
<a href="YOUR_GITHUB_URL">GitHub</a>
<a href="YOUR_LINKEDIN_URL">LinkedIn</a>
<a href="YOUR_TWITTER_URL">Twitter</a>
```

---

### 3. Hero Component
**Location:** `src/components/Hero.jsx`

Eye-catching hero section for the home page.

**Features:**
- Gradient background (blue to purple)
- Main heading and tagline
- Call-to-action button
- Centered content

**Usage:**
```jsx
import Hero from './components/Hero'

<Hero />
```

**Customization:**
Edit the text directly in the component:
```jsx
<h1>Your Name</h1>
<p>Your Title | Your Skills</p>
```

---

### 4. Skills Component
**Location:** `src/components/Skills.jsx`

Display your technical skills in a grid layout.

**Features:**
- Responsive grid (2 cols mobile, 3 tablet, 6 desktop)
- Hover effects
- Easy to add/remove skills

**Usage:**
```jsx
import Skills from './components/Skills'

<Skills />
```

**Customization:**
Update the skills array:
```jsx
const skills = ['React', 'JavaScript', 'Python', 'Docker', 'AWS', 'MongoDB']
```

---

### 5. ProjectCard Component
**Location:** `src/components/ProjectCard.jsx`

Reusable card component for displaying projects.

**Props:**
- `title` (string) - Project name
- `description` (string) - Brief description
- `image` (string) - Image URL or path
- `link` (string) - Project URL

**Usage:**
```jsx
import ProjectCard from './components/ProjectCard'

<ProjectCard
  title="My Project"
  description="A cool project I built"
  image="/images/project1.jpg"
  link="https://github.com/username/project"
/>
```

**Example with multiple projects:**
```jsx
const projects = [
  {
    title: "E-commerce Site",
    description: "Full-stack shopping platform",
    image: "/images/ecommerce.jpg",
    link: "https://github.com/user/ecommerce"
  },
  {
    title: "Weather App",
    description: "Real-time weather application",
    image: "/images/weather.jpg",
    link: "https://github.com/user/weather"
  }
]

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project, index) => (
    <ProjectCard key={index} {...project} />
  ))}
</div>
```

---

### 6. CertificateCard Component
**Location:** `src/components/CertificateCard.jsx`

Display certificates with image, title, issuer, and date.

**Props:**
- `title` (string) - Certificate name
- `issuer` (string) - Issuing organization
- `date` (string) - Date received
- `image` (string) - Certificate image URL

**Usage:**
```jsx
import CertificateCard from './components/CertificateCard'

<CertificateCard
  title="React Developer Certification"
  issuer="Meta"
  date="January 2026"
  image="/images/cert1.jpg"
/>
```

**Example with multiple certificates:**
```jsx
const certificates = [
  {
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "December 2025",
    image: "/images/aws-cert.jpg"
  },
  {
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    date: "November 2025",
    image: "/images/js-cert.jpg"
  }
]

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {certificates.map((cert, index) => (
    <CertificateCard key={index} {...cert} />
  ))}
</div>
```

---

### 7. ContactForm Component
**Location:** `src/components/ContactForm.jsx`

Functional contact form with validation.

**Features:**
- Name, email, and message fields
- Form validation (required fields)
- Submit handler
- Styled with Tailwind

**Usage:**
```jsx
import ContactForm from './components/ContactForm'

<ContactForm />
```

**Customization:**
Update the `handleSubmit` function to integrate with email service:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Example: Send to backend API
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  if (response.ok) {
    alert('Message sent!')
    setFormData({ name: '', email: '', message: '' })
  }
}
```

**Integration with EmailJS:**
```bash
npm install @emailjs/browser
```

```jsx
import emailjs from '@emailjs/browser'

const handleSubmit = (e) => {
  e.preventDefault()
  
  emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    formData,
    'YOUR_PUBLIC_KEY'
  ).then(() => {
    alert('Message sent successfully!')
  })
}
```

---

## Pages Documentation

### Home Page
**Location:** `src/pages/Home.jsx`

**Suggested Components:**
```jsx
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import ProjectCard from '../components/ProjectCard'

function Home() {
  return (
    <div>
      <Hero />
      <Skills />
      {/* Add projects section */}
    </div>
  )
}
```

---

### Certificate Page
**Location:** `src/pages/Certificate.jsx`

**Usage Example:**
```jsx
import CertificateCard from '../components/CertificateCard'

function Certificate() {
  const certificates = [
    {
      title: "React Developer",
      issuer: "Meta",
      date: "Jan 2026",
      image: "/certs/react.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Certificates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
        {certificates.map((cert, index) => (
          <CertificateCard key={index} {...cert} />
        ))}
      </div>
    </div>
  )
}
```

---

### Contact Page
**Location:** `src/pages/Contact.jsx`

**Usage Example:**
```jsx
import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Me</h1>
      <ContactForm />
    </div>
  )
}
```

---

## Styling Guide

All components use Tailwind CSS utility classes.

**Color Scheme:**
- Background: `bg-gray-900` (dark)
- Cards: `bg-gray-800`
- Text: `text-white`, `text-gray-400`
- Accent: `bg-blue-600`, `text-blue-400`

**Common Classes:**
- Container: `container mx-auto px-4`
- Card: `bg-gray-800 rounded-lg shadow-lg p-6`
- Button: `bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## Adding Images

1. Place images in `public/images/` folder
2. Reference them as `/images/filename.jpg`

Example:
```jsx
<ProjectCard
  image="/images/project1.jpg"
  // ...
/>
```

---

## Next Steps

1. Add your actual content (projects, certificates, skills)
2. Replace placeholder images with real ones
3. Update social media links in Footer
4. Customize colors and styling
5. Add more pages if needed (About, Blog, etc.)
6. Integrate contact form with email service
7. Add animations (framer-motion)
8. Deploy to Vercel/Netlify
