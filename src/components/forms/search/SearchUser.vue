<template>
  <v-app>
    <v-form>
      <div class="wrapper meeting">
        <v-row no-gutters class="mt-5">
          <v-col cols="12" sm="12" md="12" lg="12">
            <div class="text-center">
              <span class="grey--text font-weight-bold" style="font-size: 20px"
                >Puedes buscar a un paciente con:</span
              ><br />
              <span class="grey--text" style="font-size: 15px">- Nombre</span
              ><br />
              <span class="grey--text" style="font-size: 15px">- Apellidos</span
              ><br />
              <span class="grey--text" style="font-size: 15px">- DPI/CUI</span
              ><br />
            </div>
            <br />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="12">
            <div
              class="text-center"
              style="margin-left: 20px; margin-right: 20px"
            >
              <span class="font-weight-bold pt-15 grey--text title">
                Nombre
              </span>

              <v-text-field
                class="px-16"
                color="#ADE2F8"
                v-model.trim="first_name"
                rounded
                dense
                label=""
                outlined
              ></v-text-field>

              <span class="font-weight-bold pt-15 grey--text title">
                Apellidos
              </span>

              <v-text-field
                class="px-16"
                color="#ADE2F8"
                v-model.trim="last_name"
                rounded
                dense
                label=""
                outlined
              ></v-text-field>

              <span class="font-weight-bold pt-15 grey--text title">
                DPI/CUI
              </span>

              <v-text-field
                class="px-16"
                color="#ADE2F8"
                v-model.trim="dpi"
                rounded
                dense
                label=""
                outlined
              ></v-text-field>
              <v-btn
                rounded
                color="#ADE2F8"
                class=""
                v-on:click.prevent="getAllPatients()"
              >
                Buscar
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            md="4"
            v-for="(item, index) in filteredPatients"
            v-bind:key="index"
          >
            <v-card max-width="275" class="mx-auto">
              <v-img :src="item.profile_picture" height="200px" dark>
                <v-row class="fill-height">
                  <v-card-title class="white--text pl-12 pt-16">
                    <div class="text-h4 pl-14 pt-16">
                      {{ item.first_name }} {{ item.last_name }}
                    </div>
                  </v-card-title>
                </v-row>
              </v-img>

              <v-list two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-gender-male-female </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.gender ? "Masculino" : "Femenino"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Sexo</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-baby-carriage </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>19 años</v-list-item-title>
                    <v-list-item-subtitle>Edad</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-card-account-details </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.government_id
                    }}</v-list-item-title>
                    <v-list-item-subtitle>DPI/CUI</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      dpi: "",
      filteredPatients: [],
    };
  },
  methods: {
    getAllPatients() {
       
      let path = "https://api2.bitmec.com/api/patients/";
      axios
        .get(path)
        .then((response) => {
          const patients = response.data; 
          this.filteredPatients = patients.filter((patient) => {
            return (
              patient.first_name
                .toLowerCase()
                .includes(this.first_name.toLowerCase()) &&
              patient.last_name
                .toLowerCase()
                .includes(this.last_name.toLowerCase()) &&
              patient.government_id
                .toLowerCase()
                .includes(this.dpi.toLowerCase())
            );
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    methods: {
        getAllPatients(){
             
            let path = 'https://api2.bitmec.com/api/patients/'
            axios.get(path)
            .then(response => {
                const patients = response.data
                 this.filteredPatients = patients.filter(patient => {
                    return patient.first_name.toLowerCase().includes(this.first_name.toLowerCase()) &&
                           patient.last_name.toLowerCase().includes(this.last_name.toLowerCase()) &&
                           patient.government_id.toLowerCase().includes(this.dpi.toLowerCase())
                })
            })
            .catch((error) => {
                console.error(error);
            })
        }
    },
    created() {
        this.getAllPatients();
    },
  }
}
</script>

<style scoped>
.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: transparent;
  border: 5px solid #ade2f8 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 5px 10px #b4dff2 !important;
  border-radius: 15px !important;
}
</style>
