import axios from 'axios' 
import { API_URL, TOKEN } from "../global"; 
  
const loginAPI = (context,id) => {  
    localStorage.setItem("idAssistant", id);   
  };

//Fetching assistant info for DashBoard  
  const fetchAssistant = async function ({commit}, assistantId) {
    let headers = {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      };
    await axios.get(`${API_URL}api/staff/assistant_calls/${assistantId}/`, {headers}).then((response) => {
        commit("setAssistant", response.data);
        commit("setAssistantCalls", response.data.assistant_calls);
        //commit("setAssistantBusy", response.data.is_busy);
        //commit("setAssistantLunch", response.data.in_lunch);
        //commit("setAssistantBreak", response.data.in_break);
      }).catch((err) => console.error(err));
}
//End

export default {    
    fetchAssistant,
    loginAPI
};