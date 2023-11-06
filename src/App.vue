<template>
  <div id="app">
    <router-view /> 
    <div class="version"  >Versión: {{ version }}</div>
  </div>
</template>

<script>
const electron = window.require && window.require('electron')
const app = electron?.app || electron?.remote.app 

 export default {
  name: "App",
  data() {
    return { 
      version: app && app.getVersion() || "web"
     };
  },
  created(){
    localStorage.setItem('app_version', this.version)
  }
};
</script>

<style>
html,
body,
#app,
.full {
  height: 100%;
  min-height: 100%;
  font-size: 14px !important;
}

img {
  vertical-align: middle;
  max-width: 100%;
}

.ag-header,
.ag-footer {
  /* flex-basis: 70px; */
  width: 100%;
  opacity: 0.8;
  height: 70px;
  color: #fff;
}

.ag-main {
  width: 100%;
  /* height: 60%; */
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.ag-rounded {
  border-radius: 19px !important;
}

.ag-href {
  color: #fff;
  cursor: pointer;
}

.ag-href:hover {
  color: #fff;
}

.version {
  position: fixed;
  right: 20px;
  bottom: 10px;
  top: 60px;
}
</style>
