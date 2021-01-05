<template>
    
    <div>
        <!-- Form Transferência-->
        <div v-if="show.formTrans" class="card mt-3 mb-3 mx-auto">
            <div class="card-header">
                <div class="row">
                    <div class="col text-right">
                        <a href="#" @click="fechar"><strong>Fechar</strong></a>
                    </div>
                </div>
                 <h5>Transferência</h5> 
            </div>

            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nº da conta</label>
                        <input type="text" class="form-control" id="numConta" aria-describedby="numContaHelp" v-model="receiver.num_conta" required>
                        <small id="numContaHelp" class="form-text text-muted">Número da conta que vai receber o valor</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Cpf</label>
                        <input type="text" class="form-control" id="cpf" aria-describedby="cpfdHelp" v-model="receiver.cpf" v-mask="'###.###.###-##'" required>
                        <small id="cpfdHelp" class="form-text text-muted">Cpf do titular da conta que vai receber o valor</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Valor</label>
                        <input type="text" class="form-control" id="valor"  v-model="valor" v-mask="maskMoeda" aria-describedby="valorHelp" required>
                        <small id="valorHelp" class="form-text text-muted">Valor a ser depositado</small>
                    </div>
                    <button type="button" class="btn btn-primary" @click="confirmar">Confirmar</button>
                </form>
            </div> 

        </div>
        <!-- End form transferência -->

        <!-- Confirmação dados e senha  -->
            <div v-if="show.confirmTrans" class="card" style="width: 18rem;">
                <div class="card-header">
                 <h5>Confirmação de transferência</h5> 
            </div>
                <div class="card-body">
                    <div>
                        <p><strong>Nº da conta: </strong> {{contaAlvo.num_conta}}</p>
                        <p><strong>Titular: </strong>{{contaAlvo.user_name}} {{contaAlvo.user_last_name}}</p>
                        <p><strong>CPF: </strong> {{contaAlvo.cpf}}</p>
                        <p><strong>Valor: </strong>{{valor}}</p>
                        
                        <div class="form-group">
                            <label for="exampleInputEmail1"><strong>Senha</strong></label>
                            <input type="password" class="form-control" id="valor" aria-describedby="passwordHelp" v-model="password" required>
                        </div>
                        
                    </div>
                    <button @click="transferir" class="btn btn-primary">Transferir</button>
                </div>
            </div>
        <!-- End cofirmação de dados e senha -->

    </div>

</template>

<script>
import axios from 'axios';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'; //importando biblioteca que configura mascara monetária

const currencyMask =  createNumberMask ({
    prefix: 'R$', //se optar por vazio, colocar '' para não inserir um prefixo tipo $ (que é o padrão)
    thousandsSeparatorSymbol: '.', //separando os milhares com ponto
    allowDecimal: true, //permite que o numero tenha fração
    decimalSymbol: ',', //separando o numero com virgula nas casas decimais
});

export default {
    name: "Transferencia",

    data(){
        return{
            maskMoeda: currencyMask, //maskMoeda recebe a constante currencyMask declarada no inicio do script
            receiver: {
                cpf: "", //cpf vindo do formulario
                num_conta: "", //num_conta vindo do formulario
            },
            valor: "", //valor a ser transferido, informado no formulario
            contaAlvo: {}, //conta que vai receber o valor
            password: "", //password de quem vai transferir
            show: {
                formTrans: true,
                confirmTrans: "", //recebe true para exibir confirmação de transferência
            }
        }
    },

    props: {
       cpf: String //cpf do dono da conta
    },

    methods: {
        //busca a conta que vai receber o valor usando cpf
        confirmar: function(){
            axios.get(`http://localhost:8000/api/show-conta/${this.receiver.cpf}`, {
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            })
            .then( res => { //retorna conta
                //console.log(res);

                var cpfMaskOff = this.receiver.cpf.replace(/[^0-9]/g, ''); //variável recebe cpfNoMask sem máscara para ser usada na comparação do cpf vindo do banco de dados (tb sem mascara)

                //se os dados informados forem iguais aos dados da conta encontrada
                if( (cpfMaskOff == res.data.cpf) && (this.receiver.num_conta == res.data.num_conta)){
                    this.contaAlvo = res.data; //contaAlvo recebe os dados da conta que foi encontrada na busca
                    this.show.confirmTrans = true; //variável recebe true para exibir dados de confirmação na tela
                    this.show.formTrans = false; //variável recebe false para formulário de transferencia não ser mais exibida na tela
                    console.log(this.contaAlvo);
                }else{
                    alert("Cpf ou Nº da conta incorreto");
                }
            })
            .catch( e => {
                alert('Erro ao localizar conta: '+ e);
            });
        },

        //Transfere valor, caso a senha esteja correta
        transferir: function(){
            axios.post("http://localhost:8000/api/transferencia", {
                num_conta: this.contaAlvo.num_conta,
                valor: this.valor,
                cpf: this.cpf,
                password: this.password}, {
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            }).then( res => {
                console.log(res);
                if(res.data.msg == "Senha incorreta!"){ //se senha incorreta
                    alert("Senha incorreta!");
                    window.location.reload(); //recarrega página
                }else{
                    alert(res.data.msg); // msg: "Transferencia realizada com sucesso!" OU "Saldo insuficiente!"
                    window.location.reload(); //recarrega página
                }
            }).catch( e => {
                console.log(e);
                alert("Erro " + e); //exibe erro técnico
            });
        },

        fechar: function(){
            this.$emit("fechar");
        }
    }
}
</script>

<style scoped>

</style>