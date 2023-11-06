import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
});

// "undefined" means the URL will be computed from the `window.location` object 2096 forceNew: true
const URL = "https://socketio.bitmec.com:8443";

export const socket = io(URL, {secure:true});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
}); 
