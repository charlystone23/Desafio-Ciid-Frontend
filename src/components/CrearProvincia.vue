<template >
    <h1>Crear Nueva Provincia</h1>
    <br><br><br>
    <el-form :model="usr" label-width="120px">
        <el-form-item label="Nombre">
            <el-input v-model="usr.name" />
            <br><br>

            <el-button type="primary" @click="onSubmit">Crear</el-button>

            <RouterLink to="/listarprov"><el-button>Cancel</el-button></RouterLink>
        </el-form-item>
    </el-form>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {

            usr: {
                "name": ""
            },
            data: localStorage.Token,

        }
    },

    created: function () {

    },
    methods: {
        async onSubmit() {
            var datosEnviar = {
                "name": this.usr.name
            }
            await fetch('http://localhost:8000/api/provincias', {
                method: 'POST',
                body: JSON.stringify(datosEnviar),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.data}`,
                    token: this.data
                }
            }).then(res => res.json())
                .catch(error => console.error('Error', error))
                .then(response => console.log('Success', response))
            console.log('submit!')
            this.$message.success("Provincia Creada");
            console.log(this.usr)
            this.$router.push('/listarprov');

        }
    }
}



</script>
<style>
.el-alert {
    margin: 20px 0 0;
}

.el-alert:first-child {
    margin: 0;
}
</style>