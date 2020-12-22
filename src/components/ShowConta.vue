<template>

    <div class="mt-5">
        
        <div class="row">
            <div class="col-md-3">
                <h5>Conta - {{ conta.num_conta}}</h5>
            </div>
        </div>

        <!-- Loader vai aparecer se for true (enquanto a view estiver carregando no mounted()) -->
        <div v-if="loader" class="row">
            <div class="col text-center">
                <img id="loader" src="../assets/loading.svg" alt="">
            </div>
        </div>

        <div class="container mt-5">

            <div>
                <div class="row border rounded">
                    <div class="col">
                        <strong>Cliente:</strong>
                        {{ conta.user_name }} {{ conta.user_last_name }}
                    </div>
                    <div class="col">
                        <strong>CPF:</strong>
                        {{ conta.cpf }}
                    </div>
                     <div class="col">
                        <strong>Saldo:</strong>
                        R${{ conta.saldo }}
                    </div>
                    <div class="col">
                        <button @click="showChangePasswordForm" class="btn btn-danger btn-sm">Redefinir senha</button>
                    </div>
                </div>

                <div class="row mt-5">

                    <div class="col-md-3" id="menu">
                        <div class="row">
                            <button @click="getUserData()">Dados cadastrais</button>
                        </div>
                        <div class="row mt-4">
                            <!--button id="btn-menu">Operações financeiras</button-->
                            <div class="dropdown">
                                <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Operações financeiras
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" @click="showSaqueForm">Saque</a>
                                    <a class="dropdown-item" href="#" @click="showTransForm">Transferência</a>
                                    <a class="dropdown-item" href="#" @click="showDepositoForm">Depósito</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Se loader for true -->
                    <div v-if="loader" class="col">
                        <img id="loader" src="../assets/loading.svg" alt="">
                    </div>

                    <!-- Coluna que exibe componentes quando forem chamados -->
                    <div class="col" id="actions">

                        <DadosCliente
                            v-if = "show.clienteData"
                            :dados = "dadosCliente"
                            @fechar = "defaultView"
                            @showUpdateCliente = "showUpdateForm"
                        />

                        <UpdateCliente
                            v-if = "show.updateForm"
                            :dados = "dadosCliente" 
                            @fechar = "defaultView"
                        />

                        <!-- Componentes colocados dentro desta coluna com um tamanho menor, para deixar os componentes menores também -->
                        <div class="col-md-6">
                            <Saque
                                v-if = "show.saqueForm"
                                :cpf="cpfConta"
                                @fechar = "defaultView"
                            />

                        <Transferencia
                            v-if = "show.transForm"
                            :cpf="cpfConta"
                            @fechar = "defaultView"
                        />

                        <Deposito
                            v-if= "show.depositoForm"
                            :cpf="cpfConta"
                            @fechar = "defaultView"
                        />

                        <ChangePassword
                            v-if="show.changePasswordFom"
                            :cpf="cpfConta"
                            @fechar = "defaultView"
                        />

                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
    
</template>

<script>
import axios from 'axios';
import DadosCliente from './DadosCliente';
import UpdateCliente from './UpdateCliente';
import Saque from './Saque';
import Transferencia from './Transferencia';
import Deposito from  './Deposito';
import ChangePassword from './ChangePassword';

export default {
    name: "ShowConta",
    components: {
        DadosCliente,
        UpdateCliente,
        Saque,
        Transferencia,
        Deposito,
        ChangePassword,
    },
    data(){
        return {
            loader: true,
           cpfConta: this.$route.params.cpf, //recebe o id da conta via parâmetro de rota pelo componente ContasList
           conta:[],  //recebe os dados da conta quando o componente é carregado pelo método mounted()
           dadosCliente:{}, //recebe dados do cliente sempre que clicar em Dados Cadastrais
           show:{
               clienteData: false,
               updateForm: false,
               saqueForm: false,
               transForm: false,
               depositoForm: false,
               changePasswordFom: false
           }
        }
    },
    mounted: function(){
        //Verifica se usuario esta autenticado
        axios.post("http://localhost:8000/api/auth-user", {key: 'value'}, {
            headers: {
                'Authorization': 'bearer' + localStorage.getItem('token')
            }
        }).then( res => {
            console.log(res);
            this.getConta();
        }).catch(e => {
            console.log(e);
            this.$router.push('/painel-adm');
        });            
        
    },
    methods: {
        getConta: function(){
            this.loader = true;
            //Busca todas as contas cadastradas
            axios.get(`http://localhost:8000/api/show-conta/${this.cpfConta}`, {
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            })
            .then( res => {
                this.conta = res.data;
                console.log(res);
                console.log(this.conta);
            })
            .catch(e => {
                console.log(e);
                this.$router.push('/painel-adm');
            });

            this.loader = false;
        },

        getUserData: function(){ //busca usuario do tipo cliente na api e exibe o componente que vai renderizar os dados

            this.defaultView(); //torna a view padrão, caso outros componentes estejam sendo exibidos

            this.loader = true;

            //Busca o usuário do tipo cliente com usando a chave estrangeira user_id
            axios.get(`http://localhost:8000/api/show-cliente/${this.conta.user_id}`,{
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            })
            .then( res => {
                this.dadosCliente = res.data;
                console.log(res);
            })
            .catch( e => {
                alert (e);
            });

           //Atribue true a variável show.clienteData para mostrar componente que vai renderizar os dados obtidos
           this.show.clienteData = true;

           this.loader = false;
        },

        //Mostra componente UpdateCliente
        showUpdateForm: function(){
            this.defaultView(); //torna a view padrão, caso outros componentes estejam sendo exibidos
            this.loader = true;
            this.show.updateForm = true; //variável recebe true emitida por outro componente
            this.loader = false;
        },

         showSaqueForm: function(){
            this.defaultView();
            this.loader = true;
            this.show.saqueForm = true;
            this.loader = false;
        },

        showTransForm: function(){
            this.defaultView();
            this.loader = true;
            this.show.transForm = true;
            this.loader = false;
        },

        showDepositoForm: function(){
            this.defaultView();
            this.loader = true;
            this.show.depositoForm = true;
            this.loader = false;
        },

        showChangePasswordForm: function(){
            this.defaultView();
            this.loader = true;
            this.show.changePasswordFom = true;
            this.loader = false;
        },

        //Torna a view com visualização padrão, sem mostrar nenhum componente filho na tela
        defaultView: function(){
            this.show.clienteData = false;
            this.show.updateForm = false;
            this.show.saqueForm = false;
            this.show.transForm = false;
            this.show.depositoForm = false;
        },
    }
}
</script>

<style scoped>
#loader {
        width: 100px;
        height: 100px;
        margin: auto;
        animation: spin 2s infinite; /* o elemento com o id loader tem uma animação de nome 'spin' duração de 2 seguntos e numero de vezes que vai executar como infinita */
    }

    @keyframes spin{
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    #menu button{
        width: 200px;
    }

    #actions{
        width: 400px;
    }

</style>