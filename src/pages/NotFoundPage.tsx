import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  usePageMeta({ zh: '页面没找到', en: 'Page not found' })

  return (
    <section className="notfound">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="display">{zh ? '这条路还没修好' : 'This path is not paved yet'}</h1>
        <p className="lead">
          {zh ? '页面可能被移动了，或者链接少了一个字符。回到首页，重新选一条路线。' : 'The page moved, or the link is missing a character. Head home and pick a route.'}
        </p>
        <Link className="btn btn-primary" to="/">
          {zh ? '回到首页' : 'Back home'} <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </section>
  )
}
