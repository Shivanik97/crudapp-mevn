<template>
    <div class="q-pa-md">
        <h4>All Users</h4>
        <div v-if="message" class="alert alert-success">
            {{ this.message }}</div>
        <div class="q-gutter-md">
            <q-markup-table :separator="separator" flat bordered>
                <thead>
                    <tr class="text-h2 text-black">
                        <th class="text-left">First Name</th>
                        <th class="text-left">Last Name</th>
                        <th class="text-left">Email Id</th>
                        <th class="text-left">Update</th>
                        <th class="text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" v-bind:key="user.id">

                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.emailId }}</td>
                        <td>
                            <q-btn icon="edit" flat v-on:click="updateUser(user.id)">
                            </q-btn>
                        </td>
                        <td>
                            <q-btn icon="delete" flat v-on:click="deleteUser(user.id)">
                            </q-btn>
                        </td>
                    </tr>
                </tbody>
            </q-markup-table>
            <div class="q-gutter-md">
                <q-btn v-on:click="addUser()">Add</q-btn>
            </div>
        </div>
    </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
import { ref } from 'vue'

export default {
    name: "AllUsers",
    data() {
        return {
            users: [],
            message: "",
            separator: ref('vertical'),
        };
    },
    methods: {
        refreshUsers() {
            UserDataService.retrieveAllUsers().then((res) => {
                this.users = res.data;
            });
        },
        addUser() {
            this.$router.push(`/user/-1`);
        },
        updateUser(id) {
            this.$router.push(`/user/${id}`);
        },
        deleteUser(id) {
            UserDataService.deleteUser(id).then(() => {
                this.refreshUsers();
            });
        },
    },
    created() {
        this.refreshUsers();
    },
};
</script>