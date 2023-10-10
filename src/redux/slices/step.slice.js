import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  stepData: {
    stepList: [],
  },
  error: null,
  loading: false,
};


export const getStepList = createAsyncThunk(
  'step/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/steps')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const ajouterUser = createAsyncThunk(
  'user/ajouterUser',
  async (data, {rejectWithValue})=>{
    try {
      const res = await axios.post('http://localhost:7000/api',data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// export const postUser = createAsyncThunk(
//   'user/postUser',
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.post('http://localhost:7000/api', data)
//       return res.data
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {},
  extraReducers: builder => { // 3 scenarios (error: rejected, loading: pending, success: fulfilled)
    builder.addCase(getStepList.pending, (state) => {
      state.loading = true
    }).addCase(getStepList.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    }).addCase(getStepList.fulfilled, (state, action) => {
      state.stepData.stepList = action.payload; // Update stepList correctly
    });

  }
})

export const { } = stepSlice.actions

export default stepSlice.reducer