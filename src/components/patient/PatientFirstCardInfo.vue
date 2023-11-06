<template>
    <div class="d-flex flex-no-wrap justify-space-between">
        <div>
            <div class="title ml-4 mt-2" v-text="patientFirstName" ></div>
            <div v-text="patientLastName" class="subtitle-1 ml-4  grey--text"></div>
            <div class="subtitle-1 ml-4 grey--text">
                {{ patientAddress }}
            </div>
            <div class="subtitle-1 ml-4 grey--text">
                {{ patientCity || " " }},
                {{ patientState || " " }}
            </div>
            <div class="subtitle-1 ml-4 grey--text">
                Edad: {{ parseInt(patientAge) }} años
            </div> 
            <v-card-actions>
                <v-chip class="ml-2 mb-2" color="#00afb9"  label outlined >
                    {{ patientGender }}
                </v-chip>
            </v-card-actions>
        </div>
        <v-avatar class="ma-3" size="100">
            <v-img :src="patientProfilePicture"></v-img>
        </v-avatar>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            'patientFirstName': String,
            'patientLastName': String,
            'patientAddress': String,
            'patientCity': String,
            'patientState': String,
            'patientAge': {type:String, default: ""},
            'patientGender': String, 
            'patientProfilePicture': String
        },

        data() { return { } }
    }
</script>