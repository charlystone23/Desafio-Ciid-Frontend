<template >
    <div class="login">
        <el-card>
            <h2>Login</h2>
            <el-alert title="error alert" type="error" v-if="error" />
            <el-form class="login-form" :model="model" :rules="rules" ref="form" @submit.native.prevent="login">
                <el-form-item prop="username">
                    <el-input v-model="model.username" placeholder="username">

                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="model.password" placeholder="Password" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" class="login-button" type="primary" native-type="submit"
                        block>Login</el-button>
                </el-form-item>
                <RouterLink to="/"><a class="forgot-password">Volver</a></RouterLink>



            </el-form>

        </el-card>

    </div>

</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

export default {


    name: "login",
    data() {

        return {
            error:false,
            model: {
                username: "",
                password: ""
            },
            loading: false,
            rules: {
                username: [
                    {
                        required: true,
                        message: "Username is required",
                        trigger: "blur"
                    },
                    {
                        min: 4,
                        message: "Username length should be at least 5 characters",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "Password is required", trigger: "blur" },
                    {
                        min: 5,
                        message: "Password length should be at least 5 characters",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    methods: {
        simulateLogin() {
            return new Promise(resolve => {
                setTimeout(resolve, 800);
            });
        },
        async login() {
            let valid = await this.$refs.form.validate();
            if (!valid) {
                return;
            }
            this.loading = true;
            await this.simulateLogin();
            this.loading = false;
            //mandas el username y pass a api y devuelve el token
            const user = {
                'usernam': this.model.username,
                'passwor': this.model.password
            }

            axios.post('http://localhost:8000/api/login', user)
                .then(data => {
                    console.log(data);
                    if (data) {
                        //se obtiene el token
                        localStorage.setItem('Token', data.data)
                        console.log('este es >' + data.data);
                        //redireccionar
                        this.$router.push('/listar')
                    }/* else{
                    alert('Incorrecto')
                    this.usernam = ''
                    this.passwor = ''
                } */
                }).catch(error => {
                    console.error('Error', error);
                    this.error=true
                    this.usernam = ''
                    this.passwor = ''
                })
            /* fetch('http://localhost:8000/api/login', 
                {method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }}
                )
                .then((data) => {
                console.log(data);
                } ) */
            /* if (
                this.model.username === this.validCredentials.username &&
                this.model.password === this.validCredentials.password
            ) {
                
                this.$message.success("Login successfull");
                localStorage.setItem('Token', 'asdasdawdqwdqwd123123')
                this.$router.push('/')
                

            } else {
                this.$message.error("Username or password is invalid");
            } */
        }
    }
}


</script>

<style>
.login-button {
    width: 100%;
    margin-top: 40px;
}

.login-form {
    width: 290px;
}

.login {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login .el-input input {
    padding-left: 5px;
}

.login .el-card {
    padding-top: 0;
    padding-bottom: 30px;
    margin-left: -150px;
}

h2 {
    font-family: "Roboto";
    letter-spacing: 1px;
    font-family: Roboto, sans-serif;
    padding-bottom: 20px;
    margin-left: 100px;
}


a {
    color: teal;
    text-decoration: none;
    color: lighten(teal, 7);

}

.login .el-card {
    width: 340px;
    display: flex;
    justify-content: center;
}
</style>

