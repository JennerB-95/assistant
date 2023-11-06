<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class=" ">
                        Medicamentos
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div  v-if="historicalPrescriptions.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada.</p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows>
                            <v-slide-item v-for="( item, index ) in historicalPrescriptions" :key="index">
                                <v-card class="ma-5" max-width="300" outlined>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="space-between" no-gutters>
                                                <div class="text-h6 mb-4">
                                                    {{ item.drug }}
                                                </div>
                                                <v-chip small color="#00afb9" text-color="white" >
                                                    <v-avatar>
                                                        <v-icon small>mdi-pill</v-icon>
                                                    </v-avatar>
                                                </v-chip>
                                            </v-row>
                                            <v-list-item-title class="subtitle-1 mb-1">
                                                Recetado por:
                                                {{ item.prescribing_doctor }}
                                            </v-list-item-title>
                                            <v-list-item-title class="subtitle-1 mb-1">
                                                Dosis y frecuencia
                                            </v-list-item-title> 
                                            <v-list-item-subtitle class="subtitle-1">
                                                Dosis:
                                                {{ item.dose }}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle class="subtitle-1">
                                                Frecuencia:
                                                {{ item.frequency }}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle class="subtitle-1">
                                                Inicio:
                                                {{ item.prescription_start_date }}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle class="subtitle-1">
                                                Fin:
                                                {{ item.prescription_end_date }}
                                            </v-list-item-subtitle>
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
        props: { historicalPrescriptions: Array},
        data(){ return {} }, 
    }
</script>