<template>
    <div class="a">
        <h1>Editar Provincia</h1>
        <br><br><br>
        <el-form :model="usr" label-width="120px">
            <el-form-item label="Nombre">
                <el-input v-model="usr.name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Modificar</el-button>
                <RouterLink to="/listarprov"><el-button>Cancel</el-button></RouterLink>


            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            provincias: [],
            usr: {"name": ""
            },
            data: localStorage.Token


        }
    },

    created: function () {
        this.consultarProvincias()

    },
    methods: {

        consultarProvincias() {
            fetch('http://localhost:8000/api/provincias/' + this.$route.params.id,
                {
                    headers: {
                        Authorization: `Bearer ${this.data}`,
                        token: this.data
                    }
                })
                .then(respuesta => respuesta.json())
                .then((datosProvincia) => {
                    console.log(datosProvincia)
                    this.usr = datosProvincia
                    console.log(this.usr)

                }).catch(console.log)
        },
        async onSubmit() {
            var datosEnviar = {
                "id": this.$route.params.id,
                "name": this.usr.name,

            }
            await fetch('http://localhost:8000/api/provincias/' + this.$route.params.id, {
                method: 'PUT',
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
            this.$message.success("Provincia Actualizada");
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

.a {
    display: block;
    margin-left: -200px;
}
</style>