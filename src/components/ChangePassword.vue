<template>
    
<div>
        <div class="card mt-3 mb-3 mx-auto">

            <div class="card-header">
                <div class="row">
                    <div class="col text-right">
                        <a href="#" @click="fechar"><strong>Fechar</strong></a>
                    </div>
                </div>
                <h5>Alterar senha</h5>
            </div>
            
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Senha atual</label>
                        <input type="password" class="form-control" id="valor" v-model="currentPassword" aria-describedby="valorHelp" required>
                        <small id="valorHelp" class="form-text text-muted">Digite a senha atual</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nova senha</label>
                        <input type="password" class="form-control" id="valor" v-model="newPasswowrd" aria-describedby="valorHelp" required>
                        <small id="valorHelp" class="form-text text-muted">Digite a nova senha</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Repetir senha</label>
                        <input type="password" class="form-control" id="valor" v-model="repeatPassword" aria-describedby="valorHelp" required>
                        <small id="valorHelp" class="form-text text-muted">Digite a nova senha novamente</small>
                    </div>
                    <button type="button" class="btn btn-primary" @click="alterar">Alterar</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "ChangePassword",

    data(){
        return {
            currentPassword: "",
            newPasswowrd: "",
            repeatPassword: "",
        }
    },

    props: {
        cpf: String // pega o cpf do componente pai para futuras verificações
    },

    methods: {
        //verifica a senha antiga e altera para a senha nova
        alterar: function(){
            if(this.newPasswowrd == this.repeatPassword){
                this.confirmChange();
            }else{
                alert("A nova senha não confere com a repetição.")
            }
        },

        //Requisição de mudança de senha
        confirmChange: function(){

            axios.post("http://localhost:8000/api/change-password", {
                cpf: this.cpf,
                currentPassword: this.currentPassword,
                newPasswowrd: this.newPasswowrd }, {
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            }).then( res => {
                alert(res.data.msg);
            }).catch( e => {
                alert("ERRO: " +  e);
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