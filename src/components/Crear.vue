<template>
    <div class="a">
        <h1>Crear Nuevo Usuario</h1>
        <br><br><br>
        <el-form :model="usr" label-width="120px">
            <el-form-item label="Apellido">
                <el-input v-model="usr.lastname" />
            </el-form-item>
            <el-form-item label="Nombre">
                <el-input v-model="usr.name" />
            </el-form-item>
            <el-form-item label="Dni">
                <el-input v-model="usr.dni" />
            </el-form-item>
            <el-form-item label="F. Nacimiento">
                <el-input v-model="usr.fnac" />
            </el-form-item>
            <el-form-item label="Direccion">
                <el-input v-model="usr.adress" />
            </el-form-item>
            <el-form-item label="Provincia">
                <el-select v-model="usr.id_Provincia" placeholder="por favor elija su provincia">
                    <el-option v-for="provincia in provincias" :prop="provincia.id" :label="provincia.name"
                        :value="provincia.id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <RouterLink to="/"><el-button>Cancel</el-button></RouterLink>


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
            usr: {
                "lastname": "",
                "name": "",
                "dni": "",
                "fnac": "",
                "adress": "",
                "id_Provincia": "",

            },
            data: localStorage.Token

        }
    },

    created: function () {
        this.consultarProvincias()

    },
    methods: {
        consultarProvincias() {
            fetch('http://localhost:8000/api/provincias/')
                .then(respuesta => respuesta.json())
                .then((datosProvincia) => {
                    console.log(datosProvincia)
                    this.provincias = []
                    if (typeof datosProvincia[0].success === 'undefined') {
                        this.provincias = datosProvincia;
                    }
                }).catch(console.log)
        },
        async onSubmit() {
            var datosEnviar = {
                "lastname": this.usr.lastname,
                "name": this.usr.name,
                "dni": this.usr.dni,
                "fnac": this.usr.fnac,
                "adress": this.usr.adress,
                "id_Provincia": this.usr.id_Provincia,
            }
            fetch('http://localhost:8000/api/user', {
                method: 'POST',
                body: JSON.stringify(datosEnviar),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.data}`,
                    token: this.data
                }
            })
                .then(res => res.json())
                .catch(error => console.error('Error', error))
                .then(response => console.log('Success', response))
            console.log('submit!')
            this.$message.success("Usuario Creado");
            console.log(this.usr)
            this.$router.push('/');

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