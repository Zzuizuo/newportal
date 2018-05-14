import Vue from 'vue'
import Router from 'vue-router'
import Entrance from '@/components/entrance'
import login from '@/page/login'
import Board from '@/page/board'
import Detail from '@/page/detail'
import Accounts from '@/page/accounts'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
            children: [
                
            ]
        },
        {
          path: '/admin',
          name: 'admin',
          component: Entrance,
          children: [
                {
                    path: 'board',
                    name: 'board',
                    component: Board,
                    children: [
                        {
                            path: 'detail',
                            name: 'detail',
                            component: Detail,
                        }
                    ]
                },{
                    path: 'accounts',
                    name: 'accounts',
                    component: Accounts,
                },
          ]
      },
    ]
})
