<template>
    
    <div>
        <v-row class="ml-3" no-gutters>
            <div class="mt-1 title font-weight-bold">
                Antropometría
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
                                        Altura
                                    </div>
                                </v-col>  
                            </v-row>
                            <v-row no-gutters class="mt-2">
                                <v-col cols="6">
                                    <div>
                                        <input
                                            class="form-field"
                                            type="text"
                                            ref="height"
                                            placeholder=""
                                            :value="value?.height"
                                            @input="updateValueName()"
                                        />
                                    </div>
                                </v-col>  
                                <v-col>
                                    <div class="title grey--text ml-2">
                                        m
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
            vitalSignName: "Altura",   
            indications: [
                'Pídale que se pare de forma erguido y vea al frente a un punto fijo.',
                'Que el paciente permanezca inmóvil durante la medición.',
                'Pídale que permanezca de pie al obtener el valor de la altura.'
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

        // Value of height
        heightValue: {
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
        heightKeyVsToSend: {
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
                height: this.$refs.height.value, 
            });
            console.log(this.$refs.height.value);
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
                this.sendDataCabin({cabin: this.cabin, hasTwo: this.hasTwoVs, value1: this.heightValue, value2: "", confirmRequest: this.confirmRequest, key1:this.heightKeyVsToSend, key2: ""}); 
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
</style>