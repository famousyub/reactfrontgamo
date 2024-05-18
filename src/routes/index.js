// All components mapping with path for internal routes

import { lazy } from 'react'
import Marques from '../features/marque'
import Family from '../features/family'
import UserList from '../features/settings/billing/Users'
import Fournisseur from '../features/fournsieur'
import Parameter from '../features/parameter'
import Intervention from '../features/intervention'
import UserDetail from '../features/userdetail'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },

  {
    path: '/users', // the url
    component: Leads, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },

  {
    path: '/fournisseur', // the url
    component: Fournisseur, // view rendered
  },
  {
    path: '/leads',
    component: Leads,
  },

  {
    path: '/marques',
    component: Marques,
  },

  {
    path: '/family',
    component: Family,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },


  {
    path: '/paramaeter',
    component: Parameter,
  },

  {
    path: '/userdetail',
    component: UserDetail,
  },


  {
     path :  '/intervention',
     component:Intervention
  }
]

export default routes
