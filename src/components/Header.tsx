import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { Icon } from './Icon'
import { Logo } from './Logo'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type NavItem = { id: string; labelZh: string; labelEn: string; to?: string }

const navItems: NavItem[] = [
  { id: 'paths', labelZh: '学习路线', labelEn: 'Roadmap' },
  { id: 'chapters', labelZh: '核心章节', labelEn: 'Chapters', to: '/chapters' },
  { id: 'lab', labelZh: '实战实验室', labelEn: 'Lab', to: '/lab' },
  { id: 'toolkit', labelZh: '工具箱', labelEn: 'Toolkit', to: '/toolkit' },
  { id: 'about', labelZh: '关于', labelEn: 'About', to: '/about' },
]

export function Header() {
  const { lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goSection = (id: string) => {
    setOpen(false)
    if (location.pathname === '/') {
      scrollToId(id)
    } else {
      navigate('/')
      window.setTimeout(() => scrollToId(id), 120)
    }
  }

  const navLabel = (item: NavItem) => (lang === 'zh' ? item.labelZh : item.labelEn)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav className="main-nav" aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}>
          {navItems.map((item) =>
            item.to ? (
              <NavLink key={item.id} to={item.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                {navLabel(item)}
              </NavLink>
            ) : (
              <button key={item.id} onClick={() => goSection(item.id)}>
                {navLabel(item)}
              </button>
            ),
          )}
        </nav>
        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label={lang === 'zh' ? '语言切换' : 'Language switch'}>
            <button className={lang === 'zh' ? 'is-active' : ''} onClick={() => setLang('zh')} aria-pressed={lang === 'zh'}>
              中
            </button>
            <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
              EN
            </button>
          </div>
          <button
            className="icon-btn theme-btn"
            onClick={toggle}
            aria-label={
              theme === 'light'
                ? lang === 'zh'
                  ? '切换到深色模式'
                  : 'Switch to dark mode'
                : lang === 'zh'
                  ? '切换到浅色模式'
                  : 'Switch to light mode'
            }
            title={theme === 'light' ? 'Dark' : 'Light'}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
          </button>
          <NavLink to="/chapters/mental-model" className="btn btn-primary btn-sm header-cta">
            {lang === 'zh' ? '开始阅读' : 'Start reading'}
            <Icon name="arrow-right" size={15} />
          </NavLink>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? (lang === 'zh' ? '关闭菜单' : 'Close menu') : lang === 'zh' ? '打开菜单' : 'Open menu'}
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={21} />
          </button>
        </div>
      </div>

      <div className="mobile-menu" aria-hidden={!open}>
        <nav aria-label={lang === 'zh' ? '移动端导航' : 'Mobile navigation'}>
          {navItems.map((item, index) =>
            item.to ? (
              <NavLink key={item.id} to={item.to} style={{ transitionDelay: `${index * 40}ms` }} onClick={() => setOpen(false)}>
                <span>{navLabel(item)}</span>
                <Icon name="arrow-up-right" size={19} />
              </NavLink>
            ) : (
              <button key={item.id} onClick={() => goSection(item.id)} style={{ transitionDelay: `${index * 40}ms` }}>
                <span>{navLabel(item)}</span>
                <Icon name="arrow-up-right" size={19} />
              </button>
            ),
          )}
        </nav>
        <div className="mobile-menu-foot">
          <p>{lang === 'zh' ? '写给程序员的 Agent 实战手册' : 'A practical agent handbook for engineers'}</p>
          <a href="https://www.yuxin.run" target="_blank" rel="noreferrer">
            yuxin.run <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    </header>
  )
}
