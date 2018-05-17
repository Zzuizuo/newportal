import Vue from 'vue'
import Router from 'vue-router'
import Entrance from '@/components/entrance'

import login from '@/page/login'
import loginTransit from '@/page/logintransit'

import Accounts from '@/page/accounts'
import accountsDetail from '@/page/accountdetail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
        },{
            path: '/login/transit',
            name: 'login-transit',
            component: loginTransit,
        },{
          path: '/admin',
          name: 'admin',
          component: Entrance,
          children: [
               {
                    path: 'accounts',
                    name: 'accounts',
                    component: Accounts,
                },
                {
                    path: 'account/detail',
                    name: 'account/detail',
                    component: accountsDetail,
                },
          ]
      },
    ]
})
