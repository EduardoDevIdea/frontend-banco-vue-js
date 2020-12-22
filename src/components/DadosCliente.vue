<template>
    
    <div>

        <form class="mb-5 px-3 border rounded border-dark ">

           <div id="title" class="row">
                <div class="col-md-12 text-right">
                    <strong><a href="#" @click="fechar">Fechar</a></strong>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-center">
                    <button class="btn btn-primary btn-sm" @click="showUpdateCliente">Atualizar cadastro</button>
                </div>
            </div>

            <h5 class="mt-3">Cliente</h5>
            <hr>

            <div class="form-row" id="row">
                <div class="form-group col-md-6">
                    <label for="name"><strong>Nome</strong></label>
                    <input type="text" class="form-control" id="name" v-model="dados.name" disabled>
                </div>
                <div class="form-group col-md-6">
                    <label for="last_name"><strong>Sobrenome</strong></label>
                    <input type="text" class="form-control" id="last_name" v-model="dados.last_name" disabled>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-2">
                    <label for="cpf"><strong>CPF</strong></label>
                    <input type="text" class="form-control" id="cpf" v-model="dados.cpf" maxlength="14" disabled>
                </div>
                <div class="form-group col-md-2">
                    <label for="telefone_1"><strong>Telefone 1</strong></label>
                    <input type="text" class="form-control" id="telefone_1" v-model="dados.telefone_1" disabled>
                </div>
                <div class="form-group col-md-2">
                    <label for="telefone_2"><strong>Telefone 2</strong></label>
                    <input type="text" class="form-control" id="telefone_2" v-model="dados.telefone_2" disabled>
                </div>
                <div class="form-group col-md-6">
                    <label for="email"><strong>Email</strong></label>
                    <input type="email" class="form-control" id="email" v-model="dados.email" disabled>
                </div>
            </div>

            <h5 class="mt-3">Endereço</h5>
            <hr>

            <div class="form-row" id="row">
                <div class="form-group col-md-2">
                    <label for="cep"><strong>CEP</strong></label>
                    <input type="text" class="form-control" id="cep" v-model="dados.cep"  disabled>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-6">
                    <label for="logradouro"><strong>Logradouro</strong></label>
                    <input type="text" class="form-control" id="logradouro" v-model="dados.logradouro" disabled>
                </div>
                <div class="form-group col-md-6">
                    <label for="complemento"><strong>Complemento</strong></label>
                    <input type="text" class="form-control" id="complemento" v-model="dados.complemento" disabled>
                </div>
            </div>

            <div class="form-row" id="row">
                <div class="form-group col-md-4">
                    <label for="bairro"><strong>Complemento</strong></label>
                    <input type="text" class="form-control" id="bairro" v-model="dados.bairro" disabled>
                </div>
                <div class="form-group col-md-4">
                    <label for="municipio"><strong>Município</strong></label>
                    <input type="text" class="form-control" id="municipio" v-model="dados.municipio" disabled>
                </div>
                <div class="form-group col-md-4">
                    <label for="estado"><strong>Estado</strong></label>
                    <input type="text" class="form-control" id="estado" v-model="dados.estado" disabled>
                </div>
            </div>
            
        </form>

    </div>

</template>

<script>
export default {
    name: "DadosCliente",
    data(){
        return{
            showUserData: false,
            showForm: true
        }
    },
    props: {
        dados: Object
    },
    methods: {
        fechar: function(){
            this.$emit("fechar");
        },
        showUpdateCliente: function(){
            this.$emit("showUpdateCliente");
        }
    }
}
</script>

<style scoped>

    input {
        background-color:rgb(97, 20, 220);
    }

</style>