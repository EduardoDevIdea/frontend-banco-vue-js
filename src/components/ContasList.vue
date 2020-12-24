<template>

    <div>

        <div class="row justify-content-end">
            <router-link to="/painel-adm">
                <strong>Voltar</strong>
            </router-link>
        </div>

        <table class="table mt-5">
            <thead class="thead-dark">
                <tr>
                    <th>Nº Conta</th>
                    <th>cpf</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Ações</th>
                </tr> 
            </thead>

            <tbody>
                
                <tr v-if="loader">
                    <td class="text-center" colspan="4">
                        <img id="loader" src="../assets/loading.svg" alt="">
                    </td> 
                </tr>
                
                <tr v-for="conta in contas" :key="conta.id">
                    <td>{{ conta.num_conta }}</td>
                    <td>{{ conta.cpf }}</td>
                    <td>{{ conta.user_name }}</td>
                    <td>{{ conta.user_last_name }}</td>
                    <td>
                        <router-link :to="'/show-conta/' + conta.cpf" class="btn btn-primary btn btn-sm"> Exibir </router-link>
                    </td>
                </tr>
            </tbody>

        </table>
        
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    name: "ContasList",
    data(){
        return {
            urlContas: "http://localhost:8000/api/contas",
            contas: [],
            loader: ""
        }
    },
    created: function() {

        //Verifica se usuario esta autenticado
        axios.post("http://localhost:8000/api/auth-user", {key: 'value'}, {
            headers: {
                'Authorization': 'bearer' + localStorage.getItem('token')
            }
        }).then( res => {
            console.log(res);
            this.getContas();
        }).catch(e => {
            console.log(e);
            this.$router.push('/painel-adm');
        });

    },
    methods: {
        getContas: function(){
            this.loader = true;

            axios.get(this.urlContas, {
                headers: {
                    'Authorization': 'bearer' + localStorage.getItem('token')
                }
            })
            .then(res => {
                this.contas = res.data;
                console.log (res.data);
            }).catch( e => {
                alert(e); // retorna o erro, caso não consiga executar o comando do bloco acima
            }).finally(() => { //finally é executado depois do bloco anterior, independente do resultado. Normalmente depois de then e catch
                this.loader = false;
            });
        }
    }
}
</script>

<style scoped>
    #loader {
        width: 80px;
        height: 80px;
        margin: auto;
        animation: spin 2s infinite; /* o elemento com o id loader tem uma animação de nome 'spin' duração de 2 seguntos e numero de vezes que vai executar como infinita */
    }

    @keyframes spin {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    }
</style>