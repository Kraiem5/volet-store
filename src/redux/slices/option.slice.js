import { createSlice } from '@reduxjs/toolkit';

const optionsSlice = createSlice({
  name: 'options',
  initialState: {},
  reducers: {
    setOption: (state, action) => {
      // Mettez à jour l'état avec une nouvelle option sélectionnée
      const { questionTitle, option } = action.payload;
      state[questionTitle] = option;
    },
    clearOptions: (state) => {
      // Effacez toutes les sélections d'options
      return {};
    },
  },
});

export const { setOption, clearOptions } = optionsSlice.actions;
export default optionsSlice.reducer;