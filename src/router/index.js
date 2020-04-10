import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const cndShare = () => import ('../components/cdnShare/index');
const cdnLive = () => import ('../components/cdnShare/live');
const signUp = () => import ('../components/signUp/index');
const chargeLetter = () => import ('../components/charge/index');
const difference = () => import ('../components/differenceVip/index');
const vipFunc = () => import ('../components/vipFunc/index');
const aaa = () => import ('../components/cdnShare/new');
export default new Router({
    linkActiveClass: 'activeRoute',
    mode: "history",
    routes:[
        {
            path:"/live",
            component:cdnLive,
            meta:{
                title:"师训宝直播课堂"
            }
        },
        {
            path: '/cdnShare',
            component: cndShare,
            meta:{
                title:"师训宝直播课堂"
            }
        },        
        {
            path: '/signUp',
            component: signUp,
            meta:{
                title:"师训宝_报名"
            }
        },
        {
            path: '/charge',
            component: chargeLetter,
        },
        {
            path: '/difference',
            component: difference,
        },
        {
            path: '/vipFunc',
            component: vipFunc,
        },
    ]
})