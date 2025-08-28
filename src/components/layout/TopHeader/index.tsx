import { Link } from 'react-router-dom'
import { BsChatLeftTextFill, BsGearFill } from 'react-icons/bs'
import { FaStore, FaCar } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import i18n, { applyDir } from '@/i18n'

import LogoBox from '@/components/LogoBox'
import CollapseMenu from './CollapseMenu'
import MobileMenuToggle from './MobileMenuToggle'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropdown from './ProfileDropdown'
import StyledHeader from './StyledHeader'

const TopHeader = () => {
  const { t } = useTranslation()
  
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
    applyDir(lang)
  }

  return (
    <StyledHeader>
      <div className="container">
        <LogoBox />

        <MobileMenuToggle />

        <CollapseMenu isSearch />

        <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
          <li className="nav-item ms-2">
            <div className="lang-switcher">
              <button onClick={() => changeLang('ar')}>العربية</button>
              <button onClick={() => changeLang('fr')}>FR</button>
              <button onClick={() => changeLang('en')}>EN</button>
              <button onClick={() => changeLang('kab')}>ⵣ</button>
            </div>
          </li>

          <li className="nav-item ms-2">
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/messaging">
              <BsChatLeftTextFill size={15} />
            </Link>
          </li>

          <li className="nav-item ms-2">
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/store">
              <FaStore size={15} />
            </Link>
          </li>

          <li className="nav-item ms-2">
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/transport">
              <FaCar size={15} />
            </Link>
          </li>

          <li className="nav-item ms-2" style={{ display: "none" }}>
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/settings/account">
              <BsGearFill size={15} />
            </Link>
          </li>

          <NotificationDropdown />

          <li className="nav-item ms-2" style={{ display: "none" }}>
            <Link className="nav-link bg-light icon-md btn btn-light p-0" to="/profile/connections">
              My Network
            </Link>
          </li>

          <ProfileDropdown />
        </ul>
      </div>
    </StyledHeader>
  )
}

export default TopHeader
