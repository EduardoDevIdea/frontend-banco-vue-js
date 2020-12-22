<template>

    <div class="container mt-4">

        <h2 class="mb-5">Criar conta</h2>

        <h5>Cliente</h5>
        <hr>

        <form class="mb-5">
            <div class="form-row" id="row">
                <div class="form-group col-md-6">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" v-model="name" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="last_name">Sobrenome</label>
                    <input type="text" class="form-control" id="last_name" v-model="last_name" required>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-2">
                    <label for="cpf">CPF</label>
                    <input type="text" class="form-control" id="cpf" v-model="cpf" v-mask="'###.###.###-##'" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="telefone_1">Telefone 1</label>
                    <input type="text" class="form-control" id="telefone_1" v-model="telefone_1" v-mask="'(##) #####-####'" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="telefone_2">Telefone 2</label>
                    <input type="text" class="form-control" id="telefone_2" v-model="telefone_2" v-mask="'(##) #####-####'">
                </div>
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
            </div>

            <h5 class="mt-3">Endereço</h5>
            <hr>

            <div class="form-row" id="row">
                <div class="form-group col-md-2">
                    <label for="cep">CEP</label>
                    <input type="text" class="form-control" id="cep" v-model="cep" @blur="getAdress()" required>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-6">
                    <label for="logradouro">Logradouro</label>
                    <input type="text" class="form-control" id="logradouro" v-model="logradouro" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="complemento">Complemento</label>
                    <input type="text" class="form-control" id="complemento" v-model="complemento">
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-4">
                    <label for="bairro">Bairro</label>
                    <input type="text" class="form-control" id="bairro" v-model="bairro" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="municipio">Município</label>
                    <input type="text" class="form-control" id="municipio" v-model="municipio" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="estado">Estado</label>
                    <input type="text" class="form-control" id="estado" v-model="estado" required>
                </div>
            </div>

            <h5 class="mt-3">Conta corrente</h5>
            <hr>

            <div class="form-row" id="row">
                <div class="form-group col-md-3">
                    <label for="password">Senha</label>
                    <input type="password" id="password" v-model="password" class="form-control" autoComplete="off" required>
                </div>
                <div class="form-group col-md-3">
                    <label for="repeat_password">Repetir senha</label>
                    <input type="password" id="repeat_password" v-model="repeat_password" class="form-control" autoComplete="off" required>
                </div>
            </div>
            
            <div class="row-md-4 text-center mt-4">
                <button type="button" class="btn btn-primary btn-lg" @click="createConta">Concluir</button>
            </div>
        </form>

    </div>

</template>

<script>
import axios from "axios";

    export default {
        name: "CadastroCliente",
        data() {
            return {
                name: "",
                last_name: "",
                cpf: "",
                telefone_1: "",
                telefone_2: "",
                email: "",
                cep: "",
                logradouro: "",
                complemento: "",
                bairro: "",
                municipio: "",
                estado: "",
                password: "",
                repeat_password:""
            }
        },
        methods: {
            getAdress: function(){
                axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
                .then(res => {
                    this.logradouro = res.data.logradouro;
                    this.complemento = res.data.complemento;
                    this.bairro = res.data.bairro;
                    this.municipio = res.data.localidade;
                    this.estado = res.data.uf;
                });
                //window.alert(`viacep.com.br/ws/${this.cep}/json/`);
            },
            //Cria cadastro do usuário e conta bancaria
            createConta: function() {
                axios.post("http://localhost:8000/api/cadastro-cliente", {
                    name: this.name,
                    last_name: this.last_name,
                    cpf: this.cpf,
                    telefone_1: this.telefone_1,
                    telefone_2: this.telefone_2,
                    email: this.email,
                    cep: this.cep,
                    logradouro: this.logradouro,
                    complemento: this.complemento,
                    bairro: this.bairro,
                    municipio: this.municipio,
                    estado: this.estado,
                    password: this.password
                    },
                    {headers: {'Authorization': 'bearer' + localStorage.getItem('token')}
                })
                .then( res => {
                    console.log(res);
                    alert("Cadastro Realizado com Sucesso!");
                })
                .catch((e) => {
                    console.log(e);
                });
            
            }
        
        },
        
        watch: {
            cep() {
                this.cep = this.cep.replace(/[^0-9]/g, '');
            }

            // codigo comentado abaixo subistituido por v-mask
            /* cpf() {
                this.cpf = this.cpf.replace(/[^0-9]/g, '')
                .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
            },
            telefone_1() {
                this.telefone_1 = this.telefone_1.replace(/[^0-9]/g, '')
                .replace(/^(\d{2})?(\d{5})(\d{4})?/g, '($1) $2-$3');
            } */
        }
    }
</script>

<style scoped>
    
    #row {
        background-color: rgb(241, 241, 241);
    }

</style>