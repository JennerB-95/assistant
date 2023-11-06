<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class=" ">
                        Diagnósticos
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-if="diagosis.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada. </p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows>
                            <v-slide-item v-for="(item, index) in diagosis" v-bind:key="index">
                                <v-card class="ma-3" max-width="250" min-width="250" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-row justify="space-between" no-gutters>
                                            <v-col cols="6">
                                                <div class="font-weight-medium">
                                                    Diagnóstico:
                                                    {{ item.idc_ten }}
                                                </div>
                                            </v-col>
                                            <v-col cols="3">
                                                <v-chip small color="#00afb9"  text-color="white">
                                                    <v-avatar>
                                                        <v-icon small>mdi-clipboard-text-multiple-outline</v-icon>
                                                    </v-avatar>
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                        <div>
                                            <v-list-item-title class="subtitle-1 mb-1 mt-3"> Fecha diagnóstico </v-list-item-title>
                                            <v-list-item-subtitle class="subtitle-1">{{ item.timestamp.substring( 0, 10 )}}</v-list-item-subtitle>
                                            <div v-if="item.active == true">
                                                <v-list-item-subtitle class="subtitle-1 green--text mt-2" >Problema activo</v-list-item-subtitle>
                                            </div> 
                                            <div v-else>
                                                <v-list-item-subtitle class="subtitle-1 grey--text mt-2">Problema resuelto</v-list-item-subtitle>
                                            </div>
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
        props: { diagosis: Array }, 
        data() {return {}}, 
        methods: {}, 
    }
</script>