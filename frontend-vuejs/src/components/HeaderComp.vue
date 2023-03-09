<template>
    <div>
        <q-layout view="lHh lpr lFf" container style="height: 100px">
            <q-header class="bg-white text-black">
                <q-toolbar>
                    <q-toolbar-title class="text-center">ALL USERS</q-toolbar-title>
                    <slot></slot>
                    <q-btn @click="logout">Log-Out</q-btn>
                </q-toolbar>
            </q-header>
        </q-layout>
    </div>
</template>

<script>
import { myMSALObj } from '../service/aad.js'
import { graphScopes } from '../service/aad.js'
export default {
    setup() {
        return {
            async logout() {
                try {
                    await myMSALObj.logout(graphScopes)
                    this.isAuth = false;
                } catch (err) {
                    // console.log(err)
                }
            },
        }
    }
}
</script>

<style lang="scss" scoped></style>