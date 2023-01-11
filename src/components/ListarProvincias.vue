<template>
    <header>
        <div class="wrapper">
            <h1 class="green">Desafio CIID</h1>
            <div style="margin-left:1000px;top:-10px;font-size:50px">
                <RouterLink to="/login"><el-button v-if="(!is_logged)" type="success">LOGIN</el-button></RouterLink>
                <el-button v-if="is_logged" v-on:click="salir()" type="warning">LOG OUT</el-button>
            </div>
            <div>
                <el-breadcrumb separator="-">

                    <el-breadcrumb-item :to="{ path: './listarprov' }">Provincias</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: './' }">
                        Usuarios
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <nav>
                <RouterLink to="/crearprov"><el-button v-if="is_logged" type="info">NUEVA PROVINCIA</el-button>
                </RouterLink>
                <el-scrollbar height="400px">
                    <div>
                        <el-table :data="provincias" style="width: 100%">
                            <el-table-column prop="id" label="Id Provincia" width="180" />
                            <el-table-column prop="name" label="Nombre" width="180" />

                            <el-table-column v-if="is_logged">
                                <template #default="scope">
                                    <el-button type="warning" v-on:click="esEditar(scope.row.id)">Editar</el-button>

                                </template>
                            </el-table-column>


                            <el-table-column v-if="is_logged">
                                <template #default="scope">
                                    <el-button v-on:click="borrarProvincia(scope.row.id)"
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

export default {
    data() {
        return {
            usuarios: [],
            provincias: [],
            nombres: [],
            is_logged: false,
            data: localStorage.Token


        }
    },
    created: function () {
        this.isLogeed();
        this.consultarProvincias();


    },
    methods: {
        consultarProvincias() {
            fetch('http://localhost:8000/api/provincias').then(respuesta => respuesta.json()).then((datosProvincia) => {
                console.log(datosProvincia)
                this.provincias = []
                if (typeof datosProvincia[0].success === 'undefined') {
                    this.provincias = datosProvincia;
                }

            }).catch(console.log);

        },

        borrarProvincia(id) {
            console.log(id);
            axios.delete('http://localhost:8000/api/provincias/' + id,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.data}`,
                    token: this.data
                }
            }).then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    this.consultarProvincias()


                }).catch(console.log);


            /* fetch('http://localhost:8000/api/provincias/' + id, { method: 'DELETE' }).then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.$router.push('/listarprov');
                this.consultarProvincias()
            }).catch(console.log); */
        },

        isLogeed() {
            const data = localStorage.Token
            if (data) {
                console.log('hay datos');
                this.is_logged = true
            } else {
                console.log('No hay datop');
            }
        },
        esEditar(id) {

          /*   axios.put('http://localhost:8000/api/provincias/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.data}`,
                    token: this.data
                }
            }

            ).then(this.$router.push("/editarprov/" + id)
            ) */
            this.$router.push(`/editar/${id}`)
        },
        salir() {
        localStorage.removeItem('Token')
        //this.$router.push('/login')
        location.reload('/')
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
</style>
