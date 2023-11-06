<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class=" ">
                        Estudios de imagen
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-if="imageDiagnosis.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada. </p>
                    </div>
                    <div v-else>
                        <v-slide-group   active-class="success" show-arrows>
                            <v-slide-item v-for="( item, index ) in imageDiagnosis" v-bind:key="index">
                                <v-card class="ma-3" max-width="250" min-width="250" outlined>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="space-between" no-gutters>
                                                <v-col cols="6">
                                                    <div class="font-weight-medium">
                                                        {{ item.name }}
                                                    </div>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-chip small color="#00afb9" text-color="white">
                                                        <v-avatar>
                                                        <v-icon small>mdi-clipboard-text-multiple-outline</v-icon>
                                                        </v-avatar>
                                                    </v-chip>
                                                </v-col>
                                            </v-row>
                                            <div>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-3"> Historia del paciente </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1">{{ item.history }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> Fecha y Hora </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1">{{ fixDateAndHour( item.timestamp ) }}</v-list-item-subtitle>
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group>
                    </div> 
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
    export default {
        components: {}, 
        props: { imageDiagnosis: Array }, 
        data() {return {}},  
        methods: {
            fixDateAndHour(d) {
                let result = new Date(d).toLocaleString();
                return result + " hrs";
            }, 
         }
    }
</script>
 
<style>
    .form-field {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
    }

    .form-field:focus {
        border: 1px solid #555;
    }
</style>*/