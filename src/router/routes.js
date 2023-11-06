import Vue from "vue";
import Router from "vue-router";
import SplashScreen from "@/pages/SplashScreen";
import CallCenterInformation from "@/pages/CallCenterInformation";
import LoginPage from "@/pages/LoginPage";
import DashboardPrincipal from "@/pages/DashboardPrincipal";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "splash-screen",
    component: SplashScreen,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/dashboard/assistant-:assistantId/ent-:entityId",
    name: "dashboard",
    component: DashboardPrincipal,
  },
  {
    path: "/cabin-:cabinId/callcenter/call-:callId",
    name: "callcenter",
    component: CallCenterInformation,
  },
]

export default routes;

