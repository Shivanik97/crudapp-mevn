<template>
    <div v-if="isAuth" class="q-pa-md">
        <HeaderComp>
            <div class="q-pa-md">Welcome!!</div>
        </HeaderComp>
        <AllUsers />
    </div>
    <div v-else class="q-pa-md q-gutter-sm text-center">
        <q-btn @click="login">Log-In</q-btn>
    </div>
</template>
<script>
import { myMSALObj } from '../service/aad.js'
import { graphScopes } from '../service/aad.js'
import AllUsers from './AllUsers.vue'
import HeaderComp from './HeaderComp.vue'

export default {
    components: {
        AllUsers,
        HeaderComp
    },
    data() {
        return {
            isAuth: false,
            user: null
        }
    },
    methods: {
        async login() {
            try {
                const result = await myMSALObj.loginPopup(graphScopes)
                this.isAuth = true;
                this.getToken();
                sessionStorage.setItem("authToken", result.accessToken);
                // console.log("User logged in");
            } catch (err) {
                // console.log(err)
            }
        },
        async getToken() {
            try {
                const response = await myMSALObj.acquireTokenSilent({
                    scopes: ['user.read']
                });
                this.user = response.account.name;
                // console.log('Token success', response.accessToken)
                sessionStorage.setItem('accessToken', response.accessToken);
                return response.accessToken
            } catch (error) {
                // console.log('Token error', error)
                return null
            }
        },
    },
}
</script>
<style></style>
  