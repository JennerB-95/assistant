<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                color="blue-grey lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
                >
                mdi-help-circle
                </v-icon>
            </template> 
            <ul>
                <li v-for="item in indications" :key="item">{{item}}</li>  
            </ul>
        </v-tooltip> 
    </div>
</template>

<script>
    export default {
        data() { 
            return {
                dialogVsInfo: false,   
            } 
        },

        props: {
            // Dialog title
            vitalSignName: {
                type: String
            },

            // Vs indications for patient
            indications: {
                type: Array
            },

        }
    }
</script>