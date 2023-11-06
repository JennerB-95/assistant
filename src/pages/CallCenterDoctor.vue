<template>
  <v-app>
    <div>
      <v-toolbar dense class="header-fix" elevation="2">
        <v-toolbar-title>
          <div class="wrapper meeting">
            <div class="ag-header">
              <div class="ag-header-lead">
                <img class="header-logo" src="../assets/bitmec.png" alt="" />
              </div>
            </div>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            class="ma-2"
            color="#9BC4E9"
            outlined
            @click.stop="dialog2 = true"
          >
            Cerrar sesión
            <v-icon right>
              mdi-logout
            </v-icon>
          </v-btn>
          <v-dialog v-model="dialog2" max-width="290">
            <v-card>
              <v-card-title class="text-h5">
                ¿Deseas cerrar sesión?
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="#8F4667" text @click="dialog2 = false">
                  Cancelar
                </v-btn>

                <v-btn
                  color="#8F4667"
                  text
                  @click="(dialog2 = false), logOut()"
                >
                  Cerrar sesión
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-toolbar>
    </div>
    <v-row class="mt-5" no-gutters>
      <v-col style="background-color: #F8F8F8;" cols="12" sm="6">
        <div
          style="margin-right: 15px; margin-left: 25px; margin-bottom: 25px; margin-top:80px"
        >
          <v-card outlined class="mx-auto mt-5 mr-4 ml-4 " elevation="0">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-h5">
                  Detalle de Cita
                </div>
                <div class="text-h6">
                  {{ appointmentType }}
                </div>
                <v-list-item-title class="text-h6">
                  {{ consultationName }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-divider class="mt-5 mb-3 mr-4 ml-4 "></v-divider>

          <div>
            <v-row>
              <v-col col="12">
                <v-card class="mt-0 mx-auto mr-4 ml-4 " outlined elevation="0">
                  <v-img
                    class="v-sheet--offset mx-auto"
                    :src="patientProfilePicture"
                    height="145px"
                    contain
                  ></v-img>

                  <v-card-text class="pt-0">
                    <div
                      style="margin-top: -50px"
                      class="title font-weight-bold"
                    >
                      {{ patientFirstName }}
                    </div>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <div
                          class="mt-1 subheading font-weight-light grey--text"
                        >
                          <v-icon left>mdi-calendar-month</v-icon
                          >{{ patientBirthDate }} | Edad: {{ patientAge }} años
                        </div>
                        <div
                          class="mt-1 subheading font-weight-light grey--text"
                        >
                          <v-icon left>mdi-gender-male-female</v-icon>
                          {{ patientGender }}
                        </div>
                        <div
                          class="mt-1  subheading font-weight-light grey--text"
                        >
                          <v-icon left>mdi-phone</v-icon
                          >{{ patientPhoneNumber }}
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div
                          class="mt-1 subheading font-weight-light grey--text"
                        >
                          <v-icon left>mdi-map</v-icon>{{ patientCity }},
                          {{ patientCountry }}
                        </div>
                        <div
                          class="mt-1 subheading font-weight-light grey--text"
                        >
                          <v-icon left>mdi-map-marker</v-icon
                          >{{ patientAddress }}, {{ patientState }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <v-divider class="mr-4 ml-4 mt-4"></v-divider>

          <div class="d-flex justify-end">
            <v-snackbar
              max-width="100"
              color="success"
              right
              top
              elevation="24"
              v-model="snackbar2"
            >
              <span class="title">
                ¡Registro creado correctamente!
              </span>
              <v-icon dark right>
                mdi-checkbox-marked-circle
              </v-icon>
            </v-snackbar>
          </div>
          <v-card outlined class="ma-4 pb-3">
            <div style="color: #00b4d8;" class="pl-6 pt-4">Motivo de consulta</div>
            <div v-if="listSymptoms.length == 0">
              <p class="mt-3 text-center">No hay información registrada.</p>
            </div>
            <div v-else>
              <v-slide-group v-model="model" active-class="success" show-arrows>
                <v-slide-item
                  v-for="(item, index) in listSymptoms"
                  v-bind:key="index"
                >
                  <v-card
                    v-if="item.type != 8"
                    class="ma-3"
                    max-width="250"
                    min-width="250"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-row justify="space-between" no-gutters>
                          <div class="font-weight-bold">
                            {{ fixTypeOfSypmtom(item.type) }}
                          </div>

                          <v-chip small color="#00b4d8" text-color="white">
                            <v-avatar>
                              <v-icon small>mdi-human</v-icon>
                            </v-avatar>
                          </v-chip>
                        </v-row>
                        <div class="mt-2 font-weight-bold">
                          {{ fixLocationOfSymptom(item.location) }}
                        </div>
                        <div>
                          <v-list-item-title class="subtitle-1 mb-1">
                            Magnitud de síntoma
                          </v-list-item-title>
                          <v-list-item-subtitle class="subtitle-1">{{
                            item.severity
                          }}</v-list-item-subtitle>

                          <v-list-item-title class="subtitle-1 mb-1 mt-2">
                            Inicio de síntoma
                          </v-list-item-title>
                          <v-list-item-subtitle class="subtitle-1">{{
                            difference(Date(), item.onset)
                          }}</v-list-item-subtitle>

                          <v-list-item-title class="subtitle-1 mb-1 mt-2">
                            Fecha
                          </v-list-item-title>
                          <v-list-item-subtitle class="subtitle-1">{{
                            fixDate(item.timestamp)
                          }}</v-list-item-subtitle>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>

                  <v-card
                    v-else
                    class="ma-3"
                    color="amber lighten-5"
                    max-width="250"
                    min-width="250"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-row justify="end" no-gutters>
                          <v-chip small color="warning" text-color="white">
                            <v-avatar>
                              <v-icon small>mdi-alert-circle-outline</v-icon>
                            </v-avatar>
                          </v-chip>
                        </v-row>
                        <div class="mt-2 font-weight-bold">
                          Consulta preventiva
                        </div>
                        <div>
                          <v-list-item-title class="subtitle-1 mb-1">
                            Fecha
                          </v-list-item-title>
                          <v-list-item-subtitle class="subtitle-1">{{
                            difference(Date(), item.reported)
                          }}</v-list-item-subtitle>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </div>
          </v-card>

          <v-card outlined class="ma-4 pb-3">
            <div style="color: #00b4d8;" class="pl-6 pt-4">Signos vitales</div>
            <div v-if="listVitalSigns.length == 0">
              <p class="mt-3 text-center">No hay información registrada.</p>
            </div>
            <div v-else>
              <v-slide-group v-model="model" active-class="success" show-arrows>
                <v-slide-item
                  v-for="(item, index) in listVitalSigns"
                  v-bind:key="index"
                >
                  <v-card class="ma-3" max-width="350" min-width="350" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-row justify="end" no-gutters>
                          <v-chip small color="#00b4d8" text-color="white">
                            <v-avatar>
                              <v-icon small>mdi-medical-bag</v-icon>
                            </v-avatar>
                          </v-chip>
                        </v-row>
                        <div>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Temperatura
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1"
                                >{{ item.temperature }}C</v-list-item-subtitle
                              >

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Peso
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1"
                                >{{ item.weight }} lbs</v-list-item-subtitle
                              >

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Estatura
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1"
                                >{{ item.height }} mt</v-list-item-subtitle
                              >

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                IMC
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixImc(item.weight, item.height)
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Presión sistólica
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.systolic_pressure
                              }}</v-list-item-subtitle>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Presión diastólica
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.diastolic_pressure
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Frecuencia cardíaca
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.heart_rate
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Glucosa
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.glucose || "Sin información."
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-2">
                                Oxígeno
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.oxygen
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Fecha
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixDate(item.timestamp)
                              }}</v-list-item-subtitle>
                            </v-col>
                          </v-row>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </div>
          </v-card>
          <v-expansion-panels flat multiple tile popout focusable>
            <v-expansion-panel class="mt-3" key="1">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Antecedentes Médicos</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listHistoricalOperations.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listHitoricalConditions"
                      :key="index"
                    >
                      <v-card class="ma-5" max-width="300" outlined>
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="text-h6 mb-4">
                                {{ item.condition }}
                              </div>
                              <v-chip
                                small
                                class=""
                                color="#00b4d8"
                                text-color="white"
                              >
                                <v-avatar>
                                  <v-icon small
                                    >mdi-clipboard-text-multiple-outline</v-icon
                                  >
                                </v-avatar>
                              </v-chip>
                            </v-row>

                            <v-list-item-title class="subtitle-1 mb-1">
                              Diagnosticado por: {{ item.diagnosing_doctor }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1"
                              >Fecha:
                              {{ item.diagnosis_date }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="2">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Antecedentes Quirúrgicos</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listHistoricalOperations.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listHistoricalOperations"
                      v-bind:key="index"
                    >
                      <v-card class="ma-5" max-width="300" outlined>
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="text-h6 mb-4">
                                {{ item.operation }}
                              </div>

                              <v-chip
                                class=""
                                color="#00b4d8"
                                text-color="white"
                                small
                              >
                                <v-avatar>
                                  <v-icon small>mdi-hospital-box</v-icon>
                                </v-avatar>
                              </v-chip>
                            </v-row>

                            <v-list-item-title class="subtitle-1 mb-1">
                              Diagnosticado por: {{ item.operating_doctor }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1"
                              >Fecha:
                              {{ item.operation_date }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="3">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Medicamentos</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listPrescriptions.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listPrescriptions"
                      :key="index"
                    >
                      <v-card class="ma-5" max-width="300" outlined>
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="text-h6 mb-4">
                                {{ item.drug }}
                              </div>
                              <v-chip small color="#00b4d8" text-color="white">
                                <v-avatar>
                                  <v-icon small>mdi-pill</v-icon>
                                </v-avatar>
                              </v-chip>
                            </v-row>
                            <v-list-item-title class="subtitle-1 mb-1">
                              Recetado por: {{ item.prescribing_doctor }}
                            </v-list-item-title>
                            <v-list-item-title class="subtitle-1 mb-1">
                              Dosis y frecuencia
                            </v-list-item-title>

                            <v-list-item-subtitle class="subtitle-1"
                              >Dosis: {{ item.dose }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle class="subtitle-1"
                              >Frecuencia:
                              {{ item.frequency }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle class="subtitle-1"
                              >Inicio:
                              {{
                                item.prescription_start_date
                              }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle class="subtitle-1"
                              >Fin:
                              {{
                                item.prescription_end_date
                              }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="mt-5" key="4">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Antecedentes familiares</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listFamilyMemberConditions.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listFamilyMemberConditions"
                      v-bind:key="index"
                    >
                      <v-card class="ma-5" max-width="300" outlined>
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="text-h6 mb-4">
                                {{ item.condition }}
                              </div>
                              <v-chip small color="#00b4d8" text-color="white">
                                <v-avatar>
                                  <v-icon small>mdi-pill</v-icon>
                                </v-avatar>
                              </v-chip>
                            </v-row>
                            <v-list-item-title class="subtitle-1 mb-1">
                              Relación con paciente: {{ item.relative }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="subtitle-1"
                              >Fecha:
                              {{ item.date_diagnosed }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="7">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Nota Médica</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listMedicalNotes.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listMedicalNotes"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <v-col cols="6">
                                <div class="font-weight-bold">
                                  {{ item.type }}
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-chip small color="#00b4d8" text-color="white">
                                  <v-avatar>
                                    <v-icon small
                                      >mdi-clipboard-text-multiple-outline</v-icon
                                    >
                                  </v-avatar>
                                </v-chip>
                              </v-col>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Historia de la enfermedad actual
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.consultation_history
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Revisión por sistemas
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.systems_review
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Exámen físico
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.physical_examination
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Impresión clínica
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.clinical_impression
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Plan
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.plan
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Fecha
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixDate(item.timestamp)
                              }}</v-list-item-subtitle>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog11" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">CREAR NOTA MÉDICA</span>
                      </v-card-title>
                      <div class="text-left mt-5 ml-10">
                        <v-form ref="formmedicalnote">
                          <v-row no-gutters class="mt-5 mr-13">
                            <v-textarea
                              placeholder="Motivo Consulta"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formmedicalnote.type"
                            ></v-textarea>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Historia de la enfermedad actual"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="
                                formmedicalnote.consultation_history
                              "
                            ></v-textarea>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Revisión por sistemas"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formmedicalnote.systems_review"
                            ></v-textarea>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Examen Físico"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="
                                formmedicalnote.physical_examination
                              "
                            ></v-textarea>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Impresión Clinica"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formmedicalnote.clinical_impression"
                            ></v-textarea>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Plan"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formmedicalnote.plan"
                            ></v-textarea>
                          </v-row>
                          <v-btn
                            @click="sendMedicalNote()"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="8">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Estudios de Imagen</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listImageDiagnoses.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listImageDiagnoses"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <v-col cols="6">
                                <div class="font-weight-bold">
                                  {{ item.name }}
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-chip small color="#00b4d8" text-color="white">
                                  <v-avatar>
                                    <v-icon small
                                      >mdi-clipboard-text-multiple-outline</v-icon
                                    >
                                  </v-avatar>
                                </v-chip>
                              </v-col>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Historia del paciente
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.history
                              }}</v-list-item-subtitle>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Fecha
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixDate(item.timestamp)
                              }}</v-list-item-subtitle>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog12" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">CREAR ESTUDIO DE IMAGEN</span>
                      </v-card-title>
                      <div class="text-left mt-5 ml-10">
                        <v-form ref="formdiagnoseimages">
                          <v-row no-gutters class="mt-5 mr-13">
                            <v-text-field
                              placeholder="Nombre de estudio"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formdiagnoseimages.name"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-text-field
                              placeholder="Historia del paciente"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formdiagnoseimages.history"
                            ></v-text-field>
                          </v-row>
                          <v-btn
                            @click="sendDiagnoseImages()"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="9">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Diagnósticos</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listDiagnoses.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listDiagnoses"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <v-col cols="6">
                                <div class="font-weight-bold">
                                  Diagnóstico: {{ item.idc_ten }}
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-chip small color="#00b4d8" text-color="white">
                                  <v-avatar>
                                    <v-icon small
                                      >mdi-clipboard-text-multiple-outline</v-icon
                                    >
                                  </v-avatar>
                                </v-chip>
                              </v-col>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Fecha diagnóstico
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixDate(item.timestamp)
                              }}</v-list-item-subtitle>
                              <div v-if="item.active == true">
                                <v-list-item-subtitle
                                  class="subtitle-1 green--text mt-2"
                                  >Problema activo</v-list-item-subtitle
                                >
                              </div>

                              <div v-else>
                                <v-list-item-subtitle
                                  class="subtitle-1 grey--text mt-2"
                                  >Problema resuelto</v-list-item-subtitle
                                >
                              </div>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog13" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">CREAR DIAGNÓSTICO</span>
                      </v-card-title>
                      <div class="text-left mt-5 ml-10">
                        <v-form ref="formdiagnoses">
                          <v-row no-gutters class="mt-5 mr-13">
                            <v-text-field
                              placeholder="Diagnóstico"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="search_diagnoses"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mt-5 mr-13">
                            <v-select
                              color="#00b4d8"
                              dense
                              outlined
                              :items="diagnoses"
                              item-value="codigo"
                              item-text="name"
                              return-object
                              placeholder=""
                              v-model.trim="formdiagnoses.idc_ten"
                            ></v-select>
                          </v-row>
                          <v-btn
                            @click="sendDiagnosis()"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="10">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Receta Médica</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listPrescriptions.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listPrescriptions"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="font-weight-bold">
                                Medicina: {{ item.drug }}
                              </div>
                              <v-chip small color="#00b4d8" text-color="white">
                                <v-avatar>
                                  <v-icon small
                                    >mdi-clipboard-text-multiple-outline</v-icon
                                  >
                                </v-avatar>
                              </v-chip>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Presentación
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.presentation
                              }}</v-list-item-subtitle>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Dosis
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.dose
                              }}</v-list-item-subtitle>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Frecuencia
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.frequency
                              }}</v-list-item-subtitle>

                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Comentarios
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.comments
                              }}</v-list-item-subtitle>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Duración
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.prescription_end_date != null
                                  ? difference2(
                                      item.prescription_end_date,
                                      item.prescription_start_date
                                    )
                                  : "Indefinido"
                              }}</v-list-item-subtitle>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog14" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">CREAR RECETA MÉDICA</span>
                      </v-card-title>
                      <div class="text-left mt-5 ml-10">
                        <v-form ref="formprescription">
                          <v-row no-gutters class="mt-5 mr-13">
                            <v-text-field
                              placeholder="Medicina"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formprescription.drug"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-text-field
                              placeholder="Presentación"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formprescription.presentation"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-dialog
                              ref="dialogDate1"
                              v-model="modalDate1"
                              :return-value.sync="
                                formprescription.prescription_start_date
                              "
                              persistent
                              width="290px"
                            >
                              <template
                                v-slot:activator="{
                                  on,
                                  attrs,
                                }"
                              >
                                <v-text-field
                                  v-model.trim="
                                    formprescription.prescription_start_date
                                  "
                                  color="#00b4d8"
                                  placeholder="Inicio"
                                  dense
                                  outlined
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model.trim="
                                  formprescription.prescription_start_date
                                "
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modalDate1 = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.dialogDate1.save(
                                      formprescription.prescription_start_date
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-dialog
                              ref="dialogDate2"
                              v-model="modalDate2"
                              :return-value.sync="
                                formprescription.prescription_end_date
                              "
                              persistent
                              width="290px"
                            >
                              <template
                                v-slot:activator="{
                                  on,
                                  attrs,
                                }"
                              >
                                <v-text-field
                                  v-model.trim="
                                    formprescription.prescription_end_date
                                  "
                                  color="#00b4d8"
                                  placeholder="Fin"
                                  dense
                                  outlined
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model.trim="
                                  formprescription.prescription_end_date
                                "
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modalDate2 = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.dialogDate2.save(
                                      formprescription.prescription_end_date
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-text-field
                              placeholder="Dosis"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formprescription.dose"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-text-field
                              placeholder="Frecuencia"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formprescription.frequency"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Comentarios"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formprescription.comments"
                            ></v-textarea>
                          </v-row>
                          <v-btn
                            @click="sendPrescription()"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5" key="11">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Laboratorios</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listLabs.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listLabs"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="font-weight-bold">
                                Tipo: {{ item.lab_format.name }}
                              </div>
                              <v-chip small color="#00b4d8" text-color="white">
                                <v-avatar>
                                  <v-icon small
                                    >mdi-clipboard-text-multiple-outline</v-icon
                                  >
                                </v-avatar>
                              </v-chip>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Ordenado por
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1"
                                >{{ item.doctor.first_name }}
                                {{
                                  item.doctor.last_name
                                }}</v-list-item-subtitle
                              >
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Orden
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.name
                              }}</v-list-item-subtitle>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Unidad y medidas
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1"
                                >Unidad minima:
                                {{ item.lab_format.low_measurement }}
                                {{
                                  item.lab_format.units.name
                                }}</v-list-item-subtitle
                              >
                              <v-list-item-subtitle class="subtitle-1"
                                >Unidad minima:
                                {{ item.lab_format.high_measurement }}
                                {{
                                  item.lab_format.units.name
                                }}</v-list-item-subtitle
                              >
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog15" max-width="800px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">TIPOS</span>
                      </v-card-title>
                      <div class="text-left mt-5 mx-10">
                        <v-form>
                          <v-row dense>
                            <v-col
                              v-for="type in typeLaboratories"
                              :key="type.name"
                              cols="4"
                            >
                              <v-hover>
                                <template v-slot:default="{ hover }">
                                  <v-card
                                    :elevation="hover ? 20 : 3"
                                    min-height="100"
                                    class="d-flex
                                    justify-center ml-2 mb-2"
                                    align="center"
                                    @click="
                                      toLaboratoriesList(type.name),
                                        createLabFormat(type.name)
                                    "
                                  >
                                    <v-card-title
                                      style="font-size: 12px;"
                                      v-text="type.name"
                                    ></v-card-title>
                                  </v-card>
                                </template>
                              </v-hover>
                            </v-col>
                          </v-row>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog17" max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ labFormat }}</span>
                      </v-card-title>
                      <div class="text-left mt-5 mx-10">
                        <v-form>
                          <v-row dense>
                            <v-col
                              v-for="type in listLaboratories"
                              :key="type.codigo"
                              cols="6"
                            >
                              <v-checkbox
                                v-model="laboratoriesOrder"
                                :label="`${type.name}`"
                                :value="`${type.name}`"
                                :id="`${type.codigo}`"
                                color="#00b4d8"
                              >
                              </v-checkbox>
                            </v-col>
                          </v-row>
                          <v-btn
                            @click="createLabOrder"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mt-5 mb-5" key="12">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Citas</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listAppointments.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listAppointments"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="font-weight-bold">
                                Tipo:
                                {{ fixAppointmentType(item.appointment_type) }}
                              </div>
                              <v-chip small color="#00b4d8" text-color="white">
                                <v-avatar>
                                  <v-icon small
                                    >mdi-clipboard-text-multiple-outline</v-icon
                                  >
                                </v-avatar>
                              </v-chip>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Fecha
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixDate(item.scheduled)
                              }}</v-list-item-subtitle>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog16" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">CREAR CITA</span>
                      </v-card-title>
                      <div class="text-left mt-5 ml-10">
                        <v-form ref="formappointment">
                          <v-row no-gutters class="mt-5 mr-13">
                            <v-combobox
                              color="#00b4d8"
                              outlined
                              v-model.trim="formappointment.appointment_type"
                              :items="appointmentList"
                              label="Tipo Cita"
                              chips
                              item-value="value"
                              item-text="name"
                              return-object
                              v-on:change="changeAppointment"
                            ></v-combobox>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-text-field
                              type="datetime-local"
                              placeholder="Fecha y hora"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formappointment.scheduled"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Anotaciones"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formappointment.annotations"
                            ></v-textarea>
                          </v-row>
                          <v-btn
                            @click="sendAppointment()"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="mb-5" key="12">
              <v-expansion-panel-header>
                <div style="color: #00b4d8;">Referencias</div>
                <template v-slot:actions>
                  <v-icon color="#00b4d8">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-if="listReferrals.length == 0">
                  <p class="mt-3 text-center">No hay información registrada.</p>
                </div>
                <div v-else>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="(item, index) in listReferrals"
                      v-bind:key="index"
                    >
                      <v-card
                        class="ma-3"
                        max-width="250"
                        min-width="250"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-row justify="space-between" no-gutters>
                              <div class="font-weight-bold">
                                {{ item.referred_doctor }}
                              </div>
                              <v-chip small color="#00b4d8" text-color="white">
                                <v-avatar>
                                  <v-icon small
                                    >mdi-clipboard-text-multiple-outline</v-icon
                                  >
                                </v-avatar>
                              </v-chip>
                            </v-row>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Razón
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                item.reason
                              }}</v-list-item-subtitle>
                            </div>
                            <div>
                              <v-list-item-title class="subtitle-1 mb-1 mt-3">
                                Fecha
                              </v-list-item-title>
                              <v-list-item-subtitle class="subtitle-1">{{
                                fixDate(item.timestamp)
                              }}</v-list-item-subtitle>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </div>
                <v-row justify="center" class="mt-5">
                  <v-dialog v-model="dialog18" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mb-4"
                        color="#00b4d8"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Referir
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">REFERIR PACIENTE</span>
                      </v-card-title>
                      <div class="text-left mt-5 ml-10">
                        <v-form ref="formReferral">
                          <v-row no-gutters class="mr-13">
                            <v-text-field
                              placeholder="Refiere a"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formReferral.referred_doctor"
                            ></v-text-field>
                          </v-row>
                          <v-row no-gutters class="mr-13">
                            <v-textarea
                              placeholder="Agregue detalles y observaciones"
                              color="#00b4d8"
                              dense
                              label=""
                              outlined
                              v-model.trim="formReferral.reason"
                            ></v-textarea>
                          </v-row>
                          <v-btn
                            @click="sendReferral()"
                            color="#00b4d8"
                            class="mt-3 mr-10 mb-10 white--text button pr-10 pl-10"
                          >
                            Guardar
                          </v-btn>
                        </v-form>
                      </div>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
      <v-col style="background-color: #F8F8F8;" cols="12" sm="6">
        <v-card class="mt-5" elevation="10">
          <div class="fixed-video">
            <div class="ag-main" id="container">
              <div v-if="callOpened" class="ag-container" width="320">
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
              <div v-else class="mt-4">
                <v-row>
                  <v-card
                    height="200"
                    class=" grey lighten-3 ag-container mr-3 mb-3"
                    width="250"
                    outlined
                  >
                  </v-card>
                  <v-card
                    height="200"
                    class="grey lighten-3 ag-container ml-3 mb-3"
                    width="250"
                    outlined
                  >
                  </v-card>
                </v-row>
              </div>
              <v-card
                outlined
                class="grey lighten-3 mt-3 pa-5"
                min-width="700"
                max-width="700"
              >
                <v-row justify="end">
                  <div class="">
                    <div>
                      <v-btn
                        @click="openCabin(), activateReceipt()"
                        color="white"
                        class="ma-1 mr-2 pt-5 pb-5"
                      >
                        <div class="#00b4d8--text">Abrir cabina</div>
                      </v-btn>
                    </div>
                  </div>
                  <v-dialog transition="dialog-top-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="ma-1 mr-2 pt-5 pb-5"
                        color="#00b4d8"
                        v-bind="attrs"
                        v-on="on"
                        dark
                        >Documentos</v-btn
                      >
                    </template>
                    <template v-slot:default="dialogDoc">
                      <v-card>
                        <v-toolbar color="#00b4d8" dark
                          ><div class="text-h5">Documentos escaneados</div>
                        </v-toolbar>
                        <v-card-text>
                          <div
                            v-if="listScans.length == 0"
                            class="text-h5 pa-6"
                          >
                            - Sin registros.
                          </div>
                          <div v-else class="text-h5 pa-5">
                            <ul
                              v-for="(item, index) in listScans"
                              v-bind:key="index"
                              class="mt-5"
                            >
                              <li>
                                <p>
                                  <a
                                    :href="item.image"
                                    target="_blank"
                                    class="grey--text"
                                  >
                                    No. documento: {{ item.id }}</a
                                  >
                                </p>
                              </li>
                            </ul>
                          </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn
                            color="#00b4d8"
                            dark
                            @click="dialogDoc.value = false"
                            >Cerrar</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                  <v-divider vertical></v-divider>
                  <div class="mr-2">
                    <v-btn
                      dark
                      color="success"
                      @click="answerCall()"
                      class="ma-1 ml-2 pt-5 pb-5"
                    >
                      <v-icon dark size="30">mdi-phone-hangup</v-icon>
                    </v-btn>
                  </div>
                  <div class="mr-3">
                    <v-btn
                      dark
                      color="error"
                      @click="endAppointment()"
                      class="ma-1 ml-2 pt-5 pb-5"
                    >
                      <v-icon dark size="30">mdi-phone-hangup</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-card>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogReload" hide-overlay persistent width="300">
      <v-card class="pt-3" color="#00b4d8" dark>
        <v-card-text>
          Cargando información necesaria...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import moment from "moment";
import * as Cookies from "js-cookie";
import axios from "axios";
import AgoraVideoCall from "@/components/AgoraVideoCall";
import { AGORA_APP_ID } from "@/agora.config";
import { API_URL, TOKEN } from "../global";
import laboratoriesExt from "../js/laboratories";
import diagnosesExt from "../js/diagnoses";
export default {
  components: {
    AgoraVideoCall,
  },
  data() {
    return {
      appointmentId: this.$route.params.appointmentId,
      patientId: this.$route.params.patientId,
      //data warnings
      start_date: "",
      end_date: "",
      select: "",
      dialogDoc: false,
      videoProfile: Cookies.get("videoProfile")?.split(",")[0] || "360p_8",
      channel: "",
      transcode: Cookies.get("transcode") || "h264_interop",
      codec: Cookies.get("codec") || "h264",
      attendeeMode: Cookies.get("attendeeMode") || "video",
      baseMode: Cookies.get("baseMode") || "avc",
      uid: undefined,
      dialog2: false,
      dialog10: false,
      dialog11: false,
      dialog12: false,
      dialog13: false,
      dialog14: false,
      dialog15: false,
      dialog16: false,
      dialog17: false,
      dialog18: false,
      modalDate1: false,
      modalDate2: false,
      dialogDate1: false,
      dialogDate2: false,
      camera: false,
      microphone: true,
      activeColor: "blue-grey",
      inactiveColor: "grey",
      model: null,
      appointmentType: "",
      consultationName: "",
      consultationId: "",
      patientFirstName: "",
      patientLastName: "",
      patientState: "",
      patientCountry: "",
      patientCity: "",
      patientGender: "",
      patientPhoneNumber: "",
      patientAddress: "",
      patientProfilePicture: "",
      patientAge: "",
      patientBirthDate: "",
      dialogAskingVitalSigns: false,
      snackbar2: false,
      search_diagnoses: "",
      /* Laboratories modals */
      appointmentList: [
        { name: "Primera Consulta", value: "PC" },
        { name: "Seguimiento", value: "S" },
        { name: "Emergencia", value: "E" },
      ],
      listLaboratories: [],
      typeLaboratories: laboratoriesExt.laboratories,
      labFormat:
        "" /*variable utilizada para guardar labFormat en localstorage*/,
      labFormatId: "",
      laboratoriesOrder: [],

      /* Medical History */
      //Antecedentes médicos
      listHitoricalConditions: [],
      condition: "",
      diagnosisDate: "",
      diagnosisDoctor: "",

      //Antecedentes quirúrgicos
      listHistoricalOperations: [],
      operation: "",
      operationDate: "",
      operatingDoctor: "",

      //Medicamentos
      drug: "",
      prescriptionStartDate: "",
      prescriptionEndDate: "",
      dose: "",
      frequency: "",
      prescribingDoctor: "",

      //Antecedentes familiares
      listFamilyMemberConditions: [],
      relative: "",
      conditionFamilyMember: "",
      dateDiagnosedFamilyMember: "",

      //Motivo de consulta
      consultations: [],
      filteredConsultation: [],

      listSymptoms: [],
      arrayLocation: [],
      symptom_counter: 0,

      //Citas
      listAppointments: [],

      //Signos vitales
      listVitalSigns: [],

      //Diagnósticos
      listDiagnoses: [],

      //Diagnósticos de imagen
      listImageDiagnoses: [],

      //Laboratorios
      listLabs: [],

      //Notas médicas
      listMedicalNotes: [],

      //Recetas
      listPrescriptions: [],

      //Referencias
      listReferrals: [],

      //Síntomas
      descriptionType: "",
      descriptionLocation: "",
      type: "",
      location: "",
      severity: "",
      onset: "",
      reported: "",
      timestamp: "",

      formReferral: {
        consultation: null,
        referred_doctor: "",
        reason: "",
        referring_doctor: null,
      },

      //Signos Vitales
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
      //Nota Medica
      formmedicalnote: {
        type: null,
        consultation_history: null,
        systems_review: null,
        physical_examination: null,
        clinical_impression: null,
        plan: null,
        timestamp: new Date().toISOString().substring(0, 10),
        consultation: null,
        doctor: null,
      },

      //Estudios de Imagen
      formdiagnoseimages: {
        name: null,
        history: null,
        timestamp: new Date().toISOString().substring(0, 10),
        consultation: null,
        doctor: null,
      },

      //Receta Medica
      formprescription: {
        drug: null,
        prescription_start_date: null,
        prescription_end_date: null,
        dose: null,
        presentation: null,
        frequency: null,
        comments: null,
        timestamp: new Date().toISOString().substring(0, 10),
        consultation: null,
        doctor: null,
      },

      formappointment: {
        appointment_type: null,
        scheduled: null,
        timestamp: new Date().toISOString().substring(0, 10),
        start: null,
        end: null,
        patient: null,
        consultation: null,
        ambassador: null,
        doctor: null,
        annotations: "",
      },
      formdiagnoses: {
        idc_ten: 0,
        active: null,
        timestamp: new Date().toISOString().substring(0, 10),
        consultation: null,
        doctor: null,
      },
      isPreventConsultation: false,
      dialogReload: false,
      labResults: [],
      listScans: [],
      callOpened: false,
      idAssistnt: "",
    };
  },
  created() {
    this.channel = `cabin-${this.patientId}-channeldoctor`;
    this.idAssistnt = localStorage.getItem("idAssistant");

    this.appId = AGORA_APP_ID;
    if (!this.appId) {
      return alert("Get App ID first!");
    }
    this.fetchAppointmet();
    this._fetchPatient();
    this.reload();
    //this.fetchFilterConsultation();
  },
  computed: {
    items() {
      return [{ name: "Lab", children: laboratoriesExt.laboratories }];
    },
    selected() {
      if (!this.active?.length) return undefined;
      const id = this.active[0];

      return laboratoriesExt.laboratories.find((lab) => lab.id === id);
    },
    diagnoses() {
      var asArray = Object.entries(diagnosesExt.diagnosticos);
      var listDiagnostic = [];
      for (let index = 0; index < asArray.length; index++) {
        listDiagnostic.push({
          codigo: index,
          name: asArray[index][1],
        });
      }
      return listDiagnostic.filter((value) => {
        return value.name
          ?.toLowerCase()
          .includes(this.search_diagnoses?.toLowerCase());
      });
    },
  },
  watch: {
    diagnoses: {
      deep: true,
      handler: function(newVal) {
        this.formdiagnoses.idc_ten = newVal[0];
      },
    },
  },
  methods: {
    reload() {
      this.dialogReload = true;
      setTimeout(() => (this.dialogReload = false), 5000);
      window.onload = function() {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
    },

    async changeStatus() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/staff/assistant/${this.idAssistnt}/`;
      await axios
        .patch(path, { is_busy: false }, { headers })
        .then((res) => {
          window.location.reload();
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    endAppointment() {
      this.callOpened = false;
      this.changeStatus();
      this.$router.push("/dashboard");
    },

    async openCabin() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/doctor/open-cabin-end-consultation/${this.appointmentId}/`;
      await axios
        .patch(
          path,
          {
            patient: this.patientId,
            consultation: this.consultationId,
            scheduled: new Date(),
            start: null,
            ambassador: 13,
            doctor: 1,
            started: null,
            end: null,
          },
          { headers }
        )
        .then((res) => {
          this.$swal({
            icon: "success",
            title: "Abrir cabina",
            text: "¡Se ha abierto la cabina!",
          });
          return res;

        })
        .catch((err) => {
          console.error(err, "error");
        });
    },

    async activateReceipt() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/doctor/activate-receipt/${this.appointmentId}/`;
      await axios
        .patch(
          path,
          {
            patient: this.patientId,
            consultation: this.consultationId,
            scheduled: new Date(),
            start: null,
            ambassador: 13,
            doctor: 1,
            started: null,
            end: null,
          },
          { headers }
        )
        .catch((err) => {
          console.error(err, "error");
        });
    },

    async answerCall() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/doctor/answer-call/${this.appointmentId}/`;
      await axios
        .patch(
          path,
          {
            patient: this.patientId,
            consultation: this.consultationId,
            scheduled: new Date(),
            start: null,
            ambassador: 13,
            doctor: 1,
            started: null,
            end: null,
          },
          { headers }
        )
        .then((res) => {
          this.callOpened = true;
          return res;

        })
        .catch((err) => {
          console.error(err, "error");
        });
    },

    offMicrophone() {
      this.microphone = !this.microphone;
    },
    offCamera() {
      this.camera = !this.camera;
    },

    async createLabFormat(name) {
      localStorage.setItem("labFormat", name);
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/lab_format/`;
      await axios
        .post(
          path,
          {
            name: name,
            low_measurement: 0.0,
            high_measurement: 0.0,
            units: 3,
          },
          { headers }
        )
        .then((response) => {
          this.labFormat = localStorage.getItem("labFormat");
          localStorage.setItem("labFormatId", response.data.id);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async createLabOrder() {
      for (let index = 0; index < this.laboratoriesOrder?.length; index++) {
        this.labFormatId = localStorage.getItem("labFormatId");
        let headers = {
          Authorization: `Token ${TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        };
        let path = `${API_URL}api/consultations/lab_order/`;
        await axios
          .post(
            path,
            {
              name: this.laboratoriesOrder[index],
              code: null,
              consultation: this.consultationId,
              doctor: 1,
              lab_format: this.labFormatId,
            },
            { headers }
          )

          .then((response) => {
            this.dialog17 = false;
            return response;

          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    toLaboratoriesList(name) {
      this.listLaboratories = [];
      laboratoriesExt.laboratories.map((element) => {
        element.laboratorios.find((lab) => {
          if (name == element.name) {
            this.listLaboratories.push({
              codigo: lab.codigo,
              name: lab.nombre,
            });
          }
          this.dialog15 = false;
          this.dialog17 = true;
        });
      });
    },

    /* API Requests */
    //Cita
    async fetchAppointmet() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/${this.appointmentId}/`;
      await axios.get(path, { headers }).then((response) => {
        var data = response.data;
        this.consultationId = data.consultation.id;
        this.consultationName = data.consultation.name;
        this.patientFirstName = data.patient.first_name;
        this.patientLastName = data.patient.last_name;
        (this.patientState = data.patient.state),
          (this.patientCountry = data.patient.country),
          (this.patientCity = data.patient.city),
          (this.patientGender = data.patient.gender ? "Masculino" : "Femenino"),
          (this.patientPhoneNumber = data.patient.phone_number),
          (this.patientAddress = data.patient.address),
          (this.patientProfilePicture = data.patient.profile_picture),
          (this.patientBirthDate = data.patient.birth_date),
          (this.patientAge = this.calculateAge(data.patient.birth_date));


        switch (data.appointment_type) {
          case "PC":
            this.appointmentType = "Primera consulta";
            break;
          case "S":
            this.appointmentType = "Seguimiento";
            break;
          case "E":
            this.appointmentType = "Emergencia";
            break;
          default:
            "No hay información.";
            break;
        }
      });
    },

    //Paciente
    async _fetchPatient() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/patients/${this.patientId}/`;
      await axios.get(path, { headers }).then((response) => {
        this.listHitoricalConditions = response.data.historical_conditions;
        this.listHistoricalOperations = response.data.historical_operations;
        this.listPrescriptions = response.data.historical_prescriptions;
        this.listFamilyMemberConditions =
          response.data.family_member_conditions;
        this.consultations = response.data.consultations;
        this.getScans();
        this.filteredConsultation = this.consultations.filter(
          (c) => c.id === this.consultationId
        );
      });

      //symptoms
      for (let index = 0; index < this.filteredConsultation?.length; index++) {
        const element = this.filteredConsultation[index];
        this.listSymptoms = element["symptoms"];
        this.listAppointments = element["appointments"];
        this.listVitalSigns = element["vital_signs"];
        this.listMedicalNotes = element["medical_notes"];
        this.listImageDiagnoses = element["image_diagnoses"];
        this.listDiagnoses = element["diagnoses"];
        this.listPrescriptions = element["prescriptions"];
        this.listLabs = element["lab_orders"];
        this.listAppointments = element["appointments"];
        this.listReferrals = element["referrals"];

        this.listSymptoms.reverse();
        this.listAppointments.reverse();
        this.listVitalSigns.reverse();
        this.listMedicalNotes.reverse();
        this.listImageDiagnoses.reverse();
        this.listDiagnoses.reverse();
        this.listPrescriptions.reverse();
        this.listLabs.reverse();
        this.listReferrals.reverse();

      }
    },

    fixImc(w, h) {
      var weight = w / 2.2;
      var imc = weight / (h * h);
      return imc.toFixed(2);
    },

    fixAppointmentType(a) {
      var appType;
      switch (a) {
        case "PC":
          appType = "Primera consulta";
          break;
        case "E":
          appType = "Emergencia";
          break;

        case "S":
          appType = "Seguimiento";
          break;

        default:
          appType = "Sin información";
          break;
      }
      return appType;
    },

    difference(d1, d2) {
      var m = moment(d1);
      var years = m.diff(d2, "years");
      m.add(-years, "years");
      var months = m.diff(d2, "months");
      m.add(-months, "months");
      var days = m.diff(d2, "days");
      var message = "Hace ";
      years != 0 ? (message += years + " años ") : (message += "");
      months != 0 ? (message += months + " meses ") : (message += "");
      days != 0 ? (message += days + " días") : (message = " Hoy");
      return message;
    },

    difference2(d1, d2) {
      var m = moment(d1);
      var years = m.diff(d2, "years");
      m.add(-years, "years");
      var months = m.diff(d2, "months");
      m.add(-months, "months");
      var days = m.diff(d2, "days");
      var message = "";
      years != 0 ? (message += years + " años ") : (message += "");
      months != 0 ? (message += months + " meses ") : (message += "");
      days != 0 ? (message += days + " días") : (message = " Hoy");
      return message;
    },

    //Function that calculates patient age
    calculateAge(birth_date) {
      var fechaBack = Date.parse(birth_date);
      var fechaActual = Date.now();
      var edadActual = fechaActual - fechaBack;
      var miliseconds = edadActual;
      var second = 1000;
      var minute = second * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var year = day * 365;
      var years = Math.round(miliseconds / year);
      return years;
    },

    showSnackbar2() {
      this.snackbar2 = true;
    },

    changeAppointment(g) {
      this.formappointment.appointment_type = g.value;
    },

    async getScans() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      var path = `${API_URL}api/consultations/consultation_scans/${this.consultationId}/`;
      axios
        .get(path, { headers })
        .then((response) => {
          this.listScans = response.data["consultation_scans"];
        })
        .catch((e) => {
          console.error(e);
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
            systolic_pressure: this.formvitalsign.systolic_pressure,
            diastolic_pressure: this.formvitalsign.diastolic_pressure,
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
            systolic_pressure: this.formvitalsign.systolic_pressure,
            diastolic_pressure: this.formvitalsign.diastolic_pressure,
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
            systolic_pressure: this.formvitalsign.systolic_pressure,
            diastolic_pressure: this.formvitalsign.diastolic_pressure,
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
            systolic_pressure: this.formvitalsign.systolic_pressure,
            diastolic_pressure: this.formvitalsign.diastolic_pressure,
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

    async sendMedicalNote() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/medical_note/`;
      await axios
        .post(
          path,
          {
            type: this.formmedicalnote.type,
            consultation_history: this.formmedicalnote.consultation_history,
            systems_review: this.formmedicalnote.systems_review,
            physical_examination: this.formmedicalnote.physical_examination,
            clinical_impression: this.formmedicalnote.clinical_impression,
            plan: this.formmedicalnote.plan,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
            doctor: 3,
          },
          { headers }
        )
        .then((response) => {
          this.showSnackbar2();
          this.$refs.formmedicalnote.reset();
          this.dialog11 = false;
          setTimeout(() => (this.snackbar2 = false), 3000);
          return response;

        });
    },

    async sendDiagnoseImages() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/diagnose_images/`;
      await axios
        .post(
          path,
          {
            name: this.formdiagnoseimages.name,
            history: this.formdiagnoseimages.history,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
            doctor: 1,
          },
          { headers }
        )
        .then((response) => {
          this.showSnackbar2();
          this.$refs.formdiagnoseimages.reset();
          this.dialog12 = false;
          setTimeout(() => (this.snackbar2 = false), 3000);
          return response;

        });
    },

    async sendPrescription() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/prescription/`;
      await axios
        .post(
          path,
          {
            drug: this.formprescription.drug,
            prescription_start_date: this.formprescription
              .prescription_start_date,
            prescription_end_date: this.formprescription.prescription_end_date,
            dose: this.formprescription.dose,
            presentation: this.formprescription.presentation,
            frequency: this.formprescription.frequency,
            comments: this.formprescription.comments,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
            doctor: 3,
          },
          { headers }
        )
        .then((response) => {
          this.showSnackbar2();
          this.$refs.formprescription.reset();
          this.dialog14 = false;
          setTimeout(() => (this.snackbar2 = false), 3000);
          return response;
        });
    },
    async sendAppointment() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/appointments/`;
      await axios
        .post(
          path,
          {
            appointment_type: this.formappointment.appointment_type,
            scheduled: this.formappointment.scheduled,
            timestamp: new Date().toISOString(),
            start: this.formappointment.scheduled,
            end: this.formappointment.scheduled,
            patient: 2127,
            consultation: this.consultationId,
            ambassador: 1,
            doctor: 1,
            annotations: this.formappointment.annotations,
          },
          { headers }
        )
        .then((response) => {
          this.showSnackbar2();
          this.$refs.formappointment.reset();
          this.dialog16 = false;
          setTimeout(() => (this.snackbar2 = false), 3000);
          return response;

        });
    },

    async sendReferral() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/referral/`;
      await axios
        .post(
          path,
          {
            referred_doctor: this.formReferral.referred_doctor,
            timestamp: new Date().toISOString(),
            reason: this.formReferral.reason,
            consultation: this.consultationId,
            referring_doctor: 1,
          },
          { headers }
        )
        .then((response) => {
          this.showSnackbar2();
          this.$refs.formReferral.reset();
          this.dialog18 = false;
          setTimeout(() => (this.snackbar2 = false), 3000);
          return response;

        });
    },

    async sendDiagnosis() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/diagnosis/`;
      await axios
        .post(
          path,
          {
            idc_ten: this.formdiagnoses.idc_ten.name,
            active: true,
            timestamp: new Date().toISOString(),
            consultation: this.consultationId,
            doctor: 1,
          },
          { headers }
        )
        .then((response) => {
          this.showSnackbar2();
          this.$refs.formdiagnoses.reset();
          this.dialog13 = false;
          setTimeout(() => (this.snackbar2 = false), 3000);
          return response;

        });
    },

    fixDate(date) {
      var currentDate;
      var fullDate = new Date(date);
      var twoDigitMonth = fullDate.getMonth() + "";
      if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
      var twoDigitDate = fullDate.getDate() + "";
      if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
      currentDate =
        twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
      return currentDate;
    },

    //Function that fixes type of sypmtom
    fixTypeOfSypmtom(t) {
      var type = "";
      switch (t) {
        case 1:
          type = "Ardor";
          break;
        case 2:
          type = "Cansancio";
          break;
        case 3:
          type = "Dolor";
          break;
        case 4:
          type = "Dormido";
          break;
        case 5:
          type = "Hormigueo y dormido";
          break;
        case 6:
          type = "Inflamación";
          break;
        case 7:
          type = "Náusea";
          break;

        case 8:
          type = "Consulta preventiva";
          break;

        default:
          type = "No se ha registrado información.";
          break;
      }
      return type;
    },

    //Function that fixex location of sypmtom
    fixLocationOfSymptom(l) {
      var location = "";
      switch (l) {
        case 1:
          location = "Cabeza";
          break;
        case 2:
          location = "Frente";
          break;
        case 3:
          location = "Costados de la Cabeza";

          break;
        case 4:
          location = "Cuello";

          break;
        case 5:
          location = "Pecho Izquierdo";

          break;
        case 6:
          location = "Pecho Derecho";

          break;
        case 7:
          location = "Costillas del lado Izquierdo";

          break;
        case 8:
          location = "Epigastrium";

          break;
        case 9:
          location = "Costillas del lado Derecho";

          break;
        case 10:
          location = "Abdomen Izquierdo";

          break;
        case 11:
          location = "Abdomen Central";

          break;
        case 12:
          location = "Abdomen Derecho";

          break;
        case 13:
          location = "Lado inferior izquierdo";

          break;
        case 14:
          location = "Área Púbica";

          break;
        case 15:
          location = "Lado inferior derecho";

          break;
        case 16:
          location = "Genitales";

          break;
        case 17:
          location = "Hombro Izquierdo";

          break;
        case 18:
          location = "Hombro Derecho";

          break;
        case 19:
          location = "Antebrazo Izquierdo";

          break;
        case 20:
          location = "Antebrazo Derecho";

          break;
        case 21:
          location = "Codo Izquierdo";

          break;
        case 22:
          location = "Codo Derecho";

          break;
        case 23:
          location = "Brazo Izquierdo";

          break;
        case 24:
          location = "Brazo Derecho";

          break;
        case 25:
          location = "Muñeca Izquierda";

          break;
        case 26:
          location = "Muñeca Derecha";

          break;
        case 27:
          location = "Mano Izquierda";

          break;
        case 28:
          location = "Mano Derecha";

          break;
        case 29:
          location = "Muslo Izquierdo";

          break;
        case 30:
          location = "Muslo Derecho";

          break;
        case 31:
          location = "Espinilla Izquierda";

          break;
        case 32:
          location = "Espinilla Derecha";

          break;
        case 33:
          location = "Rodilla Izquierda";

          break;
        case 34:
          location = "Rodilla Derecha";

          break;
        case 35:
          location = "Cadera Izquierda";

          break;
        case 36:
          location = "Cadera Derecha";

          break;
        case 37:
          location = "Pantorrilla Izquierda";

          break;
        case 38:
          location = "Pantorrilla Derecha";

          break;
        case 39:
          location = "Tobillo Izquierdo";

          break;
        case 40:
          location = "Tobillo Derecho";

          break;
        case 41:
          location = "Pie Izquierdo";

          break;
        case 42:
          location = "Pie Derecho";

          break;
        case 43:
          location = "Detrás De La Cabeza";
          break;
        case 44:
          location = "Columna Cervical";

          break;
        case 45:
          location = "Columna Torácica";

          break;
        case 46:
          location = "Columna Lumbar";

          break;
        case 47:
          location = "Nalga Izquierda";

          break;
        case 48:
          location = "Nalga Derecha";

          break;

        default:
          location = "No se ha registrado información.";
          break;
      }
      return location;
    },
  },
};
</script>

<style css>
.fixed-video {
  position: fixed;
  top: 50px;
  width: 50%;
  height: 45%;
}

.ag-container {
  width: calc(100% - 60px);
  height: 100%;
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

@keyframes bounce-3 {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
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
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-sheet--offset {
  top: -64px;
  position: relative;
}
.header-port {
  border-radius: 0.75rem;
}
.header-fix {
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 20 !important;
}
/* quitar espaciado entre checkbox */
.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
</style>
