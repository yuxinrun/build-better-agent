import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import { AboutPage } from './pages/AboutPage'
import { ChaptersPage } from './pages/ChaptersPage'
import { ChapterPage } from './pages/ChapterPage'
import { FaqPage } from './pages/FaqPage'
import { GlossaryPage } from './pages/GlossaryPage'
import { HomePage } from './pages/HomePage'
import { LabPage } from './pages/LabPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ToolkitPage } from './pages/ToolkitPage'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])
  return null
}

function Shell() {
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          const main = document.getElementById('main-content')
          main?.focus()
          main?.scrollIntoView({ block: 'start' })
        }}
      >
        跳到正文 / Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/chapters/:slug" element={<ChapterPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/toolkit" element={<ToolkitPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <ScrollToTop />
          <Shell />
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}
