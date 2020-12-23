<template>

    <div class="mt-5"> 

        <!-- Se usuário estiver logado -->
        <div v-if="loggedIn">

            <div class="card" id="card">
                <div class="card-body" id="card-body">
                    <div class="row justify-content-center mb-4">
                        <router-link to="/cadastro-cliente" class="btn btn-primary btn-lg" id="btn">Criar conta</router-link>
                    </div>
                    <div class="row justify-content-center mb-4 ">
                        <router-link to="/contas" class="btn btn-primary btn-lg" id="btn">Contas</router-link>
                    </div>
                    <div class="row justify-content-center mb-4 ">
                        <router-link to="#" class="btn btn-secondary btn-lg" id="btn">Cadastrar Admin</router-link>
                    </div>
                </div>
            </div>

        </div>

        <!-- Se o usuário não estiver logado  exibe componente para logar-->
        <div v-else>
            <LoginAdmin @entrar="acessar($event)"/>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
import LoginAdmin from '../components/LoginAdmin'; 

export default {
    name: "PainelAdm",
    data() {
        return {
            loggedIn: "",
            lastToken: "",
        }
    },
    components: {
        LoginAdmin,
    },

    //verificando se o user está logado
    mounted: function(){
        axios.post("http://localhost:8000/api/auth-user", {key: "value"}, {
            headers: {
                'Authorization': 'bearer' + localStorage.getItem('token') 
            }
        }).then( res => {
            console.log(res);
            this.loggedIn = true;
        }).catch(e =>{
            console.log(e);
        });
    },
    
    methods: {
        //tenta fazer login com o cpf e password emitidos pelo component LoginAdmin
        acessar: function($event){
            axios.post("http://localhost:8000/api/login", {
                cpf: $event.cpf,
                password: $event.password,
                loginTipo: $event.loginTipo
            })
            .then( res => {
                 if(res.data.msg == "Sem permissão"){ //resposta de usuário sem permissão
                    alert("Acesso negado!");
                }else { //resposta de usuário com permissão
                    localStorage.setItem("token", res.data.access_token); //armazenando access_token em localStorage.setItem de nome token
                    
                    localStorage.setItem("tipoUser", "admin"); //setando tipo de user no localStorage 

                    this.loggedIn = true; //loggedIn recebe true para indicar que o usuário está logado, e esconder componente LoginAdmin
                    alert("Bem vindo!");
                }
            }) //resposta de cpf ou senha incorretos
            .catch( e => {
                console.log(e);
                alert("CPF e/ou Senha incorretos!");
            });
        }
    }
}
</script>

<style scoped>

    #card{
        margin-top: 120px;
        width: 300px;
        margin-left: auto;
        margin-right: auto;
    }

    #card-body{
        background-color:#F8F9FA;
    }

    #btn{
        width: 200px
    }

</style>