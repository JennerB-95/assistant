<template>
    <div>
        <v-slide-group active-class="success" show-arrows>
            <v-slide-item v-for="( item, index ) in labs" v-bind:key="index" >
                <v-card
                class="ma-3"
                max-width="250"
                min-width="250"
                outlined
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-row justify="space-between" no-gutters>
                            <div class="font-weight-medium"> Tipo: {{item.lab_format.name}} </div>
                            <v-chip small color="#00afb9" text-color="white">
                            <v-avatar>
                                <v-icon small>mdi-clipboard-text-multiple-outline</v-icon>
                            </v-avatar>
                            </v-chip>
                        </v-row>
                        <div>
                            <v-list-item-title class="subtitle-1 mb-1 mt-3"> Ordenado por </v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1">{{ item.doctor.first_name }} {{ item.doctor.last_name }}</v-list-item-subtitle>
                            <v-list-item-title class="subtitle-1 mb-1 mt-3"> Orden </v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1">{{ item.name }}</v-list-item-subtitle>
                            <v-list-item-title class="subtitle-1 mb-1 mt-3"> Unidad y medidas  </v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1">Unidad minima: {{item.lab_format.low_measurement}} {{item.lab_format.units.name}}</v-list-item-subtitle>
                            <v-list-item-subtitle class="subtitle-1">Unidad minima: {{item.lab_format.high_measurement}} {{item.lab_format.units.name}}</v-list-item-subtitle>
                            <v-list-item-title class="subtitle-1 mb-1 mt-2">Fecha y Hora</v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1">{{fixDateAndHour(item.timestamp)}}</v-list-item-subtitle>
                        </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </div>
</template>

<script>
    export default {
        props: {
            labs:  Array
        },

        methods: {

            fixDateAndHour(d) {
                let result = new Date(d).toLocaleString();
                return result + " hrs";
            },

        }
    }
</script>