<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3" >
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class=" ">
                        Anticonceptivos
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-if="birthControls.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada. </p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows>
                            <v-slide-item v-for="( item, index ) in birthControls" v-bind:key="index">
                                <v-card class="ma-3" outlined>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="end" no-gutters>
                                                <v-chip small color="#00afb9" text-color="white" >
                                                <v-avatar>
                                                    <v-icon small >mdi-pill</v-icon >
                                                </v-avatar>
                                                </v-chip>
                                            </v-row>
                                            <div>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> Anticonceptivo </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.method || "sin información." }}</v-list-item-subtitle>

                                                <v-list-item-title class="subtitle-1 mb-1 mt-2" > Fecha de inicio </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.method_start_date.substring( 0,  10 ) }}</v-list-item-subtitle>

                                                <v-list-item-title class="subtitle-1 mb-1 mt-2" > Fecha fin </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.method_end_date.substring( 0, 10 ) }}</v-list-item-subtitle>

                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> Recetado por</v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.systolic_pressure || "sin información." }}</v-list-item-subtitle>
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
        props: { birthControls: Array },
        data(){ return {} }, 
    }
</script>