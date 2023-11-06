<template>
  <v-app>
    <div>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
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
        <div v-show="this.speedtest != 0">
          <v-alert
            v-if="this.speedtest < 5"
            outlined
            shaped
            class=" pa-1 px-4"
            icon="mdi-wifi-alert"
            type="warning"
          >
            <pre>Inestable</pre>
          </v-alert>
          <v-alert
            v-else
            outlined
            shaped
            class=" pa-1 px-4"
            icon="mdi-wifi"
            type="success"
          >
            <pre>Conectado</pre>
          </v-alert>
        </div>
      </v-toolbar>
    </div>
    <div class="wrapper meeting mt-10">
      <div class="text-center">
        <v-dialog v-model="dialogClose" width="400">
          <v-card>
            <v-card-title class="title white--text red lighten-1">
              Llamada no disponible.
            </v-card-title>
            <div class="ml-5 mt-5 mb-5">
              <v-btn
                color="red lighten-1"
                class="white--text"
                @click="reload2()"
                large
              >
                Aceptar
              </v-btn>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-layout row>
        <v-flex md8>
          <v-container class="md-15 ml-8">
            <v-row class="px-4">
              <v-col cols="12" sm="4">
                <v-card outlined class="py-1 py-sm-0" elevation="">
                  <v-row>
                    <v-col cols="8">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="mb-4">
                            <v-btn
                              fab
                              class="white--text headline font-weight-bold"
                              color="#6c5a8e"
                              elevation="0"
                            >
                              {{ assistant.calls }}
                            </v-btn>
                          </div>
                          <v-list-item-subtitle
                            class="black--text font-weight-bold"
                            >LLamadas atendidas</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="4">
                      <v-avatar size="90" class="ml-n10 mt-2" tile>
                        <v-img
                          src="https://freesvg.org/img/1520566908.png"
                        ></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" sm="4">
                <v-card @click="docTakeCallView()" color="" outlined class="py-1 py-sm-0" elevation="">
                  <v-row>
                    <v-col cols="8">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="mb-4">
                            <v-btn
                              fab
                              class="white--text headline font-weight-bold"
                              color="#6c4769"
                              elevation="0" 
                            >
                              {{ assistant.today_calls }}</v-btn
                            >
                          </div>
                          <v-list-item-subtitle
                            class="black--text font-weight-bold"
                            >Llamadas de hoy</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="4">
                      <v-avatar size="90" class="ml-n10 mt-2" tile>
                        <v-img
                          src="https://freesvg.org/img/1520566908.png"
                        ></v-img>
                      </v-avatar>
                    </v-col>
                    
                  </v-row>
                </v-card>
              </v-col>
              
            </v-row>
             
            <div v-if="getAssistantCalls.length > 0">
              <v-flex>
                <v-list class="mt-5">
                  <v-list-item>
                    <v-list-item-title class="black-text headline"
                      >Llamadas recientes</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-flex>
              <v-card outlined class="mr-5 ml-5">
                <v-simple-table fixed-header>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left black-text title font-weight-bold">
                          No.
                        </th>
                        <th class="text-left black-text title font-weight-bold">
                          Cabina
                        </th>
                        <th class="text-left black-text title font-weight-bold">
                          Ubicación
                        </th>
                        <th class="text-left black-text title font-weight-bold">
                          Empresa
                        </th>
                        <th class="text-left black-text title font-weight-bold">
                          Fecha
                        </th>
                        <th class="text-left black-text title font-weight-bold">
                          Tiempo de llamada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in getAssistantCalls.slice(0, 5)"
                        :key="item.name"
                      >
                        <td class="text-left grey-text subtitle-1">
                          {{ i + 1 }}
                        </td>
                        <td class="text-left grey-text subtitle-1">
                          {{ item.cabin_name }}
                        </td>
                        <td class="text-left grey-text subtitle-1">
                          {{ item.cabin_location }}
                        </td>
                        <td class="text-left grey-text subtitle-1">
                          {{ item.cabin_entity }}
                        </td>
                        <td class="text-left grey-text subtitle-1">
                          {{ item.timestamp.substring(0, 10) }}
                        </td>
                        <td class="text-left grey-text subtitle-1">
                          {{ item.duration }} Min.
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </div>
            <div v-else class="mt-15 mr-10 ml-5">
              <v-alert dense type="info"> Sin llamadas. </v-alert>
            </div>
          </v-container>
        </v-flex>
        <v-flex md4>
          <v-container>
            <v-flex> 
              <v-row justify="center" class="mb-3" no-gutters> 
                <v-menu
                v-model="menu"
                bottom
                right
                transition="scale-transition"
                origin="top left"
                >
                  <template v-slot:activator="{ on }">
                    <v-card outlined width="300" :style=" busyOk ? 'background-color: #FDF1F2; border: 2px solid #E63946;' : 'background-color: #F2FFFE; border: 2px solid #07BEB8;'" v-on="on">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="text-overline mb-4title">
                            {{userType}}
                          </div>
                          <v-list-item-title class="text-h5 mb-1">
                            {{ assistant.first_name }} {{ assistant.last_name }}
                          </v-list-item-title>
                          <v-list-item-subtitle class="subtitle-1">{{entityName}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar 
                          size="80"
                          color="grey"
                        >
                        <v-img :src="assistant.profile_picture"></v-img></v-list-item-avatar>
                      </v-list-item> 
                      <v-card-actions>
                        <v-row justify="center">
                          <div
                            v-if="busyOk"
                            class="ma-2 black--text"
                          >
                            <v-chip color="#E63946" outlined class="ma-2" label>
                              <div class="title">Ocupado</div>
                              <v-icon right dark> mdi-cached </v-icon>
                            </v-chip>
                          </div>
                          <div v-else class="ma-2 black--text">
                            <v-chip outlined color="#07BEB8" class="ma-2" label>
                              <div class="title">Disponible</div>
                              <v-icon right color="#07BEB8"> mdi-cached </v-icon>
                            </v-chip>
                          </div>
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </template>
                  <v-card width="300">
                    <v-list dark>
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img :src="assistant.profile_picture"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title> {{ assistant.first_name }} {{ assistant.last_name }}</v-list-item-title>
                          <v-list-item-subtitle>{{assistant.address}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="menu = false" >
                            <v-icon>mdi-close-circle</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                    <v-list>
                      <v-list-item-group mandatory :color=" busyOk ? 'red' : 'green' " v-model="itemGroup">
                        <v-list-item @click=" changeStatus(false)">
                          <v-list-item-icon>
                            <v-icon color='green'>mdi-circle</v-icon>
                          </v-list-item-icon>
                          <v-list-item-subtitle class="subtitle-1">Disponible</v-list-item-subtitle>  
                        </v-list-item>
                        <v-list-item @click=" changeStatus(true)">
                          <v-list-item-icon>
                            <v-icon color='red'>mdi-circle</v-icon>
                          </v-list-item-icon> 
                        <v-list-item-subtitle class="subtitle-1">Ocupado</v-list-item-subtitle> 
                        </v-list-item> 
                        <v-divider></v-divider>
                        <v-list-item @click.stop="dialog = true">
                          <v-list-item-icon>
                            <v-icon color='black'>mdi-power</v-icon>
                          </v-list-item-icon> 
                        <v-list-item-subtitle class="subtitle-1">Cerrar sesión</v-list-item-subtitle> 
                        </v-list-item> 
                        <v-dialog v-model="dialog" max-width="290">
                          <v-card>
                            <v-card-title class="text-h5">
                              ¿Deseas cerrar sesión?
                            </v-card-title>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="#8F4667" text @click="dialog = false">
                                Cancelar
                              </v-btn>
                              <v-btn
                                color="#8F4667"
                                text
                                @click="(dialog = false), logOutApp()"
                              >
                                Cerrar sesión
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-group> 
                    </v-list>
                  </v-card>
                </v-menu> 
              </v-row>
              <v-row justify="center">
                <v-chip 
                  class="pa-5" 
                  color="#282828"
                  label
                  outlined
                >
                  <v-icon left color="grey">
                    mdi-clock-outline
                  </v-icon>
                 <div class="title grey--text font-weight-medium">{{ clockTime }} - {{ dateTime }}</div>
                </v-chip>
              </v-row> 
              <v-divider class="mr-10 mt-6"></v-divider>  
              <div :key="componentKey" v-if="Object.entries(firstCall).length > 0">
                <div>
                  <v-chip
                    class="ma-2" 
                    color="#07BEB8"
                    label
                    text-color="white"
                  >
                    <v-icon left>
                      mdi-phone
                    </v-icon>
                    Llamadas en espera
                  </v-chip> 
                </div>
                <v-row justify="center">
                  <v-card outlined width="250" class="ml-5 mb-2 mt-3 mr-2 grey darken-3" > 
                    <div class="white--text mt-3 text-center title">
                      Cabina {{firstCall['cabin_id']}}
                    </div>
                    <div class="white--text text-center subtitle-1">
                      {{firstCall['location']}}
                    </div>
                    <v-card-actions>
                      <v-row justify="center" class="mt-1">
                        <div class=" black--text">
                          <v-btn :disabled="busyOk" @click="busyOk  && firstCall['status'] == 1 ? null : changeStatusOfCabin()" color="#07BEB8" small dark class="mb-5 pa-5  box bounce-3" label>
                            <v-icon dark> mdi-phone </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-actions>
                  </v-card> 
                </v-row>
                <v-divider class="mt-5"></v-divider>
                <v-row justify="center" no-gutters   v-for="(item, index) in this.listCalls.slice(1)" v-bind:key="index"  >
                  <v-card outlined width="250" class="ml-5 mb-2 mt-3 mr-2 grey darken-3" > 
                    <div class="white--text mt-3 text-center title">
                      Cabina {{item['cabin_id']}}
                    </div>
                    <div class="white--text text-center subtitle-1">
                      {{item['location']}}
                    </div>
                    <v-card-actions>
                      <v-row justify="center" class="mt-1">
                        <div class=" black--text">
                          <v-btn :disabled="busyOk" color="grey" small dark class="mb-5 pa-5  box bounce-3" label>
                            <v-icon dark> mdi-phone </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-actions>
                  </v-card>  
                </v-row>
              </div> 
             <div v-else>
                <v-row justify="center">
                  <div class="title grey--text mt-6">No hay llamadas en espera</div>
                </v-row>
              </div>
              <!-- <form @submit.prevent="connectSocketIO">
                <button type="submit" :disabled="isLoading">Socket.io</button>
              </form> -->
            </v-flex>
          </v-container>
        </v-flex>
      </v-layout>
      <div>
        <v-dialog
          v-model="dialogTakingCall"
          hide-overlay
          persistent
          width="300"
        >
          <v-card color="#95A5D4" dark>
            <v-card-text>
              Tomando llamada...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-row justify="center">
        <v-dialog
          v-model="stillThere"
          max-width="290"
          persistent
        >
          <v-card>
            <v-card-title class="text-h5 text-center">
              ¿Sigues ahí?
            </v-card-title>
            <v-card-text> 
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                class="title"
                text
                outlined
                @click="statusActive()"
              >
                Sí
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
        <v-overlay :value="overlay" opacity="0.5">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-row justify="center">
          <v-dialog v-model="dialogTakeCallOrNot" persistent max-width="300">
            <v-card>
              <v-card-title
                class="title white--text"
                style="background-color: #284b63"
              >
                Solicitud para atender llamada
              </v-card-title>
              <div class="black--text pb-1 pt-5 pl-5 subtitle-1">
                ¡Hay una llamada que espera ser atendida!
              </div>

              <div class="title text-center pb-7 black--text">
                ¿Deseas atenderla?
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="mb-2 box bounce-3"
                  color="#284b63"
                  dark
                  elevation="0"
                  @click="(dialogTakeCallOrNot = false),  changeStatusOfCabin()"
                >
                  Sí, atender
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogTakeCallDoctor" max-width="500px">
            <v-card class="pa-5 text-center" >
                <div class="text-center pt-5">
                  <span class="grey--text font-weight-bold headline text-center mb-5">{{messageConnectingCall}}</span>
                </div>
                <div class="text-center pb-5">
                  <span class="grey--text font-weight-bold subtitle-1 text-center mb-5">Esto puede tomar algunos minutos.</span>
                </div>
              <v-spacer></v-spacer>
              <div class="text-center mt-3 mb-3">
                <v-progress-circular
                  :size="50"
                  color="#14213d"
                  indeterminate
                ></v-progress-circular>
              </div>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
    <notifications group="doctor" />
  </v-app>
</template>

<script>
import { useSound } from "@vueuse/sound";
import buttonSfx from "../audio/phoning.mp3"; 
import axios from "axios"; 
import { API_URL, TOKEN } from "../global";
import { mapActions, mapGetters, mapMutations} from "vuex";
//import { socket } from "@/socket";
import { reactive } from "vue";

let socket;
export const state = reactive({
  connected: false,
});
// let socket;
//let callTaken = false;
export default {
  setup() {
    const { play, stop } = useSound(buttonSfx);
    return {
      play,
      stop,
    };
  },

  data() {
    return {
      source: 'https://es.wikipedia.org/wiki/Wikipedia:Portada',
      isLoading: false,
      value: "",
      speedtest: 0,
      patientDpi: "",
      dialogTakeCallOrNot: false,
      channel: "",
      baseMode: "avc",
      transcode: "interop",
      codec: "h264",
      attendeeMode: "video",
      videoProfile: "360p_1",
      dialog: false,
      loader: null,
      message: "",
      cabin_location: "",
      cabin_entity: "",
      cabin_entity_name: "",
      cabin_no: "",
      cabinChannel: "",
      aId: this.$route.params.assistantId,
      entId: this.$route.params.entityId,
      assistantId: "",
      assistantIsLunch: false,
      assistantIsBreak: false,
      dialogReload: false,
      dialogClose: false,
      dialogTakingCall: false,
      idCall: "",
      isDemoChannel: false,
      isInstallerChannel: false,
      isTestingChannel: false,
      isOperationsChannel: false,
      counterAssistantsCalls: "",
      counterAssistantsCallsToday: "",
      entityId: "",
      overlay: false,
      typeOfCall: "",
      connection: false,
      busyOk: false,
      dialogNew: false,
      dialogTakeCallDoctor: false,
      attempt: 0,
      redirectCall: false,
      stillThere: false, 
      timeStampCall : "",
      listCalls: [],
      firstCall: {},
      firstC: [],
      messageConnectingCall: "",
      assistantTakingCall: false, 
      changeStatusOfAssistant: false,
      showStillThereAlert: true,
      app_version: "",
      wsConnected: false,
      menu: false, 
      itemGroup: 0,
      componentKey: 0,
      entityName: '',
      userType: '', 
      getCall: true,
      callTaken: false,
      callIdTaken: '',
      cabinIdTaken: '',
      cabinLocation: '',
      callTimestamp: '',
      clockTime: '',
      dateTime: '',
      doctor: '',
      showIframe: false
    };
  },

  computed: { 
    ...mapGetters(["assistant", "getAssistantCalls"]), 
  },

  created() {
    this.overlay = !this.overlay;
    this.aId = localStorage.getItem("idAssistant");
    this.entityId = localStorage.getItem("entity_id");
    this.assistantId = localStorage.getItem("idAssistant");
    this.app_version = localStorage.getItem('app_version')
    // Methods
    this.getAssistant();
    this.getLastCall();
    this.connectWebSocket();
    //this.connectSocketIO();
    this.reload();
    this.fetchAssistant(this.assistantId); 
    this.changeStatusOnInit(); 
    this.changeAppVersionOfAssistant();
    this.getEntity()
    setInterval(() => {
      if (this.dialogTakeCallOrNot === false) {
        if(this.showStillThereAlert){
          this.stillThere= true;  
        }
      }
    }, 900000);  
    setInterval(() => {
      //this.getDownloadSpeed()
      if (this.getCall) { 
        this.getLastCall()
      }
    }, 30000)
  },

  methods: {
    connectSocketIO() {
      // socket.emit('subscribe', this.activeChannel);
      if (this.assistant.first_name != undefined) {
        socket.emit('publish', {
          channel: this.activeChannel,
          message: `set-name:${this.assistant.first_name}${this.assistant.last_name}`
        });
      }
      socket.on('message', (data) => {
        let content = data
        if ("message" in content && "senderId" in content) {
          if (data.senderId !== socket.id) return;
          content = JSON.parse(content["message"]);
        } 
        switch (content["type"]) {
          case "test":
            this.callTaken = true;  
            break;        
          default:
            break;
        }
        if (
          this.busyOk == false &&
          this.assistantIsLunch == false &&
          this.assistantIsBreak == false
        ) {
          switch (content["type"]) {  
            case "alarm":
            if (content["doctor"] == "ack") {
              this.dialogTakeCallDoctor = false;
              this.stop();  	
              let headers = {
                Authorization: `Token ${TOKEN}`,
                "Content-Type": "application/json;charset=utf-8",
              };
              var path2 = `${API_URL}api/cabin/pos/get-call/${this.callIdTaken}/`;
              axios.get(path2, { headers }).then((response) => { 
                if (response.data.assistant != this.aId) { 
                  this.dialogClose = true;
                  this.dialogTakeCallOrNot = false;
                  this.redirectCall = true;
                  this.firstCall = {};
                  this.getLastCall();
                  this.getCall = true;
                } else {   
                  this.firstCall = {};
                  this.postSlackMessage(`Se ha iniciado una llamada en la Cabina de telemedicina (${this.cabinIdTaken}) ubicada en ${this.cabinLocation} a las ${this.fixDateAndHour(Date())} atendida por ${ this.assistant.first_name } ${ this.assistant.last_name }`);
                  setTimeout(() => {
                    this.genericAlert("success", "Llamada conectada", `Cabina No: ${this.cabinIdTaken} Redirigiéndote...`, true, false) 
                  }, 2000); 
                }
              })  
            }
              break; 
            case "notification-call-testing":  
              this.play();  
              this.getLastCall();  
              this.patientDpi = content["patient-dpi"];
              this.stillThere = false; 
              setTimeout(() => {
                this.callIdTaken = localStorage.getItem('call_id');
                this.cabinIdTaken = localStorage.getItem('cabin_t_id'); 
                this.cabinLocation = localStorage.getItem('cabin_location');  
                this.callTimestamp = localStorage.getItem('call_timestamp');  
                this.postSlackMessage(`Ha llegado la notificacion al medico ${this.assistant.first_name} ${this.assistant.last_name} en la cabina ${this.cabinIdTaken} a las ${this.fixDateAndHour(Date())}`);
              }, 1000);
              break;
            case "notification-call-operation":   
              this.play();     
              this.getLastCall();
              setTimeout(() => {
                this.callIdTaken = localStorage.getItem('call_id');
                this.cabinIdTaken = localStorage.getItem('cabin_t_id'); 
                this.cabinLocation = localStorage.getItem('cabin_location');   
                this.postSlackMessage(`Ha llegado la notificacion al medico ${this.assistant.first_name} ${this.assistant.last_name} en la cabina ${this.cabinIdTaken} a las ${this.fixDateAndHour(Date())}`);
              }, 1000);  
              break;
            default:
              break;
          }
        }
        var that = this;
        socket.on("disconnect", (reason) => {
          console.log('Socket is closed. Reconnect will be attempted in 1 second.', reason);
          setTimeout( function () {
            console.log('reconnecting...')
            that.connectSocketIO();
            }, 1000);
        })
        socket.on("connect_error", () => {
          console.error('Closing socket.io');
          state.connected = false;
        })
      });
    },
    getDownloadSpeed(){
      let headers = {
      Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/speedtest/`;
      axios.get(path,{headers}).then((r) =>{
        this.speedtest = r.data.download_speed.toFixed(2)
        localStorage.setItem('download_speed', this.speedtest)
      }).catch((err)=>{
        this.speedtest = 0
        console.log(err);
      })
    },

    // clock
    currentTime(){  
      const now = new Date();  
      let mins = now.getMinutes(); 
      let hour = now.getHours();
 
      hour = hour < 10 ? `0${hour}` : hour;
      mins = mins < 10 ? `0${mins}` : mins; 
      let time = `${hour}:${mins}`; 
      this.clockTime = time;
      this.dateTime = `${now.getDate()}/${(now.getMonth()+1)}/${now.getFullYear()}`
    },

    getEntity(){
      let headers = {
      Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/entities/${this.entId}/`;
      axios.get(path,{headers}).then((response) =>{
        this.entityName = response.data['name']
      }).catch((err)=>{
        console.log(err);
      })
    },

    forceRerender() {
      this.componentKey += 1;
    },

    getLastCall(){ 
      let headers = {
      Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/get_call_queue_items/${this.entId}`;
      axios.get(path, {headers}).then((response) => {   
        this.listCalls = response.data;  
        if (this.listCalls.length > 0) {    
          this.firstCall = this.listCalls[0];
          localStorage.setItem('call_id', this.firstCall['id']);
          localStorage.setItem('cabin_t_id', this.firstCall['cabin_id']);
          localStorage.setItem('cabin_location', this.firstCall['location']);
          localStorage.setItem('call_timestamp', this.firstCall['timestamp']);
          this.callIdTaken = localStorage.getItem('call_id');
          this.cabinIdTaken = localStorage.getItem('cabin_t_id'); 
          this.cabinLocation = localStorage.getItem('cabin_location');  
          this.callTimestamp = localStorage.getItem('call_timestamp');  
          this.forceRerender();
        } else {
          this.listCalls = []
        }
        
      }).catch((err)=>{
        console.log(err, ' error ');
      })
    },
 

     connectWebSocket: function(){ 
       try {
        socket = new WebSocket('ws://3.143.233.51:3001/')
        console.log("Web Socket connected!", socket);
        socket.onopen = () =>{
          if (this.assistant.first_name != undefined) {
            socket.send(`set-name:${this.assistant.first_name}${this.assistant.last_name}`);  
          }
        }
      } catch (err){
        console.log("error web socket connection", err)
      }

      socket.onmessage = ({ data }) => {   
        let content = JSON.parse(data);   
        if ("message" in content && "channel" in content) {
          if (content.channel !== this.activeChannel) return;
          content = content["message"];
        } 
        switch (content["type"]) {  
          case "test":
            this.callTaken =true;
            break;
          default:
            break;
        }
        if (
          this.busyOk == false &&
          this.assistantIsLunch == false &&
          this.assistantIsBreak == false
        ) {
          switch (content["type"]) {  
            case "alarm":
           
            if (content["doctor"] == "ack") {
              this.dialogTakeCallDoctor = false;
              this.stop();  	
              let headers = {
                Authorization: `Token ${TOKEN}`,
                "Content-Type": "application/json;charset=utf-8",
              };
              var path2 = `${API_URL}api/cabin/pos/get-call/${this.callIdTaken}/`;
              axios.get(path2, { headers }).then((response) => { 
                if (response.data.assistant != this.aId) { 
                  this.dialogClose = true;
                  this.dialogTakeCallOrNot = false;
                  this.redirectCall = true;
                  this.firstCall = {};
                  this.getLastCall();
                  this.getCall = true;
                } else {   
                  this.firstCall = {};
                  this.postSlackMessage(`Se ha iniciado una llamada en la Cabina de telemedicina (${this.cabinIdTaken}) ubicada en ${this.cabinLocation} a las ${this.fixDateAndHour(Date())} atendida por ${ this.assistant.first_name } ${ this.assistant.last_name }`);
                  setTimeout(() => {
                    this.genericAlert("success", "Llamada conectada", `Cabina No: ${this.cabinIdTaken} Redirigiéndote...`, true, false) 
                  }, 2000); 
                }
              })  
                
            }
            break; 
            case "notification-call-testing":  
              this.play();  
              this.getLastCall();  
              this.patientDpi = content["patient-dpi"];
              this.stillThere = false; 
              setTimeout(() => {
                this.callIdTaken = localStorage.getItem('call_id');
                this.cabinIdTaken = localStorage.getItem('cabin_t_id'); 
                this.cabinLocation = localStorage.getItem('cabin_location');  
                this.callTimestamp = localStorage.getItem('call_timestamp');  
                this.postSlackMessage(`Ha llegado la notificacion al medico ${this.assistant.first_name} ${this.assistant.last_name} en la cabina ${this.cabinIdTaken} a las ${this.fixDateAndHour(Date())}`);
               
              }, 1000);
               
              
              break;
            case "notification-call-operation":   
              this.play();     
              this.getLastCall();
              setTimeout(() => {
                this.callIdTaken = localStorage.getItem('call_id');
                this.cabinIdTaken = localStorage.getItem('cabin_t_id'); 
                this.cabinLocation = localStorage.getItem('cabin_location');   
                this.postSlackMessage(`Ha llegado la notificacion al medico ${this.assistant.first_name} ${this.assistant.last_name} en la cabina ${this.cabinIdTaken} a las ${this.fixDateAndHour(Date())}`);
              }, 1000);  
              
                       
            break;
            default:
              break;
          }
        }
       }
       var that = this;
       socket.onclose = function(e){
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout( function () {
          console.log('reconnecting...')
          that.connectWebSocket();
          }, 1000);
       }
       
       socket.onerror = function(err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        socket.close();
      };
     },

    async changeAppVersionOfAssistant(){
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/staff/assistant/${this.assistantId}/`;
      await axios
        .patch(path, { "app_version": this.app_version }, { headers })
        .then((res) => { 
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    },
    
    async changeStatusOnInit(){
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/staff/assistant/${this.assistantId}/`;
      await axios
        .patch(path, { is_busy: false, in_break: false, in_lunch: false, }, { headers })
        .then((res) => {
          this.getAssistant();
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    },

    ...mapMutations(["logOut"]),
   
    statusActive(){
      this.stillThere = false; 
      window.location.reload()
    },

    genericAlert(icon, title, text, redirect, reload) {
      let timerInterval;
      this.$swal({
        icon: icon,
        title: title,
        text: text,
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          this.$swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (redirect) {
          this.changeStatusForCallCenter();
          setTimeout(() => {
            this.$router.push(
              `/cabin-${this.cabinIdTaken}/callcenter/call-${this.callIdTaken}`
            ); 
          }, 2000);
        }
        if(reload){
          window.location.reload()
        }
        return result;
      });
    },
    
   
    ...mapActions(["fetchAssistant"]),

     getAssistant() {

      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };

       axios
        .get(`${API_URL}api/staff/assistant_calls/${this.aId}/`, { headers })
        .then((response) => {
          
          this.doctor = `${response.data["first_name"]} ${response.data["last_name"]}`
          localStorage.setItem('doctor', this.doctor) 
          localStorage.setItem('doctorId', response.data["id"]) 

          this.connection = false;
          this.busyOk = response.data["is_busy"];
          this.assistantIsLunch = response.data["in_lunch"];
          this.assistantIsBreak = response.data["in_break"];
          this.isDemoChannel = response.data["is_demo"];
          this.isInstallerChannel = response.data["is_installer"];
          this.isTestingChannel = response.data["is_testing"];
          this.isOperationsChannel = response.data["is_operation"];
          this.isDemoChannel = response.data["is_demo"];
          this.isInstallerChannel = response.data["is_installer"];
          this.isTestingChannel = response.data["is_testing"];
          this.isOperationsChannel = response.data["is_operation"];
          this.assistantFirstName = response.data["first_name"];
          this.assistantLastName = response.data["last_name"];
          this.itemGroup = this.busyOk ? 1 : 0; 
          
          if (this.isDemoChannel == true) {
              this.userType = 'Demos'
              this.activeChannel = `is-demo-channel-${response.data["entity"]}`;
            } else if (this.isInstallerChannel == true) {
              this.userType = 'Instaladores'
              this.activeChannel = `is-installer-channel-${response.data["entity"]}`;
            } else if (this.isTestingChannel == true) {
              this.userType = 'Pruebas'
              this.activeChannel = `is-testing-channel-${response.data["entity"]}`;
            } else if (this.isOperationsChannel) {
              this.userType = 'Operaciones'
              this.activeChannel = `is-operations-channel-${response.data["entity"]}`;
            } 
              // socket.emit('subscribe', this.activeChannel);
              socket.emit('publish', {
                channel: this.activeChannel,
                message: `set-name:${this.assistantFirstName}${this.assistantLastName}`
              });
      
        })
        .catch((err) => {
          if (err.message == "Network Error") {
            this.connection = true;
            this.$swal.fire({
              title: "Conexión",
              text: `¡No estas conectado a internet!`,
              icon: "warning",
              confirmButtonColor: "#284b63",
              confirmButtonText: "Aceptar",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          }
          return err;
        });
    },

    reload2() {
      localStorage.removeItem('call_id');
      localStorage.removeItem('cabin_t_id'); 
      localStorage.removeItem('cabin_location'); 
      localStorage.removeItem('call_timestamp'); 

      this.stop();
      this.dialogClose = false; 
      this.firstCall = {};
      this.getLastCall(); 
      this.changeStatusOnInit();  
    },

    reload() {
      this.dialogReload = true;
      setTimeout(() => (this.dialogReload = false), 3000);
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
    },

    logOutApp() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/staff/assistant/${this.aId}/`;
      axios.patch(
        path, 
        {
          "is_busy": true,
          "in_break": true,
          "in_lunch": true,
        },
        { headers }
      ).then((response) => { 
        return response;
      }).catch((e) => {
        return e;
      });
      localStorage.clear();
      this.activeChannel = "";
      try {
        const ws = socket;
        ws.send(this.activeChannel);
      } catch (error) {
        console.log(error, "errro ");
        return error;
      } 
      localStorage.clear();
      this.$router.push("/login");
      localStorage.removeItem("idAssistant");
      this.logOut()
    },
 
    async changeStatusOfCabin() {
      this.cabinIdTaken = localStorage.getItem('cabin_t_id');
      this.callIdTaken = localStorage.getItem('call_id');
      this.getCall = false; 
      this.stop();
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/get_call_queue/${this.aId}/${this.callIdTaken}`; 
      await axios.get(path, {headers}).then((response)=>{
        if (response.data.result) { 
          this.stop();
          this.patchOkCall();  
          this.assistantTakingCall = true;
          this.messageConnectingCall = "Tomando llamada...";
          this.dialogTakeCallDoctor = true; 
        } else {
          this.stop();
          this.dialogClose = true; 
        }
      }).catch((error) => {
        return error;
      })
    
    },
     
    docTakeCallView(){
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      let path = `${API_URL}api/cabin/doctor-call-taken/`;
      axios.post(path, {
        'channel': this.activeChannel
      }, {headers}).then((response)=>{
        return response.data;
      }).catch((err)=>{
        return err;
      })
    },

    patchOkCall( ) {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/cabin/doc-take-call/${this.callIdTaken}/`;
      axios
        .patch(
          path,
          {
            status: 1, 
          },
          { headers }
        )
        .then((response) => {   
          try {
            const ws = socket; 
            ws.send(this.activeChannel);
          } catch (error) {
            return error;
          }
          return response.data;
        });
    },
 
    async changeStatusForCallCenter() {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/staff/assistant/${this.assistantId}/`;
      await axios
        .patch(path, { is_busy: true }, { headers })
        .then((res) => {
          this.getAssistant();
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    },

    async changeStatus(status) {
      let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
      const path = `${API_URL}api/staff/assistant/${this.assistantId}/`;
      await axios
        .patch(
          path,
          {
            is_busy: status ? true : false,
            in_lunch: status ? true : false,
            in_break: status ? true : false,
          },
          { headers }
        )
        .then((res) => {
          this.busyOk = res.data["is_busy"];
          this.assistantIsLunch = res.data["in_lunch"];
          this.assistantIsBreak = res.data["in_break"];
          if(this.busyOk == false){
            window.location.reload();
          }
          this.getAssistant(); 
          return res.data;
        })
        .catch((err) => {
          return err;
        }); 
    },
    
 
    postSlackMessage(text){ 
      const headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      }; 
      axios.post(`${API_URL}api/cabin/send-message/`,
        {  
          "text": text,
        },
        { headers }
      ).then((r) => {  
        return r.data
      }).catch((e) => {
        console.log(e);
        return e; 
      });
    },

    fixDateAndHour(d) {
      let result = new Date(d).toLocaleString();
      return result + " hrs";
    },

 
  },

  mounted() {
    this.fetchAssistant(this.assistantId);
    this.counterAssistantsCalls = this.assistant.calls;
    this.counterAssistantsCallsToday = this.assistant.today_calls;
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 1000);  
  },

  watch: {
    stillThere(val) {
      if (!val) return
      setTimeout(() => {
        this.stillThere = false;
        this.changeStatusOfAssistant = true;  
        if ( this.changeStatusOfAssistant) {
          this.changeStatusForCallCenter();
          this.showStillThereAlert = false; 
          this.$swal.fire({
            title: 'Usuario ocupado ',
            text: "Has permanecido inactivo y el estado de tu usuario ha cambiado a ocupado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cambiar a disponible',
            cancelButtonText: 'Dejar en ocupado',
            confirmButtonColor: '#00afb9',
            cancelButtonColor: '#d33', 
            reverseButtons: true
          }).then((result) => {
            this.showStillThereAlert = true;  
            if (result.isConfirmed) {
              let headers = {
                Authorization: `Token ${TOKEN}`,
                "Content-Type": "application/json;charset=utf-8",
              };
              let path = `${API_URL}api/staff/assistant/${this.aId}/`;
              axios.patch(
                path, 
                {
                  "is_busy": false,
                  "in_break": false,
                  "in_lunch": false,
                },
                { headers }
              ).then((response) => { 
                this.getAssistant(); 
                return response;
              }).catch((e) => {
                return e;
              });
            } else if (
              result.dismiss === this.$swal.DismissReason.cancel
            ) {
              this.showStillThereAlert = true;  
              return result;
            }
          })
        }
      }, 120000)
    },
    
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },

    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },
};
</script>

<style scoped>
*, *:before, *:after {
  box-sizing: border-box;
}
label {
  text-indent: 1em;
}
label:before {
  background-color: lightgray;
  content: "";
  width: 2em;
  height: 1em;
  position: absolute;
  left: 0;
}
.track {
  background-color: gray;
  position: absolute;
  width: 1em;
  height: 1em;
  left: 0;
  top: 0;
}
input[type="checkbox"] {
  opacity: 0;
}
input[type="checkbox"]:checked + .track {
  left: 1em;
  background-color: #E63946;
}
.busy-text{
  color: #E63946;
  caret-color: #E63946;
  font-weight: bold;
}
.available-text{
  color: #07BEB8;
  caret-color: #07BEB8;
  font-weight: bold;
}
label {
  user-select: none;
  cursor: pointer;
  line-height: 1em;
  transform: scale(1.8);
}
label:before {
  background-color: rgba(233, 227, 227, 0.904);
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 1em;
}
.track {
  background-color: #07BEB8;
  transition: left 100ms;
  border-radius: 50%;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);
}
.box {
  align-self: flex-end;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: bottom;
}
.bounce-3 {
  animation-name: bounce-3;
  animation-timing-function: ease;
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
.dash--text {
  color: #ade2f8;
}
.dash--text-title {
  color: #ade2f8;
  font-size: 16px;
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

#app, #app iframe {
  height: 100vh;
  width: 100vw;
  border: none;
  box-sizing: border-box;
}
 
</style>
