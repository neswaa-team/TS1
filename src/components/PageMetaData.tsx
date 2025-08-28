import { DEFAULT_PAGE_TITLE } from '@/context/constants'

const PageMetaData = ({ title }: { title: string }) => {
  const defaultTitle = DEFAULT_PAGE_TITLE
  return (
      <title>{title ? title + ' | ' + defaultTitle : defaultTitle}</title>
  )
}

export default PageMetaData
