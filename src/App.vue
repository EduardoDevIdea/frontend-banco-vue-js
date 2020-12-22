<template>

  <div id="app" class="background-img">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img id="logo" src="./assets/logo-banco.png" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <a class="nav-link active" href="">
              <strong>BancoFácil</strong>
            </a>
          </li>

          <li v-if="loggedIn" class="nav-item">
            <a href="" class="nav-link" id="user-item">
              Olá, {{this.user.name}}!
            </a>
          </li>

          <!-- se user não logado ou user cliente -->
          <li>
              <a v-if=" !loggedIn || tipoUser == 'cliente' " class="nav-link">
                <router-link to="/painel-cliente" class="btn btn-primary btn-sm">Minha conta</router-link>
              </a>
          </li>

          <li v-if="loggedIn" class="nav-item">
            <a class="nav-link" href="#">
              <button @click="logout" class="btn btn-secondary btn-sm">Sair</button>
            </a>
          </li>

        </ul>

        <!-- se user não logado ou user admin -->
        <ul v-if=" !loggedIn || tipoUser == 'admin' " class="navbar-nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link">
              <router-link to="/painel-adm" class="btn btn-outline-dark btn-sm">Administração</router-link>
            </a>
          </li>
        </ul>
        
      </div>
    </nav>

    <!-- Renderiza a view -->
    <div class=" container justify-content-center" >
          <router-view/>
    </div>
    <!-- -->

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data() {
    return {
      loggedIn: "", //recebe true se estiver logado
      tipoUser: "", // recebe admin ou cliente
      user: "" //recebe dados do usuário logado
    }
  },

  mounted: function(){

    //verifica se user está logado
    axios.post("http://localhost:8000/api/auth-user", {key: 'value'}, {
      headers: {
        'Authorization': 'bearer' + localStorage.getItem('token')
      }
    }).then( res => {
      console.log(res);
      this.user = res.data;
      this.loggedIn = true;
      this.tipoUser = localStorage.getItem("tipoUser");
      //console.log(this.tipoUser);
    }).catch(e => {
      this.$router.push('/welcome'); 
      console.log(e); // mostra mensagem infornando que user não esta logado
    });
  },

  methods: {

    logout: function(){
      var ok = confirm("Deseja realmente sair?"); //se confirmar, variavel ok recebe true

      if(ok == true){ 

        //requisição de logout
        axios.post("http://localhost:8000/api/logout", {key: 'value'}, {
          headers: {
            'Authorization': 'bearer' + localStorage.getItem('token')
          }
        }).then( res => {
          console.log(res);
          this.user = "";
          this.loggedIn = "";
          this.tipoUser= "";
          this.$router.push('/welcome'); //redireciona para tela inicial
        }).catch( e => {
          alert(e);
        });

      }
    }
  },
  
}
</script>

<style scoped>

  #logo {
    width: 70px;
    height: 60px;
  }

</style>
