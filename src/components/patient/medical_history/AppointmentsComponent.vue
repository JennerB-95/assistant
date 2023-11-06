<template>
    <div>
        <v-expansion-panels flat multiple tile focusable>
            <v-expansion-panel class="mt-3">
                <v-expansion-panel-header>
                    <div style="color: #00afb9" class="">
                        Citas
                    </div>
                    <template v-slot:actions>
                        <v-icon color="#00afb9"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-if="appointments.length == 0">
                        <p class="mt-3 text-center"> No hay información registrada. </p>
                    </div>
                    <div v-else>
                        <v-slide-group active-class="success" show-arrows>
                            <v-slide-item v-for="( item, index ) in appointments" v-bind:key="index">
                                <v-card class="ma-3" max-width="250" min-width="250" outlined>
                                    <v-list-item three-line>
                                        <v-list-item-content>
                                            <v-row justify="space-between" no-gutters>
                                                <div class="font-weight-medium"> Tipo: {{ fixAppointmentType( item.appointment_type ) }} </div>
                                                <v-chip small color="#00afb9" text-color="white">
                                                    <v-avatar>
                                                        <v-icon small >mdi-clipboard-text-multiple-outline</v-icon>
                                                    </v-avatar>
                                                </v-chip>
                                            </v-row>
                                            <div>
                                                <v-list-item-title class="subtitle-1 mb-1 mt-3"> Fecha </v-list-item-title>
                                                <v-list-item-subtitle class="subtitle-1">{{ item.scheduled.substring( 0, 10 ) }}</v-list-item-subtitle>
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
        props: { appointments: Array  },
        data() { return {} }, 

        methods: {
            fixAppointmentType(a) {
                var appType;
                switch (a) {
                    case "PC":
                    appType = "Primera consulta";
                    break;
                    case "E":
                    appType = "Emergencia";
                    break;

                    case "S":
                    appType = "Seguimiento";
                    break;

                    default:
                    appType = "Sin información";
                    break;
                }
                return appType;
            },
        }
    }
</script>