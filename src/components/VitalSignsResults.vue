<template>
    <div class="text-center">
        <v-row no-gutters justify="start">
            <v-chip
            class="ma-2"
            label
            >
            <v-img
                max-height="20"
                max-width="20" 
                src="../assets/esfi.png" 
                > </v-img> 
                    <span :id="systolicPressure >= 121
                        ? 'orange-text' 
                        : ''
                    " class="mr-1 ml-2"> {{ systolicPressure}}</span>
                    <span class="mr-1 ml-1">/</span>
                    <span :id="diastolicPressure >= 85
                        ? 'orange-text'
                        : ''
                    " class="mr-1"> {{diastolicPressure}}</span>
            </v-chip>

            <v-chip
                class="ma-2" 
                label 
                > 
            <v-img
                max-height="25"
                max-width="25"  
                src="../assets/lungs.png"
            >
            </v-img>
            <span :id="bpmF >= 60 && bpmF <= 100
                ? ''
                : 'orange-text'
            " class="mr-1 ml-1">{{bpmF}} </span> lpm
            <span class="mr-1 ml-1">-</span>
            <span :id="oxygen <= 92
                        ? 'orange-text' 
                        : ''
                    " class="mr-1"> {{oxygen}} </span>%
            </v-chip>

            <v-chip
                class="ma-2" 
                label
                >
            <v-icon left>
                mdi-weight
            </v-icon>
            {{parseFloat(weight ?? 0).toFixed(2).toString() || weight}}  
            </v-chip>

            <v-chip
                class="ma-2" 
                label   
                >
            <v-icon left>
                mdi-human-male-height 
            </v-icon>
            {{height}}  
            </v-chip>
            <v-chip
                class="ma-2" 
                label   
                >
            <v-icon left >
                mdi-thermometer-lines
            </v-icon> 
            <span :id="temperature > 37.99
                ? 'orange-text'
                : ''
            " >{{temperature}}</span>
            
            </v-chip>
            <v-chip
                class="ma-2" 
                label   
                >
            <v-icon left >
                mdi-human-handsdown
            </v-icon> 
            <span :id="imc < 19 || imc > 24.99
                ? 'orange-text'
                : ''
            " >IMC {{imc}}</span>
            
            </v-chip>
        </v-row>
        
    </div>
</template>

<script>
export default {
    data() { 
    return {
        
     }},
    props: {
        weight: {
            type: String
        },
        height: {
            type: String
        },
        oxygen: {
            type: String
        },
        bpmF: {
            type: String
        },
        temperature: {
            type: String
        },
        systolicPressure: {
            type: String
        },
        diastolicPressure: {
            type: String
        },
        esfigmoAvailable: {
            type: Boolean
        },
        imc: {
            type: String
        },
    }  
}
</script>

<style>
    #orange-text{
        color:orange;
        font-weight: bold;
    }
</style>