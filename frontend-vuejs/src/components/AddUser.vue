<template>
    <div>
        <div class="q-pa-md">
            <h4>Add User</h4>
            <div class="q-gutter-md">
                <q-form @submit="validateAndSubmit" >
                    <div v-if="errors.length">
                        <div v-bind:key="index" v-for="(error, index) in errors">
                            <q-field color="teal" borderless>
                                {{ error }}
                            </q-field>
                        </div>
                    </div>
                    <div class="q-gutter-md" style="max-width: 400px">
                        <q-input type="text" outlined v-model="firstName" label="First Name" />
                        <q-input type="text" outlined v-model="lastName" label="Last Name" />
                        <q-input type="text" outlined v-model="emailId" label="Email Id" />
                        <q-btn type="submit">Save</q-btn>
                        <q-btn to="/showusers">Back</q-btn>
                    </div>
                </q-form>
            </div>
        </div>
    </div>
</template>
<script>
import UserDataService from "../service/UserDataService";

export default {
    name: "GetUser",
    data() {
        return {
            firstName: "",
            lastName: "",
            emailId: "",
            errors: [],
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        refreshUserDetails() {
            UserDataService.retrieveUser(this.id).then((res) => {
                this.firstName = res.data.firstName;
                this.lastName = res.data.lastName;
                this.emailId = res.data.emailId;
            });
        },
        validateAndSubmit(e) {
            e.preventDefault();
            this.errors = [];
            if (!this.firstName) {
                this.errors.push("Enter valid values");
            } else if (this.firstName.length < 4) {
                this.errors.
                    push("Enter atleast 4 characters in First Name");
            }
            if (!this.lastName) {
                this.errors.push("Enter valid values");
            } else if (this.lastName.length < 4) {
                this.errors.
                    push("Enter atleast 4 characters in Last Name");
            }
            if (this.errors.length === 0) {
                if (this.id == -1) {
                    UserDataService.createUser({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        emailId: this.emailId,
                    }).then(() => {
                        this.$router.push("/showusers");
                    });
                } else {
                    UserDataService.updateUser(this.id, {
                        id: this.id,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        emailId: this.emailId,
                    }).then(() => {
                        this.$router.push("/showusers");
                    });
                }
            }
        },
    },
    created() {
        this.refreshUserDetails();
    },
};
</script>