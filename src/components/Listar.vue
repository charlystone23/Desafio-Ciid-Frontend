<template>
    <!--  -->

    <header>
        <div class="wrapper">
            <h1 class="green">Desafio CIID</h1>
            <div style="margin-left:1000px;top:-10px;font-size:50px">
                <RouterLink to="/login"><el-button v-if="(!is_logged)" type="success">LOGIN</el-button></RouterLink>
                <el-button v-if="is_logged" v-on:click="salir()" type="warning">LOG OUT</el-button>
            </div>
            
            <div>
                <el-breadcrumb separator="-">
                    <el-breadcrumb-item :to="{ path: './' }">
                        Usuarios
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: './listarprov' }">Provincias</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <nav>
                <RouterLink to="/crear"><el-button v-if="is_logged" type="info">NUEVO USUARIO</el-button></RouterLink>
                <el-scrollbar height="400px">
                    <div>
                        <el-table :data="nombres" style="width: 100%">

                   

                            <el-table-column prop="lastname" label="Apellido" />
                            <el-table-column prop="name" label="Nombre" />
                            <el-table-column prop="dni" label="Dni" />
                            <el-table-column prop="fnac" label="Fecha de Nacimiento" />
                            <el-table-column prop="adress" label="Direccion" />
                            <el-table-column prop="provincia" label="Provincia" />

                            <el-table-column :style="{ 'display': 'flex' }">
                                <template #header>
                                    <el-input v-model="search" v-on:change="searchFilter()" type="search" id="search" size="small" placeholder="Type to search" />
                                </template>
                                <template #default="scope">
                                    <el-button type="warning" v-on:click="esEditar(scope.row.id)" v-if="is_logged"
                                        style="display:flex">Editar</el-button>
                                    <el-button v-on:click="borrarUsuario(scope.row.id)" v-if="is_logged"
                                        type="danger">Eliminar</el-button>
                                </template>
                            </el-table-column>

                        </el-table>





                    </div>
                </el-scrollbar>

            </nav>
        </div>
    </header>




    <RouterView />

</template>

<script>
import axios from 'axios';
import { computed, ref } from 'vue';


export default {


    data() {
        return {
            usuarios: [],
            provincias: [],
            nombres: [],
            datos:[],

            is_logged: false,
            data: localStorage.Token,
            search:'',
            filterDataTable: computed(() =>
                nombres.filter((datos),
                    !search.value ||
                    datos.toLowerCase().includes(search.value.toLowerCase())
                ))



        }

    },
    created: function () {
        this.isLogeed();
        this.consultarUsuarios();
        this.searchFilter();

        //this.arregloNombres();

    },
    methods: {
        consultarUsuarios() {
            fetch('http://localhost:8000/api/user').then(respuesta => respuesta.json()).then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.usuarios = []
                if (typeof datosRespuesta[0].success === 'undefined') {
                    this.usuarios = datosRespuesta;
                }
                this.consultarProvincias();
            }).catch(console.log);
        },

        consultarProvincias() {
            fetch('http://localhost:8000/api/provincias').then(respuesta => respuesta.json()).then((datosProvincia) => {
                console.log(datosProvincia)
                this.provincias = []
                if (typeof datosProvincia[0].success === 'undefined') {
                    this.provincias = datosProvincia;
                }
                this.arregloNombres()
            }).catch(console.log);

        },
        arregloNombres() {
            this.nombres = []
            let i
            for (i of this.provincias) {
                for (let j of this.usuarios) {
                    if (j.id_Provincia == i.id) {
                        this.nombres.push({ 'id': j.id, 'lastname': j.lastname, 'name': j.name, 'dni': j.dni, 'fnac': j.fnac, 'adress': j.adress, 'provincia': i.name })
                    }
                }
            }
            console.log(this.nombres);
        },

        borrarUsuario(id) {
            console.log(id);
            axios.delete('http://localhost:8000/api/user/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.data}`,
                    token: this.data
                }
            }
            )
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    this.consultarUsuarios()


                }).catch(console.log);

            /* fetch('http://localhost:8000/api/user/' + id, { method: 'DELETE' }).then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.consultarUsuarios()


            }).catch(console.log); */




        },

        isLogeed() {
            const data = localStorage.Token
            if (data) {
                console.log('hay datos');
                this.is_logged = true
            } else {
                console.log('No hay datos');
            }
        },
        esEditar(id) {

            /*  axios.put('http://localhost:8000/api/user/' + id, {
                body: JSON.stringify(this.usuarios),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.data}`,
                    token: this.data
                }
                 
            }
 
            ).then(this.$router.push("/editar/" + id)
             ) */

            this.$router.push(`/editar/${id}`)
        },
        salir() {
            localStorage.removeItem('Token')
            //this.$router.push('/login')
            location.reload('/')
        },
        searchFilter(){
            console.log(this.search)
        }


    }



}

</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: 30px;
}



header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}

.el-scrollbar {
    align-items: center;
    justify-content: center;

}

.cell {
    display: flex !important;
}

.el-button--warning{
    margin-left: 20px;
    margin-top:5px
}

.el-button--danger{
    margin-top:10px
}
</style>
