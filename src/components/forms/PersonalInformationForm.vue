<template>
    <v-app>
        <v-form>
            <v-stepper v-model="e1">
                <v-stepper-items>

                    <v-stepper-content step="1">
                        <div class=" pa-3  text-center">
                            <div class="font-weight-bold headline" style="color: #004e89">¿Es la primera vez que nos visitas?</div>
                        </div>
                        <v-row align="center" justify="center" class="ma-2"> 
                            <v-btn
                                rounded
                                color="#ADE2F8"
                                class="ma-2 white--text button headline pr-10 pl-10"
                                @click="e1 = 3">
                                Si
                            </v-btn>
                            <v-btn
                                rounded
                                color="#ADE2F8"
                                class="ma-2 white--text button headline pr-10 pl-10"
                                @click="e1 = 2">
                                No
                            </v-btn>
                        </v-row>                    
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <SearchUser/>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                       <CreatePatient/>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                   
                        <div class="wrapper meeting">
                            <v-row no-gutters class="mt-5">
                                <v-col cols="12" sm="12" md="12" lg="12"  >
                                <div class=" text-center">
                                    <span class=" grey--text font-weight-bold" style="font-size: 25px;">Historial médico</span>
                                </div><br>
                                <v-expansion-panels focusable v-model="panel" multiple>
                                    <v-expansion-panel key="1">
                                        <v-expansion-panel-header>Padecimientos
                                            <template v-slot:actions>
                                                <v-icon color="#ADE2F8">
                                                mdi-plus-circle
                                                large
                                                </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Padecimiento:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese padecimiento"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Fecha de diagnostico:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese fecha"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Diagnosticado por:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese nombre del doctor que lo diagnostico"
                                            ></v-text-field>                                        
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>

                                    <v-expansion-panel key="2">
                                        <v-expansion-panel-header>Cirugías
                                            <template v-slot:actions>
                                                <v-icon color="#ADE2F8">
                                                mdi-plus-circle
                                                large
                                                </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Cirugía:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese cirugía"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Fecha de cirugía:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese fecha"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Realizada por:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese nombre del doctor que la realizó"
                                            ></v-text-field>
                                             <span class="font-weight-bold  pt-15 grey--text title">
                                                Padecimiento:
                                            </span>
                                            <v-select
                                                color="#ADE2F8"
                                            
                                                rounded
                                                :items="items"
                                                label=""
                                                dense
                                                outlined
                                                placeholder="Elija el padecimiento correspondiente"
                                            ></v-select>
                                            </v-expansion-panel-content>
                                    </v-expansion-panel>

                                    <v-expansion-panel key="3">
                                        <v-expansion-panel-header>Medicamentos
                                            <template v-slot:actions>
                                                <v-icon color="#ADE2F8">
                                                mdi-plus-circle
                                                large
                                                </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Medicamento:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese nombre de medicamento"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Fecha de inicio:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese fecha"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Dosis:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese la dosis"
                                            ></v-text-field>
                                             <span class="font-weight-bold  pt-15 grey--text title">
                                                Frecuencia:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese la frecuencia"
                                            ></v-text-field>   
                                             <span class="font-weight-bold  pt-15 grey--text title">
                                                Recetado por:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese el doctor que o recetó"
                                            ></v-text-field>
                                             <span class="font-weight-bold  pt-15 grey--text title">
                                                Padecimiento:
                                            </span>
                                            <v-select
                                                color="#ADE2F8"
                                                rounded
                                                :items="items"
                                                label=""
                                                dense
                                                outlined
                                                placeholder="Elija el padecimiento correspondiente"
                                            ></v-select>
                                             <span class="font-weight-bold  pt-15 grey--text title">
                                                Cirugía:
                                            </span>
                                            <v-select
                                                color="#ADE2F8"
                                                rounded
                                                :items="items"
                                                label=""
                                                dense
                                                outlined
                                                placeholder="Elija la cirugía correspondiente"
                                            ></v-select>                                        
                                            </v-expansion-panel-content>
                                    </v-expansion-panel>

                                    <v-expansion-panel key="4">
                                        <v-expansion-panel-header>Salud reproductiva
                                            <template v-slot:actions>
                                                <v-icon color="#ADE2F8">
                                                mdi-plus-circle
                                                large
                                                </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <div class=" pa-3  text-center">
                                                <div class="font-weight-bold grey--text">¿Ha tenido uno o más ciclos menstruales?</div>
                                            </div><br>
                                            <v-row
                                                align="center"
                                                justify="center"
                                            >
                                                <v-btn
                                                rounded
                                                depressed
                                                color="#ADE2F8"
                                                class="ma-2"
                                                @click="e1 = 2"

                                                >
                                                Si 
                                                </v-btn>
                                                <v-btn
                                                rounded
                                                depressed
                                                color="#ADE2F8"
                                                class="ma-2"
                                                @click="e1 = 2"
                                                >
                                                No
                                                </v-btn>
                                            
                                            </v-row>
                                            <div class=" pa-3  text-center">
                                                <div class="font-weight-bold grey--text">¿Ha estado embarazada?</div>
                                            </div><br>
                                            <v-row
                                                align="center"
                                                justify="center"
                                            >
                                                <v-btn
                                                rounded
                                                depressed
                                                color="#ADE2F8"
                                                class="ma-2"
                                                @click="e1 = 2"

                                                >
                                                Si 
                                                </v-btn>
                                                <v-btn
                                                rounded
                                                depressed
                                                color="#ADE2F8"
                                                class="ma-2"
                                                @click="e1 = 2"
                                                >
                                                No
                                                </v-btn>
                                            
                                            </v-row> 
                                            <div class=" pa-3  text-center">
                                                <div class="font-weight-bold grey--text">¿Ha perdido algún bebé aún no nacido?</div>
                                            </div><br>
                                            <v-row
                                                align="center"
                                                justify="center"
                                            >
                                                <v-btn
                                                rounded
                                                depressed
                                                color="#ADE2F8"
                                                class="ma-2"
                                                @click="e1 = 2"

                                                >
                                                Si 
                                                </v-btn>
                                                <v-btn
                                                rounded
                                                depressed
                                                color="#ADE2F8"
                                                class="ma-2"
                                                @click="e1 = 2"
                                                >
                                                No
                                                </v-btn>
                                            
                                            </v-row>    
                                    </v-expansion-panel-content>
                                    </v-expansion-panel>

                                    <v-expansion-panel key="5">
                                        <v-expansion-panel-header>Anticonceptivos
                                            <template v-slot:actions>
                                                <v-icon color="#ADE2F8">
                                                mdi-plus-circle
                                                large
                                                </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Anticonceptivos:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese nombre de anticonceptivo"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Fecha de inicio:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese fecha"
                                            ></v-text-field>
                                            <span class="font-weight-bold  pt-15 grey--text title">
                                                Recetado por:
                                            </span>
                                            <v-text-field
                                                color="#ADE2F8"
                                                rounded
                                                dense
                                                label=""
                                                outlined
                                                placeholder="Ingrese el nombre de quién lo recetó"
                                            ></v-text-field>   
                                                                                       
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels><br/>

                               <v-btn rounded color="#ADE2F8" block @click="e1 = 1">
                                Continuar con consulta
                            </v-btn>
                                
                                </v-col>
                            </v-row>
                    </div>
                                
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
            
        </v-form> 
        
        
    </v-app>

</template>

<script>
import SearchUser from '@/components/forms/search/SearchUser';
import CreatePatient from '@/components/forms/create/createPatient'
export default {
    components: {
        SearchUser,
        CreatePatient,
    },
    data() {
        return {
            e1: 1,
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        }
    },
    props: [
    ]
}
</script>

<style scoped>
.v-sheet.v-stepper:not(.v-sheet--outlined) {
    box-shadow: none;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
    background: transparent;
    border: 5px solid #ADE2F8 !important;
    box-sizing: border-box !important;
    box-shadow: 0px 5px 10px #b4dff2 !important;
    border-radius: 15px !important;
}
.button{
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    background-color: #ADE2F8;
    box-shadow: 0px 5px 10px #ADE2F8;
}
</style>