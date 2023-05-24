import { FC } from 'react'
import searchIcon from './assets/search.png'
import globeIcon from './assets/globe.png'
import wheelchairIcon from './assets/wheelchair.png'
import profileIcon from './assets/profile.svg'
import shutdown from './assets/shut-down-svgrepo-com.svg'
import ConsultationTabs from './screens/consultation/ConsultationTabs'
import Logout from './screens/logout/logout'
import Profile from './screens/Profile/Profile'
import ChangePassword from './screens/ChangePassword/ChangePassword'

import UaePassRedirection from "./screens/UaePassRedirection/UaePassRedirection";

// import MapContainer from "./components/map/MapContainer";

interface Route {
  key: string
  title?: string
  icon?: string
  path?: string
  enabled: boolean
  component: FC<any>
  backgroundColor?: string
  textColor?: string
  width?: string
  childrenRoutes?: Array<Route>
  type?: 'menu'
}

export const routes: Array<Route> = [
  // {
  //   key: 'language-route',
  //   icon: globeIcon,
  //   path: '/',
  //   enabled: true,
  //   component: ConsultationTabs,
  // },
  // {
  //   key: 'wheelchair-route',
  //   icon: wheelchairIcon,
  //   path: '/',
  //   enabled: true,
  //   component: ConsultationTabs,
  // },
]

export const loggedInRoutes: Array<Route> = [
  // {
  //   key: 'language-route',
  //   icon: globeIcon,
  //   path: '/',
  //   enabled: true,
  //   component: ConsultationTabs,
  //   textColor: '#FFFFFF',
  // },
  // {
  //   key: 'wheelchair-route',
  //   icon: wheelchairIcon,
  //   path: '/',
  //   enabled: true,
  //   component: ConsultationTabs,
  //   textColor: '#FFFFFF',
  // },
  {    key: "UaePassRedirection",    title: "UAE Pass Redirection",    path: "/Home/Redirect",    enabled: true,    component: UaePassRedirection,    width: "20%",    backgroundColor: "#62AA51",  },
  {
    key: 'ConsultationTabs-route-05',
    title: 'Consultation',
    enabled: true,
    icon: profileIcon,
    component: ConsultationTabs,
    width: '20%',
    backgroundColor: '#101E8E',
    textColor: '#FFFFFF',
    type: 'menu',
    childrenRoutes: [
      {
        key: 'ConsultationTabs-route-05-00',
        title: 'My Profile',
        enabled: true,
        icon: profileIcon,
        path: '/CustomerPortal/view-profile',
        component: Profile,
      },
      {
        key: 'ConsultationTabs-route-05-01',
        title: 'Change Password',
        enabled: true,
        icon: profileIcon,
        path: '/CustomerPortal/change-password',
        component: ChangePassword,
      },
      // {
      //   key: 'ConsultationTabs-route-05-02',
      //   title: 'Logout',
      //   enabled: true,
      //   icon: profileIcon,
      //   path: '/logout',
      //   component: ConsultationTabs,
      // },
    ],
  },





  {
    key: 'logout-route',
    icon: shutdown,
    path: '/logout',
    enabled: true,
    component: Logout,
    textColor: '#FFFFFF',
  },
]
