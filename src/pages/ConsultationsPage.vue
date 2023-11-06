<template>
  <v-app>
    <div class="wrapper meeting">
      <div class="ag-header">
        <div class="ag-header-lead">
          <img class="header-logo" src="../assets/bitmec.png" alt="" />
        </div>
      </div>
      <v-row no-gutters justify="center">
        <v-col cols="12" sm="6">
          <div class="ag-main">
            <div class="ag-container">
              <AgoraVideoCall
                :videoProfile="videoProfile"
                :channel="channel"
                :transcode="transcode"
                :codec="codec"
                :attendeeMode="attendeeMode"
                :baseMode="baseMode"
                :appId="appId"
                :uid="uid"
              ></AgoraVideoCall>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-stepper v-model="e6" vertical>
            <v-stepper-step color="#ADE2F8" :complete="e6 > 1" step="1">
              <h1>Escaner</h1>
            </v-stepper-step>
            <div class="d-flex justify-end">
              <v-snackbar
                max-width="100"
                color="success"
                right
                top
                elevation="24"
                v-model="snackbar"
              >
                <span class="title">
                  ¡Registro creado correctamente!
                </span>
                <v-icon dark right>
                  mdi-checkbox-marked-circle
                </v-icon>
              </v-snackbar>
            </div>
            <v-stepper-content step="1">
              <v-card class="mb-5 mr-5 ml-5" elevation="10"> </v-card>

              <div class="mr-6 ml-4">
                <v-btn
                  type="submit"
                  form="symptom-form"
                  dark
                  block
                  outlined
                  class="ma-2 green--text  pr-10 pl-10"
                  @click="createScanner()"
                >
                  <h2>Escanear documento</h2>
                </v-btn>
              </div>
              <div class="mr-6 ml-4">
                <v-btn
                  type="submit"
                  form="symptom-form"
                  color="#ADE2F8"
                  dark
                  block
                  class="ma-2 white--text button pr-10 pl-10"
                  @click="createScanner()"
                >
                  <h2>Guardar</h2>
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-step color="#ADE2F8" :complete="e6 > 2" step="2">
              <h1>Síntoma</h1>
            </v-stepper-step>
            <div class="d-flex justify-end">
              <v-snackbar
                max-width="100"
                color="success"
                right
                top
                elevation="24"
                v-model="snackbar"
              >
                <span class="title">
                  ¡Registro creado correctamente!
                </span>
                <v-icon dark right>
                  mdi-checkbox-marked-circle
                </v-icon>
              </v-snackbar>
            </div>
            <v-stepper-content step="2">
              <v-card class="mb-5 mr-5 ml-5" elevation="10">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h1 class="grey--text headline">
                        {{ symptom || "Seleccione un síntoma" }}
                      </h1>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-select
                        :disabled="selectDisabled"
                        outlined
                        color="#ADE2F8"
                        prepend-inner-icon="mdi-human-handsup"
                        :items="items"
                        item-text="symptom"
                        return-object
                        @change="selectText"
                        label="Seleccionar"
                      ></v-select>
                      <v-row justify="center" class="mb-5">
                        <v-card
                          class="pb-4 pl-4 pr-4"
                          outlined
                          style="border-color: orange;"
                        >
                          <v-checkbox
                            v-model="ex4"
                            label="Consulta preventiva"
                            color="orange"
                            hide-details
                            @change="preventC"
                          ></v-checkbox>
                        </v-card>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card elevation="10" class="mb-5 ml-5 mr-5">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h1 class="grey--text headline">
                        {{ bodyPart || "Seleccione una parte del cuerpo" }}
                      </h1>
                    </v-expansion-panel-header>
                    <v-form
                      @submit.prevent="symptomCreate"
                      id="symptom-form"
                      enctype="multipart/form-data"
                    >
                      <v-expansion-panel-content>
                        <v-select
                          outlined
                          color="#ADE2F8"
                          prepend-inner-icon="mdi-human-handsup"
                          :items="bodyPartItems"
                          item-text="bodyPart"
                          return-object
                          @change="changeBodyPart"
                          label="Seleccionar"
                        ></v-select>
                        <span class="font-weight-bold pt-15 grey--text title">
                          Día de evolución:
                        </span>
                        <v-dialog
                          ref="dialog2"
                          v-model="modal2"
                          :return-value.sync="form.onset"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model.trim="form.onset"
                              color="#ADE2F8"
                              placeholder="Ingrese fecha"
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model.trim="form.onset" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal2 = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog2.save(form.onset)"
                            >
                              Guardar
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                        <v-slider
                          @change="form.severity = ex3.val"
                          color="#ADE2F8"
                          class="mt-5"
                          v-model="ex3.val"
                          max="10"
                          min="0"
                          :label="ex3.label"
                          :thumb-color="ex3.color"
                          thumb-label="always"
                        ></v-slider>
                      </v-expansion-panel-content>
                    </v-form>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <div class="mr-6 ml-4">
                <v-btn
                  type="submit"
                  form="symptom-form"
                  color="#ADE2F8"
                  dark
                  block
                  class="ma-2 white--text button pr-10 pl-10"
                  @click="createInitialVS()"
                >
                  <h2>Guardar</h2>
                </v-btn>
              </div>
            </v-stepper-content>
            <v-stepper-step color="#ADE2F8" :complete="e6 > 3" step="3">
              <h1>Signos vitales</h1>
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card class="mb-5 mr-5 ml-5" elevation="10">
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <div class="text-left mt-5 ml-10 mr-10">
                      <span class="font-weight-bold pt-15 grey--text title">
                        Medidas físicas
                      </span>
                      <v-dialog
                        v-model="dialogAskingVitalSigns"
                        hide-overlay
                        persistent
                        width="300"
                      >
                        <v-card color="pink lighten-2" dark>
                          <v-card-text>
                            Enviando solicitud...
                            <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                            ></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <v-form>
                        <v-row no-gutters class="mt-5">
                          <v-text-field
                            prepend-inner-icon="mdi-weight-kilogram"
                            placeholder="Peso"
                            color="#ADE2F8"
                            dense
                            label=""
                            outlined
                            v-model.trim="formvitalsign.weight"
                          ></v-text-field>
                          <v-btn
                            class="ml-2"
                            color="pink lighten-2"
                            dark
                            small
                            fab
                            @click="sendWeight()"
                          >
                            <v-icon>mdi-weight-kilogram</v-icon>
                          </v-btn>
                        </v-row>
                        <v-row no-gutters class="mt-5">
                          <v-text-field
                            prepend-inner-icon="mdi-human-male-height"
                            placeholder="Altura"
                            color="#ADE2F8"
                            dense
                            label=""
                            outlined
                            v-model.trim="formvitalsign.height"
                          ></v-text-field>
                          <v-btn
                            class="ml-2"
                            color="pink lighten-2"
                            dark
                            small
                            fab
                            @click="sendHeight()"
                          >
                            <v-icon>mdi-human-male-height</v-icon>
                          </v-btn>
                        </v-row>
                        <span class="font-weight-bold pt-15 grey--text title">
                          Temperatura
                        </span>
                        <v-row no-gutters class="mt-5">
                          <v-text-field
                            prepend-inner-icon="mdi-thermometer-lines"
                            placeholder="Temperatura"
                            color="#ADE2F8"
                            dense
                            label=""
                            v-model.trim="formvitalsign.temperature"
                            outlined
                          ></v-text-field>
                          <v-btn
                            class="ml-2"
                            color="pink lighten-2"
                            dark
                            small
                            fab
                            @click="sendTemperature()"
                          >
                            <v-icon>mdi-thermometer-lines</v-icon>
                          </v-btn>
                        </v-row>
                        <span class="font-weight-bold pt-15 grey--text title">
                          Medidas cardiovasculares
                        </span>
                        <v-row no-gutters class="mt-5">
                          <v-text-field
                            prepend-inner-icon="mdi-heart-pulse"
                            placeholder="Frecuencia cardíaca"
                            color="#ADE2F8"
                            dense
                            label=""
                            v-model.trim="formvitalsign.heart_rate"
                            outlined
                          ></v-text-field>
                          <v-btn
                            class="ml-2"
                            color="pink lighten-2"
                            dark
                            small
                            fab
                            @click="sendOxygen()"
                          >
                            <v-icon>mdi-heart-pulse</v-icon>
                          </v-btn>
                        </v-row>
                        <v-row no-gutters class="mt-5">
                          <v-text-field
                            prepend-inner-icon="mdi-fingerprint"
                            placeholder="Saturación de oxígeno"
                            color="#ADE2F8"
                            dense
                            label=""
                            v-model.trim="formvitalsign.oxygen"
                            outlined
                          ></v-text-field>
                          <v-btn
                            class="ml-2"
                            color="pink lighten-2"
                            dark
                            small
                            fab
                            @click="sendOxygen()"
                          >
                            <v-icon>mdi-fingerprint</v-icon>
                          </v-btn>
                        </v-row>

                        <v-btn
                          color="#ADE2F8"
                          dark
                          block
                          class="mt-5 mb-10 white--text button pr-10 pl-10"
                          @click="updateVitalSign()"
                        >
                          Guardar
                        </v-btn>
                      </v-form>
                    </div>
                  </v-col>
                </v-row>
              </v-card>

              <v-dialog
                v-model="dialogSaveVS"
                hide-overlay
                persistent
                width="300"
              >
                <v-card color="cyan lighten-2" dark>
                  <v-card-text>
                    Guardando información...
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogLoadingVitalSign"
                hide-overlay
                persistent
                width="350"
              >
                <v-card color="cyan lighten-2" dark>
                  <v-card-text class="font-weight-black subtitle-1">
                    <h1 class="font-weight-black headline pt-3 white--text">
                      Obteniendo signo vital...
                    </h1>
                    <h1 class="font-weight-black title mb-3 white--text">
                      <v-icon v-if="vitalSignDescription == 'Temperatura'"
                        >mdi-thermometer-lines</v-icon
                      >
                      <v-icon
                        v-else-if="
                          vitalSignDescription ==
                            'Frecuencia cardiaca y Oxígeno'
                        "
                        >mdi-heart-pulse</v-icon
                      >
                      <v-icon v-if="vitalSignDescription == 'Peso'"
                        >mdi-weight-kilogram</v-icon
                      >
                      <v-icon v-if="vitalSignDescription == 'Altura'"
                        >mdi-human-male-height</v-icon
                      >

                      {{ vitalSignDescription }}
                    </h1>
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogLoading"
                hide-overlay
                persistent
                width="300"
              >
                <v-card color="cyan lighten-2" dark>
                  <v-card-text>
                    Cargando...
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogLoadingAppointment"
                hide-overlay
                persistent
                width="300"
              >
                <v-card color="cyan lighten-2" dark>
                  <v-card-text>
                    Creando Cita...
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogLoadingStartConsultation"
                hide-overlay
                persistent
                width="300"
              >
                <v-card color="cyan lighten-2" dark>
                  <v-card-text>
                    Iniciando consulta...
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="text-h5">
                    ¡Se ha guardado <br />
                    la información!
                  </v-card-title>

                  <v-card-text class="text-h6">
                    Por favor, cree la cita
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialog = false),
                          (dialogLoadingAppointment = true),
                          appointmentCreate()
                      "
                    >
                      Crear cita
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogStartConsultation" max-width="290">
                <v-card>
                  <v-card-title class="text-h5">
                    ¡Se ha guardado <br />
                    la información!
                  </v-card-title>

                  <v-card-text class="text-h6">
                    Por favor, Inicie la consulta
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        (dialogStartConsultation = false),
                          (dialogLoadingStartConsultation = true),
                          startConsultation()
                      "
                    >
                      Iniciar consulta
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>

      <!-- Información personal del patient -->
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import * as Cookies from "js-cookie";
import AgoraVideoCall from "@/components/AgoraVideoCall";
import { AGORA_APP_ID } from "@/agora.config";
import { API_URL, TOKEN } from "../global";

export default {
  components: {
    AgoraVideoCall,
  },
  data() {
    return {
      listIds: [],
      dialogAskingVitalSigns: false,
      vitalSignDescription: "",
      dialog: false,
      dialogLoadingVitalSign: false,
      dialogLoading: false,
      dialogLoadingAppointment: false,
      dialog2: false,
      snackbar: false,
      dialogSaveVS: false,
      dialogStartConsultation: false,
      dialogLoadingStartConsultation: false,
      appointmentId: "",
      items: [
        { id: 1, symptom: "Ardor" },
        { id: 2, symptom: "Cansancio" },
        { id: 3, symptom: "Dolor" },
        { id: 4, symptom: "Dormido" },
        { id: 5, symptom: "Hormigueo y dormido" },
        { id: 6, symptom: "Inflamación" },
        { id: 7, symptom: "Náusea" },
      ],
      ex3: { label: "Intensidad", val: 10, color: "warning" },
      symptom: "",
      type: null,
      e6: 1,
      modal2: false,
      bodyPartItems: [
        { idBodyPart: 1, bodyPart: "Cabeza" },
        { idBodyPart: 2, bodyPart: "Frente" },
        { idBodyPart: 3, bodyPart: "Costados de la Cabeza" },
        { idBodyPart: 4, bodyPart: "Cuello" },
        { idBodyPart: 5, bodyPart: "Pecho Izquierdo" },
        { idBodyPart: 6, bodyPart: "Pecho Derecho" },
        { idBodyPart: 7, bodyPart: "Costillas del lado Izquierdo" },
        { idBodyPart: 8, bodyPart: "Epigastrium" },
        { idBodyPart: 9, bodyPart: "Costillas del lado Derecho" },
        { idBodyPart: 10, bodyPart: "Abdomen Izquierdo" },
        { idBodyPart: 11, bodyPart: "Abdomen Central" },
        { idBodyPart: 12, bodyPart: "Abdomen Derecho" },
        { idBodyPart: 13, bodyPart: "Cadera Izquierda" },
        { idBodyPart: 14, bodyPart: "Área Púbica" },
        { idBodyPart: 15, bodyPart: "Cadera Derecha" },
        { idBodyPart: 16, bodyPart: "Genitales" },
        { idBodyPart: 17, bodyPart: "Hombro Izquierdo" },
        { idBodyPart: 18, bodyPart: "Hombro Derecho" },
        { idBodyPart: 19, bodyPart: "Antebrazo Izquierdo" },
        { idBodyPart: 20, bodyPart: "Antebrazo Derecho" },
        { idBodyPart: 21, bodyPart: "Codo Izquierdo" },
        { idBodyPart: 22, bodyPart: "Codo Derecho" },
        { idBodyPart: 23, bodyPart: "Brazo Izquierdo" },
        { idBodyPart: 24, bodyPart: "Brazo Derecho" },
        { idBodyPart: 25, bodyPart: "Muñeca Izquierda" },
        { idBodyPart: 26, bodyPart: "Muñeca Derecha" },
        { idBodyPart: 27, bodyPart: "Mano Izquierda" },
        { idBodyPart: 28, bodyPart: "Mano Derecha" },
        { idBodyPart: 29, bodyPart: "Muslo Izquierdo" },
        { idBodyPart: 30, bodyPart: "Muslo Derecho" },
        { idBodyPart: 31, bodyPart: "Espinilla Izquierda" },
        { idBodyPart: 32, bodyPart: "Espinilla Derecha" },
        { idBodyPart: 33, bodyPart: "Rodilla Izquierda" },
        { idBodyPart: 34, bodyPart: "Rodilla Derecha" },
        { idBodyPart: 35, bodyPart: "Cadera Izquierda" },
        { idBodyPart: 36, bodyPart: "Tobillo Izquierdo" },
        { idBodyPart: 37, bodyPart: "Pantorrilla Izquierda" },
        { idBodyPart: 38, bodyPart: "Pantorrilla Derecha" },
        { idBodyPart: 39, bodyPart: "Tobillo Izquierdo" },
        { idBodyPart: 40, bodyPart: "Tobillo Derecho" },
        { idBodyPart: 41, bodyPart: "Pie Izquierdo" },
        { idBodyPart: 42, bodyPart: "Pie Derecho" },
        { idBodyPart: 43, bodyPart: "Detrás De La Cabeza" },
        { idBodyPart: 44, bodyPart: "Columna Cervical" },
        { idBodyPart: 45, bodyPart: "Columna Torácica" },
        { idBodyPart: 46, bodyPart: "Columna Lumbar" },
        { idBodyPart: 47, bodyPart: "Nalga Izquierda" },
        { idBodyPart: 48, bodyPart: "Nalga Derecha" },
      ],
      bodyPart: "",
      location: null,
      vitalSignId: "",
      consultationId: this.$route.params.consultationId,
      videoProfile: Cookies.get("videoProfile").split(",")[0] || "480p_4",
      channel: "",
      transcode: Cookies.get("transcode") || "live",
      codec: Cookies.get("codec") || "h264",
      attendeeMode: Cookies.get("attende  eMode") || "video",
      baseMode: Cookies.get("baseMode") || "avc",
      uid: undefined,
      selectDisabled: false,
      ex4: false,
      form: {
        consultation: null,
        type: null,
        location: null,
        severity: null,
        onset: new Date().toISOString().substring(0, 10),
        reported: "N/A",
        timestamp: "",
      },
      formvitalsign: {
        consultation: null,
        weight: null,
        height: null,
        systolic_pressure: null,
        diastolic_pressure: null,
        heart_rate: null,
        temperature: null,
        glucose: null,
        oxygen: null,
        timestamp: new Date().toISOString().substring(0, 10),
      },

      appointmentForm: {
        consultation: null,
        appointment_type: null,
        scheduled: new Date().toISOString(),
        start: null,
        end: null,
        patient: null,
        ambassador: 13,
      },

      channelCmd: "",
    };
  },

  created() {
    this.channel = localStorage.getItem("cabinChannel");
    this.channelCmd = `${this.channel}-cmd`;
    try {
      const ws = new WebSocket("ws://localhost:3000/");
      ws.addEventListener("open", () => {
        ws.send(this.channel);
      });
    } catch (error) {
      console.error(`Error sending websocket ${error}`);
    }
    this.getConsultation();
    this.loadInformation();
    this.appId = AGORA_APP_ID;
    if (!this.appId) {
      return alert("Get App ID first!");
    }
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialogLoadingAppointment = false), 4000);
    },
  },
  methods: {
    createScanner() {
      this.e6 = 2;
    },

    async createInitialVS() {
      this.dialogSaveVS = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      //let path = "http://192.168.0.108:8000/api/consultations/vital_sign/"
      //let path = 'http://192.168.0.108:8000/api/consultations/vital_sign/';
      let path = `${API_URL}api/consultations/vital_sign/`;

      await axios
        .post(
          path,
          {
            weight: this.formvitalsign.weight,
            height: this.formvitalsign.height,
            systolic_pressure: null,
            diastolic_pressure: null,
            heart_rate: this.formvitalsign.heart_rate,
            temperature: this.formvitalsign.temperature,
            glucose: null,
            oxygen: this.formvitalsign.oxygen,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
          },
          { headers }
        )
        .then((response) => {
          this.dialogSaveVS = false;
          this.e6 = 3;
          //setTimeout(() => (this.dialogAskingVitalSigns = false), 4000)
          this.vitalSignId = response.data.id;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async sendWeight() {
      this.dialogAskingVitalSigns = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathGet = `${API_URL}api/consultations/send_vital_sign/weight/${this.vitalSignId}/`;

      await axios
        .patch(
          pathGet,
          {
            id: this.vitalSignId,
            weight: this.formvitalsign.weight,
            height: this.formvitalsign.height,
            systolic_pressure: null,
            diastolic_pressure: null,
            heart_rate: this.formvitalsign.heart_rate,
            temperature: this.formvitalsign.temperature,
            glucose: null,
            oxygen: this.formvitalsign.oxygen,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            setTimeout(() => (this.dialogAskingVitalSigns = false), 4000);
          }
        });
    },

    async sendHeight() {
      this.dialogAskingVitalSigns = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathGet = `${API_URL}api/consultations/send_vital_sign/height/${this.vitalSignId}/`;

      await axios
        .patch(
          pathGet,
          {
            id: this.vitalSignId,
            weight: this.formvitalsign.weight,
            height: this.formvitalsign.height,
            systolic_pressure: null,
            diastolic_pressure: null,
            heart_rate: this.formvitalsign.heart_rate,
            temperature: this.formvitalsign.temperature,
            glucose: null,
            oxygen: this.formvitalsign.oxygen,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            setTimeout(() => (this.dialogAskingVitalSigns = false), 4000);
          }
        });
    },

    async sendTemperature() {
      this.dialogAskingVitalSigns = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathGet = `${API_URL}api/consultations/send_vital_sign/temperature/${this.vitalSignId}/`;

      await axios
        .patch(
          pathGet,
          {
            id: this.vitalSignId,
            weight: this.formvitalsign.weight,
            height: this.formvitalsign.height,
            systolic_pressure: null,
            diastolic_pressure: null,
            heart_rate: this.formvitalsign.heart_rate,
            temperature: this.formvitalsign.temperature,
            glucose: null,
            oxygen: this.formvitalsign.oxygen,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            setTimeout(() => (this.dialogAskingVitalSigns = false), 4000);
          }
        });
    },

    async sendOxygen() {
      this.dialogAskingVitalSigns = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathGet = `${API_URL}api/consultations/send_vital_sign/oxygen/${this.vitalSignId}/`;

      await axios
        .patch(
          pathGet,
          {
            id: this.vitalSignId,
            weight: this.formvitalsign.weight,
            height: this.formvitalsign.height,
            systolic_pressure: null,
            diastolic_pressure: null,
            heart_rate: this.formvitalsign.heart_rate,
            temperature: this.formvitalsign.temperature,
            glucose: null,
            oxygen: this.formvitalsign.oxygen,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            setTimeout(() => (this.dialogAskingVitalSigns = false), 4000);
          }
        });
    },

    async updateVitalSign() {
      this.dialogSaveVS = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      //let pathGet = `http://192.168.0.108:8000/api/consultations/new_vital_sign/${this.vitalSignId}/`;
      let pathGet = `${API_URL}api/consultations/new_vital_sign/${this.vitalSignId}/`;

      await axios
        .put(
          pathGet,
          {
            id: this.vitalSignId,
            weight: this.formvitalsign.weight,
            height: this.formvitalsign.height,
            systolic_pressure: null,
            diastolic_pressure: null,
            heart_rate: this.formvitalsign.heart_rate,
            temperature: this.formvitalsign.temperature,
            glucose: null,
            oxygen: this.formvitalsign.oxygen,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            setTimeout(() => (this.dialogAskingVitalSigns = false), 4000);
            this.dialogSaveVS = true;
            if (response.status == 200 || response.status == 201) {
              this.dialogLoading = false;
              this.dialogSaveVS = false;
              this.dialog = true;
            }
            setTimeout(() => (this.dialogSaveVS = false), 3000);
          }
        });
    },

    loadInformation() {
      try {
        const ws = new WebSocket("ws://localhost:3000/");
        ws.onmessage = ({ data }) => {
          this.message = data;
          let content = JSON.parse(this.message);
          switch (content["type"]) {
            case "vitalsigns-info":
              this.dialogLoadingVitalSign = true;
              if (content["weight"]) {
                this.vitalSignDescription = "Peso";
              } else if (content["height"]) {
                this.vitalSignDescription = "Altura";
              } else if (content["bpm-f"] || content["oxygen"]) {
                this.vitalSignDescription = "Frecuencia cardiaca y Oxígeno";
              } else if (content["temperature"]) {
                this.vitalSignDescription = "Temperatura";
              }
              setTimeout(
                function() {
                  for (const i in content) {
                    if (i == "weight") {
                      if (content["weight"] != "") {
                        localStorage.setItem(
                          "weight",
                          JSON.stringify(content["weight"])
                        );
                        this.formvitalsign.weight = JSON.parse(
                          localStorage.getItem("weight")
                        );
                      }
                    }

                    if (i == "height") {
                      if (content["height"] != "") {
                        localStorage.setItem(
                          "height",
                          JSON.stringify(content["height"])
                        );
                        this.formvitalsign.height = JSON.parse(
                          localStorage.getItem("height")
                        );
                      }
                    }

                    if (i == "bpm-f") {
                      if (content["bpm-f"] != "") {
                        localStorage.setItem(
                          "bpm-f",
                          JSON.stringify(content["bpm-f"])
                        );
                        this.formvitalsign.heart_rate = JSON.parse(
                          localStorage.getItem("bpm-f")
                        );
                      }
                    }

                    if (i == "oxygen") {
                      if (content["oxygen"] != "") {
                        localStorage.setItem(
                          "oxygen",
                          JSON.stringify(content["oxygen"])
                        );
                        this.formvitalsign.oxygen = JSON.parse(
                          localStorage.getItem("oxygen")
                        );
                      }
                    }

                    if (i == "temperature") {
                      if (content["temperature"] != "") {
                        localStorage.setItem(
                          "temperature",
                          JSON.stringify(content["temperature"])
                        );
                        this.formvitalsign.temperature = JSON.parse(
                          localStorage.getItem("temperature")
                        );
                      }
                    }
                  }
                }.bind(this),
                2000
              );
              /*
              this.formvitalsign.weight =  content['weight'];
              this.formvitalsign.height =  content['height'];
              this.formvitalsign.heart_rate =  content['bpm-f'];
              this.formvitalsign.temperature =  content['temperature'];
              this.formvitalsign.oxygen =  content['oxygen'];*/
              setTimeout(() => (this.dialogLoadingVitalSign = false), 4000);

              break;

            default:
              break;
          }
        };
      } catch (error) {
        console.error(error);
      }
    },

    async getConsultation() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/consultations/consultations/${this.consultationId}/`;
      await axios
        .get(path, { headers })
        .then((response) => {

          this.form.consultation = response.data.id;
          this.formvitalsign.consultation = response.data.id;
          this.appointmentForm.consultation = response.data.id;
          this.appointmentForm.patient = response.data.patient;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    selectText(text) {
      this.symptom = text.symptom;
      this.form.type = text.id;
      this.form.type = text.id;
    },

    changeBodyPart(body) {
      this.bodyPart = body.bodyPart;
      this.location = body.idBodyPart;
      this.form.location = this.location;
    },

    preventC() {
      this.selectDisabled = !this.selectDisabled;
      this.selectDisabled ? (this.form.type = 8) : (this.form.type = null);
      this.selectDisabled
        ? (this.symptom = "Consulta preventiva")
        : (this.symptom = "");
    },

    showSnackbar() {
      this.snackbar = true;
    },

    symptomCreate(event) {
      this.dialogSaveVS = true;
      event.preventDefault();
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      //let path = "http://192.168.0.103:8000/api/consultations/symptom/"
      let path = `${API_URL}api/consultations/symptom/`;
      axios
        .post(path, this.form, { headers })
        .then((response) => {
          (this.form.consultation = response.data.consultation),
            (this.form.type = response.data.type),
            (this.form.location = response.data.location),
            (this.form.severity = response.data.severity),
            (this.form.onset = response.data.severity),
            (this.form.reported = response.data.timestamp),
            (this.form.timestamp = response.data.timestamp);
          this.showSnackbar();
          this.dialogSaveVS = false;
          setTimeout(() => (this.snackbar = false), 3000);
          const ws = new WebSocket("ws://localhost:3000/");
          ws.addEventListener("open", () => {
            ws.send(this.channel);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    vitalSignCreate(event) {
      this.dialogLoading = false;
      event.preventDefault();
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      //let path = "http://192.168.0.108:8000/api/consultations/vital_sign/"

      let path = `${API_URL}api/consultations/vital_sign/`;
      axios
        .post(path, this.formvitalsign, { headers })
        .then((response) => {
          (this.formvitalsign.consult = response.data.consultation.id),
            (this.formvitalsign.weight = response.data.weight),
            (this.formvitalsign.height = response.data.height),
            (this.formvitalsign.systolic_pressure =
              response.data.systolic_pressure),
            (this.formvitalsign.diastolic_pressure =
              response.data.diastolic_pressure),
            (this.formvitalsign.heart_rate = response.data.heart_rate),
            (this.formvitalsign.temperature = response.data.temperature),
            (this.formvitalsign.glucose = response.data.glucose);
          this.formvitalsign.oxygen = response.data.oxygen;
          this.formvitalsign.timestamp = response.data.timestamp.concat(
            "T00:00:00Z"
          );
          this.showSnackbar();

          this.dialogSaveVS = true;
          if (response.status == 200 || response.status == 201) {
            this.dialogLoading = false;
            this.dialogSaveVS = false;
            this.dialog = true;
          }
          setTimeout(() => (this.dialogSaveVS = false), 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    appointmentCreate() {
      //let path = "http://192.168.0.108:8000/api/appointments/"
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/`;

      axios
        .post(path, this.appointmentForm, { headers })
        .then((response) => {
          (this.appointmentForm.consultation = response.data.consultation),
            (this.appointmentForm.appointment_type =
              response.data.appointment_type),
            (this.appointmentForm.scheduled = response.data.scheduled),
            (this.appointmentForm.start = response.data.start),
            (this.appointmentForm.end = response.data.diastolic_pressure),
            (this.appointmentForm.patient = response.data.patient),
            (this.appointmentForm.ambassador = response.data.ambassador),
          this.appointmentId = response.data.id;

          this.showSnackbar();
          if (response.status == 201 || response.status == 200) {
            this.dialogLoadingAppointment = false;
            this.dialogStartConsultation = true;
          }
          setTimeout(() => (this.snackbar = false), 3000);
          this.e6 = 2;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    startConsultation() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/${this.appointmentId}/`;

      axios
        .patch(
          path,
          {
            appointment_type: "PC",
            patient: this.appointmentForm.patient,
            consultation: this.appointmentForm.consultation,
            scheduled: this.appointmentForm.scheduled,
            ambassador: 13,
            doctor: null,
            started: this.appointmentForm.start,
            end: this.appointmentForm.end,
          },
          { headers }
        )
        .then((response) => {
          if (response.status == 200) {
            this.dialogLoadingStartConsultation = false;
            this.$swal({
              icon: "success",
              title: "Iniciar consulta",
              text: "¡Consulta iniciada con éxito!",
            });
          }
          setTimeout(
            () =>
              this.$router.push({
                path: "/dashboard",
              }),
            3000
          );
          /*if (response.status == 200) {
              te
            }*/
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
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

.v-responsive {
  max-width: 30% !important;
}

.button {
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  background-color: #ade2f8;
  box-shadow: 0px 5px 10px #ade2f8;
}

.meeting .wrapper {
  height: 100%;
}

.meeting .ag-header {
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ag-header-lead {
  font-size: 16px;
  line-height: 35px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.meeting .ag-footer {
  padding: 0 30px;
  display: flex;
  align-items: center;
}

.meeting .ag-main {
  position: relative;
}

.meeting .ag-footer :first-child {
  margin-right: 80px;
}

.header-logo {
  width: 15%;
  margin-right: 12px;
  margin-top: 30px;
}

.ag-container {
  width: calc(100% - 60px);
  height: 100%;
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.cards {
  position: relative;
  margin-top: 30px;
  margin-left: 30px;
  padding: 20px 30px 20px 30px;
  width: calc(100% - 60px);
}

.shadow {
  box-shadow: 5px 5px 10px #8ddafc;
}

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: both;
}

.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

.button {
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  background-color: #ade2f8;
  box-shadow: 0px 5px 10px #ade2f8;
}
</style>
