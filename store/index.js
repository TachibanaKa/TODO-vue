import { createStore } from "vuex";
const defaultState = {
  userData: null
};
const store = createStore({
  state() {
    return defaultState;
  },
  mutations: {
    setUserData(state, data){
      state.userData = data
    }
  },
  getters: {
  },
});

export default store;