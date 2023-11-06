<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                <div style="color: #00afb9" class=" ">
                    Antecedentes Médicos
                </div>
                <template v-slot:actions>
                    <v-icon color="#00afb9"> $expand </v-icon>
                </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div  v-if="historicalConditions.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada.</p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows >
                            <v-slide-item v-for="( item, index ) in historicalConditions" :key="index">
                                <v-card class="ma-5" max-width="300" outlined >
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="space-between" no-gutters>
                                                <div class="text-h6 mb-4">
                                                    {{ item.condition }}
                                                </div>
                                                <v-chip small  class="" color="#00afb9" text-color="white">
                                                <v-avatar>
                                                    <v-icon small>mdi-clipboard-text-multiple-outline</v-icon>
                                                </v-avatar>
                                                </v-chip>
                                            </v-row> 
                                            <v-list-item-title class="subtitle-1 mb-1" >
                                                Diagnosticado por:
                                            </v-list-item-title>
                                            {{ item.diagnosing_doctor }}
                                            <v-list-item-subtitle class="subtitle-1" >Fecha: {{ item.diagnosis_date }}</v-list-item-subtitle>
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
        props: { historicalConditions: Array },
        data(){ return {} }, 
    }
</script>