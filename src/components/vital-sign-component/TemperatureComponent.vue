<template>
    <div>
        <v-row class="ml-3" no-gutters>
            <div class="mt-1 title font-weight-bold">
                Temperatura
            </div> 
            <div class="text-center">
                <DialogWithVsIndication :vitalSignName="vitalSignName" :indications="indications" />
            </div>
        </v-row>   
        <v-row no-gutters> 
            <v-col cols="12"> 
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-row no-gutters>
                            <v-col cols="12" sm="6" md="8">  
                                <v-row no-gutters class="mt-2">
                                    <v-col cols="6">
                                        <div>
                                            <input
                                                :id="
                                                    value?.temperature > 37.99
                                                    ? 'temperature'
                                                    : ''
                                                "
                                                class="form-field"
                                                type="number"
                                                ref="temperature"
                                                placeholder=""
                                                prefix="$"
                                                :value="value?.temperature"
                                                @input="updateValueName()"
                                            />
                                        </div>
                                    </v-col> 
                                    <v-col>
                                        <div class="title grey--text ml-2">
                                            °C
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>  
                        </v-row>  
                        <v-row no-gutters class="mt-4">
                            <v-btn
                                class="mr-4" 
                                color="#00afb9" 
                                outlined
                                @click="requestFunction"
                                :disabled="disabledButton"
                            >
                                <div> Medir </div>
                            </v-btn>
                            <v-btn @click="sendDataRedis" color="#00afb9" dark elevation="0"> 
                                {{textSend}}
                                <v-icon right>
                                    {{sendIcon}}
                                </v-icon>
                            </v-btn>
                        </v-row>
                    </v-list-item-content> 
                </v-list-item>  
            </v-col> 
        </v-row>
    </div> 
</template>


<script>

// Components
import DialogWithVsIndication from "./DialogWithVsIndication.vue"

export default {

    components : {
        DialogWithVsIndication
    },

    data() { 
        return {
            vitalSignName: "Temperatura",   
            indications: [
                'Pidale que ubique el dispositivo de color blanco al lado derecho de la pantalla o monitor frente a ellos.',
                'Indíquele que acerque su frente a una distancia de dos dedos del sensor y que permanezca de pie. Ud le indicará cuando se pueda sentar.',
                'Pídale al paciente que tome asiento al obtener el resultado.'
            ],
            textSend: "Enviar",
            sendIcon: "mdi-send"
        } 
     },
   
    // Vars that are parameters to use in component
    props: {  
         // Chanel to send in redis
         cabin: {
            type: String
        },

        // Value of temperature
        tmpValue: {
            type: String
        },

        // Var to confirm value of vital signs and send to cabin
        confirmRequest : {
            type: String
        },

        // Function to request a vs to python
        requestVsFunction: {
            type: Function
        },

        // Key to know what vs value is received 
        tmpKeyVsToSend: {
            type: String
        },

         // Key to know what vs ir requested
        vsNameToRequest :{
            type: String
        },

        // Function to send vs value to cabin
        sendDataCabin: {
            type: Function
        },

         // Key to know when doctor makes a request for a vs
        requestVs: {
            type: String
        },

        // Var to know if there are 2 vs to send to cabin
        hasTwoVs: {
            type: Boolean
        },
        // Var to disabled button 
        disabledButton: {
            type: Boolean
        },
        value: Object,
    },

    methods: {

        // Function that updates
        updateValueName(){
            this.$emit('input', {
                temperature: this.$refs.temperature.value, 
            });
        },

        // Request vital sign to python
        requestFunction() {
            if (this.requestVsFunction) {
                this.requestVsFunction(this.cabin, this.vsNameToRequest, this.requestVs);
                this.textSend = "Enviar"
                this.sendIcon = "mdi-send"
            }
        },

        // Send data to cabin when doctor confirms
        sendDataRedis(){
            if (this.sendDataCabin) {
                this.sendDataCabin({cabin: this.cabin, hasTwo: this.hasTwoVs, value1: this.tmpValue, value2: "", confirmRequest: this.confirmRequest, key1:this.tmpKeyVsToSend, key2: ""}); 
                this.textSend = "Enviado"
                this.sendIcon = "mdi-check-circle"
            }
        }
    },

}

</script>


<style>
    .form-field {
        width: 100%;
        padding: 8px 20px;
        margin: 0px 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
        border-radius: 10px;
    }
    .form-field:focus {
        border: 1px solid #555;
    }
    #temperature{
        color:orange;
        font-weight: bold;
    }
</style>