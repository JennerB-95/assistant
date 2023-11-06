<template>
    <v-dialog v-model="dialogg" hide-overlay persistent width="300">
        <v-card color="#00afb9" dark>
            <v-card-text>
                Guardando información...
                <ProgressLinearComponent></ProgressLinearComponent>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import ProgressLinearComponent from "./ProgressLinearComponent.vue"

    export default {
        components: {
            ProgressLinearComponent
        },
        props: { 
            dialog: {
                type: Boolean,
                default: false
            } 
        },
        data() { return {
            dialogg: this.dialog
        } }, 
    }
</script>