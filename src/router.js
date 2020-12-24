import Vue from 'vue';
import Router from 'vue-router';
//import Home from './views/Home.vue'; // import foi feito  dentro de component com arrow function para tornar o carregamento mais leve, carregando a rota apenas quando ela é chamada dentro de App.vue

Vue.use(Router);

export default new Router({ 
    mode: 'history', //retira a # da url
    routes: [
        {
            path: '/painel-cliente',
            name: 'painel-cliente',
            component: () => import("./views/PainelCliente")
        },
        {
            path: '/painel-adm',
            name: 'painelAdm',
            component: () => import("./views/PainelAdm")
        },
        {
            path: '/cadastro-admin',
            name: 'cadastro-admin',
            component: () => import("./components/CadastroAdmin")
        },
        {
            path: '/cadastro-cliente',
            name: 'cadastro-cliente',
            component: () => import("./components/CadastroCliente")
        },
        {
            path: '/contas',
            name: 'contas',
            component: () => import("./components/ContasList")
        },
        {
            path: '/show-conta/:cpf',
            name: 'show-conta',
            component: () => import("./components/ShowConta")
        },
        {
            path: '/saque',
            name: 'saque',
            component: () => import("./components/Saque")
        },
        {
            path: '/transferencia',
            name: 'transferencia',
            component: () => import("./components/Transferencia")
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import("./views/Welcome")
        },
    ]
});