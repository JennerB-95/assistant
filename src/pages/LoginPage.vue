<template>
  <v-app id="inspire" class="back">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card color="white" class="elevation-12">
              <v-row>
                <v-col cols="12" md="10">
                  <v-card-text class="mt-12">
                    <h1
                      class="text-center display-2 light-blue--text text--accent-1"
                    >
                      WELCOME ASSISTANT!
                    </h1>
                    <div class="text-center mt-4">
                      <img height="50" src="../assets/bitmec.png" alt="" />
                    </div>

                    <h4 class="text-center mt-4 grey--text darken-1--text">
                      Bitmec is a digital health system that delivers quality
                      medical care at low cost to underserved rural areas
                    </h4>
                    <v-form class="px-12">
                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        type="text"
                        color="#8DDAFC"
                      />
                      <v-text-field 
                        v-model="form.password"
                        id="password"
                        label="Password"
                        name="Password"
                        prepend-icon="lock"
                        type="password"
                        color="#8DDAFC"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn
                      class="ma-2 white--text"
                      :loading="loading"
                      :disabled="loading"
                      color="#8DDAFC"
                      @click="(loader = 'loading'), login()"
                    >
                      Iniciar Sesión
                      <template v-slot:loader>
                        <span>Iniciando...</span>
                      </template>
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="2" style="background: #8DDAFC"> </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script> 
import {  mapActions } from "vuex";
import { API_URL, TOKEN } from "../global";
import axios from "axios";

export default {
  data: () => ({
      loading: false,
      loader: null,
      form: {
        email: "",
        password: "",
      },
      cabin: "",
      isDemoChannel: false,
      isInstallerChannel: false,
      isTestingChannel: false,
      isOperationsChannel: false,
    
  }),
  props: {
    source: String,
  },

  mounted() {
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        setTimeout(function(){
          window.location.reload();
        }.bind(this), 5000)
    }
  },

  created() {
    if (localStorage.getItem("idAssistant")) { 
      this.isDemoChannel = localStorage.getItem('is_demo');
      this.isInstallerChannel = localStorage.getItem('is_installer');
      this.isTestingChannel = localStorage.getItem('is_testing');
      this.isOperationsChannel = localStorage.getItem('is_operations');
    }
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },

   methods: { 
    ...mapActions(["loginAPI", "fetchAssistant"]),

    login() {
      var url = `${API_URL}api/staff/assistant/`;
      axios.get(url, {
        headers: {
          'Authorization': `Token ${TOKEN}`
        }
      }).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          if (this.form.email === res.data[index]["email"] && this.form.password === res.data[index]["password"]) {
            localStorage.setItem("entity_id", res.data[index]["entity"])
            localStorage.setItem("idAssistant", res.data[index]["id"]);
            this.loginAPI(localStorage.getItem("idAssistant"))  
            switch (true) {
              case res.data[index]['is_demo']:
                localStorage.setItem('is_demo', res.data[index]['is_demo'])
                break;
              case res.data[index]['is_installer']:
                localStorage.setItem('is_installer', res.data[index]['is_installer'])
                break;
              case res.data[index]['is_testing']:
                localStorage.setItem('is_testing', res.data[index]['is_testing'])
                break;
              case res.data[index]['is_operation']:
                localStorage.setItem('is_operations', res.data[index]['is_operation'])
                break;
              default:
                break;
            }
            this.$router.push(`/dashboard/assistant-${res.data[index]["id"]}/ent-${res.data[index]["entity"]}`)


          } else {
            console.error("didnt match ");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.back {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  background: linear-gradient(150deg, #82abb6, #a5d8ec, #d7ecff);
  background-size: 400% 300%;
  animation: BgGradient 5s ease infinite;
}

@keyframes BgGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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
</style>