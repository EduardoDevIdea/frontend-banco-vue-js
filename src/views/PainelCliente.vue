<template>

    <div class="mt-5">
        
        <!-- Se usuário estiver logado -->
        <div v-if="loggedIn" id="dashboard">

            <div class="container" id="menu-cliente">
                <div>
                    <p><strong>Conta:</strong> {{conta.num_conta}}</p>
                    <p><strong>Titular:</strong> {{conta.user_name}} {{conta.user_last_name}}</p>
                    <p><strong>Saldo:</strong> R${{conta.saldo}}</p>
                </div>
                <div>
                    <button @click="showSaqueForm" id="btn-menu">SAQUE</button>
                </div>
                <div>
                    <button @click="showTransForm" id="btn-menu">TRANSFERÊNCIA</button>
                </div>
            </div>

            <div class="container" id="actions">
                <div v-if="show.saqueForm" id="form-action">
                    <Saque
                        @fechar="defaultView"
                        :cpf="userCpf"
                    />
                </div>
                <div v-if="show.transForm" id="form-action">
                    <Transferencia
                        @fechar="defaultView"
                        :cpf="userCpf"
                    />
                </div>
                <div v-if="show.img">
                    <img  id="img-painel" src="../assets/painel-2.png" alt="">
                </div>
            </div>

        </div>

        <!-- Se usuário não estiver logado -->
        <div v-else>
            <LoginCliente @entrar="acessar($event)"/>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
import Saque from '../components/Saque';
import Transferencia from '../components/Transferencia';
import LoginCliente from '../components/LoginCliente';

export default {
    name: "PainelCliente",

    components: {
        Saque,
        Transferencia,
        LoginCliente,
    },

    data() {
        return {
            loggedIn: "", //recebe true para verificar se user está autenticado
            userCpf: "", //recebe os cpf do user para futuras verificações de acesso
            show:{
                img: "", //recebe true quando imagem deve ser exibida
                saqueForm: "", //recebe true quando componente saque deve ser exibido
                transForm: "", //recebe true quando componente transferencia deve se exibido
            },
            conta: {}, //recebe os dados da conta do user
        }
    },

    //verificando se o user está logado
    mounted: function(){
        axios.post("http://localhost:8000/api/auth-user", {key: "value"}, {
            headers: {
                'Authorization': 'bearer' + localStorage.getItem('token') 
            }
        }).then( res => {
            console.log(res);
            this.userCpf = res.data.cpf; //userCpf recebe cpf do usuário para futuras consultas
            this.loggedIn = true;
            this.getConta();
            this.defaultView();
        }).catch(e =>{
            console.log(e); //informa no log a mensagem 
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

                    localStorage.setItem("tipoUser", "cliente"); //setando tipo de user no localStorage

                    this.userCpf = $event.cpf; //cpf passado no formulario de login armazenado em userCpf para ser usado em futuras consultas na api
                    
                    this.loggedIn = true; //loggedIn recebe true para indicar que o usuário está logado, e esconder componente LoginAdmin
                    
                    this.defaultView(); //chamando função que torna a tela padrão

                    alert("Bem vindo!");

                }
            }) //resposta de cpf ou senha incorretos
            .catch( e => {
                console.log(e);
                alert("CPF e/ou Senha incorretos!");
            });
        },

        //Pega a conta do user
        getConta: function(){
            axios.get(`http://localhost:8000/api/show-conta/${this.userCpf}`, {
                headers:{
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            }).then( res => {
                this.conta = res.data;
            }).catch( e => {
                console.log(e);
            });
        },

        //Exibe componente Saque 
        showSaqueForm: function(){
            this.show.img = "",
            this.show.transForm = "",
            this.show.saqueForm = true;
        },

        //exibe componente Transferencia
        showTransForm: function(){
            this.show.img = "",
             this.show.saqueForm = "";
            this.show.transForm = true;
        },
        
        //padrão de visualizaão, sem compnentes de açao na tela e com ilustração sendo exibida
        defaultView: function(){
            this.show.img = true;
            this.show.saqueForm = "";
            this.show.transForm = "";
        }
    }    
}
</script>

<style scoped>

    #dashboard {
        display: flex;
    }

    #btn-menu {
        width: 250px;
        height: 40px;
        margin-bottom: 25px;
    }

    #actions {
        display: flex;
    }

    #form-action{
        width: 100%;
    }

    #img-painel {
        width: 550px;
    }

</style>