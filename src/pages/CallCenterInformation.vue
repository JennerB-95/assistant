<template>
  <v-app style="background-color: #fafafa">
    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="success"
        right
        bottom
        elevation="24"
        v-model="snackbar2"
      >
        <span class="title"> ¡Registro creado correctamente! </span>
        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
      </v-snackbar>
    </div>
    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="warning"
        right
        bottom
        elevation="24"
        v-model="scanError"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡No se escaneó, intente de nuevo!
        </span>
      </v-snackbar>
      <v-snackbar
        max-width="100"
        color="success"
        right
        bottom
        elevation="24"
        v-model="scanOnDone"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡Se ha encendido el scan!
        </span>
      </v-snackbar>
      <v-snackbar
        max-width="100"
        color="#00afb9"
        :timeout="timeout"
        :bottom="bottom"
        :right="right"
        elevation="24"
        v-model="snackBarWait"
      >
        <v-row justify="center">
          <span class="subtitle-1">
            Midiendo signo vital, espere...
          </span>
          <v-progress-circular
            class="ml-3"
            :width="3"
            size="20"
            color="white"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </v-snackbar>
    </div>
    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="success"
        right
        bottom
        elevation="24"
        v-model="scanOnDone"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡Se ha encendido el scan!
        </span>
      </v-snackbar>
    </div>
    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="warning"
        right
        bottom
        elevation="24"
        v-model="scanOnError"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡No se ha encendido el scan!
        </span>
      </v-snackbar>
    </div>
    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="warning"
        right
        bottom
        elevation="24"
        v-model="volError"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡Error, intente de nuevo!
        </span>
      </v-snackbar>
    </div>
    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="primary"
        right
        bottom
        elevation="24"
        v-model="volDone"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡Se actualizó el volumen!
        </span>
      </v-snackbar>
    </div>

    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="primary"
        right
        bottom
        elevation="24"
        v-model="muteDone"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡Mute activado!
        </span>
      </v-snackbar>
    </div>

    <div class="d-flex justify-end">
      <v-snackbar
        max-width="100"
        color="primary"
        right
        bottom
        elevation="24"
        v-model="unmuteDone"
      >
        <span class="subtitle-1">
          <v-icon dark right> mdi-alert-circle </v-icon>
          ¡Mute desactivado!
        </span>
      </v-snackbar>
    </div>
    <v-dialog
      v-model="dialogAskingVitalSigns"
      hide-overlay
      persistent
      width="300"
    >
      <v-card color="#00afb9" dark>
        <v-card-text>
          {{sendRequestText}}
          <ProgressLinearComponent></ProgressLinearComponent>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="500px">
      <v-card class="pa-8">
        <v-card-title>
          <span class="grey--text font-weight-medium headline text-center mb-5"
            >Cargando información</span
          >
          <v-spacer></v-spacer>
        </v-card-title>
        <div class="text-center">
          <v-progress-circular
            :size="50"
            color="#8DDAFC"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
    <div>
      <v-dialog
        v-model="dialogLoadingVitalSign"
        hide-overlay
        persistent
        width="350"
      >
        <v-card color="#00afb9" dark>
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
            <ProgressLinearComponent></ProgressLinearComponent>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-toolbar height="50" dense class="header-fix" elevation="0">
        <v-spacer></v-spacer>
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
      </v-toolbar>
    </div>
    <v-row class="mt-10" no-gutters>
      <v-col style="background-color: #fafafa" cols="12" md="6">
        <v-card style="background-color: #fafafa" tile elevation="0">
          <div class="">
            <div class="ag-main" id="container">
              <div class="ag-container">
                <div v-if="videoBlocked">
                  <v-card height="250" color="grey lighten-3" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mt-10">
                          <img
                            class="header-logo"
                            src="../assets/bitmec.png"
                            alt=""
                          />
                        </div>
                        <v-list-item-title class="text-h5 mb-1 mt-3">
                          {{ titleVideoEnded }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1"
                          >{{textVideoEnded}}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                        style
                        rounded
                      >
                        <v-icon dark size="45">mdi-video-off</v-icon>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </div>
                <div >
                  <div :key="keyDiv">
                    <v-card
                      outlined
                      class="grey lighten-3 pa-5" 
                      height="215"
                      v-if="waitingCall"
                    >
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="text-h5 mt-3">
                            Esperando a que inicie la <br>video llamada...
                          </v-list-item-title>
                          <v-list-item-subtitle class="mt-1 subtitle-1">
                            Tiempo aproximado
                          </v-list-item-subtitle>
                          <v-row class="mt-3 ml-1">
                            <v-icon class="mb-4 mr-1" color="grey">
                              mdi-clock-outline
                            </v-icon>
                            <TimeComponent class="mt-1" :time="180" />
                          </v-row>
                        </v-list-item-content>
                        <v-list-item-avatar
                          tile
                          size="80"
                          color="grey"
                          style
                          rounded
                        >
                          <v-icon dark size="45">mdi-account-clock</v-icon>
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-card>

                    <v-card v-if="cardBlocked" height="400" outlined>
                      <div id="card-outlined" :key="componentKey">
                        <div>
                          <v-system-bar
                            color="transparent"
                            lights-out
                            dark
                            class="pa-4"
                            style=" z-index: 1; bottom: 0; position: absolute; border-top-right-radius: 5px;"
                          >
                            <span class="mr-1 button white--text font-weight-bold" >Médico</span>
                            <v-icon small v-if="downlinkNetworkQuality == 1" color="green">mdi-signal-cellular-3</v-icon>
                            <v-icon small v-else-if="downlinkNetworkQuality == 2" color="orange">mdi-signal-cellular-2</v-icon>
                            <v-icon small v-else color="red">mdi-signal-cellular-1</v-icon>
                            <span class="mr-1 ml-2 button white--text font-weight-bold">Cabina {{  cabinId  }}</span>
                            <v-icon small v-if="downlinkNetworkQualityRemote == 1" color="green">mdi-signal-cellular-3</v-icon>
                            <v-icon small v-else-if="downlinkNetworkQualityRemote == 2" color="orange">mdi-signal-cellular-2</v-icon>
                            <v-icon small v-else color="red">mdi-signal-cellular-1</v-icon>
                            <v-icon @click="volumeMute ? settingVolume('call-unmute') : settingVolume('call-mute')" class="ml-5" small color="white">{{volumeMute ? 'mdi-microphone-off' : 'mdi-microphone'}} </v-icon>
                           
                          </v-system-bar>
                           
                        </div>
                      </div> 
                    </v-card>
                  </div>

                  <v-card
                    elevation="0"
                    style="
                      background-color: #f5f5f5;
                      border-bottom: 0px;
                      border-top: 1px solid #00afb9;
                      border-right: 1px solid #00afb9;
                      border-left: 1px solid #00afb9; 
                    "                    
                    outlined
                    class="pa-5 mt-2"
                    min-width="100%"
                    max-width="100%" 
                  >
                    <v-row justify="end">
                      <div class="ml-2">
                        <v-btn 
                          color="#00afb9"
                          :disabled=" remotePlayerContainer.id != '' "
                          small
                          elevation="0"
                          dark
                          @click="pushCall()"
                          class="ma-1 ml-2 pt-5 pb-5"
                        >
                          <v-icon dark>mdi-video-account</v-icon>
                          <div class="ml-1">Reconectar</div>
                        </v-btn>
                      </div>
                      <div class="ml-2">
                        <v-btn
                          :disabled="disabledButtonVolMin"
                          outlined
                          color="#00afb9"
                          small
                          @click="settingVolume('call-min')"
                          class="ma-1 ml-2 pt-4 pb-4"
                        >
                          <v-icon dark size="20">mdi-volume-minus</v-icon>
                        </v-btn>
                      </div>
                      <div class="">
                        <v-btn
                          v-if="isMuted"
                          @click="muteLocalAudio()"
                          dark 
                          small
                          elevation="0"
                          color="#00afb9"
                          class="ma-1 ml-2 pt-4 pb-4"
                        >
                          <v-icon dark size="20">mdi-microphone-off</v-icon>
                        </v-btn>
                        <v-btn
                          v-else
                          elevation="0"
                          dark
                          small
                          @click="muteLocalAudio()"
                          color="#00afb9"
                          class="ma-1 ml-2 pt-4 pb-4"
                        >
                          <v-icon dark size="20">mdi-microphone</v-icon>
                        </v-btn>
                      </div>
                      <div class="mr-1">
                        <v-btn
                          :disabled="disabledButtonVolUp"
                          outlined
                          small
                          color="#00afb9"
                          @click="settingVolume('call-up')"
                          class="ma-1 ml-2 pt-4 pb-4"
                        >
                          <v-icon dark size="20">mdi-volume-plus</v-icon>
                        </v-btn>
                      </div> 
                      <div class="mr-1">
                        <v-btn
                          elevation="0"
                          @click="openCabin(), activateReceipt(), leaveCall()"
                          color="#00afb9"
                          small
                          :disabled="videoBlocked"
                          :class="
                            !videoBlocked
                              ? 'ma-1 mr-1 pt-5 pb-5 white--text'
                              : 'ma-1 mr-1 pt-5 pb-5 black--text'
                          "
                        >
                          <div class=" ">Salida de paciente</div>
                        </v-btn>
                      </div> 
                      <div id="clock" class="pa-3">
                        <v-row class="">
                          <v-icon class="mr-1" color="black" size="30">
                            mdi-clock-outline
                          </v-icon>
                          <span
                            class="time mr-2"
                            style="color: black; font-size: 20px"
                            >{{ time }}</span
                          >
                        </v-row>
                      </div>
                    </v-row>
                  </v-card>
                  <v-card
                    elevation="0"
                    style="
                      margin-top: -10px;
                      background-color: #f5f5f5;
                      border-top: 0px;
                      border-bottom: 1px solid #00afb9;
                      border-right: 1px solid #00afb9;
                      border-left: 1px solid #00afb9;
                    "
                    outlined
                    class="pa-5"
                    min-width="100%"
                    max-width="100%"
                  >
                    <v-row justify="end">
                      <div class="">
                        <v-dialog
                          persistent
                          v-model="dialogDevice"
                          height="800"
                          width="800"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="#00afb9"
                              dark
                              v-bind="attrs"
                              v-on="on" 
                              small    
                              elevation="0"         
                              @click="toggleDeviceTest(), getDevices()"                
                              class="ma-1 pt-5 pb-5"
                            >
                            <v-icon
                              left
                              color="white" 
                              >mdi-cog</v-icon
                            >
                            <div class=" ">Audio/video</div>
                            </v-btn>
                          </template>

                          <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                              Control de dispositivos
                            </v-card-title>

                            <v-card-text>
                              <v-tabs
                                v-model="tab"
                                background-color="transparent"
                                color="#00afb9"
                                grow
                              >
                              <v-tabs-slider color="#00afb9"></v-tabs-slider>
                                <v-tab
                                >
                                  App Médico
                                </v-tab>
                                <!-- <v-tab
                                >
                                  Test Devices
                                </v-tab> -->
                            </v-tabs>

                              <v-tabs-items v-model="tab">
                                <v-tab-item
                                >
                                  <v-card
                                    text
                                  >
                                    <v-card-text>
                                      <v-container class="justify-center">
                                        <v-row align="center">
                                          <v-col
                                            cols="12"
                                            sm="12"
                                          >
                                            <div class="title" align="start">
                                              Dispositivos de video
                                            </div>                                          
                                          </v-col>
                                        </v-row>
                                        <v-row >
                                          <v-col
                                            cols="12"
                                            sm="8"
                                          >
                                            <v-select
                                              outlined
                                              v-model="videoT"
                                              :items="camerasAvailables"
                                              item-value="deviceId"
                                              item-text="label"
                                              label="Seleccione una cámara disponible"
                                              v-on:change="isVideoDevice"
                                              single-line
                                              return-object
                                              persistent-hint
                                            ></v-select>
                                          </v-col>
                                          <v-col justify="center" align="center" cols="12" sm="4" class="d-flex ">
                                            <div v-if="cameraNotReadable">
                                              <v-alert
                                                text
                                                type="warning"
                                                dense
                                                border="left"
                                                class=""
                                                icon="mdi-video-off"
                                              >
                                              <div class="title">
                                                La cámara falló. 
                                              </div>
                                              </v-alert>
                                            </div> 
                                            <div v-else class="ml-15" id="localVideoPlayerTest"></div>
                                          </v-col>
                                        </v-row>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                            sm="12"
                                          >
                                          <div class="title" align="start">
                                              Dispositivos de audio
                                            </div>
                                          </v-col>
                                        </v-row>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                            sm="8"
                                          >
                                            <v-select
                                              outlined
                                              v-model="audioT"
                                              :items="microphonesAvailables"
                                              item-value="deviceId"
                                              item-text="label"  
                                              label="Seleccione un micrófono disponible"
                                              v-on:change="isAudioDevice"
                                              single-line
                                              return-object
                                              persistent-hint
                                            ></v-select>
                                          </v-col>
                                          <v-col cols="12" sm="4" >
                                            <v-row justify="center" align="center">
                                              <v-col cols="12" class="mb-0 pb-0">
                                                <audio ref="audioPlayer" style="width: inherit" controls></audio>
                                              </v-col>
                                              <v-col justify="center" align="center" cols="12" class="mt-0 pt-0">
                                                <v-btn-toggle
                                                  v-model="text"
                                                  dense
                                                  color="#00afb9"
                                                  mandatory
                                                >
                                                  <v-btn @click="playAudio" value="left">
                                                    <v-icon>mdi-headphones</v-icon>
                                                  </v-btn>

                                                  <v-btn @click="testAudio" value="center">
                                                    <v-icon>mdi-microphone</v-icon>
                                                  </v-btn>
                                                </v-btn-toggle>
                                              </v-col>
                                            </v-row>

                                            
                                            
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>
                                  </v-card>
                                </v-tab-item>
                                <!-- <v-tab-item
                                >
                                </v-tab-item> -->
                              </v-tabs-items>
                            </v-card-text> 
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="#00afb9"
                                text
                                @click="dialogDevice = false, createVideoTrack()"
                              >
                                Aceptar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                      <div class="mr-1">
                        <div>
                          <v-btn
                            :disabled="dialogDoor"
                            :loading="dialogDoor"
                            small    
                            @click="
                              emergencyDoor
                                ? emergencyDoorActivate()
                                : emergencyDoorDeactivate()
                            "
                            :color="emergencyDoor ? 'orange' : '#00afb9'"
                            elevation="0"
                            outlined
                            class="ma-1 pt-5 pb-5"
                          >
                            <div class=" ">Emergencia</div>
                            <v-icon
                              right
                              :color="emergencyDoor ? 'orange' : '#00afb9'"
                              size="25"
                              >mdi-alert-circle-outline</v-icon
                            >
                          </v-btn>
                          <v-dialog
                            v-model="dialogDoor"
                            hide-overlay
                            persistent
                            width="300"
                          >
                            <v-card color="#00afb9" dark>
                              <v-card-text>
                                Procesando...
                                <ProgressLinearComponent></ProgressLinearComponent>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </div>
                      </div> 

                      <v-dialog
                        transition="dialog-top-transition"
                        max-width="600"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ma-1 pt-5 pb-5"
                            color="#00afb9"
                            elevation="0"
                            v-bind="attrs"
                            v-on="on"
                            dark
                            small    
                            @click="getScans()"
                            >Documentos</v-btn
                          >
                        </template>
                        <template v-slot:default="dialogDoc">
                          <v-card>
                            <v-toolbar color="#00afb9" dark
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
                                  <li v-show="item.image !=null">
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
                                color="#00afb9"
                                dark
                                @click="dialogDoc.value = false"
                                >Cerrar</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                      
                      <div class="ml-2">
                        <v-btn
                          elevation="1"
                          color="error" 
                          small    
                          :disabled="disabledButtonEndCall"
                          @click="finishCallPatient(), changeStatusOfCall()"
                          class="ma-1 pt-5 pb-5"
                        >
                          <v-icon dark size="25">mdi-phone-hangup</v-icon>
                        </v-btn>
                      </div>
                    </v-row>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </v-card>
        <div class="ml-8 title grey--text font-weight-bold"> {{ cabinLocation }}</div>
        <!-- <form @submit.prevent="loadInformationSocket">
          <button type="submit" >Socket.IO</button>
        </form> -->
      </v-col>
      <v-col cols="12" md="6">
        <div>
          <v-snackbar
            max-width="100"
            color="#00afb9"
            :timeout="timeout"
            :bottom="bottom"
            :right="right"
            elevation="24"
            v-model="snackBarWait"
          >
            <v-row justify="center">
              <span class="subtitle-1">  Midiendo signo vital, espere... </span>
              <v-progress-circular
                class="ml-3"
                :width="3"
                size="20"
                color="white"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </v-snackbar>
        </div>
        <div>
          <div class="mt-6 mr-9">
            <div class="pt-5 mb-2 title black--text  mt-2">
              Identificación del paciente: {{gid}}     
            </div>
            <v-card outlined>
              <v-tabs
                background-color="#00afb9"
                center-active
                dark
                v-model="tab2"
              >
            <!--<v-tab ><v-icon left>mdi-text-box-multiple-outline</v-icon> Antecedentes Médicos </v-tab>--> 
              <v-tab><v-icon left>mdi-account</v-icon>Paciente</v-tab>
              <!-- <v-tab><v-icon left>mdi-hospital-box</v-icon>Historial</v-tab>--> 

              <v-tab @click="switchVsOrScan('scan')"><v-icon left>mdi-scanner</v-icon> Escaner</v-tab>
              <v-tab @click="switchVsOrScan('vs')"><v-icon left>mdi-medical-bag</v-icon> Signos vitales</v-tab>
              <v-tab v-if="sthetoAvailable"><v-icon left>mdi-stethoscope</v-icon> Examen físico </v-tab>
              <v-tab><v-icon left>mdi-tex-tbox-outline</v-icon>Recetas</v-tab>
               
              <v-tabs-items v-model="tab2">
                <v-tab-item>
                  <v-card v-if="dialogFormPatient">
                    <v-card-title>
                      <div class="text-h5">Información del paciente</div>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="subtitle-1">Por favor llene la información del paciente en el siguiente formulario para poder continuar.</div>
                    </v-card-subtitle>
                    <v-card-text>
                      <v-container>
                        <v-form
                          :key="componentKey" 
                          ref="form1"
                          style="
                            margin-left: 40px;
                            margin-right: 40px;
                            margin-top: 15px;  
                          "
                        > 
                          <v-row align="center">
                            <v-col
                              style="padding: 0px"
                              class="mr-2 mt-2"
                            >
                              <span class="font-weight-medium grey--text title" >
                                Nombres:
                              </span>
                              <v-text-field
                                color="color: #67B0AC"
                                outlined
                                dense
                                label=""
                                v-model.trim="form1.first_name" 
                                required
                                :readonly="buttonsBlocked"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              style="padding: 0px"
                              class="ml-2 mt-2"
                            >
                              <span
                                class="font-weight-medium grey--text title"
                              >
                                Apellidos:
                              </span>
                              <v-text-field
                                color="color: #67B0AC"
                                dense
                                label=""
                                outlined
                                v-model.trim="form1.last_name" 
                                :readonly="buttonsBlocked"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-text-field
                            v-if="false"
                            color="color: #67B0AC"
                            outlined
                            dense
                            label=""
                            :readonly="buttonsBlocked"
                            v-model.trim="form1.cabin"
                          ></v-text-field>

                          <v-row align="center">
                            <v-col
                              style="padding: 0px"
                              class="mr-2"
                            >
                              <span
                                class="font-weight-medium grey--text title"
                              >
                                Fecha de nacimiento:
                              </span>
                              <v-dialog
                                ref="dialog0"
                                v-model="modal0"
                                :return-value.sync="
                                  form1.birth_date
                                "
                                persistent
                                width="290px"
                              >
                                <template
                                  v-slot:activator="{ on, attrs }"
                                >
                                  <v-text-field
                                    v-model.trim="form1.birth_date"
                                    color="color: #67B0AC"
                                    dense
                                    outlined
                                    v-bind="attrs"
                                    v-on="on" 
                                    :readonly="buttonsBlocked"
                                    required
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model.trim="form1.birth_date"
                                  scrollable
                                  color="#67B0AC"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="color: #67B0AC"
                                    @click="modal0 = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="color: #67B0AC"
                                    @click="
                                      $refs.dialog0.save(
                                        form1.birth_date
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-col>

                            <v-col
                              style="padding: 0px"
                              class="ml-2"
                            >
                              <span
                                class="font-weight-medium grey--text title"
                              >
                                Género:
                              </span>
                              <v-select
                                color="color: #67B0AC"
                                :items="gender"
                                :label="this.form1.gender == null ? 'Seleccione el género' : this.form1.gender === true ? 'Masculino' : this.form1.gender === false ? 'Femenino' : 'Sin información.'"
                                single-line
                                dense
                                outlined
                                item-value="value"
                                item-text="name"
                                return-object
                                v-on:change="isGender"
                                placeholder="" 
                                required
                                :readonly="buttonsBlocked"
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-row align="center">
                            <v-col
                              style="padding: 0px"
                              class="mr-2"
                            >
                              <span
                                class="font-weight-medium grey--text title"
                              >
                                Número de Identificación</span
                              >
                              <v-text-field
                                color="color: #67B0AC"
                                dense
                                label=""
                                outlined
                                v-model.trim="form1.government_id" 
                                :counter="13"
                                required 
                                :readonly="!this.dialogFormPatient || buttonsBlocked"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              style="padding: 0px"
                              class="ml-2"
                            >
                              <span
                                class="font-weight-medium grey--text title"
                              >
                                Teléfono:
                              </span>
                              <v-text-field
                                color="color: #67B0AC"
                                dense
                                label=""
                                outlined
                                v-model.trim="form1.phone_number" 
                                :counter="8"
                                :readonly="buttonsBlocked"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
          
            
                          <v-row
                            align="center"
                            class="mb-10"
                            justify="center"
                          >
                            <div class="text-center"> 
                              <v-btn 
                                block
                                elevation="0"
                                @click="buttonsBlocked ? null : createPatient()"
                                :disabled="dialog || buttonsBlocked"
                                :loading="dialog"
                                class="white--text mt-3 headline pr-10 pl-10"
                                color="#00afb9"
                              >
                                Guardar
                                <v-icon size="25" right
                                  >mdi-content-save-outline</v-icon
                                >
                              </v-btn>
                              <v-dialog
                                v-model="dialog"
                                hide-overlay
                                persistent
                                width="300"
                              >
                                <v-card color="#67B0AC" dark>
                                  <v-card-text>
                                    Guardando información...
                                    <ProgressLinearComponent></ProgressLinearComponent>
                                  </v-card-text>
                                </v-card>
                              </v-dialog>
                            </div>
                          </v-row>
                        </v-form>
                      </v-container> 
                    </v-card-text> 
                  </v-card> 
                  <v-row v-else justify="space-between">
                    <v-col cols="6">
                      <v-card
                        class="mx-auto ma-8 ml-5"
                        max-width="344"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="text-h5">
                              {{form1.first_name}} {{form1.last_name}}
                            </div>
                            <div class="grey--text">Género: {{form1.gender ? 'Masculino' : 'Femenino' }}</div>
                            <div class="grey--text">Identificación: {{form1.government_id}}</div>
                          
                          </v-list-item-content> 
                          <v-list-item-avatar
                            tile
                            size="80"
                            color="grey"   
                          >  
                          <v-icon color="white" size="55">
                            mdi-account-circle
                          </v-icon>
                        </v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn
                            outlined
                            rounded
                            text
                            @click="(dialogFormPatient = !dialogFormPatient)"
                          >
                          <v-icon left>
                            mdi-pencil
                          </v-icon>
                            Editar
                          </v-btn>
                        </v-card-actions>
                      </v-card> 
                    </v-col>
                    <v-col cols="6">
                      <!--<VitalSignComponent
                        :vitalSigns="listVitalSigns"
                      ></VitalSignComponent>-->
                    </v-col> 
                  </v-row>
                 
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="pa-10">
                    <div v-if="waitingScanVar">
                      <v-card 
                        max-width="500"
                        outlined
                        class="mx-auto"
                        style="border: 1px solid grey"
                        color="#f8f9fa"
                      >
                        <v-card-title primary-title class="justify-center">
                          <div>
                            <v-icon left> mdi-scanner </v-icon>
                          </div>
                          <div class="mt-2" style="font-size: 15px">
                            {{ waitingMessage }}
                          </div>
                          <br />
                        </v-card-title>
                      </v-card>
                    </div>
                    <div class="text-center" v-if="buttonsScan">
                      <div v-if="turnOnScanVar">
                        <v-card
                          @click="buttonsBlocked ? null : turnOnScan()"  
                          style="border: 1px solid grey"
                          color="#f6fff8" 
                          outlined
                          class="mx-auto"
                          max-width="270" 

                        >
                          <v-card-title primary-title class="justify-center">
                            <div>
                              <v-img
                                max-height="35"
                                max-width="35"
                                src="../assets/scanner.png"
                              >
                              </v-img>
                            </div>
                          </v-card-title>
                          <v-card-subtitle>
                            <div class="mt-4 black--text" style="font-size: 15px">
                              {{turnOnScanText}}
                            </div>
                            <br />
                          </v-card-subtitle>
                        </v-card>
                      </div>

                      <div v-if="newScan">
                        <v-card
                          @click="scan()"
                          class="mx-auto"
                          max-width="250"
                          style="border: 1px solid grey"
                          color="#f4faff"
                          outlined
                        >
                          <v-card-title primary-title class="justify-center">
                            <div class="mt-2">
                              <v-img
                                max-height="35"
                                max-width="35"
                                src="../assets/scann.png"
                              >
                              </v-img>
                            </div>
                          </v-card-title>
                          <v-card-subtitle>
                            <div class="mt-4 black--text" style="font-size: 15px">
                              Escanear 
                            </div>
                            <br />
                          </v-card-subtitle>
                        </v-card>
                      </div>
                        
                      <v-row class="ma-3">
                        <v-col cols="6">
                          <div v-if="scanAg">
                            <v-card
                              @click="scanAgain()"
                              class="mx-auto"
                              max-width="250"
                              style="border: 1px solid grey"
                              color="#f8fbff"
                              outlined
                            >
                              <v-card-title primary-title class="justify-center">
                                <div class="mt-2">
                                  <v-img
                                    max-height="35"
                                    max-width="35"
                                    src="../assets/scann.png"
                                  >
                                  </v-img>
                                </div>
                              </v-card-title>
                              <v-card-subtitle>
                                <div
                                  class="mt-2 black--text"
                                  style="font-size: 15px"
                                >
                                  Escanear 
                                </div>
                                <br />
                              </v-card-subtitle>
                            </v-card>
                          </div>
                        </v-col>

                        <v-col cols="6">
                          <div v-if="scanAg">
                            <v-card
                              @click="saveScan()"
                              class="mx-auto"
                              max-width="250"
                              style="border: 1px solid grey"
                              color="#f8f9fa"
                              outlined
                            >
                              <v-card-title primary-title class="justify-center">
                                <div class="mt-2">
                                  <v-img
                                    max-height="35"
                                    max-width="35"
                                    src="../assets/search.png"
                                  >
                                  </v-img>
                                </div>
                              </v-card-title>
                              <v-card-subtitle>
                                <div
                                  class="mt-2 black--text"
                                  style="font-size: 15px"
                                >
                                  Vista previa
                                </div>
                                <br />
                              </v-card-subtitle>
                            </v-card>
                          </div>
                        </v-col>
                      </v-row>
                      <div v-if="showScanResult">
                        <v-card
                          @click="showScan()"
                          class="mx-auto"
                          max-width="250"
                          style="border: 1px solid grey"
                          color="#eafdf8"
                          outlined
                        >
                          <v-card-title primary-title class="justify-center">
                            <div class="mt-2">
                              <v-img
                                max-height="35"
                                max-width="35"
                                src="../assets/document.png"
                              >
                              </v-img>
                            </div>
                          </v-card-title>
                          <v-card-subtitle>
                            <div class="mt-2 black--text" style="font-size: 15px">
                              Ver documentos
                            </div>
                            <br />
                          </v-card-subtitle>
                        </v-card>
                        <div class="mt-4 mb-4">¿Desea guardar este documento?</div>
                        <v-row no-gutters justify="center">
                          <v-btn
                            depressed
                            color="error"
                            class="mr-2"
                            @click="alertToSaveOrNotSaveScan('Eliminando...', false)"
                          >
                            No
                          </v-btn>
                          <v-btn
                            depressed
                            color="#00afb9"
                            dark
                            class="ml-2"
                            @click="alertToSaveOrNotSaveScan('Guardando...', true)"

                          >
                            Sí
                          </v-btn>
                        </v-row>
                      </div>
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="pa-10">
                    <v-container > 
                      <v-tabs vertical color="#00afb9" justify-tab-title="start">
                        <v-tab v-if="esfigmoAvailable" @click="changeVsPathGif('e')">
                          <v-img
                            max-height="30"
                            max-width="30"
                            src="../assets/esfi.png" 
                          >
                          </v-img> 
                        </v-tab>
                        <v-tab @click="changeVsPathGif('o')">
                          <v-img
                            max-height="40"
                            max-width="40" 
                            src="../assets/lungs.png"
                          >
                          </v-img> 
                        </v-tab>
                        <v-tab @click="changeVsPathGif('w')">
                          <v-icon size="32">
                            mdi-weight
                          </v-icon> 
                        </v-tab>
                        <v-tab @click="changeVsPathGif('h')">
                          <v-icon size="32">
                            mdi-human-male-height
                          </v-icon> 
                        </v-tab>
                        <v-tab @click="changeVsPathGif('t')">
                          <v-icon size="32">
                            mdi-thermometer-lines
                          </v-icon> 
                        </v-tab>  
                        <v-tab-item v-if="esfigmoAvailable">
                          <DiasSysComponent
                            v-model="formvitalsign" 
                            :requestVsFunction="requestSvFunction"
                            :requestVs="typeRequest.requestSv" 
                            :sendDataCabin="sendVsDataCabin"
                            :cabin="cabinId"
                            hasTwoVs
                            :vsNameToRequest="vitalSigns.esfigmo"
                            :sisKeyVsToSend="keyVsToSend.sis"
                            :diasKeyVsToSend="keyVsToSend.dias"
                            :confirmRequest="typeRequest.confirmSv"
                            :sisValue="this.formvitalsign.systolic_pressure"
                            :diasValue="this.formvitalsign.diastolic_pressure"
                            :disabledButton="this.disabledButton"
                          /> 
                        </v-tab-item>
                        <v-tab-item>
                          <HeartRateComponent
                            v-model="formvitalsign" 
                            :requestVsFunction="requestSvFunction"
                            :requestVs="typeRequest.requestSv" 
                            :sendDataCabin="sendVsDataCabin"
                            :cabin="cabinId"
                            hasTwoVs
                            :vsNameToRequest="vitalSigns.oxygen"
                            :bpmKeyVsToSend="keyVsToSend.bpm"
                            :spo2KeyVsToSend="keyVsToSend.spo2"
                            :confirmRequest="typeRequest.confirmSv"
                            :bpmValue="this.formvitalsign.heart_rate"
                            :spo2Value="this.formvitalsign.oxygen"
                            :disabledButton="this.disabledButton"
                          /> 
                        </v-tab-item>
                        <v-tab-item>
                          <WeightComponent
                            v-model="formvitalsign" 
                            :requestVsFunction="requestSvFunction"
                            :requestVs="typeRequest.requestSv" 
                            :sendDataCabin="sendVsDataCabin"
                            :cabin="cabinId"
                            :hasTwoVs="false"
                            :vsNameToRequest="vitalSigns.weight"
                            :weightKeyVsToSend="keyVsToSend.weight"
                            :confirmRequest="typeRequest.confirmSv"
                            :weightValue="this.formvitalsign.weight"
                            :disabledButton="this.disabledButton"
                            :measureTypeReset="this.measureTypeReset"
                          /> 
                        </v-tab-item>
                        <v-tab-item>
                          <HeightComponent
                            v-model="formvitalsign" 
                            :requestVsFunction="requestSvFunction"
                            :requestVs="typeRequest.requestSv" 
                            :sendDataCabin="sendVsDataCabin"
                            :cabin="cabinId"
                            :hasTwoVs="false"
                            :vsNameToRequest="vitalSigns.height"
                            :heightKeyVsToSend="keyVsToSend.height"
                            :confirmRequest="typeRequest.confirmSv"
                            :heightValue="this.formvitalsign.height"
                            :disabledButton="this.disabledButton"
                          /> 
                        </v-tab-item>
                        <v-tab-item>
                          <TemperatureComponent
                            v-model="formvitalsign" 
                            :requestVsFunction="requestSvFunction"
                            :requestVs="typeRequest.requestSv" 
                            :sendDataCabin="sendVsDataCabin"
                            :cabin="cabinId"
                            :hasTwoVs="false"
                            :vsNameToRequest="vitalSigns.temperature"
                            :tmpKeyVsToSend="keyVsToSend.tmp"
                            :confirmRequest="typeRequest.confirmSv"
                            :tmpValue="this.formvitalsign.temperature"
                            :disabledButton="this.disabledButton"
                          /> 
                        </v-tab-item>
                      </v-tabs>  
                    </v-container>
                    <div class="title grey--text">Resultados</div>
                    <VitalSignsResults 
                      :weight="this.formvitalsign.weight"
                      :height="this.formvitalsign.height"
                      :oxygen="this.formvitalsign.oxygen" 
                      :bpmF="this.formvitalsign.heart_rate"
                      :temperature="this.formvitalsign.temperature"
                      :systolicPressure="this.formvitalsign.systolic_pressure"
                      :diastolicPressure="this.formvitalsign.diastolic_pressure"
                      :esfigmoAvailable="esfigmoAvailable"
                      :imc="imc"
                    />
                  </v-card>
                </v-tab-item>
                <v-tab-item v-if="sthetoAvailable">
                  <v-card flat class="pa-10">
                    <v-container>
                      <v-tabs vertical color="#00afb9" justify-tab-title="start">
                        <v-tab >
                          <v-icon>mdi-stethoscope</v-icon>
                        </v-tab> 
                        <v-tab-item>
                          <v-btn 
                            :dark="estetoR" 
                            :outlined="!estetoR"
                            @click="switchMic()"
                            elevation="0"
                            class="pa-5 ma-2"
                            :color=" estetoR ? '#00afb9' : 'grey' "
                          >
                          <v-icon size="25" :color="estetoR ? 'white' : '#00afb9'" left>mdi-stethoscope</v-icon> {{stethoText}}
                            
                          </v-btn>
                          <v-btn   
                            class="pa-5 ma-2" 
                            :dark="record" 
                            elevation="0"
                            :outlined="!record"
                            @click="!record ? recordStetho() : null"
                            :color=" record ? '#00afb9' : 'grey' "
                          >
                          <v-icon :color="record ? 'white' : 'red'" left size="30">
                                {{ recordStethoIcon  }}
                              </v-icon>{{recordStethoText}}
                          </v-btn>
                          <v-btn
                            v-show="this.listenS"   
                            class="pa-5 ma-2" 
                            :dark="playing" 
                            elevation="0"
                            @click="listenStetho()"
                            :outlined="!playing"
                            :color="playing ? '#00afb9' : 'grey'"
                          > 
                            <v-icon :size="playing ? '30' : '25'" :color="playing ? 'white' : '#00afb9'" left>
                              {{ !playing ? 'mdi-ear-hearing' : 'mdi-stop' }}
                            </v-icon>{{!playing ? 'Escuchar' : 'Escuchando...'}}
                          </v-btn>
                           <div v-if="estetoR" >
                            <v-row class="ma-2" justify="start">
                              <div class="">
                                <v-btn
                                  :disabled="sthetoMinVol"
                                  outlined
                                  color="#00afb9"
                                  small
                                  @click="settingVolume('stheto-min')"
                                  class="ma-1 pt-4 pb-4"
                                >
                                  <v-icon dark size="20">mdi-volume-minus</v-icon>
                                </v-btn>
                              </div>
                              <div class=""> 
                                <v-btn 
                                  :disabled="sthetoSaveVol"
                                  elevation="0"
                                  :dark="!sthetoSaveVol"
                                  small 
                                  @click="settingVolume('stheto-save')"
                                  color="#00afb9"
                                  class="ma-1 ml-2 pt-4 pb-4"
                                >
                                  <v-icon dark size="20">mdi-content-save</v-icon>
                                </v-btn>
                              </div>
                              <div class="mr-1">
                                <v-btn
                                  :disabled="sthetoUpVol"
                                  outlined
                                  small
                                  color="#00afb9"
                                  @click="settingVolume('stheto-up')"
                                  class="ma-1 ml-2 pt-4 pb-4"
                                >
                                  <v-icon dark size="20">mdi-volume-plus</v-icon>
                                </v-btn>
                              </div> 
                            </v-row>
                          </div>
                        </v-tab-item>
                      </v-tabs>
                    </v-container>
                  </v-card>
                </v-tab-item>
                <v-tab-item>     
                  <PrescriptionsComponent 
                    :assistant="this.assistant"
                    :assistantId="this.assistantId" 
                    :cabin="this.cabinId"
                    :consultation="this.consultationId.toString()"
                    :prescriptions="patientPrescriptions" 
                    :patientFirstName="this.pfname"
                    :patientLastName="this.plname"
                    :patientProfilePicture="patientProfilePicture" 
                    :requestVsFunction="createOrSearchPatient"
                    :dpi="this.gid"
                    >
                  </PrescriptionsComponent>  
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card>
          <div v-show="cameraNotReadable">
            <v-alert
              text
              type="warning"
              prominent
              border="left"
              class="ma-8 pa-5"
              icon="mdi-video-off"
            >
            <div class="title ml-2">
              No se ha podido conectar con su cámara. 
            </div>
              <ul>
                <li class="subtitle-1">
                  Revise si hay otra aplicación usándola y ciérrela. 
                </li> 
                <li class="subtitle-1">
                  Seleccione su cámara en la sección AUDIO/VIDEO. 
                </li> 
              </ul>
            </v-alert>
          </div>   
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog v-model="statusDoor" width="500">
        <v-card>
          <div v-if="doorOpened">
            <v-card-title class="text-h5 red white--text">
              ¡Aviso - Puerta Cabina!
            </v-card-title>
          </div>
          <div v-else-if="doorClosed">
            <v-card-title class="text-h5 green white--text">
              ¡Aviso - Puerta Cabina!
            </v-card-title>
          </div>

          <div v-if="doorOpened">
            <v-card-text class="title mt-3">
              ¡La puerta de la cabina se encuentra abierta! <br />Indicar al
              paciente cerrarla de manera adecuada.
            </v-card-text>
          </div>
          <div v-if="doorClosed">
            <v-card-text class="title mt-3">
              ¡Puerta cerrada correctamente!
            </v-card-text>
          </div>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <div v-if="doorClosed">
              <v-btn color="#00afb9" text @click="statusDoor = false">
                Aceptar
              </v-btn>
            </div>
            <div v-else-if="doorOpened">
              <v-btn color="#00afb9" text @click="statusDoor = false">
                Aceptar
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div>
        <v-overlay :value="overlay" opacity="0.5">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </div>
    </div>

    <div>
      <v-snackbar v-model="snackbarVar" max-width="170" min-width="170">
        <v-row justify="space-around">
          <div class="title">Volumen</div>
          <div class="font-weight-medium pink--text title">
            {{ this.textVol }}
          </div>
        </v-row>
      </v-snackbar>
    </div>
    <notifications group="camera" />
 
  </v-app>
</template>

<script>
import moment from "moment";
import axios from "axios";
import * as Cookies from "js-cookie"; 
import { AGORA_APP_ID } from "@/agora.config";
import { API_URL, TOKEN } from "../global"; 
import TimeComponent from "@/components/TimeComponent";
import ProgressLinearComponent from "../components/ProgressLinearComponent.vue"
import AgoraRTC from 'agora-rtc-sdk-ng'; 
import "@/css/sweet-custom.css";
import { socket } from "@/socket";
import { reactive } from "vue";
//Import components to request vs
import DiasSysComponent from "../components/vital-sign-component/DiasSysComponent.vue"
import HeartRateComponent from "../components/vital-sign-component/HeartRateComponent.vue"
import WeightComponent from "../components/vital-sign-component/WeightComponent.vue"
import HeightComponent from "../components/vital-sign-component/HeightComponent.vue"
import TemperatureComponent from "../components/vital-sign-component/TemperatureComponent.vue"
import VitalSignsResults from "../components/VitalSignsResults.vue"
import PrescriptionsComponent from "../components/patient/medical_history/PrescriptionsComponent.vue";
//import VitalSignComponent from "../components/patient/medical_history/VitalSignComponent.vue";
//import { useSound } from "@vueuse/sound";
export const state = reactive({
  connected: false,
});
const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
 

export default {
 
  components: {
    // VuePdfApp, 
    TimeComponent, 
    ProgressLinearComponent,
    DiasSysComponent,
    HeartRateComponent,
    WeightComponent,
    HeightComponent,
    TemperatureComponent,
    VitalSignsResults,
    PrescriptionsComponent,
    //VitalSignComponent
  },
  data() {
    return {
      localVideoPlayer: "",
      videoTrack: null,
      audioTrack: null,
      videodiv: "",
      text: "",
      downlinkNetworkQuality: 0,
      downlinkNetworkQualityRemote: 0,
      remotePlayerContainer : "",
      localPlayerContainer: "",
      options: {
        appId: '7c69f6c319f4428abbcd684e5b12da0c',
        // Set the channel name.
        channel: "",
        // Pass your temp token here.
        token: "",
        // Set the user ID.
        uid: 0,
      },
      channelParameters: {
        localAudioTrack: null,
        // A variable to hold a local video track.
        localVideoTrack: null,
        // A variable to hold a remote audio track.
        remoteAudioTrack: null,
        // A variable to hold a remote video track.
        remoteVideoTrack: null,
        // A variable to hold the remote user id.s
        remoteUid: null,
      },
      minutes: "--",
      seconds: "--",
      videoBlocked: false,
      disabledButtonEndCall: true,
      disabledButtonVolUp: false,
      disabledButtonVolMin: false,
      //cronometro
      time: "00:00",
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      isStop: false,
      //buscador de tipo de laboratorios
      searchLab: "",
      genderLocal: "",
      dialogSearch: false,
      scanSave: true,
      e6: 1,
      step: 1,
      snackbar: false,
      consultations: [],
      filteredConsultations: [],
      consultationName: "",
      //variable utilizada al momento de crear consulta y asignarle fecha
      consultation_form: {
        name: "",
        active: true,
        patient: "",
        cabin: "",
      },
      e1: 1,
      callId: this.$route.params.callId,
      gid: '',
      cabinId: this.$route.params.cabinId,
      patientId: null, 
      consultationId: "",
      dialog20: false,
      dialog21: false,
      dialog: false,
      first_name: "",
      dialog3: false,
      videoProfile: "360p_1",
      channel: "",
      transcode: Cookies.get("transcode") || "interop",
      codec: Cookies.get("codec") || "h264",
      attendeeMode: Cookies.get("attendeeMode") || "video",
      baseMode: Cookies.get("baseMode") || "avc",
      uid: undefined,
      form1: {
        id: '',
        cabin: null,
        state: "",
        alive: true,
        active: true,
        entity: null,
        profile_picture: null,
        first_name: "",
        last_name: "",
        birth_date: new Date().toISOString().substring(0, 10),
        gender: null,
        government_id: "",
        phone_number: "",
        country: "Guatemala",
        email: "",
        city: "",
        address: "",
      },
      url: null,
      //personal information vars
      firstName: null,
      message: null,
      // consultations data
      dialogAskingVitalSigns: false,
      vitalSignDescription: "",
      dialog14: false,
      dialogLoadingVitalSign: false,
      dialogLoading: false,
      dialogLoadingAppointment: false,
      snackbar2: false,
      dialogSaveVS: false,
      symptom: "",
      type2: null,
      e7: 1,
      navigationType: undefined,
      dialogSend: false,
      dialogValidate: false,
      selectDisabled: false,
      form: {
        consultation: "",
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
      idScan: "",
      imageScan: "",
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
      patiId: "",
      idAssistnt: "",
      isDemoChannel: false,
      isInstallerChannel: false,
      isTestingChannel: false,
      isOperationsChannel: false,
      cabinChannel: "",
      showScanResult: false,
      statusDoor: false,
      doorClosed: false,
      doorOpened: false,
      scanDone: false,
      scanError: false,
      endingCall: false,
      emergencyDoor: true,
      dialogDoor: false,
      volumeMute: false,
      //CallCenterDoctors
      dialogDoc: false,
      dialogReload: false,
      listScans: [],
      //Vars para activar/desactivar botones de signos vitales
      disabledButton: false,
      //patient details for seguimiento
      isSeguimiento: null,
      proflePicP: "",
      nameP: "",
      apellidoP: "",
      genderP: null,
      ageP: "",
      newCabinIdChannel: "",
      //snackbars volume
      volDone: false,
      volError: false,
      muteDone: false,
      unmuteDone: false,
      overlay: false,
      laser: false,
      //button scan
      newScan: false,
      //new vars
      waitingScanVar: false,
      turnOnScanVar: true,
      buttonsScan: true,
      waitingMessage: "",
      parsedSVHeight: "",
      scanOnDone: false,
      scanOnError: false,
      snackbarVar: false,
      textVol: "",
      scanAg: false,
      nscanAg: true,
      sendButton: true,
      validateSaveButton: false,
      attempts: 3,
      activateCallInfo: false,
      //var patient dpi
      snackBarWait: false,
      timeout: -1,
      bottom: true,
      right: true,
      callStarted: false,
      callStartedAgora: false,
      waitingCall: true,
      keyDiv: 0,
      noteMedicalButton: true,
      record: false,
      listenS: false,
      textSteto: "Grabar",
      estetoR: false,
      cardBlocked: false,
      //Vars to get country information
      sthetoAvailable: false,
      esfigmoAvailable: false,
      transition: 'slide-y-reverse-transition',
      fab: false,
      patient: "",
      canva: "",
      remot: "",
      camerasAvailables: [],
      microphonesAvailables: [],
      dialogDevice: false,
      videoT : null,
      audioT: null,
      tab: null,
      miniScan: false,
      miniVs: true,
      vitalSigns: {
        esfigmo : "esfigmo",
        oxygen: "oxygen",
        weight: "weight",
        height: "height",
        temperature: "temperature"
      },
      typeRequest: {
        requestSv: "request-sv",
        confirmSv: "confirm-sv"
      },
      keyVsToSend:{
        weight: "Weight-c",
        height: "height-c",
        bpm: "bpm-c",
        spo2: "SpO2-c",
        sis: "sis-c",
        dias: "dias-c",
        tmp: "tmp-c"
      },
      sendRequestText: "Enviando solicitud...",
      showVsCard: false,
      showScanCard: false,
      scanSize: "",
      imc:null,
      titleVideoEnded:"Video terminado",
      textVideoEnded: "¡Puedes seguir llenando la información del paciente!",
      stethoText: "Activar esteto",
      tab2: null,  
      turnOnScanText: "Encender escaner",
      turningOnScan: false,
      recordStethoText: "Grabar",
      recordStethoIcon:"mdi-record-rec",
      sthetoUpVol: false,
      sthetoMinVol: false,
      sthetoSaveVol: false,
      internetQualityLabel: '',
      internetQuality: 0,
      calls: [],
      patientDpiInfo: [],
      cameraNotReadable: false,
      componentKey: 0,
      cabinLocation: '',
      download_speed: 0,
      assistant: '',
      patientPrescriptions: [],
      pfname: '',
      plname: '',
      patientProfilePicture: '',
      assistantId: '',
      dialogFormPatient: true,
      gender: [
        { name: " Femenino", value: false },
        { name: "Masculino", value: true },
      ],
      modal0: false,
      isGenericPatient: false,
      buttonsBlocked: true,
      listVitalSigns: [],
      stethoAudio: "",
      stethoId: "",
      playing: false,
      isMuted:false,
      measureTypeReset: false
    };
  },

  created() { 
    if(localStorage.getItem('dpi')){
      this.gid = localStorage.getItem('dpi');
    }

    if(localStorage.getItem('esteto_id')){
      this.stethoId = localStorage.getItem('esteto_id');
    }

    this.assistant = localStorage.getItem('doctor') 
    this.assistantId = localStorage.getItem('doctorId')  
    
    this.getDevices();
    // reload vital signs
    this.formvitalsign.weight = localStorage.getItem("weight")
    this.formvitalsign.heart_rate = localStorage.getItem("heart_rate");
    this.formvitalsign.oxygen = localStorage.getItem("oxygen");
    this.formvitalsign.temperature = localStorage.getItem("temperature");
    this.formvitalsign.systolic_pressure = localStorage.getItem("systolic_pressure");
    this.formvitalsign.diastolic_pressure = localStorage.getItem("diastolic_pressure");
    this.formvitalsign.height = localStorage.getItem("height");
    this.imc = localStorage.getItem("imc");
    // reload vital signs
    this.esfigmoAvailable = JSON.parse(localStorage.getItem("esfigmoAvailable")) == true;
    this.sthetoAvailable = JSON.parse(localStorage.getItem("estetoAvailable")) == true;
    this.isDemoChannel = localStorage.getItem("is_demo");
    this.isInstallerChannel = localStorage.getItem("is_installer");
    this.isTestingChannel = localStorage.getItem("is_testing");
    this.isOperationsChannel = localStorage.getItem("is_operations");
    this.cabinChannel = `cabin-${this.cabinId}`;
    this.idAssistnt = localStorage.getItem("idAssistant");
    this.form1.cabin = this.cabinId;
    this.consultation_form.cabin = this.cabinId;
    this.channel = `cabin-${this.cabinId}`;
    this.options.channel = this.channel;
    //this.options.uid = `${this.cabinId}`;
    this.channelCmd = `${this.channel}-cmd`;
    this.appId = AGORA_APP_ID;
    this.download_speed = localStorage.getItem("download_speed")
    this.newCabinIdChannel = localStorage.getItem("cabinId");
    (this.callStarted =
      JSON.parse(localStorage.getItem("callStarted")) === true),
      (this.callStartedAgora =
        JSON.parse(localStorage.getItem("callStartedAgora")) === true);
    this.activateCallInfo =
      JSON.parse(localStorage.getItem("activateCallInfo")) === true;
    this.form1.government_id = this.gid;
    this.cardBlocked = JSON.parse(localStorage.getItem("cardBlocked")) === true; 
    this.waitingCall = JSON.parse(localStorage.getItem("waitCall") === true)
    if(localStorage.getItem("waitCall") == null){
      this.waitingCall = true;
    } 
    this.tokenGeneration();
  
    if (!this.appId) {
      return alert("Get App ID first!");
    }
    this.patchCall();
    this.getCabin();   
    this.getConsultations();
    this.getConsultation();
    //this.loadInformationSocket();
    this.loadInformation();
    this.reload();
    this.getPatientByDPI(); 
    this.notifyCabin();
     try {
      const ws = new WebSocket("ws://3.143.233.51:3000/");
      ws.addEventListener("open", () => {
        ws.send(this.cabinChannel);
      });
    } catch (error) {
      return error;
    }
    setTimeout(() => {
      this.start();
    }, 5000);

    
    if (this.waitingCall == false) {
      this.buttonsBlocked = false;
      this.startCall(); 

    }  

    this.consultation_form.name = moment(new Date()).format(
      "YYYY/MM/DD h:mm a"
    ); 


    if(localStorage.getItem('consultation_Id')){
      this.consultationId = localStorage.getItem("consultation_Id");  
    }
    console.log(localStorage.getItem('dpi'), ' getting dpi');

    if(localStorage.getItem('dpi')){
    console.log(localStorage.getItem('dpi'), ' getting dpi here');

      this.gid = localStorage.getItem('dpi'); 
      this.createOrSearchPatient();  
    } 

  },

  watch: {
    e7(newValue) {
      localStorage.setItem("step", newValue);
     },
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
    dialog14(val) {
      if (!val) return;
      setTimeout(() => (this.dialogLoadingAppointment = false), 4000);
    },
    dialogDoor(val) {
      if (!val) return;
    },
  },

  mounted() {
    
    this.$nextTick(() => {
      let canvas = document.querySelector("#card-outlined");  
      return canvas;
    });
    this.isReload();
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      window.location.reload();
    }
  },

  beforeUpdate() {
    let canvas = document.querySelector("#card-outlined");
    let videos = document.querySelector("#localVideoPlayerTest");
    this.canva = canvas
    this.videodiv = videos
    if (videos != null) {
      this.videodiv.appendChild(this.localVideoPlayer);
    }
    if(canvas != null){ 
    this.canva.appendChild(this.localPlayerContainer);
    this.canva.appendChild(this.remotePlayerContainer);
    }
  },

  methods: {
    
    notifyCabin() { 
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let url = `${API_URL}api/cabin/notify-cabin/`;
      axios.post(url, {
        'cabin': this.cabinId
      }, {headers}).then((response)=>{ 
        return response.data
      }) 
    },

    listenStetho() {
      if (this.volumeMute) {
        this.settingVolume('call-unmute') 
      } else {
        this.settingVolume('call-mute') 
      }

      if (this.playing) { 
        this.playing = false;
      } else {
        let headers = {
          Authorization: `Token ${TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        };
        let stethoUrl = `${API_URL}api/upload/stetho/${this.stethoId}/`;
        axios.get(stethoUrl, {headers}).then((response)=>{
          this.stethoAudio = response.data['audio']; 
          console.log(this.stethoAudio, 'esteto audio');
          this.playing = true;
          var audio = new Audio(this.stethoAudio); // path to file
          audio.play();
          setTimeout(()=>{ 
            this.playing = false; 
            this.settingVolume('call-unmute');
          }, 13500)
          return response.data
        })
      }  
    },

    isGender(g) {
      this.form1.gender = g.value;
    },

     async toggleDeviceTest() {
      try {
        this.videoTrack = AgoraRTC.createCameraVideoTrack({ cameraId: this.videoT});
        this.audioTrack = AgoraRTC.createMicrophoneAudioTrack({ microphoneId: this.audioT });
        this.localVideoPlayer = document.createElement('div');
        this.localVideoPlayer.style.height = "25%"; 
        this.localVideoPlayer.style.width = "15%"; 
        this.localVideoPlayer.style.position = "absolute";  
        this.localVideoPlayer.style.border = "2px #00afb9 solid";
        (await this.videoTrack).play(this.localVideoPlayer);
      } catch (error) {
        console.error(error)
      }
    },
    playAudio() {
      const audioUrl = require('@/audio/test-sound.mp3');
      this.$refs.audioPlayer.src = audioUrl;
      this.$refs.audioPlayer.play();
    },
   async testAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        this.mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });

          const audioUrl = URL.createObjectURL(blob);

          this.$refs.audioPlayer.src = audioUrl;
          this.$refs.audioPlayer.play();
          console.log('Audio del micrófono reproducido correctamente.');
        };

        this.mediaRecorder.start();

        const recordingDuration = 3000; // 3 segundos
        setTimeout(() => {
          this.mediaRecorder.stop();
        }, recordingDuration);
      } catch (error) {
        console.error('No se puede acceder al micrófono o reproducir el audio:', error);
      }
    },

  
    createOrSearchPatient(){ 
      // Variables
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathPatients = `${API_URL}api/patients/`;

      // Api calls
      // Api call that gets patient if exist with dpi incoming from python
      axios.get(`${pathPatients}get-patient-by-dpi/?government_id=${this.gid}`, {headers}).then((response)=>{
        this.patientDpiInfo = response.data;  
        // If response length is 0, new patient will be created on data base
        if(this.patientDpiInfo.length == 0){
          this.dialogFormPatient=true;
        } else {  
          this.isGenericPatient = true;
          this.dialogFormPatient=false;
          this.buttonsBlocked = false;
          this.patientPrescriptions = this.patientDpiInfo[0]['prescriptions_patient']
          this.listVitalSigns = response.data[0]['vital_signs_patient'];
          this.pfname = this.patientDpiInfo[0]['first_name'];
          this.plname = this.patientDpiInfo[0]['last_name'];
          this.form1.id = this.patientDpiInfo[0]['id'];
          this.form1.first_name = this.pfname;
          this.form1.last_name =this.plname;
          this.form1.phone_number = this.patientDpiInfo[0]['phone_number'];  
          this.patientProfilePicture = this.patientDpiInfo[0]['profile_picture'];
          this.form1.birth_date = this.patientDpiInfo[0]['birth_date']; 
          this.form1.gender = this.patientDpiInfo[0]['gender'];
          this.listScans = response.data[0]["scans_patient"];
          this.listScans.reverse();
          if (this.pfname.includes('Usuario-')) {
            this.isGenericPatient = true;
            this.dialogFormPatient = false;
            this.form1.first_name =this.patientDpiInfo[0]['first_name'];
            this.form1.last_name =this.patientDpiInfo[0]['last_name'];
            this.form1.phone_number =this.patientDpiInfo[0]['phone_number'];
            this.form1.id = this.patientDpiInfo[0]['id'];
          }
          // If response has data, this condition verifies if patient cabin field is == to cabin id where consultation starts
          if (response.data[0].cabin != this.cabinId) {
              axios.patch(`${pathPatients}${response.data[0].id}/`, {
              'cabin': this.cabinId,
              'entity': this.form1.entity,
            }, {headers}).then((res)=>{
              this.patient = res.data.id;  
              this.createConsultation();
            }).catch((e)=>{
              console.log(e, 'error')
              return e;
            })
          } else {
            this.patient = response.data[0].id;
            this.createConsultation();
          } 
          
        }
      }).catch((e)=>{
        return e;
      })
    },
    

    getPatientDpi(dpi){

       // Variables

      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathPatients = `${API_URL}api/patients/`;
      axios.get(`${pathPatients}get-patient-by-dpi/?government_id=${dpi}`, {headers}).then((r)=>{
        this.patientDpiInfo = r.data; 
        this.patientPrescriptions = this.patientDpiInfo[0]['prescriptions_patient']
        this.pfname = this.patientDpiInfo[0]['first_name'];
        this.plname = this.patientDpiInfo[0]['last_name'];
        this.patientProfilePicture = this.patientDpiInfo[0]['profile_picture']
        return r.data;
      })

    },

    createPatient(){
      
      // Variables
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let pathPatients = `${API_URL}api/patients/`;

      if (this.isGenericPatient) {
        axios.patch(`${API_URL}api/patients/${this.form1.id}/`, {
          'first_name':  this.form1.first_name,
          'last_name' :  this.form1.last_name,
          'birth_date': this.form1.birth_date,
          'gender': this.form1.gender,
          'government_id': this.form1.government_id
        }, {headers}).then((response)=>{
          this.dialog = false;
          this.genericAlert("success", " ", "Información guardada.");  
          this.dialogFormPatient = false;
          this.getPatientDpi(response.data['government_id']);
          localStorage.setItem('dpi',response.data['government_id'])
          this.gid = response.data['government_id'];
          return response.data;
        }).catch((e)=>{ 
          console.log(e,'errore')
          this.genericAlert("error", " ", "No se ha podido guardar la información del paciente");  
          this.dialog = false;
          this.loading=false;
          return e;
      })
      } else {
        axios.post(pathPatients, {
          'cabin': this.cabinId,
          'entity': this.form1.entity,
          'first_name':  this.form1.first_name,
          'last_name' :  this.form1.last_name,
          'birth_date': this.form1.birth_date,
          'gender': this.form1.gender,
          'government_id': this.gid,
          'phone_number': this.form1.phone_number,
          'country': 'GT',
          'city': 'GT',
          'address': 'GT',
          'email': 'na',
          'state': 'GT',
          'alive': false,
          'active': true
        }, {headers}).then((r) => { 
          this.dialog = false;
          this.patient = r.data.id;   
          this.getPatientDpi(r.data['government_id'])
          this.genericAlert("success", " ", "Paciente registrado");  
          this.dialogFormPatient = false;
          this.createConsultation();
        }).catch((e)=>{
          this.dialog = false; 
          this.genericAlert("error", " ", "No se ha podido registrar al paciente");  
          return e;
      })
      }

    },

    alertToSaveOrNotSaveScan(title, saveScan){
      let timerInterval;
        this.$swal({ 
          title: title, 
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => { 
          if(saveScan){
            this.genericAlert("success", " ", "Documento guardado"); 

          } else {
            this.deleteScan()
          }
          this.newScan = true;
          this.showScanResult = false;
          return result; 
        });
    },

    deleteScan(){
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };

      let path = `${API_URL}api/upload/scans/${this.idScan}/`;
      axios.delete(path, {headers}).then((response)=>{
        this.genericAlert("success", " ", "Documento eliminado"); 
        return response.data
      }).catch((e)=>{
        return e;
      })
    },

    changeVsPathGif(vs){
    this.formvitalsign.weight = localStorage.getItem("weight")
    console.log(this.formvitalsign.weight, 'weight');
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };

      let path = `${API_URL}api/cabin/switch-gif/`;
        axios.post(path, {
          "vs": vs, 
          "cabin": this.cabinId
        },{headers}).then((response) => { 
          return response;
        }).catch((e) => {      
          return e;
        });
    },

    switchVsOrScan(type){
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/switch-vs-scan/`;
      switch (true) {
        case this.showVsCard:
          this.showScanCard = false;
          break;
        case this.showScanCard: 
          this.showVsCard = false;
        break;
      
        default:
          break;
      }
      axios.post(path, {
        "cabin": this.cabinId,
        "type": type
      },{headers}).then((response) => { 
          return response;
        }).catch((e) => {      
          return e;
        });
    },

    requestSvFunction(cabin, vsName, typeRequest){
      this.sendRequestText = 'Enviando solicitud...'
      this.snackBarWait = true;
      this.dialogAskingVitalSigns = true;
      this.disabledButton = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/send-vs-request-confirm/`;
      axios.post(path, {
        "cabin": cabin,
        "vs": vsName,
        "type-request": typeRequest,
      },{headers}).then((response) => {
          setTimeout(() => (this.dialogAskingVitalSigns = false), 4000);
          return response;
        }).catch((e) => { 
          this.genericAlert("error", "Enviar", "¡Algo ha salido mal, intenta de nuevo!");    
          this.snackBarWait = false;
          this.dialogAskingVitalSigns = false
          setTimeout(() => (this.disabledButton = false), 5000);
          return e;
        });
    },

    sendVsDataCabin({cabin:cabin, hasTwo:has2Vs, value1:value1, value2: value2, confirmRequest:typeRequest, key1:key1, key2:key2}) {
      this.sendRequestText = 'Enviando...'
      this.dialogAskingVitalSigns = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/send-vs-request-confirm/`;
      var body;
      if (has2Vs) {
        body = {
          "cabin": cabin,
          "value-1": value1,
          "value-2": value2,
          "type-request": typeRequest,
          "key-1": key1,
          "key-2": key2, 
          "hasTwoSv": has2Vs
        }
      } else {
        body = {
          "cabin": cabin,
          "value": value1,
          "type-request": typeRequest,
          "key": key1,
          "hasTwoSv": has2Vs
        }
      }
      axios.post(path, body, {headers}).then((response) => {
        setTimeout(() => (this.dialogAskingVitalSigns = false), 2000); 
        this.genericAlert("success", "Enviar", "¡Se ha enviado la información a la cabina!");    
          return response;
        }).catch((e) => { 
          this.genericAlert("error", "Enviar", "¡Algo ha salido mal, intenta de nuevo!");    
          this.snackBarWait = false;
          this.dialogAskingVitalSigns = false
          return e;
        });
    },
    
    getDevices(){ 
      AgoraRTC.getCameras().then(device => {
        this.camerasAvailables = device;
        this.videoT = this.camerasAvailables[0].deviceId;
      })
      AgoraRTC.getMicrophones().then(device => {
        this.microphonesAvailables = device.filter((d) => d.deviceId != "default" && d.deviceId != "communications")
        this.audioT = this.microphonesAvailables[0].deviceId 
      })
    },

    forceRerender() {
      this.componentKey += 1;
    },

    async isVideoDevice(g) { 
        await this.channelParameters.localVideoTrack.setDevice(g.deviceId)
        this.videoT = g.deviceId;
    },

    async isAudioDevice(g) { 
      await this.channelParameters.localAudioTrack.setDevice(g.deviceId)
      this.audioT = g.deviceId;
    },

    tokenGeneration(){
      const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
      const appId = this.options.appId;
      const appCertificate = 'e2f754150cc644f7ba406cf999b3ee3d';
      const channelName = this.options.channel;
      const uid = this.options.uid;
      const role = RtcRole.PUBLISHER;
      const expirationTimeInSeconds = 0 
      const privilegeExpiredTs = expirationTimeInSeconds  
      // Build token with uid
      const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
      this.options.token = tokenA;  
     },
    async startCall(){  
      //agoraEngine.startProxyServer(3);
      // Dynamically create a container in the form of a DIV element to play the remote video track.
      this.remotePlayerContainer = document.createElement("div");
      // Dynamically create a container in the form of a DIV element to play the local video track.
      this.localPlayerContainer = document.createElement('div');
      // Specify the ID of the DIV container. You can use the uid of the local user.
      this.localPlayerContainer.id = this.options.uid; 
      // Set the local video container size.
      this.localPlayerContainer.style.height = "30%"; 
      this.localPlayerContainer.style.width = "30%"; 
      this.localPlayerContainer.style.position = "absolute";  
      this.localPlayerContainer.style.top = "10px";
      this.localPlayerContainer.style.zIndex = "10"
      //this.localPlayerContainer.style.filter = "blur(4px)"

      // this.localPlayerContainer.style.overflowY = "hidden";
      // this.localPlayerContainer.style.overflowX = "hidden"; 
      this.localPlayerContainer.style.left = "10px"; 
      this.localPlayerContainer.style.border = "2px #00b6ed solid";  
      // Set the remote video container size.
      this.remotePlayerContainer.style.width = "100%";
      this.remotePlayerContainer.style.height = "100%";  
      this.remotePlayerContainer.style.top = "0px"; 
      this.remotePlayerContainer.style.left = "0px"; 
      this.remotePlayerContainer.style.position = "absolute"; 
      this.remotePlayerContainer.style.border = "2px #00b6ed solid"; 

      // Get the downlink network local
      agoraEngine.on("network-quality", (quality) => {
        try {
          this.downlinkNetworkQuality = quality.downlinkNetworkQuality
        } catch (error) {
          console.error('Error al obtener la calidad de red LOCAL')
        }
      });
      // Get the downlink network remote
      agoraEngine.on("network-quality", () => {
        try {
          const remoteNetwork = agoraEngine.getRemoteNetworkQuality();
          const networkQuality = Object.values(remoteNetwork)
          this.downlinkNetworkQualityRemote = networkQuality[0].downlinkNetworkQuality;
        } catch (error) {
          console.error('Error al obtener la calidad de red REMOTA')
        }
      })

      agoraEngine.on("user-published", async (user, mediaType) =>
      {
        // Subscribe to the remote user when the SDK triggers the "user-published" event.
        await agoraEngine.subscribe(user, mediaType);
        // Subscribe and play the remote video in the container If the remote user publishes a video track.
        if (mediaType == "video")
        {
          // Retrieve the remote video track.
          this.channelParameters.remoteVideoTrack = user.videoTrack;
          // Retrieve the remote audio track.
          this.channelParameters.remoteAudioTrack = user.audioTrack;
          // Save the remote user id for reuse.
          this.channelParameters.remoteUid = user.uid.toString();
          // Specify the ID of the DIV container. You can use the uid of the remote user.
          this.remotePlayerContainer.id = user.uid.toString();
          this.channelParameters.remoteUid = user.uid.toString(); 
          // Append the remote container to the page body.
          // this.canva.append(this.remotePlayerContainer);
          // Play the remote video track.
          this.channelParameters.remoteVideoTrack.play(this.remotePlayerContainer);
        }
 
        // Subscribe and play the remote audio track If the remote user publishes the audio track only.
        if (mediaType == "audio")
        {
          // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
          this.channelParameters.remoteAudioTrack = user.audioTrack;
          // Play the remote audio track. No need to pass any DOM element.
          this.channelParameters.remoteAudioTrack.play();
          if (this.channelParameters.remoteAudioTrack) {
            console.log( 'here'); 
          } else {
            console.log( 'not here'); 
            
          }
        }
        // Listen for the "user-unpublished" event.
        agoraEngine.on("user-unpublished", user =>
        {
          console.log(user.uid+ "has left the channel");
        });
      });
      // Enable log upload
      AgoraRTC.enableLogUpload();
      // Set the log output level as INFO
      AgoraRTC.setLogLevel(1);

      // Enable dula stream mode
      agoraEngine.enableDualStream();

      await agoraEngine.join(this.options.appId, this.options.channel, this.options.token, this.options.uid);

      // Create a local audio track from the audio sampled by a microphone.
      this.channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack(
        {
          'AEC': true,
          'AGC': true,
          'ANS': true,
          encoderConfig: "high_quality_stereo",}
      ); 

      // Create a local video track from the video captured by the camera.
      try {
        this.channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack(
        {
          optimizationMode: "motion",
          encoderConfig: 
          {
            width: 640,
            // Specify a value range and an ideal value
            height: { ideal: 360, min: 280, max: 480 },
            frameRate: 15,
            bitrateMin: 490, bitrateMax: 800,
          },
        }
      ); 
      } catch (error) {
        let err = JSON.stringify(error);
        let errContent = JSON.parse(err) 
        if (errContent['code'] == 'NOT_READABLE') {
          this.cameraNotReadable = true;  
        }
      }
      // this.canva.append(this.localPlayerContainer);
      // Publish the local audio and video tracks in the channel.
      await agoraEngine.publish([this.channelParameters.localAudioTrack, this.channelParameters.localVideoTrack]);
      // Play the local video track.
      this.channelParameters.localVideoTrack.play(this.localPlayerContainer); 
      this.channelParameters.localVideoTrack.setOptimizationMode("motion")
      console.log(this.channelParameters.localAudioTrack['enabled'], 'local audio');
      if(this.channelParameters.localAudioTrack){

        if (this.channelParameters.localAudioTrack['enabled']) {
          this.isMuted = false;
        } else {
          this.isMuted = true;
        }
      }else {
        console.log('local audio null')
      }

    },
    // mdi-microphone-off mdi-microphone settingVolume('call-unmute') settingVolume('call-mute')
    muteLocalAudio(){
      if (this.isMuted == false) {
        this.channelParameters.localAudioTrack.setEnabled(false) 
        this.isMuted = true;
      } else {
        this.channelParameters.localAudioTrack.setEnabled(true) 
        this.isMuted = false;

      }
    },

    async leaveCall() {
      this.channelParameters.localAudioTrack.close();
      this.channelParameters.localVideoTrack.close();
      // Leave the channel
      await agoraEngine.leave(); 
      //agoraEngine.stopProxyServer();
      this.removeVideoDiv(this.remotePlayerContainer.id);
      this.removeVideoDiv(this.localPlayerContainer.id);
      //window.location.reload();
    },

   

    createVideoTrack(){
      if (this.cameraNotReadable) {
        let timerInterval;
        this.$swal({
          icon: 'info',
          title: 'Reconectando', 
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => { 
          window.location.reload() 
          return result;
        });
      }
    },

    removeVideoDiv(elementId){
      let Div = document.getElementById(elementId);
      if (Div)
      {
        Div.remove();
      }
    },

    genericAlert(icon, title, text){
      let timerInterval;
        this.$swal({
        icon: icon,
        title: title,
        text: text,
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          this.$swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        return result;
      });
    },

    //CallCenterDoctor
    isReload() {
      const navigation = window.performance.getEntriesByType("navigation");
      if (navigation) {
        this.navigationType = navigation[0].type;
        if(localStorage.getItem("keep-step") != null && this.navigationType === "reload" && localStorage.getItem("step") == 1){
          this.step = 2;
          this.e7 = 1;
        } else if (this.e7 > 1 && this.navigationType === "reload" && localStorage.getItem("step") == 1) {
          this.step = 2;
          this.e7 = 1;
        } else if(localStorage.getItem("step") == 2){
          this.step = 2;
          this.e7 = 2;
        }
      }
    },
 
    getPatientByDPI() {
      this.genericAlert("", "Cargando...", "Por favor, espere.");
    },
 
    reload() {
      this.dialogReload = true;
      setTimeout(() => (this.dialogReload = false), 5000);
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
    },
 
    async openCabin() {
      let consultaId = localStorage.getItem("consultation_Id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/doctor/open-cabin-end-consultation/${this.callId}/`;
      await axios.patch(
          path,
          {
            patient: this.patientId,
            consultation: consultaId,
            scheduled: new Date(),
            start: null,
            ambassador: 13,
            doctor: 1,
            started: null,
            end: null,
          },
          { headers }
        ).then((res) => {
          localStorage.setItem("videoBlocked", true);
          this.videoBlocked = JSON.parse(localStorage.getItem("videoBlocked")) === true;
          this.waitingCall = false;
          if (this.cardBlocked == false) {
            this.titleVideoEnded = "Consulta terminada";
            this.textVideoEnded = ""
          }
          this.videoBlocked = true;
          localStorage.removeItem("callStarted");
          this.callStartedAgora = false;
          this.noteMedicalButton = false;
          this.callStarted = false;
          localStorage.removeItem("waitCall"); 
          localStorage.removeItem("cardBlocked"); 
          localStorage.removeItem("dpi"); 
          this.cardBlocked = false;
          this.disabledButtonEndCall = false;
          localStorage.removeItem("esfigmoAvailable");
          localStorage.removeItem("estetoAvailable");  
          localStorage.removeItem('call_id');
          localStorage.removeItem('cabin_t_id'); 
          localStorage.removeItem('cabin_location'); 
          localStorage.removeItem('call_timestamp'); 
          this.genericAlert("success", "Abrir cabina", "¡Se ha abierto la cabina!");
          return res.data;
        }).catch((err) => {
          return err;
        });
    },

    async activateReceipt() {
      let consultaId = localStorage.getItem("consultation_Id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/doctor/activate-receipt/${this.callId}/`;
      await axios.patch(
          path,
          {
            patient: this.patientId,
            consultation: consultaId,
            scheduled: new Date(),
            start: null,
            ambassador: 13,
            doctor: 1,
            started: null,
            end: null,
          },
          { headers }
        ).then((res) => {
          return res;
        }).catch((err) => {
          return err;
        });
    },
   
    async getScans() {
      console.log('getting');
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      }; 
      let pathPatients = `${API_URL}api/patients/`;
      axios.get(`${pathPatients}get-patient-by-dpi/?government_id=${this.gid}`, {headers}).then((response) => { 
        
        this.listScans = response.data[0]["scans_patient"];
        this.listScans.reverse();
      }).catch((e) => {
        return e;
      }); 
    },
  
    async emergencyDoorActivate() {
      this.dialogDoor = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/emergency-door/${this.cabinId}/`;
      axios.patch(
          path,
          {
            nit: "CF",
          },
          { headers }
        ).then((response) => {
          this.emergencyDoor = !this.emergencyDoor;
          this.dialogDoor = false;
          return response.data;
        }).catch((e) => {
          return e;
        });
    },

    async emergencyDoorDeactivate() {
      this.dialogDoor = true;
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/emergency-door-deactivate/${this.cabinId}/`;
      axios.patch(
          path,
          {
            nit: "CF",
          },
          { headers }
        ).then((response) => {
          this.emergencyDoor = !this.emergencyDoor;
          this.dialogDoor = false;
          return response.data;
        }).catch((e) => {
          return e;
        });
    },

    async pushCall(){

      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/push-call/`;
      axios.post(
          path,
          {
            'cabin': this.cabinId, 
          },
          { headers }
        ).then((response) =>{
          this.genericAlert("success", "Enviar", "¡Se ha enviado la solicitud a la cabina!");    
          return response.data
        }).catch((e) => { 
          return e;
        });
    },

    async settingVolume(action) { 
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/pos/setting-volume/`;
      axios.post(
          path,
          {
            'cabin': this.cabinId,
            'action': action
          },
          { headers }
        ).then((response) => { 
          switch (action) {
            case 'call-min':
              this.disabledButtonVolMin = true;
              break;
            case 'call-unmute':
              this.volumeMute = !this.volumeMute;
              break;
            case 'call-mute':
              this.volumeMute = !this.volumeMute;
              break;
            case 'call-up':
              this.disabledButtonVolUp = true;
              break;
            case 'stheto-min':
              this.sthetoMinVol = true;
              break;
            case 'stheto-up':
              this.sthetoUpVol = true;
              break;
            case 'stheto-save':
              this.sthetoSaveVol = true;
              break;
                     
            default:
              break;
          }
          return response.data;
        }).catch((e) => {
          this.disabledButtonVolMin = false;
          return e;
        });
    },
    

    async recordStetho() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/pos/record-stetho/${this.cabinId}/`;
      axios.patch(
          path,
          {  nit: "CF", },
          { headers }
        ).then((response) => { 
          this.record = !this.record;
          this.recordStethoText = this.record ? "Grabando..." : "Grabar";
          this.recordStethoIcon = this.record ? "mdi-stop" : "mdi-record-rec";
          this.genericAlert("success", "Estetoscopio", "¡Se ha enviado la solicitud!") 
          return response.data;
        }).catch((e) => {
          return e;
        });
    },

    async switchMic() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/pos/switch-mic/${this.cabinId}/`;
      axios.patch(
          path,
          {
            nit: "CF",
          },
          { headers }
        ).then((response) => {
          this.estetoR = !this.estetoR;
          this.stethoText = this.estetoR ? "Desactivar esteto" : "Activar esteto"
          this.genericAlert("success", "Micrófono", "¡Se ha enviado la solicitud!")
          return response.data;
        }).catch((e) => {
          return e;
        });
    },
    
    start() {
      if (this.running) return;
      if (this.timeBegan === null) {
        this.timeBegan = new Date();
      }
      if (this.timeStopped !== null) {
        this.stoppedDuration += new Date() - this.timeStopped;
      }
      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
      this.isStop = true;
    },

    clockRunning() {
      var currentTime = new Date(),
        timeElapsed = new Date(
          currentTime - this.timeBegan - this.stoppedDuration
        ),
        //hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds();
      this.time = this.zeroPrefix(min, 2) + ":" + this.zeroPrefix(sec, 2);
    },

    zeroPrefix(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },

    patchCall() {
      this.patchTimerCall();
      setInterval(this.patchTimerCall, 1000 * 61);
    },

    patchTimerCall(s) {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/pos/call-timer/${this.callId}/`;
      var time_to_parse = this.time.substring(0, 2);
      var timer_parsed = parseInt(time_to_parse);
      axios.patch(
        path,
        {
          duration: this.time,
          timestamp: new Date().toISOString(),
          status: s,
          cabin: this.cabinId,
          minutes: timer_parsed,
          assistant: this.idAssistnt,
        },
        { headers }
      ).then((response) => {
        return response.data;
      }).catch((error) => {
        return error;
      });
    },

    getCall() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/pos/call/${this.callId}/`;
      axios.patch(path, { "status": 1 }, { headers }).then((response) => {
        return response.data;
      });
    },

    loadInformation() {
      try {
        const ws = new WebSocket("ws://3.143.233.51:3000/");
        ws.onmessage = ({ data }) => {
          this.message = data;
          let content = JSON.parse(this.message);
          if ("message" in content && "channel" in content) {
            if (
              !(
                content.channel === this.cabinChannel ||
                content.channel === this.channel
              )
            )
              return;
            content = content.message;
          }
           
          switch (content["call"]) {
            case "start-call":
              this.getCall();
              this.startCall();
              if(this.videoBlocked){
                this.videoBlocked = false
              }
              localStorage.setItem("callStarted", true)
              localStorage.setItem("waitCall", false)
              localStorage.setItem("cardBlocked", true)
              this.callStarted = JSON.parse(localStorage.getItem("callStarted")) === true; 
              this.waitingCall = JSON.parse(localStorage.getItem("waitCall")) === true; 
              this.cardBlocked = JSON.parse(localStorage.getItem("cardBlocked")) === true;
              this.createOrSearchPatient() 
              break
          } 
          
          switch (content["vs"]) { 
            case "Weight":
              if (content["valor"] != "") {
                switch (content["valor"]) {
                  case "error":
                    this.genericAlert("error", "Peso", "¡Algo ha salido mal, intenta de nuevo!");    
                    this.disabledButton = false;
                    this.snackBarWait = false;  
                    break; 
                  default:
                    this.measureTypeReset = true;
                    this.dialogLoadingVitalSign = true;
                    this.vitalSignDescription = "Peso";
                    this.snackBarWait = false;
                    this.attempts = 3;
                    localStorage.setItem("weight", content["valor"]);
                    this.formvitalsign.weight = localStorage.getItem("weight");
                    if(typeof(this.formvitalsign.height) === 'string'){
                      let conversion = (this.formvitalsign.weight / 2.20462262).toFixed(2);
                      this.imc = (conversion / Math.pow(this.formvitalsign.height, 2)).toFixed(2);
                      localStorage.setItem("imc", this.imc);
                      this.imc = localStorage.getItem("imc");
                    }
                    setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                    break;
                }
              }
              break;

            case "bpm":
               if (content["valor"] != "" && content["valor"] != "error" && content["valor"] != "Mal" && content["valor"] != "Obj") {
                  this.dialogLoadingVitalSign = true;
                  this.snackBarWait = false;
                  this.attempts = 3;
                  localStorage.setItem("heart_rate", content["valor"]);
                  this.formvitalsign.heart_rate = localStorage.getItem("heart_rate");
                  setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);   
               }
              break;
 
            case "SpO2":
            if (content["valor"] != "" && content["valor"] != "Mal" && content["valor"] != "Obj") {
                switch (content["valor"]) {
                  case "error":
                    this.disabledButton = false;
                    this.snackBarWait = false;
                    this.attempts -= 1; 
                    switch (this.attempts) {
                      case 2:
                        this.genericAlert("error", "Oximetría", "¡Algo ha salido mal, intenta de nuevo! Te quedan 2 intentos.");     
                        this.disabledButton = false;
                        this.snackBarWait = false;
                        break;
                      case 1:
                        this.genericAlert("error", "Oximetría", "¡Algo ha salido mal, intenta de nuevo! Te queda 1 intento.");      
                        this.disabledButton = false;
                        this.snackBarWait = false;
                        break;
                      case 0:
                        this.genericAlert("error", "Oximetría", "¡Algo ha salido mal, ya no te quedan intentos! Por favor, continúa.");      
                        this.disabledButton = false;
                        this.snackBarWait = false;
                        this.attempts = 3;
                        break;
                      default:
                        break;
                    }
                    break;
                  default: 
                    this.dialogLoadingVitalSign = true;
                    this.snackBarWait = false;
                    this.attempts = 3;
                    this.vitalSignDescription = "Frecuencia cardiaca y Oxígeno";
                    localStorage.setItem("oxygen", content["valor"]);
                    this.formvitalsign.oxygen = localStorage.getItem("oxygen");
                    setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                    break;
                }
               }              
              break;

            case "tmp":
             if (content["valor"] != "") {
              switch (content["valor"]) {
                case "error":
                  this.disabledButton = false;
                  this.snackBarWait = false;
                  this.attempts -= 1; 
                  switch (this.attempts) {
                    case 2:
                      this.genericAlert("error", "Temperatura", "¡Algo ha salido mal, intenta de nuevo! Te quedan 2 intentos.");  
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 1:
                      this.genericAlert("error", "Temperatura", "¡Algo ha salido mal, intenta de nuevo! Te queda 1 intento."); 
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 0:
                      this.genericAlert("error", "Temperatura", "¡Algo ha salido mal, ya no te quedan intentos! Por favor, continúa.");  
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      this.attempts = 3;
                      break;
                    default:
                      break;
                  }
                  break;
                default:
                  this.dialogLoadingVitalSign = true;
                  this.vitalSignDescription = "Temperatura";
                  this.snackBarWait = false;
                  this.attempts = 3;
                  localStorage.setItem("temperature", content["valor"]);
                  this.formvitalsign.temperature = localStorage.getItem("temperature");
                  setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                  break;
              }
             }              
              break;
            
              case "sis": 
                if (content["valor"] != "") {
                  switch (content["valor"]) {
                    case "b":
                        this.disabledButton = false;
                        this.snackBarWait = false;
                      break;
                    default:
                      this.snackBarWait = false;
                      this.attempts = 3;
                      localStorage.setItem("systolic_pressure", content["valor"]);
                      this.formvitalsign.systolic_pressure = localStorage.getItem("systolic_pressure");
                      setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                      break;
                  }
                }
              break;

              case "dias":
                if (content["valor"] != "") {
                  switch (content["valor"]) {
                    case "b":
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      this.attempts -= 1; 
                      switch (this.attempts) {
                        case 2:
                          this.genericAlert("error", "Presión arterial", "¡Brazalete mal colocado, asegúrate de que esté debidamente ajustado! Te quedan 2 intentos."); 
                          this.disabledButton = false;
                          this.snackBarWait = false;
                          break;
                        case 1:
                          this.genericAlert("error", "Presión arterial", "¡Brazalete mal colocado, asegúrate de que esté debidamente ajustado! Te queda 1 intento.");  
                          this.disabledButton = false;
                          this.snackBarWait = false;
                          break;
                        case 0:
                          this.genericAlert("error", "Presión arterial", "¡Brazalete mal colocado, asegúrate de que esté debidamente ajustado! Por favor, continúa.");
                          this.disabledButton = false;
                          this.snackBarWait = false;
                          this.attempts = 3;
                          break;
                        default:
                          break;
                      }
                    break;
                  default:
                    this.dialogLoadingVitalSign = true;
                    this.vitalSignDescription = "Presión Sistólica y Diastólica";
                    localStorage.setItem("diastolic_pressure", content["valor"]);
                    this.formvitalsign.diastolic_pressure = localStorage.getItem("diastolic_pressure");
                    this.snackBarWait = false;
                    this.attempts = 3;
                    setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                    break;
                  }
                }
              break;

              case "height":
                if (content["valor"] != "") {
                  switch (content["valor"]) {
                    case "error":
                      this.disabledButton = false;
                      this.snackBarWait = false; 
                      this.attempts -= 1;
                      switch (this.attempts) {
                        case 2:
                          this.genericAlert("error", "Altura", "¡Algo ha salido mal, intenta de nuevo! Te quedan 2 intentos.");     
                          this.disabledButton = false;
                          this.snackBarWait = false;
                          break;
                        case 1:
                          this.genericAlert("error", "Altura", "¡Algo ha salido mal, intenta de nuevo! Te queda 1 intento.");   
                          this.disabledButton = false;
                          this.snackBarWait = false;
                          break;
                        case 0:
                          this.genericAlert("error", "Altura", "¡Algo ha salido mal, ya no te quedan intentos! Por favor, continúa");      
                          this.snackBarWait = false;
                          this.attempts = 3;
                          setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                          break;
                        default:
                          break;
                      }
                      break;
                    default:
                      this.dialogLoadingVitalSign = true;
                      this.vitalSignDescription = "Altura"; 
                      if (content["valor"] > 100) {
                        content["valor"] = content["valor"] / 100;
                        this.formvitalsign.height = content["valor"];
                        this.formvitalsign.height = this.formvitalsign.height.toFixed(2).toString()
                        this.parsedSVHeight = content["valor"].toFixed(2) + " m"; 
                        localStorage.setItem("height", content["valor"].toFixed(2));
                        this.formvitalsign.height = localStorage.getItem("height");
                        this.snackBarWait = false;
                        this.attempts = 3;
                        if(typeof(this.formvitalsign.weight) === 'string'){
                          let conversion = (this.formvitalsign.weight / 2.20462262).toFixed(2);
                          this.imc = (conversion / Math.pow(this.formvitalsign.height, 2)).toFixed(2);
                          localStorage.setItem("imc", this.imc);
                          this.imc = localStorage.getItem("imc");
                        }
                        setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                      } else {
                        this.formvitalsign.height = content["valor"];
                        localStorage.setItem("height", content["valor"]);
                        this.formvitalsign.height = localStorage.getItem("height");
                        this.parsedSVHeight = content["valor"]; 
                        this.snackBarWait = false;
                        this.attempts = 3;
                        if(typeof(this.formvitalsign.weight) === 'string'){
                          let conversion = (this.formvitalsign.weight / 2.20462262).toFixed(2);
                          this.imc = (conversion / Math.pow(this.formvitalsign.height, 2)).toFixed(2);
                          localStorage.setItem("imc", this.imc);
                          this.imc = localStorage.getItem("imc");
                        }
                        setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                      }
                      break;
                  }
                } 
              break; 
            default:
              break;
          } 
          switch (content["type"]) {
            case 'dpi':
              this.gid = content['dpi_info']; 
              this.buttonsBlocked = false;
              localStorage.setItem('dpi', this.gid)
              this.createOrSearchPatient(); 
              this.form1.government_id = this.gid;
              break;

            case "alarm":    
 
            if (content["esteto_id"] != undefined) {
              this.stethoId = content["esteto_id"];
              localStorage.setItem('esteto_id', this.stethoId)
              console.log(this.stethoId, ' stetho id '); 
            }

            this.listenS = true;
            if (content["outOfservice-ev"] == "on") { 
              let timerInterval;
               this.$swal({
                icon: "warning",
                title: "Cabina",
                text: "La cabina experimentó un error en el sistema. La llamada no conectará y se finalizará automáticamente.",  
                timer: 15000,
                timerProgressBar: true,
                didOpen: () => {
                  this.$swal.showLoading();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                this.openCabin()
                this.activateReceipt()  
                this.finishCallPatient() 
                this.changeStatusOfCall()
                return result;
              });
               
            }
            if('volEst' in content){
              this.snackbarVar = true;
              this.textVol = content["volEst"] 
              this.sthetoMinVol = false;
              this.sthetoUpVol = false;
              this.sthetoSaveVol = false; 
            }
              switch (content["esteto"]) { 
                case "EstetoAvailable": 
                  this.sthetoAvailable = true;
                  localStorage.setItem("estetoAvailable", true)
                  this.sthetoAvailable = JSON.parse(localStorage.getItem("estetoAvailable")) == true;
                break;
                case "START":
                  this.genericAlert("success", "Estetoscopio", "¡Se ha iniciado la grabación!")
                  break;
                case "done":
                  this.genericAlert("success", "Estetoscopio", "¡Audio grabado correctamente!")
                  this.textSteto = "Grabar";
                  this.recordStethoText = "Grabar";
                  this.recordStethoIcon = "mdi-record-rec"
                  this.record = !this.record; 
                  break;
                case "error":
                  this.genericAlert("error", "Estetoscopio", "¡No se ha podido grabar el audio!")
                  this.textSteto = "Grabar";
                  this.recordStethoText = "Grabar";
                  this.recordStethoIcon = "mdi-record-rec"
                  this.record = !this.record;
                  break;
                default:
                  break;
              }
              switch (content["esfigmo"]) {
                case "EsfigmoAvailable":
                  this.esfigmoAvailable = true;
                  localStorage.setItem("esfigmoAvailable", true)
                  this.esfigmoAvailable = JSON.parse(localStorage.getItem("esfigmoAvailable")) == true;
                  break;
                default:
                  break;
              }
              switch (content["mic"]) {
                case "esteto":
                  this.genericAlert("success", "Micrófono", "¡Se ha cambiado al estetoscopio!")
                  break;
                case "cámara":
                  this.genericAlert("success", "Micrófono", "¡Se ha cambiado al audio de cabina!")
                  break;
                case "error":
                  this.genericAlert("error", "Micrófono", "¡No se ha podido cambiar el micrófono!")
                  this.estetoR = ! this.estetoR;
                  break;
                default:
                  break;
              }
              switch (content["door"]) {
                case "open":
                  this.statusDoor = true;
                  this.doorOpened = true;
                  this.doorClosed = false;
                  break;
                case "close":
                  this.statusDoor = true;
                  this.doorOpened = false;
                  this.doorClosed = true;
                  break;
                default:
                  break;
              }
              switch (content["scan"]) {
                case "done":
                  this.scanDone = true;
                  this.scanAg = true;
                  this.turnOnScanVar = false;
                  this.newScan = false;
                  this.buttonsScan = true;
                  this.waitingScanVar = false;
                  break;
                case "error":
                  this.scanError = true;
                  this.turnOnScanVar = false;
                  this.newScan = false;
                  this.buttonsScan = true;
                  if (this.nscanAg) {
                    this.newScan = true;
                  } else {
                    this.scanAg = true;
                  }
                  this.waitingScanVar = false;
                  break;
                case "saved":
                  this.scanDone = false;
                  this.waitingScanVar = false;
                  this.buttonsScan = true;
                  this.showScanResult = true;
                  this.scanAg = false;
                  this.getScans()
                  break; 
                case "413":
                  this.scanSize = content["scan_size"] 
                  this.genericAlert("error", "Escaner", `El archivo ha superado el límite de tamaño ${this.scanSize} MB`);  
                  this.waitingScanVar = false;
                  this.buttonsScan = true;
                  this.scanAg = false;
                  this.newScan = true;
                  this.showScanResult = false;
                  break;
                case "400":
                case "http":
                  this.genericAlert("error", "Escaner", "Error en los servidores"); 
                  this.waitingScanVar = false;
                  this.newScan = true;
                  this.showScanResult = false;
                  break;
                default:
                  break;
              }
              switch (content["scanOn"]) {
                case "done":
                  this.scanOnDone = true;
                  this.turnOnScanVar = false;
                  this.newScan = true;
                  this.turningOnScan = false;
                  break;
                case "error":
                  this.turnOnScanVar = true;
                  break;
                default:
                  break;
              }
              if (content["vol"]) {
                this.snackbarVar = true;
                this.textVol = content["vol"];
                this.disabledButtonVolMin = false;
                this.disabledButtonVolUp = false;
              }
              break;
            default:
              break; 
          }
        };
      } catch (error) {
        return error;
      }
    },


    loadInformationSocket(){
      try {
        // socket.emit('subscribe', this.channel);
        socket.on('message', (data) => {
        let content = data;
        if ("message" in content && "senderId" in content) {
          if (data.senderId !== socket.id) return;
          content = JSON.parse(content["message"]);
        } 


        switch (content["call"]) {
          case "start-call":
            this.getCall();
            this.startCall();
            if(this.videoBlocked){
              this.videoBlocked = false
            }
            localStorage.setItem("callStarted", true)
            localStorage.setItem("waitCall", false)
            localStorage.setItem("cardBlocked", true)
            this.callStarted = JSON.parse(localStorage.getItem("callStarted")) === true; 
            this.waitingCall = JSON.parse(localStorage.getItem("waitCall")) === true; 
            this.cardBlocked = JSON.parse(localStorage.getItem("cardBlocked")) === true;
            this.createOrSearchPatient() 
            break;
        }

        switch (content["vs"]) { 
          case "Weight":
            if (content["valor"] != "") {
              switch (content["valor"]) {
                case "error":
                  this.genericAlert("error", "Peso", "¡Algo ha salido mal, intenta de nuevo!");    
                  this.disabledButton = false;
                  this.snackBarWait = false;  
                  break; 
                default:
                  this.dialogLoadingVitalSign = true;
                  this.vitalSignDescription = "Peso";
                  this.snackBarWait = false;
                  this.attempts = 3;
                  localStorage.setItem("weight", content["valor"]);
                  this.formvitalsign.weight = localStorage.getItem("weight");
                  if(typeof(this.formvitalsign.height) === 'string'){
                    let conversion = (this.formvitalsign.weight / 2.20462262).toFixed(2);
                    this.imc = (conversion / Math.pow(this.formvitalsign.height, 2)).toFixed(2);
                    localStorage.setItem("imc", this.imc);
                    this.imc = localStorage.getItem("imc");
                  }
                  setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                  break;
              }
            }
            break;
          case "bpm":
              if (content["valor"] != "") {
                switch (content["valor"]) {
                  case "error":
                    this.disabledButton = false;
                    this.snackBarWait = false;
                    break; 
                    case "Mal":
                      break;
                    case "Obj":
                      break;
                  default:
                    this.dialogLoadingVitalSign = true;
                    this.snackBarWait = false;
                    this.attempts = 3;
                    localStorage.setItem("heart_rate", content["valor"]);
                    this.formvitalsign.heart_rate = localStorage.getItem("heart_rate");
                    setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                    break;
                }
              }
            break;
          case "SpO2":
            if (content["valor"] != "") {
              switch (content["valor"]) {
                case "error":
                  this.disabledButton = false;
                  this.snackBarWait = false;
                  this.attempts -= 1; 
                  switch (this.attempts) {
                    case 2:
                      this.genericAlert("error", "Oximetría", "¡Algo ha salido mal, intenta de nuevo! Te quedan 2 intentos.");     
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 1:
                      this.genericAlert("error", "Oximetría", "¡Algo ha salido mal, intenta de nuevo! Te queda 1 intento.");      
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 0:
                      this.genericAlert("error", "Oximetría", "¡Algo ha salido mal, ya no te quedan intentos! Por favor, continúa.");      
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      this.attempts = 3;
                      break;
                    default:
                      break;
                  }
                  break;
                default: 
                  this.dialogLoadingVitalSign = true;
                  this.snackBarWait = false;
                  this.attempts = 3;
                  this.vitalSignDescription = "Frecuencia cardiaca y Oxígeno";
                  localStorage.setItem("oxygen", content["valor"]);
                  this.formvitalsign.oxygen = localStorage.getItem("oxygen");
                  setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                  break;
              }
            }              
            break;
          case "tmp":
            if (content["valor"] != "") {
              switch (content["valor"]) {
                case "error":
                  this.disabledButton = false;
                  this.snackBarWait = false;
                  this.attempts -= 1; 
                  switch (this.attempts) {
                    case 2:
                      this.genericAlert("error", "Temperatura", "¡Algo ha salido mal, intenta de nuevo! Te quedan 2 intentos.");  
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 1:
                      this.genericAlert("error", "Temperatura", "¡Algo ha salido mal, intenta de nuevo! Te queda 1 intento."); 
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 0:
                      this.genericAlert("error", "Temperatura", "¡Algo ha salido mal, ya no te quedan intentos! Por favor, continúa.");  
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      this.attempts = 3;
                      break;
                    default:
                      break;
                  }
                  break;
                default:
                  this.dialogLoadingVitalSign = true;
                  this.vitalSignDescription = "Temperatura";
                  this.snackBarWait = false;
                  this.attempts = 3;
                  localStorage.setItem("temperature", content["valor"]);
                  this.formvitalsign.temperature = localStorage.getItem("temperature");
                  setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000); 
                  break;
              }
            }              
            break;
          case "sis": 
            if (content["valor"] != "") {
              switch (content["valor"]) {
                case "b":
                    this.disabledButton = false;
                    this.snackBarWait = false;
                  break;
                default:
                  this.snackBarWait = false;
                  this.attempts = 3;
                  localStorage.setItem("systolic_pressure", content["valor"]);
                  this.formvitalsign.systolic_pressure = localStorage.getItem("systolic_pressure");
                  setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                  break;
              }
            }
            break;
          case "dias":
            if (content["valor"] != "") {
              switch (content["valor"]) {
                case "b":
                  this.disabledButton = false;
                  this.snackBarWait = false;
                  this.attempts -= 1; 
                  switch (this.attempts) {
                    case 2:
                      this.genericAlert("error", "Presión arterial", "¡Brazalete mal colocado, asegúrate de que esté debidamente ajustado! Te quedan 2 intentos."); 
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 1:
                      this.genericAlert("error", "Presión arterial", "¡Brazalete mal colocado, asegúrate de que esté debidamente ajustado! Te queda 1 intento.");  
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 0:
                      this.genericAlert("error", "Presión arterial", "¡Brazalete mal colocado, asegúrate de que esté debidamente ajustado! Por favor, continúa.");
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      this.attempts = 3;
                      break;
                    default:
                      break;
                  }
                break;
              default:
                this.dialogLoadingVitalSign = true;
                this.vitalSignDescription = "Presión Sistólica y Diastólica";
                localStorage.setItem("diastolic_pressure", content["valor"]);
                this.formvitalsign.diastolic_pressure = localStorage.getItem("diastolic_pressure");
                this.snackBarWait = false;
                this.attempts = 3;
                setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                break;
              }
            }
            break;
          case "height":
            if (content["valor"] != "") {
              switch (content["valor"]) {
                case "error":
                  this.disabledButton = false;
                  this.snackBarWait = false; 
                  this.attempts -= 1;
                  switch (this.attempts) {
                    case 2:
                      this.genericAlert("error", "Altura", "¡Algo ha salido mal, intenta de nuevo! Te quedan 2 intentos.");     
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 1:
                      this.genericAlert("error", "Altura", "¡Algo ha salido mal, intenta de nuevo! Te queda 1 intento.");   
                      this.disabledButton = false;
                      this.snackBarWait = false;
                      break;
                    case 0:
                      this.genericAlert("error", "Altura", "¡Algo ha salido mal, ya no te quedan intentos! Por favor, continúa");      
                      this.snackBarWait = false;
                      this.attempts = 3;
                      setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                      break;
                    default:
                      break;
                  }
                  break;
                default:
                  this.dialogLoadingVitalSign = true;
                  this.vitalSignDescription = "Altura"; 
                  if (content["valor"] > 100) {
                    content["valor"] = content["valor"] / 100;
                    this.formvitalsign.height = content["valor"];
                    this.formvitalsign.height = this.formvitalsign.height.toFixed(2).toString()
                    this.parsedSVHeight = content["valor"].toFixed(2) + " m"; 
                    localStorage.setItem("height", content["valor"].toFixed(2));
                    this.formvitalsign.height = localStorage.getItem("height");
                    this.snackBarWait = false;
                    this.attempts = 3;
                    if(typeof(this.formvitalsign.weight) === 'string'){
                      let conversion = (this.formvitalsign.weight / 2.20462262).toFixed(2);
                      this.imc = (conversion / Math.pow(this.formvitalsign.height, 2)).toFixed(2);
                      localStorage.setItem("imc", this.imc);
                      this.imc = localStorage.getItem("imc");
                    }
                    setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                  } else {
                    this.formvitalsign.height = content["valor"];
                    localStorage.setItem("height", content["valor"]);
                    this.formvitalsign.height = localStorage.getItem("height");
                    this.parsedSVHeight = content["valor"]; 
                    this.snackBarWait = false;
                    this.attempts = 3;
                    if(typeof(this.formvitalsign.weight) === 'string'){
                      let conversion = (this.formvitalsign.weight / 2.20462262).toFixed(2);
                      this.imc = (conversion / Math.pow(this.formvitalsign.height, 2)).toFixed(2);
                      localStorage.setItem("imc", this.imc);
                      this.imc = localStorage.getItem("imc");
                    }
                    setTimeout(() => (this.dialogLoadingVitalSign = false, this.disabledButton = false), 4000);  
                  }
                  break;
              }
            } 
            break; 
          default:
            break;
        }

        switch (content["type"]) {
          case 'dpi':
            this.gid = content['dpi_info'];
            localStorage.setItem('dpi', this.gid)
            this.createOrSearchPatient(); 
            break;
          case "alarm":    
            if (content["outOfservice-ev"] == "on") { 
              let timerInterval;
              this.$swal({
                icon: "warning",
                title: "Cabina",
                text: "La cabina experimentó un error en el sistema. La llamada no conectará y se finalizará automáticamente.",  
                timer: 15000,
                timerProgressBar: true,
                didOpen: () => {
                  this.$swal.showLoading();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                this.openCabin()
                this.activateReceipt()  
                this.finishCallPatient() 
                this.changeStatusOfCall()
                return result;
              });
              
            }
            if('volEst' in content){
              this.snackbarVar = true;
              this.textVol = content["volEst"] 
              this.sthetoMinVol = false;
              this.sthetoUpVol = false;
              this.sthetoSaveVol = false; 
            }
            switch (content["esteto"]) {  
              case "EstetoAvailable": 
                this.sthetoAvailable = true;
                localStorage.setItem("estetoAvailable", true)
                this.sthetoAvailable = JSON.parse(localStorage.getItem("estetoAvailable")) == true;
              break;
              case "START":
                this.genericAlert("success", "Estetoscopio", "¡Se ha iniciado la grabación!")
                break;
              case "done":
                this.genericAlert("success", "Estetoscopio", "¡Audio grabado correctamente!")
                this.textSteto = "Grabar";
                this.recordStethoText = "Grabar";
                this.recordStethoIcon = "mdi-record-rec"
                this.record = !this.record;
                break;
              case "error":
                this.genericAlert("error", "Estetoscopio", "¡No se ha podido grabar el audio!")
                this.textSteto = "Grabar";
                this.recordStethoText = "Grabar";
                this.recordStethoIcon = "mdi-record-rec"
                this.record = !this.record;
                break;
              default:
                break;
            }
            switch (content["esfigmo"]) {
              case "EsfigmoAvailable":
                this.esfigmoAvailable = true;
                localStorage.setItem("esfigmoAvailable", true)
                this.esfigmoAvailable = JSON.parse(localStorage.getItem("esfigmoAvailable")) == true;
                break;
              default:
                break;
            }
            switch (content["mic"]) {
              case "esteto":
                this.genericAlert("success", "Micrófono", "¡Se ha cambiado al estetoscopio!")
                break;
              case "cámara":
                this.genericAlert("success", "Micrófono", "¡Se ha cambiado al audio de cabina!")
                break;
              case "error":
                this.genericAlert("error", "Micrófono", "¡No se ha podido cambiar el micrófono!")
                this.estetoR = ! this.estetoR;
                break;
              default:
                break;
            }
            switch (content["door"]) {
              case "open":
                this.statusDoor = true;
                this.doorOpened = true;
                this.doorClosed = false;
                break;
              case "close":
                this.statusDoor = true;
                this.doorOpened = false;
                this.doorClosed = true;
                break;
              default:
                break;
            }
            switch (content["scan"]) {
              case "done":
                this.scanDone = true;
                this.scanAg = true;
                this.turnOnScanVar = false;
                this.newScan = false;
                this.buttonsScan = true;
                this.waitingScanVar = false;
                break;
              case "error":
                this.scanError = true;
                this.turnOnScanVar = false;
                this.newScan = false;
                this.buttonsScan = true;
                if (this.nscanAg) {
                  this.newScan = true;
                } else {
                  this.scanAg = true;
                }
                this.waitingScanVar = false;
                break;
              case "saved":
                this.scanDone = false;
                this.waitingScanVar = false;
                this.buttonsScan = true;
                this.showScanResult = true;
                this.scanAg = false;
                break; 
              case "413":
                this.scanSize = content["scan_size"] 
                this.genericAlert("error", "Escaner", `El archivo ha superado el límite de tamaño ${this.scanSize} MB`);  
                this.waitingScanVar = false;
                this.buttonsScan = true;
                this.scanAg = false;
                this.newScan = true;
                this.showScanResult = false;
                break;
              case "400":
              case "http":
                this.genericAlert("error", "Escaner", "Error en los servidores"); 
                this.waitingScanVar = false;
                this.newScan = true;
                this.showScanResult = false;
                break;
              default:
                break;
            }
            switch (content["scanOn"]) {
              case "done":
                this.scanOnDone = true;
                this.turnOnScanVar = false;
                this.newScan = true;
                this.turningOnScan = false;
                break;
              case "error":
                this.turnOnScanVar = true;
                break;
              default:
                break;
            }
            if (content["vol"]) {
              this.snackbarVar = true;
              this.textVol = content["vol"];
              this.disabledButtonVolMin = false;
              this.disabledButtonVolUp = false;
            }
            break;
          default:
            break; 
        }
      }) 
      } catch (error) {
        return error; 
      }
    },

    createConsultation() {
      this.getConsultations(); 
      this.consultation_form.patient = localStorage.getItem("id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/`;
      axios
        .post(path, {
          name: moment(new Date()).format( "YYYY/MM/DD h:mm a" ),
          active: true,
          patient: this.patient,
          cabin: this.cabinId,
        }, { headers })
        .then((response) => {   
          axios.patch(`${API_URL}api/cabin/pos/call-timer/${this.callId}/`, {
            "consultation": response.data.id,
          }, {headers}).then((responseCall) => { 
          return responseCall.data;
        })
        .catch((error) => {
          return error;
        });

          localStorage.setItem("consultation_Id", response.data.id);
          localStorage.setItem("consul_name", response.data.name);
          localStorage.setItem("step", 1);
          var consultation = localStorage.getItem("consultation_Id");
          this.form.consultation = consultation;
          this.consultationId = localStorage.getItem("consultation_Id"); 
          (this.consultationName = response.data.name), this.showSnackbar();
          setTimeout(
            () => this.redirectConsult(response.data.id, response.data.name),
            1000
          );
          setTimeout(() => (this.snackbar = false), 3000);
          this.overlay = !this.overlay;
          this.dialog21 = false;
          this.e7 = 1;
          localStorage.setItem("keep-step", "keep-s");
          this.sendConsultId(response.data.id);
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    },

    sendConsultId(consultId){
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/upload/send-consult-id/`;
      axios.post(path, {
        "cabin": this.cabinId,
        "consult_id": consultId
      }, {headers}).then((response) => {
        return response.data;
      }).catch((e)=>{
        return e;
      })
    },

    async getConsultation() {
      let consultaId = localStorage.getItem("consultation_Id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/consultations/consultations/${consultaId}/`;
      await axios.get(path, { headers }).then((response) => {
          this.form.consultation = response.data.id;
          this.formvitalsign.consultation = response.data.id;
          this.appointmentForm.consultation = response.data.id;
          this.appointmentForm.patient = response.data.patient;
        })
        .catch((error) => {
          return error;
        });
    },

    showSnackbar2() {
      this.snackbar2 = true;
    },

    async changeStatus() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/staff/assistant/${this.idAssistnt}/`;
      await axios.patch(path, { "is_busy": false, "online": true }, { headers }).then((res) => {
          window.location.reload();
          return res.data;
        }).catch((err) => {
          return err;
        });
    },

    async changeStatusOfCall() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path2 = `${API_URL}api/cabin/pos/call-timer/${this.callId}/`;
      var time_to_parse = this.time.substring(0, 2);
      var timer_parsed = parseInt(time_to_parse);
      await axios.patch(
          path2,
          {
            duration: this.time,
            timestamp: Date(),
            status: 2,
            cabin: this.cabinId,
            minutes: timer_parsed,
            assistant: this.idAssistnt,
          },
          { headers }
        ).then((response) => {
          localStorage.removeItem("callStartedAgora");
          localStorage.removeItem("activateCallInfo");
          localStorage.removeItem("callStarted"); 
          localStorage.removeItem("weight"); 
          localStorage.removeItem("oxygen"); 
          localStorage.removeItem("heart_rate"); 
          localStorage.removeItem("temperature"); 
          localStorage.removeItem("systolic_pressure"); 
          localStorage.removeItem("diastolic_pressure"); 
          localStorage.removeItem("height"); 
          localStorage.removeItem("imc");  
          this.endingCall = true;
          this.isSeguimiento = null;
          this.proflePicP = "";
          this.nameP = "";
          this.apellidoP = "";
          this.genderP = null;
          this.ageP = "";
          this.changeStatus();
          this.$router.push(
            `/dashboard/assistant-${this.idAssistnt}/ent-${this.form1.entity}`
          );
          return response.data;
        }).catch((error) => {
          return error;
        });
    },

    async turnOnScan() {
      let consultaId = localStorage.getItem("consultation_Id");
   
      this.turnOnScanText = "Encendiendo escaner..."
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/turn-on-scan/${consultaId}/`;
      if(this.turningOnScan == false){
        await axios.patch(
          path,
          {
            consultation: consultaId,
          },
          { headers }
        ).then((response) => {
          if (response.status == 200) {
            this.genericAlert("success", "Escanner", "¡Se ha enviado la solicitud!"); 
          }
          this.turningOnScan = true;
        }).catch((error) => {
          this.genericAlert("error", "Escanner", "¡No se ha podido enviar la solicitud!"); 
          return error;
        });
      }

    },

    scan() {
      this.waitingMessage = "Escaneando...";
      let consultaId = localStorage.getItem("consultation_Id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/upload/scans/`;
      axios.post(
          path,
          {
            image: null,
            created_at: new Date().toISOString().concat("T00:00:00Z"),
            updated_at: new Date().toISOString().concat("T00:00:00Z"),
            consultation: consultaId,
          },
          { headers }
        ).then((response) => {
          this.dialogValidate = false;
          this.idScan = response.data.id;
          this.newScan = false; 
          this.waitingScanVar = true;
          this.turnOnScanVar = false;
          this.genericAlert("success", "Escanner", "¡Se envió la solicitud para escanear!"); 
          return response.data;
        }).catch((error) => { 
          this.newScan = true;
          return error;
        });
    }, 

    scanAgain() {
      let consultaId = localStorage.getItem("consultation_Id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/upload/scans-again/${this.idScan}/`;
      axios.patch(
          path,
          {
            image: null,
            created_at: new Date().toISOString().concat("T00:00:00Z"),
            updated_at: new Date().toISOString().concat("T00:00:00Z"),
            consultation: consultaId,
          },
          { headers }
        ).then((response) => {
          this.dialogValidate = false;
          this.buttonsScan = false;
          this.scanAg = false;
          this.waitingScanVar = true;
          this.nscanAg = false;
          this.genericAlert("success", "Escanner", "¡Se envió la solicitud para escanear!");  
          return response.data;
        }).catch((error) => {
          return error;
        });
    },

    saveScan() {
      this.waitingMessage = "Guardando...";
      let consultaId = localStorage.getItem("consultation_Id");
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/upload/scans/${this.idScan}/`;
      axios.patch(
          path,
          {
            image: null,
            created_at: new Date().toISOString().concat("T00:00:00Z"),
            updated_at: new Date().toISOString().concat("T00:00:00Z"),
            consultation: consultaId,
          },
          { headers }
        ).then((response) => {
          this.dialogValidate = false;
          this.waitingScanVar = true;
          this.buttonsScan = false;
          this.genericAlert("success", "Escanner", "¡Se envió la solicitud!"); 
          return response.data;
        }).catch((error) => {
          return error;
        });
    },

    showScan() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/upload/scans/${this.idScan}/`;
      axios.get(path, { headers }).then((response) => {
        //this.newScan = true;
        //this.showScanResult = false;
        this.imageScan = response.data.image;
        window.open(this.imageScan, "_blank");
        return response.data;
      })
      .catch((err) => {
        return err;
      });
    },
 
    async getConsultations() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/consultations/`;
      await axios.get(path, { headers }).then((response) => {
          this.consultations = response.data;
          this.filteredConsultations = this.consultations.filter(
            (consultation) => consultation.patient == this.patientId
          );
        })
        .catch((error) => {
          return error;
        });
    },
  
    showSnackbar() {
      this.snackbar = true;
    }, 
 
     getCabin() { 
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/cabin/${this.cabinId}/`;
       axios.get(path, {headers}).then((response) => { 
          this.form1.cabin = response.data.id;
          this.form1.entity = response.data.entity; 
          this.cabinLocation = response.data.location;
          return response.data;
        }).catch((error) => {
          return error;
        });
    },

    async finishCallPatient() {
      localStorage.removeItem("dpi"); 
      
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/pos/finish-call/${this.cabinId}/`;
      let formData = new FormData();
      
      formData.append("receipt_nit", "CF");
      await axios.patch(path, formData, { headers }).then((response) => {
        localStorage.removeItem("step");
          localStorage.removeItem("e1");
          localStorage.removeItem("e6");
          localStorage.removeItem("e7");
          localStorage.removeItem("consultation_Id");
          localStorage.removeItem("dpi"); 
          localStorage.removeItem("esteto_id");  
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
 
    showLoading() {
      setTimeout(
        function () {
          this.dialog3 = !this.dialog3;
        }.bind(this),
        4000
      );
      this.dialog3 = !this.dialog3;
    },

    async redirectConsult(id, name) {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/consultations/tracing/${id}/`;

      await axios.patch(
          path,
          {
            name: name,
          },
          { headers }
        )
        .then((res) => {
          this.consultationId = id;
          this.consultationName = name; 
          localStorage.setItem("consultation_Id", id);
          localStorage.setItem("consul_name", name); 
          this.dialog21 = false;
          this.step = 2; 
          this.e7 = 1;
          localStorage.setItem("keep-step", "keep-s");
          localStorage.setItem("step", 1);
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    },

 
  },
};
</script>

<style scoped>
.fixed-video {
  position: fixed;
  top: 50px;
  width: 40%;
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
  margin-top: -5px !important;
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

.v-sheet .v-stepper {
  box-shadow: none !important;
  margin: 0px;
}

.scroll {
  overflow-y: scroll;
}

.v-stepper--vertical {
  padding-bottom: 25px;
}

.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: transparent;
  border: 5px solid #ade2f8 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 5px 10px #b4dff2 !important;
  border-radius: 15px !important;
}

/* .v-responsive {
  max-width: 30% !important;
} */

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

#clock {
  order: 0;
  flex: 0 1 auto;
  align-self: center;

  color: #000000;
  text-shadow: 0px 0px 25px #9bc4e9;
}

.v-sheet--offset {
  top: -64px;
  position: relative;
}
.header-port {
  border-radius: 0.75rem;
}
.header-fix {
  width: 100%; /* hacemos que la cabecera ocupe el ancho completo de la página */
  left: 0; /* Posicionamos la cabecera al lado izquierdo */
  top: 0; /* Posicionamos la cabecera pegada arriba */
  position: fixed; /* Hacemos que la cabecera tenga una posición fija */
  z-index: 2000 !important;
}

border {
  border-style: solid;
  border-color: grey;
  border-width: thin;
}
.round {
  border-radius: 50%;
}

.mytabs  [role="tab"]{
  justify-content: flex-start;
}
</style>