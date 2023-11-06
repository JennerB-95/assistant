const setAssistant = (state, assistant) => {
  state.assistant = assistant;
}

const setAssistantCalls = (state, assistantCalls) => {
  state.assistant.assistantCalls = assistantCalls;
}

const setVariable = (state, newValue) => {
  state.miVariable = newValue;
}

const logOut = state => { 
  state.assistant = null;
  localStorage.clear(); 
};
 
export default {    
    setAssistant,
    setAssistantCalls,
    setVariable,
    logOut
 
};