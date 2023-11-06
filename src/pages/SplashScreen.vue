<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <div>
          <v-img height="100%" src="../assets/bitmec.png"> </v-img>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as Cookies from "js-cookie";

export default {
  name: "App",
  data: () => ({
    channel: "",
    baseMode: "avc",
    transcode: "live",
    codec: "h264",
    attendeeMode: "video",
    videoProfile: "360p_8",
    assistantId: "",
    entityId: "",
    message: "",
  }),

  created() {
    this.handleJoin();
    this.assistantId = localStorage.getItem("idAssistant")
    this.entityId = localStorage.getItem("entity_id")
  },

  methods: {
    handleJoin() {
      const path = `/login`;
      setTimeout(
        function() {
          Cookies.set("channel", this.channel);
          Cookies.set("baseMode", this.baseMode);
          Cookies.set("transcode", this.transcode);
          Cookies.set("codec", this.codec);
          Cookies.set("attendeeMode", this.attendeeMode);
          Cookies.set("videoProfile", this.videoProfile);
          if (localStorage.getItem('is_demo') || localStorage.getItem('is_testing') || localStorage.getItem('is_installer') || localStorage.getItem('is_operations') || localStorage.getItem('idAssistant')) {
            if (this.$route.path !== path) this.$router.push(`/dashboard/assistant-${this.assistantId}/ent-${this.entityId}`);
          } else { 
            if (this.$route.path !== path) this.$router.push(path);
          }
        }.bind(this),
        5000
      );
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("keypress", (e) => {
        e.keyCode === 13 && this.handleJoin();
      });
    });
  },
};
</script>

<style>
.parent {
  background: #cccccc;
  height: 200px;
  width: 200px;
  position: relative;
}
.child {
  background: #ffff00;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -35px 0 0 -35px;
}
</style>
