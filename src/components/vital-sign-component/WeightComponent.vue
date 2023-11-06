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
                                            Peso
                                        </div>
                                    </v-col>  
                                </v-row>
                                <v-row no-gutters class="mt-2">
                                    <v-col cols="6">
                                        <div>
                                            <input
                                                class="form-field"
                                                type="number"
                                                ref="weight"
                                                placeholder=""
                                                :value="parseFloat(this.mutableList['weight']).toFixed(2).toString()"
                                                @input="updateValueName()"
                                            />
                                        </div>
                                    </v-col>  
                                    <v-col cols="3" class="ml-2">
                                        <div>
                                            <select  @change="changeSelect()" id="weight" name="weight" class="form-field">
                                                <option value="lb">lb</option>
                                                <option value="kg">kg</option> 
                                            </select> 
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
import DialogWithVsIndication from "./DialogWithVsIndication.vue"

export default {

    components : {
        DialogWithVsIndication
    },

    data() { 
        return {
            vitalSignName: "Peso",   
            indications: [
                'Pídale al paciente que ubique las huellas en el suelo de la cabina.',
                'Indiquele al paciente que se ponga de pie y se pare sobre las huellas.',
                'Que el paciente permanezca inmóvil durante la medición.',
                'Pídale que permanezca de pie en el mismo sitio, al obtener el dato del peso.',
            ],
            textSend: "Enviar",
            sendIcon: "mdi-send",
            mutableList: this.value,
            weightType : 'lbs'
        } 
     },
     
     created(){
        this.mutableList['weight'] = this.value.weight;
     },
 
    // Vars that are parameters to use in component
    props: {  
         // Chanel to send in redis
        cabin: {
            type: String
        },

        // Value of height
        weightValue: {
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
        weightKeyVsToSend: {
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

        // Value of Weight
        value: Object,

        // Var to reset measure type
        measureTypeReset: Boolean
    },

    methods: {

        changeSelect(){
            var $select = document.getElementById('weight');  
            if (this.mutableList['weight'] != '') {
                if ($select.value == 'kg') {
                    $select.value = 'kg'
                    this.weightType = 'kg';
                    this.mutableList['weight'] /= 2.20462; 
                    this.mutableList['weight'] = this.mutableList['weight'].toString(); 
                } else {
                    this.weightType = 'lbs'; 
                    this.mutableList['weight'] *= 2.20462; 
                    this.mutableList['weight'] = this.mutableList['weight'].toString(); 
                }
            }   
        },

  
    // Function that updates
        updateValueName(){
            this.$emit('input', {
                weight: this.$refs.weight.value, 
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
                this.sendDataCabin({cabin: this.cabin, hasTwo: this.hasTwoVs, value1: this.weightValue, value2: "", confirmRequest: this.confirmRequest, key1:this.weightKeyVsToSend, key2: ""}); 
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

    .form-field select { 
        -webkit-appearance:none; /* Safari and Chrome */
        appearance:none;
    }

    select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* Some browsers will not display the caret when using calc, so we put the fallback first */ 
    background: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png") white no-repeat 98.5% !important; /* !important used for overriding all other customisations */
    background: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png") white no-repeat calc(100% - 10px) !important; /* Better placement regardless of input width */
    }
    /*For IE*/
    select::-ms-expand { display: none; }

</style>