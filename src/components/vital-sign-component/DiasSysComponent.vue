<template>
    
    <div>
        <v-row class="ml-3" no-gutters>
            <div class="title mt-1 font-weight-bold">
                Presión Arterial
            </div> 
            <div class="text-center ml-1 mt-1">
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
                                    <div class="grey--text body-1">
                                        Sistólica
                                    </div>
                                    </v-col>  
                                    <v-col cols="6">
                                    <div class="grey--text body-1">
                                        Diastólica
                                    </div>
                                    </v-col> 
                                </v-row>
                                <v-row no-gutters class="mt-2">
                                    <v-col cols="5">
                                        <div>
                                            <input
                                                :id="
                                                    value?.systolic_pressure >= 121
                                                    ? 'systolic' 
                                                    : ''
                                                "
                                                class="form-field"
                                                type="number"
                                                ref="systolic_pressure"
                                                prepend-icon="mdi-phone"
                                                placeholder=""
                                                :value="value?.systolic_pressure"
                                                @input="updateValueName()"
                                            />
                                           
                                        </div>
                                    </v-col>  
                                    <v-col cols="5" class="ml-5">
                                        <div>
                                            <input
                                                :id="
                                                    value?.diastolic_pressure >= 85
                                                    ? 'diastolic'
                                                    : ''
                                                "
                                                class="form-field"
                                                type="number"
                                                ref="diastolic_pressure"
                                                placeholder=""
                                                :value="value?.diastolic_pressure"
                                                @input="updateValueName()"
                                            />
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
                                <div>
                                    Medir
                                </div>
                            </v-btn>
                            <v-btn  
                            @click="sendDataRedis" color="#00afb9" dark elevation="0"> 
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
            vitalSignName: "Presión arterial",   
            indications: [
                'Que el paciente tome el brazalete del esfigmomanómetro ubicado a su lado izquierdo.',
                'Que el paciente ubique la manguera de color gris para que quede apuntando a la muñeca.',
                'Que el paciente ingrese su mano a través del brazalete hasta llevarlo por arriba del codo.',
                'Que el paciente ajuste fuertemente el brazalete a su brazo.',
                'Pídale al paciente que permanezca inmóvil y no hable durante la medición.',
                'Habiendo obtenido el valor de la presión arterial, pídale que retire el brazalete.',
            ],
            textSend: "Enviar",
            sendIcon: "mdi-send",
        } 
    },
   
    // Vars that are parameters to use in component
    props: {  
        // Chanel to send in redis
        cabin: {
            type: String
        },

        // Value of sistolic pressure
        sisValue: {
            type: String
        },

        // Value of diastolic pressure
        diasValue: {
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
        sisKeyVsToSend: {
            type: String
        },

        // Key to know what vs value is received 
        diasKeyVsToSend: {
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

        // Key to know the doctor does a request for a vs
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
                diastolic_pressure: this.$refs.diastolic_pressure.value,
                systolic_pressure: this.$refs.systolic_pressure.value,
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
                this.sendDataCabin({cabin:this.cabin, hasTwo:this.hasTwoVs, value1:this.sisValue,  value2:this.diasValue, confirmRequest:this.confirmRequest, key1:this.sisKeyVsToSend, key2:this.diasKeyVsToSend}); 
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
    #systolic{
        color:orange;
        font-weight: bold;
    }
    #diastolic{
        color:orange;
        font-weight: bold;
    }
</style>