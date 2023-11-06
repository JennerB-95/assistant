<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class=" ">
                        Antecedentes Quirúrgicos
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div  v-if="historicalOperations.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada.</p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows >
                            <v-slide-item v-for="( item, index ) in historicalOperations" :key="index">
                                <v-card class="ma-5" max-width="300" outlined>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="space-between" no-gutters>
                                                <v-col cols="7">
                                                    <div class="subtitle-1 mb-4 font-weight-medium" >
                                                        {{ item.operation }}
                                                    </div>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-chip class="" color="#00afb9" text-color="white" small>
                                                        <v-avatar>
                                                            <v-icon small >mdi-hospital-box</v-icon >
                                                        </v-avatar>
                                                    </v-chip>
                                                </v-col>
                                            </v-row> 
                                            <v-list-item-title class="subtitle-1 mb-1" >
                                                Diagnosticado por:
                                                {{ item.operating_doctor }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle class="subtitle-1">Fecha: {{ item.operation_date }}</v-list-item-subtitle>
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
        props: { historicalOperations: Array},
        data(){ return {} }, 
    }
</script>