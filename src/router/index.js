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

import Products from '@/page/products'
import ProductCreate from '@/page/productcreate'

import Orders from '@/page/orders'
import OrderDetail from '@/page/orderdetail'

import UseLog from '@/page/uselog'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
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
                },{
                    path: 'products',
                    name: 'products',
                    component: Products,
                },{
                    path: 'product/create',
                    name: 'product/create',
                    component: ProductCreate,
                },{
                    path: 'orders',
                    name: 'orders',
                    component: Orders
                },{
                    path: 'order/detail',
                    name: 'order/detail',
                    component: OrderDetail
                },{
                    path: 'use-log',
                    name: 'use-log',
                    component: UseLog
                }
            ]
      },
    ]
})
