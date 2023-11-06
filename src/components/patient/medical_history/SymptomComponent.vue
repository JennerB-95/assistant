<template>
    <div>
        <div style="color:#00afb9;" class="pl-6 pt-2 ">
            Motivo de consulta
        </div>
        <div v-if="symptoms.length == 0">
            <p class="mt-3 text-center">
                No hay información registrada.
            </p>
        </div>
        <div v-else class="mt-1 pb-3">
            <v-slide-group  active-class="success" show-arrows >
                <v-slide-item v-for="(item, index) in symptoms" v-bind:key="index">
                    <v-card v-if="item.type != 8" class="ma-3 mr-3 ml-3" max-width="250" min-width="250" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row justify="space-between" no-gutters >
                                <div class="font-weight-medium">
                                    {{ fixTypeOfSypmtom(item.type) }}
                                </div>

                                <v-chip small color="#00afb9"  text-color="white" >
                                    <v-avatar>
                                        <v-icon small>mdi-human</v-icon>
                                    </v-avatar>
                                </v-chip>
                                </v-row>
                                <div class="mt-2 font-weight-medium">
                                    {{ fixLocationOfSymptom( item.location ) }}
                                </div>
                                <div>
                                <v-list-item-title class="subtitle-1 mb-1">
                                    Magnitud de síntoma
                                </v-list-item-title>
                                <v-list-item-subtitle class="subtitle-1" >{{ item.severity || "Sin magnitud."  }}</v-list-item-subtitle>

                                <v-list-item-title  class="subtitle-1 mb-1 mt-2" >
                                    Inicio de síntoma
                                </v-list-item-title>
                                <v-list-item-subtitle  class="subtitle-1" >{{ difference(Date(), item.onset) }}</v-list-item-subtitle>

                                <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                    Fecha y Hora
                                </v-list-item-title>
                                <v-list-item-subtitle class="subtitle-1" >{{ fixDateAndHour(item.timestamp) }}</v-list-item-subtitle >
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>

                    <v-card v-else class="ma-3 mr-3 ml-3" color="amber lighten-5" max-width="250" min-width="250" outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row justify="end" no-gutters>
                                    <v-chip small color="warning" text-color="white" >
                                        <v-avatar>
                                            <v-icon small>mdi-alert-circle-outline</v-icon>
                                        </v-avatar>
                                    </v-chip>
                                </v-row>
                                <div class="mt-2 font-weight-medium">
                                    Consulta preventiva
                                </div>
                                <div>
                                    <v-list-item-title class="subtitle-1 mb-1" >
                                        Fecha reportada
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="subtitle-1" >{{ difference( Date(), item.reported ) }}</v-list-item-subtitle>
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        Fecha y Hora
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="subtitle-1" >{{fixDateAndHour(item.timestamp)}}</v-list-item-subtitle>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </div>
    </div>
</template>

<script>
    import moment from "moment"; 
    export default {
        components: {},
        props: { symptoms: Array }, 
        data() { return { } },

        methods: {
            //Function that fixes type of sypmtom
            fixTypeOfSypmtom(t) {
            var type = "";
                switch (t) {
                    case 1:
                    type = "Ahogo";
                    break;
                    case 2:
                    type = "Ardor";
                    break;
                    case 3:
                    type = "Caída de cabello";
                    break;
                    case 4:
                    type = "Cansancio";
                    break;
                    case 5:
                    type = "Cólicos";
                    break;
                    case 6:
                    type = "Comezón";
                    break;
                    case 7:
                    type = "Confusión";
                    break; 
                    case 8:
                    type = "Consulta preventiva";
                    break; 
                    case 9:
                    type = "Diarrea";
                    break; 
                    case 10:
                    type = "Dificultad para ganar peso";
                    break; 
                    case 11:
                    type = "Dificultad para respirar";
                    break; 
                    case 12:
                    type = "Dolor";
                    break; 
                    case 13:
                    type = "Dormido";
                    break; 
                    case 14:
                    type = "Edema";
                    break; 
                    case 15:
                    type = "Estreñimiento";
                    break; 
                    case 16:
                    type = "Fatiga";
                    break; 
                    case 17:
                    type = "Fiebre";
                    break; 
                    case 18:
                    type = "Hemorragia";
                    break; 
                    case 19:
                    type = "Hormigueo";
                    break; 
                    case 20:
                    type = "Hormigueo y dormido";
                    break; 
                    case 21:
                    type = "Inflamación";
                    break; 
                    case 22:
                    type = "Manchas";
                    break; 
                    case 23:
                    type = "Mareos";
                    break; 
                    case 24:
                    type = "Nausea";
                    break; 
                    case 25:
                    type = "Nervios alterados (ansiedad)";
                    break; 
                    case 26:
                    type = "No ve su periodo menstrual";
                    break; 
                    case 27:
                    type = "Palpitaciones";
                    break; 
                    case 28:
                    type = "Pérdida de apetito";
                    break; 
                    case 29:
                    type = "Pérdida de peso";
                    break; 
                    case 30:
                    type = "Reflujo";
                    break; 
                    case 31:
                    type = "Ronchas";
                    break; 
                    case 32:
                    type = "Secreción";
                    break; 
                    case 33:
                    type = "Sudoración";
                    break; 
                    case 34:
                    type = "Tos";
                    break; 
                    case 35:
                    type = "Tumefacción";
                    break; 
                    case 36:
                    type = "Vómitos";
                    break; 
                    default:
                    type = "No se ha registrado información.";
                    break;
                }
                return type;
            },

              //Function that fixex location of sypmtom
            fixLocationOfSymptom(l) {
                var location = "";
                switch (l) {
                    case 1:
                    location = "Cabeza";
                    break;
                    case 2:
                    location = "Frente";
                    break;
                    case 3:
                    location = "Costados de la Cabeza";
                    break;
                    case 4:
                    location = "Cuello";
                    break;
                    case 5:
                    location = "Pecho Izquierdo";
                    break;
                    case 6:
                    location = "Pecho Derecho";
                    break;
                    case 7:
                    location = "Costillas del lado Izquierdo";
                    break;
                    case 8:
                    location = "Epigastrium";
                    break;
                    case 9:
                    location = "Costillas del lado Derecho";
                    break;
                    case 10:
                    location = "Abdomen Izquierdo";
                    break;
                    case 11:
                    location = "Abdomen Central";
                    break;
                    case 12:
                    location = "Abdomen Derecho";
                    break;
                    case 13:
                    location = "Lado inferior izquierdo";
                    break;
                    case 14:
                    location = "Área Púbica";
                    break;
                    case 15:
                    location = "Lado inferior derecho";
                    break;
                    case 16:
                    location = "Genitales";
                    break;
                    case 17:
                    location = "Hombro Izquierdo";
                    break;
                    case 18:
                    location = "Hombro Derecho";
                    break;
                    case 19:
                    location = "Antebrazo Izquierdo";
                    break;
                    case 20:
                    location = "Antebrazo Derecho";
                    break;
                    case 21:
                    location = "Codo Izquierdo";
                    break;
                    case 22:
                    location = "Codo Derecho";
                    break;
                    case 23:
                    location = "Brazo Izquierdo";
                    break;
                    case 24:
                    location = "Brazo Derecho";
                    break;
                    case 25:
                    location = "Muñeca Izquierda";
                    break;
                    case 26:
                    location = "Muñeca Derecha";
                    break;
                    case 27:
                    location = "Mano Izquierda";
                    break;
                    case 28:
                    location = "Mano Derecha";
                    break;
                    case 29:
                    location = "Muslo Izquierdo";
                    break;
                    case 30:
                    location = "Muslo Derecho";
                    break;
                    case 31:
                    location = "Espinilla Izquierda";
                    break;
                    case 32:
                    location = "Espinilla Derecha";
                    break;
                    case 33:
                    location = "Rodilla Izquierda";
                    break;
                    case 34:
                    location = "Rodilla Derecha";
                    break;
                    case 35:
                    location = "Cadera Izquierda";
                    break;
                    case 36:
                    location = "Cadera Derecha";
                    break;
                    case 37:
                    location = "Pantorrilla Izquierda";
                    break;
                    case 38:
                    location = "Pantorrilla Derecha";
                    break;
                    case 39:
                    location = "Tobillo Izquierdo";
                    break;
                    case 40:
                    location = "Tobillo Derecho";
                    break;
                    case 41:
                    location = "Pie Izquierdo";
                    break;
                    case 42:
                    location = "Pie Derecho";
                    break;
                    case 43:
                    location = "Detrás De La Cabeza";
                    break;
                    case 44:
                    location = "Columna Cervical";
                    break;
                    case 45:
                    location = "Columna Torácica";
                    break;
                    case 46:
                    location = "Columna Lumbar";
                    break;
                    case 47:
                    location = "Nalga Izquierda";
                    break;
                    case 48:
                    location = "Nalga Derecha";
                    break;
                    case 49:
                    location = "Ojo Derecho";
                    break;
                    case 50:
                    location = "Ojo Izquierdo";
                    break;
                    case 51:
                    location = "Oído Derecho";
                    break;
                    case 52:
                    location = "Oído Izquierdo";
                    break;
                    case 53:
                    location = "Naríz";
                    break;
                    case 54:
                    location = "Boca";
                    break;
                    case 55:
                    location = "Pecho";
                    break;
                    case 56:
                    location = "Senos";
                    break;
                    case 57:
                    location = "Abdomen";
                    break;
                    case 58:
                    location = "Pelvis";
                    break;
                    case 59:
                    location = "Pierna Derecha";
                    break;
                    case 60:
                    location = "Pierna Izquierda";
                    break;
                    case 61:
                    location = "Detrás del Cuello";
                    break;
                    case 62:
                    location = "Espalda";
                    break;
                    case 63:
                    location = "Lomo";
                    break;
                    case 64:
                    location = "Nalgas";
                    break;
                    case 65:
                    location = "Detrás del Hombro Derecho";
                    break;
                    case 66:
                    location = "Detrás del Hombro Izquierdo";
                    break;
                    case 67:
                    location = "Detrás del Brazo Derecho";
                    break;
                    case 68:
                    location = "Detrás del Brazo Izquierdo";
                    break;
                    case 69:
                    location = "Detrás del Codo Derecho";
                    break;
                    case 70:
                    location = "Detrás del Codo Izquierdo";
                    break;
                    case 71:
                    location = "Detrás del Antebrazo Derecho";
                    break;
                    case 72:
                    location = "Detrás del Antebrazo Izquierdo";
                    break;
                    case 73:
                    location = "Detrás de la Muñeca Derecha";
                    break;
                    case 74:
                    location = "Detrás de la Muñeca Izquierda";
                    break;
                    case 75:
                    location = "Detrás de la Mano Derecha";
                    break;
                    case 76:
                    location = "Detrás de la Mano Izquierda";
                    break;
                    case 77:
                    location = "Bicep Derecho";
                    break;
                    case 78:
                    location = "Bicep Izquierdo";
                    break;
                    case 79:
                    location = "Detrás de la Rodilla Derecha";
                    break;
                    case 80:
                    location = "Detrás de la Rodilla Izquierda";
                    break;
                    case 81:
                    location = "Gemelo Derecho";
                    break;
                    case 82:
                    location = "Gemelo Izquierdo";
                    break;
                    case 83:
                    location = "Detrás del Tobillo Derecho";
                    break;
                    case 84:
                    location = "Detrás del Tobillo Izquierdo";
                    break;
                    case 85:
                    location = "Planta Derecha";
                    break;
                    case 86:
                    location = "Planta Izquierda";
                    break;

                    default:
                    location = "No se ha registrado información.";
                    break;
                }
                return location;
            },

            difference(d1, d2) {
                var m = moment(d1);
                var years = m.diff(d2, "years");
                m.add(-years, "years");
                var months = m.diff(d2, "months");
                m.add(-months, "months");
                var days = m.diff(d2, "days");
                var message = "Hace ";
                years != 0 ? (message += years + " años ") : (message += "");
                months != 0 ? (message += months + " meses ") : (message += "");
                days != 0 ? (message += days + " días") : (message = " Hoy");
                return message;
            },

            fixDateAndHour(d) {
                let result = new Date(d).toLocaleString();
                return result + " hrs";
            },
        }
    }

</script>