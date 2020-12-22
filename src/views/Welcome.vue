<template>
    <div>
        <div class="container">
            <h2>Banco Fácil</h2>
            <img src="../assets/sign-in-8.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "Welcome",
}
</script>

<style scoped>

    .container{
        width: 90%;
        display: flex; /* elementos um ao lado do outro */
        justify-content: center; /* elementos alinhados no eixo x */
        align-items: center; /* elementos alinhados no eixo y*/
    }

    .container h2{
        font-size: 50px;
    }

    .container img{
        width: 650px;
    }

</style>