import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'

//懒加载
const Main = () => import("@/components/Main")
const StatusMain = () => import('@/components/status/StatusMain')
const StatusAll = () => import('@/components/status/StatusAll')
const SettingMain = () => import('@/components/setting/SettingMain')
const SettingAll = () => import('@/components/setting/SettingAll')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
    	path: '/info',
      name: 'info',
	    component: Main,
      children: [
        {
          path: 'status',
          component: StatusMain,
          children: [
            {
              path: '/',
              name: 'status-root',
              component: StatusAll,
            },
            {
              path: "all",
              name: "status-all",
              component: StatusAll,
            },
          ]
        },
        {
        	path: "setting",
        	component: SettingMain,
        	children: [
        		{
        			path: "",
        			name: "setting-root",
        			component: SettingAll,
        		},
        		{
        			path: "all",
        			name: "setting-all",
        			component: SettingAll,
        		},
        	],
        },
      ],
    },
  ]
})
