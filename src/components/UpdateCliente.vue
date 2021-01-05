<template>
    
    <div>

        <form class="mb-5 px-3 border rounded border-dark ">

            <div class="row mt-3">
                <div class="col text-right">
                    <a href="#" @click="fechar"><strong>Fechar</strong></a>
                </div>
            </div>
            <div class="row">
               <h5 class="mx-auto">Atualização de Cadastro</h5> 
            </div>

            <h5 class="mt-3">Cliente</h5> 
            <hr>

            <div class="form-row" id="row">
                <div class="form-group col-md-6">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" v-model="dados.name" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="last_name">Sobrenome</label>
                    <input type="text" class="form-control" id="last_name" v-model="dados.last_name" required>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-2">
                    <label for="cpf">CPF</label>
                    <input type="text" class="form-control" id="cpf" v-model="dados.cpf" v-mask="'###.###.###-##'" required> <!-- @keyup="mascaraCpf('###.###.###-##', this)" -->
                </div>
                <div class="form-group col-md-2">
                    <label for="telefone_1">Telefone 1</label>
                    <input type="text" class="form-control" id="telefone_1" v-model="dados.telefone_1" v-mask="'(##) #####-####'" required>
                </div>
                <div class="form-group col-md-2">
                    <label for="telefone_2">Telefone 2</label>
                    <input type="text" class="form-control" id="telefone_2" v-model="dados.telefone_2" v-mask="'(##) #####-####'">
                </div>
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="dados.email" required>
                </div>
            </div>

            <h5 class="mt-3">Endereço</h5>
            <hr>

            <div class="form-row" id="row">
                <div class="form-group col-md-2">
                    <label for="cep">CEP</label>
                    <input type="text" class="form-control" id="cep" v-model="dados.cep" @blur="getAdress()" required>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-6">
                    <label for="logradouro">Logradouro</label>
                    <input type="text" class="form-control" id="logradouro" v-model="dados.logradouro" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="complemento">Complemento</label>
                    <input type="text" class="form-control" id="complemento" v-model="dados.complemento">
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-4">
                    <label for="bairro">Bairro</label>
                    <input type="text" class="form-control" id="bairro" v-model="dados.bairro" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="municipio">Município</label>
                    <input type="text" class="form-control" id="municipio" v-model="dados.municipio" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="estado">Estado</label>
                    <input type="text" class="form-control" id="estado" v-model="dados.estado" required>
                </div>
            </div>

            <hr>
            
            <div class="row-md-4 text-center mt-4 mb-3">
                <button type="button" class="btn btn-primary btn-lg" @click="updateUser">Atualizar</button>
            </div>
        </form>

    </div>

</template>

<script>
import axios from "axios";
import Authorization from "../authorization";

const AuthContent = Authorization;

export default {
    name: "UpdadeCliente",
    data() {
        return {
            idCliente: this.dados.id, // armazena o id do user cliente
        }
    },
    props: {
        dados: Object //armazena os dados do user cliente
    },
    methods: {

        //Pega dados da api via cep e atiubui a variáveis
        getAdress: function(){
            axios.get(`https://viacep.com.br/ws/${this.dados.cep}/json/`)
            .then( res => {
                this.dados.logradouro = res.data.logradouro;
                this.dados.complemento = res.data.complemento;
                this.dados.bairro = res.data.bairro;
                this.dados.municipio = res.data.localidade;
                this.dados.estado = res.data.uf;

                console.log(res);

                console.log(this.dados);
            })
            .catch( e => {
                alert(e);
            });
        },

        //Atualiza dados do user cliente na api
        updateUser: function(){
            axios.post(`http://localhost:8000/api/update-cliente/${this.idCliente}`, {
                name: this.dados.name,
                last_name: this.dados.last_name,
                email: this.dados.email,
                cpf: this.dados.cpf,
                telefone_1: this.dados.telefone_1,
                telefone_2: this.dados.telefone_2,
                cep: this.dados.cep,
                logradouro: this.dados.logradouro,
                complemento: this.dados.complemento,
                bairro: this.dados.bairro,
                municipio: this.dados.municipio,
                estado: this.dados.estado
            }, {
                headers: AuthContent
            }).then( res => {
                console.log(res);
                alert("Cadastro atualizado com sucesso!");
            })
            .catch( e => {
                alert(e);
            });
        },

        fechar: function(){
            this.$emit("fechar");
        }
    }

}
</script>

<style scoped>

    #row {
        background-color: rgb(241, 241, 241);
    }

    #titulo {
        background-color: dimgrey;
        color: white
    }

</style>