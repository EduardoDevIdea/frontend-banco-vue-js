<template>
    
    <div>
        <div class="card mt-3 mb-3 mx-auto">

            <div class="card-header">
                <div class="row">
                    <div class="col text-right">
                        <a href="#" @click="fechar"><strong>Fechar</strong></a>
                    </div>
                </div>
                <h5>Saque</h5>
            </div>
            
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Valor</label>
                        <input type="text" class="form-control" id="valor" v-model="valor" v-mask="maskMoeda" aria-describedby="valorHelp" required>
                        <small id="valorHelp" class="form-text text-muted">Valor a ser sacado</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Senha</label>
                        <input type="password" class="form-control" id="valor" aria-describedby="passwordHelp" v-model="password" required>
                        <small id="passwordHelp" class="form-text text-muted">Senha do cliente</small>
                    </div>
                    <button type="button" class="btn btn-primary" @click="sacar">Confirmar</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import currencyMask from '../currencyMask';

const MoneyMask = currencyMask;

export default {
    name: "Saque",

    data() {
        return{
            valor: "",
            password: "",
            maskMoeda: MoneyMask //maskMoeda recebe a constante currencyMask declarada no inicio do script
        }
    },

    props: {
        cpf: String // pega o cpf do componente pai para futuras verificações
    },

    methods: {
        sacar: function(){
            axios.post("http://localhost:8000/api/saque", {
                cpf: this.cpf,
                password: this.password,
                valor: this.valor}, {
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            }).then( res => {
                console.log(res);
                if(res.data.msg == "Senha incorreta!"){ //se senha incorreta
                    alert("Senha incorreta!");
                }else if( res.data.msg == "Saldo insuficiente!"){ //se saldo insuficiente
                    alert("Saldo insuficiente!");
                }else{
                    alert("Saque realizado com sucesso!");
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