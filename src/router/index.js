import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app';
import GMap from '@/components/home/Gmap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      // any other method data about this route
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})

// check auth before proceeding to the next route
router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if(user) {
      // if user signed in, proceed to next route
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router;
