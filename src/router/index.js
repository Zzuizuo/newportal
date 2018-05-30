import Vue from 'vue'
import Router from 'vue-router'

import Entrance from '@/components/entrance'

import scan from '@/page/scan'
import scanTransit from '@/page/scantransit'

import Accounts from '@/page/accounts'
import accountsDetail from '@/page/accountdetail'

import Shop from '@/page/shop'
import ShopCreate from '@/page/shopcreate'
import ShopAdvance from '@/page/shopadvance'
import ShopDetail from '@/page/shopdetail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/scan',
            name: 'scan',
            component: scan,
        },{
            path: '/scan/transit',
            name: 'scan-transit',
            component: scanTransit,
        },{
            path: '/admin',
            name: 'admin',
            component: Entrance,
            children: [
                {
                    path: 'accounts',
                    name: 'accounts',
                    component: Accounts,
                },{
                    path: 'account/detail',
                    name: 'account/detail',
                    component: accountsDetail,
                },{
                    path: 'shop',
                    name: 'shop',
                    component: Shop,
                },{
                    path: 'shop/create',
                    name: 'shop/create',
                    component: ShopCreate,
                },{
                    path: 'shop/advance',
                    name: 'shop/advance',
                    component: ShopAdvance,
                },{
                    path: 'shop/detail',
                    name: 'shop/detail',
                    component: ShopDetail,
                }
            ]
      },
    ]
})
