import VueRouter from 'vue-router';
import routes from './routes'

const router = new VueRouter({
    routes,
    linkExactActiveClass: 'nav-item active'
});

router.beforeEach((to, from, next) => {

    const idAssistant = localStorage.getItem('idAssistant')

    if (idAssistant || to.name === 'login') {
        next()
    } else {
        next({ name: 'login' });
    }
});

export default router