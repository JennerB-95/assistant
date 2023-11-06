const assistant = function(state) {
    return state.assistant;
  };

const getAssistantCalls = function(state) {
    return state.assistant.assistantCalls;
  };
  
  export default {
    assistant,
    getAssistantCalls, 
  };