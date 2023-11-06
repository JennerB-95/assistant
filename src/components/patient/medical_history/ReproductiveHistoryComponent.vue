<template>
    <div>
        <v-expansion-panels flat multiple tile focusable> 
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class=" ">
                        Salud reproductiva
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-if="reproductiveHistory.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada. </p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows>
                            <v-slide-item  v-for="( item, index ) in reproductiveHistory" v-bind:key="index">
                                <v-card class="ma-3" outlined>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="end" no-gutters>
                                                <v-chip small color="#00afb9" text-color="white" >
                                                    <v-avatar>
                                                        <v-icon small >mdi-reproduction</v-icon>
                                                    </v-avatar>
                                                </v-chip>
                                            </v-row>
                                            <div>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> Fecha primera menstruación </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.first_menstruation_first.substring( 0, 10 ) }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2" > Fecha última menstruación </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.last_menstruation_date.substring( 0, 10 ) }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> ¿Ha estado embarazada? </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.pregnancy ? "Si" : "No" || "sin información." }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> ¿Es menopáusica? </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1">{{ item.menopause? "Si" : "No" || "sin información." }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> ¿Ha tenido abortos? </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1">{{ item.abortions || "sin información." }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> ¿Tiene hijos vivos? </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{ item.live_births || "sin información." }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2">¿Ha perdido algún bebé aún no nacido?</v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1">{{ item.stillborns || "sin información." }}</v-list-item-subtitle>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-2"> Cantidad de embarazos </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1" >{{  item.pregnancies || "sin información." }}</v-list-item-subtitle>
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
        props: { reproductiveHistory: Array},
        data() { return {} }, 
    }
</script>