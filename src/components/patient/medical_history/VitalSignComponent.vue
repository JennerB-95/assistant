<template>
    <div>
        <div  class="title pl-6 pt-5 ">
            Signos vitales 
        </div>
        <div v-if="vitalSigns.length == 0">
            <p class="mt-3 text-center">
                No hay información registrada.
            </p>
        </div>
        <div v-else>
            <v-slide-group active-class="success" show-arrows >
                <v-slide-item v-for="(item, index) in vitalSigns" v-bind:key="index">
                    <v-card class="ma-3" outlined max-width="300" min-width="300">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row justify="space-between" no-gutters >
                                    <div class="subtitle-1 black--text" >{{ fixDateAndHour( item.timestamp ) }}</div>
                                    <v-chip small color="#00afb9" text-color="white" >
                                        <v-avatar>
                                            <v-icon small >mdi-medical-bag</v-icon >
                                        </v-avatar>
                                    </v-chip>
                                </v-row>
                                <div>
                                    <v-list-item-title  class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20" color="#00afb9">mdi-thermometer-lines</v-icon > Temperatura:
                                        <span class="grey--text"> {{  item.temperature || "sin información." }}C </span> 
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20" color="#00afb9">mdi-weight-kilogram</v-icon > Peso:
                                        <span class="grey--text"> {{ item.weight ||  "sin información." }} lbs </span>
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20"  color="#00afb9">mdi-human-male-height</v-icon > Estatura:
                                        <span class="grey--text"> {{ fixcmMHeight(item.height ) }} </span> 
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                        <v-icon size="20" class="mr-1" color="#00afb9">mdi-human-male-height-variant</v-icon >IMC:
                                        <span class="grey--text "> {{ fixImc( item.weight, item.height ) }} </span>  
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20" color="#00afb9">mdi-clipboard-pulse-outline</v-icon > Presión sistólica:
                                        <span class="grey--text"> {{ item.systolic_pressure ||"sin información."}} </span>  
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                        <v-icon size="20" color="#00afb9">mdi-clipboard-pulse-outline</v-icon > Presión diastólica:
                                        <span class="grey--text">{{item.diastolic_pressure || "sin información." }} </span>
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20" class="mr-1"  color="#00afb9">mdi-heart-pulse</v-icon >Frecuencia cardíaca:
                                        <span class="grey--text "> {{ item.heart_rate || "sin información." }} </span> 
                                    </v-list-item-title>  
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20" class="mr-1" color="#00afb9">mdi-radiobox-blank</v-icon >Oxígeno:
                                        <span class="grey--text ">  {{ item.oxygen || "sin información." }} </span>
                                    </v-list-item-title> 
                                    <v-list-item-title class="subtitle-1 mb-1 mt-2" >
                                        <v-icon size="20" class="mr-1" color="#00afb9">mdi-text-box-outline</v-icon >Glucosa:
                                        <span class="grey--text "> {{ item.glucose || "sin información." }} </span> 
                                    </v-list-item-title>   
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
 
    export default {
        components: {},
        props: { vitalSigns: Array }, 
        data() { return { } },
 
        methods: { 
            fixImc(w, h) {
                var weight = w / 2.2;
                weight = weight.toFixed(2);

                var height;
                if (Number.isInteger(h)) {
                    height = h / 100;
                } else {
                    height = h;
                }
                height = Math.pow(height, 2);
                height = height.toFixed(2);
                var imc = weight / height;
                return imc.toFixed(2);
            },

            fixcmMHeight(h) {
                if (h == null) {
                    return "Sin información";
                } else {
                    if (h <= 3) {
                    return h.toFixed(2) + " m";
                    } else {
                    return h + " cm";
                    }
                }
            },

            fixDateAndHour(d) {
                let result = new Date(d).toLocaleString();
                return result.substring(0,16) + " hrs";
            },
        }
    }

</script>