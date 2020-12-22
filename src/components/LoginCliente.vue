<template> 
    
    <div> 

       <div class="card mx-auto" id="card">
            <div class="card-header text-center">
                <strong>Acessar minha conta</strong>
            </div>
            <div class="card-body">
                <!-- Formulario Login -->
                <form>
                    <div class="form-group">
                        <label for="cpf">CPF</label>
                        <input type="text" id="cpf" class="form-control" v-model="loginFields.cpf" autocomplete="off" required>
                    </div>
                    <div class="form-group">
                        <label for="senha">SENHA</label>
                        <input type="password" id="senha" class="form-control" v-model="loginFields.password" autocomplete="off" required>
                    </div>
                    <div class="row mt-4">
                        <button  type="button" class="btn btn-primary mx-auto" @click="entrar">Entrar</button>
                    </div>
                </form>
                    <!-- End formulario Login -->
            </div>
        </div>

    </div>

</template>

<script>

export default {
    name: "LoginCliente",

    data() {
        return {
            loginFields: {
                cpf: "",
                password: "",
                loginTipo: "cliente",
            },
        }
    },

    methods: {
        entrar: function(){
            this.$emit("entrar", this.loginFields)
        }
    }
}
</script>

<style scoped>

#card {
        margin-top: 120px;;
        width: 250px;
    }

    .card-body{
        background-color: #F8F9FA;
    }

</style>