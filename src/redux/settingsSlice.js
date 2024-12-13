import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("settings");
    if (serializedState === null) {
      return { appName: "MyApp", primaryColor: "blue" }; // Valeurs par défaut
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { appName: "MyApp", primaryColor: "blue" }; // Valeurs par défaut
  }
};

// Fonction pour sauvegarder l'état dans le local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("settings", serializedState);
  } catch (err) {
    // Ignorer les erreurs d'écriture
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadState(),
  reducers: {
    setAppName: (state, action) => {
      state.appName = action.payload;
      saveState(state);
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      saveState(state);
    },
  },
});

export const { setAppName, setPrimaryColor } = settingsSlice.actions;

export default settingsSlice.reducer;
