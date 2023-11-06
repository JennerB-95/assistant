<template>
    <div>   
        <v-row no-gutters justify="space-between">
            <v-col cols="6"> 
                <v-card elevation="0"  >
                    <v-card-title>
                        <div class="text-h5">Receta Médica</div> 
                    </v-card-title>
                    <v-card-subtitle> 
                        <div class="grey--text body-1 mb-1">
                            *Campos obligatorios
                        </div>
                    </v-card-subtitle>
                    <v-form ref="formprescription" lazy-validation v-model="valid">
                        <div class="grey--text body-1 ml-5 mb-1">
                            Medicina*
                        </div>
                        <input
                            class="form-field ml-5 mr-5 mb-5"
                            type="text"
                            ref="drug" 
                            :value="value?.drug"
                            required 
                            @input="updateValueName()"
                        />
                        <div class="grey--text body-1 ml-5 mb-1">
                            Presentación*
                        </div>
                        <input
                            class="form-field ml-5 mr-5 mb-5"
                            type="text"
                            ref="presentation" 
                            required 
                            :value="value?.presentation"
                            @input="updateValueName()"
                        />
                        <div class="grey--text body-1 ml-5 mb-1">
                            Dosis*
                        </div>
                        <input
                            class="form-field ml-5 mr-5 mb-5"
                            type="text"
                            ref="dose" 
                            required
                            :value="value?.dose"
                            @input="updateValueName()"
                        />
                        <div class="grey--text body-1 ml-5 mb-1">
                            Frecuencia*
                        </div>
                       
                        <input
                            class="form-field ml-5 mr-5 mb-5"
                            type="text"
                            ref="frequency" 
                            required
                            :value="value?.frequency"
                            @input="updateValueName()"
                        />
                        <v-row>
                            <v-col cols="6" sm="6">
                                <div class="grey--text body-1 ml-5 mb-1">
                                 Fecha inicio*
                                </div>
                                <input
                                    class="form-field ml-5 mr-5 mb-5"
                                    type="date"
                                    ref="prescription_start_date" 
                                    required
                                    :value="value?.prescription_start_date"
                                    @input="updateValueName()"
                                />
                            </v-col>
                            <v-col cols="6" sm="6">
                                <div class="grey--text body-1 ml-5 mb-1">
                                 Fecha fin*
                                </div>
                                <input
                                    class="form-field ml-5 mr-5 mb-5"
                                    type="date"
                                    ref="prescription_end_date" 
                                    required
                                    :value="value?.prescription_end_date"
                                    @input="updateValueName()"
                                />
                            </v-col>
                        </v-row>
                        
                        <div class="grey--text body-1 ml-5 mb-1">
                            Observaciones*
                        </div>
                        <textarea
                            class="form-field ml-5 mr-5 mb-5"
                            type="area"
                            ref="comments" 
                            required
                            :value="value?.comments"
                            @input="updateValueName()"
                        />
                      
                        <v-btn
                            @click="executeRequestFunction()"
                            color="#00afb9"
                            block
                            elevation="0"
                            :loading="loading"
                            :disabled="loading"
                            class=" mr-5 ml-5 mb-10 white--text button "
                            >
                                Guardar
                        </v-btn>
                    </v-form>
                </v-card> 
            </v-col>
            <v-col cols="5">
                <v-card-title>
                    <span class="text-h5">Historial</span>
                </v-card-title> 
                <v-card
                    elevation="0"
                    max-width="300" 
                    outlined
                > 
                    <v-carousel 
                        :cycle="cycle" 
                        hide-delimiter-background
                        :show-arrows-on-hover="prescriptions.length > 0"
                        :show-arrows="prescriptions.length > 0"
                        delimiter-icon="mdi-minus"
                        height="490"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    >
                    <v-row v-if="prescriptions.length == 0" align="center" justify="center">
                        <div >
                            <p class="pa-5 title grey--text text-center">El paciente no ha tenidos recetas en los últimos 7 días.</p>
                        </div>
                    </v-row>
                        
                        <v-carousel-item
                            v-else
                            v-for="(prescription, i) in prescriptions"
                            v-bind:key="i"
                        >
                            <v-sheet height="100%" tile>
                                <v-row class="fill-height" >
                                    <v-card 
                                        class="ml-3 mr-3 pt-5" 
                                        flat
                                        width="300"
                                    >  
                                        <div class="mt-3 ml-3 headline grey--text text-decoration-underline text-uppercase">{{prescription['drug']}}</div>
                                        <div class="ml-3 subtitle-1 grey--text ">Dr. {{ prescription['assistant']['first_name'] || ' ' + ' ' + prescription['assistant']['last_name'] || ' ' }}</div>
                                        <div class="ml-3 subtitle-1 grey--text ">Fecha: {{ fixDateAndHour( prescription['timestamp'] )}}</div>
                                        
                                        <v-card-text> 
                                        <div class="mt-3 font-weight-medium black--text title">
                                            Presentación
                                        </div>
                                        <div class="subtitle-1 font-weight-medium">{{prescription['presentation']}}</div>
                                        
                                        <div class="mt-2 font-weight-medium black--text title">
                                            Dosis
                                        </div>
                                        <div class="subtitle-1 font-weight-medium">{{prescription['dose']}}</div>
                                        
                                        <div class="mt-2 font-weight-medium black--text title">
                                            Frecuencia
                                        </div>
                                        <div class="subtitle-1 font-weight-medium">{{prescription['frequency']}}</div>
                                            
                                        <div class="mt-2 font-weight-medium black--text title">
                                            Observaciones
                                        </div>
                                        <div class="subtitle-1 font-weight-medium">{{prescription['comments'] || 'No hay observaciones'}}</div> 
                                        </v-card-text> 
                                    </v-card>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                    <v-divider class="mx-2"></v-divider>   
                   <v-list >
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="patientProfilePicture || 'https://cdn.vuetifyjs.com/images/john.png' " height="100"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{patientFirstName ?? ''}}</v-list-item-title>
                            <v-list-item-subtitle>{{patientLastName ?? ''}}</v-list-item-subtitle>
                        </v-list-item-content> 
                    </v-list-item>
                    </v-list>
                </v-card>
            </v-col> 
        </v-row>  
    </div>
</template>

<script>

import axios from "axios"; 
import { API_URL, TOKEN } from "./../../../global.js"; 

export default {
    data() {
        return {
            loader: null,
            loading: false,
            valid: true,
            colors: [
                'green',
                'secondary',
                'yellow darken-4',
                'red lighten-2',
                'orange darken-1',
            ],
            cycle: false,
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
        }
    }, 

    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },

    // Vars that are used parameters to use in component
    props: {
        
        // Patient's Historical Prescription
        prescriptions: Array,

        // JSON that has the value of keys
        value: Object,
        
        // Function to send data of prescription
        action: {
            type: Function
        },

        // Doctor info
        assistant: {
            type: String
        },

        // Cabin id to know the channel
        cabin : {
            type: String
        },

        // Patient info.
        patientFirstName: {
            type: String
        },

        patientLastName: {
            type: String
        },

        patientProfilePicture: {
            type: String
        },

        // Doctor Id
        assistantId: {
            type: String
        },

        consultation: {
            type: String
        },

        dpi: {
            type: String
        },

        requestVsFunction: {
            type: Function
        },

    },

    methods: {

        // Validate form
         

        // Parse timestamp of prescription
        fixDateAndHour(date) {
            let result = new Date(date).toLocaleString();
            return result + " hrs";
        },

        // Updating value of texts
        updateValueName(){
            this.$emit('input', {
                drug: this.$refs.drug.value,
                presentation: this.$refs.presentation.value,
                dose: this.$refs.dose.value,
                frequency: this.$refs.frequency.value,
                prescription_start_date: this.$refs.prescription_start_date.value,
                prescription_end_date: this.$refs.prescription_end_date.value, 
                comments: this.$refs.comments.value, 
            })
        },

        // API call
        executeRequestFunction() {
            // Variables
            let headers = {
                Authorization: `Token ${TOKEN}`,
                "Content-Type": "application/json;charset=utf-8",
            };
            let path = `${API_URL}api/consultations/send-prescription/`; 
            if (this.$refs.formprescription.validate()) {
                this.loader = 'loading', 
                axios.post(path, { 
                'drug': this.$refs.drug.value,
                'presentation': this.$refs.presentation.value,
                'dose': this.$refs.dose.value,
                'frequency': this.$refs.frequency.value,
                'comments': this.$refs.comments.value,
                'assistant_info': this.assistant,
                'cabin': this.cabin,
                'assistantId': this.assistantId,  
                'consultation': this.consultation.toString(),
                'dpi': this.dpi.toString(),
                'prescription_start_date': this.$refs.prescription_start_date.value,
                'prescription_end_date': this.$refs.prescription_end_date.value,
            }, {headers}).then((r) => { 
                if (this.requestVsFunction) {
                    this.requestVsFunction(); 
                }
                    let timerInterval;
                    this.$swal({
                        icon: 'success',
                        title: 'Receta enviada.', 
                        timer: 4000,
                        timerProgressBar: true,
                    didOpen: () => {
                        this.$swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                    }).then((result) => {  
                        return result;
                    });
                    return r.data;
                }).catch((e) => {
                    let timerInterval;
                    this.$swal({
                        icon: 'error',
                        title: 'No se ha podido enviar la receta, intente de nuevo.', 
                        timer: 4000,
                        timerProgressBar: true,
                    didOpen: () => {
                        this.$swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                    }).then((result) => {  
                        return result;
                    });
                    console.log(e, 'error');
                    }
                )     
            }  
          
        }

    }
}
</script>

<style>

</style>