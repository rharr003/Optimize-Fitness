import { createSlice } from "@reduxjs/toolkit";
import { ColorPalette } from "../../../ColorPalette";

let interval = null;

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    tdee: 0,
    currentIntake: 0,
    currentPacing: "",
    currentWeight: {
      weight: 0,
      date: null,
    },
    currentBmi: 0,
    overlayMessage: "",
    weightMeasurements: [],
    calorieColor: ColorPalette.dark.gray400,
  },
  reducers: {
    setTdee(state, action) {
      state.tdee = action.payload;
      if (state.currentIntake > 0 && action.payload > 0) {
        const result = (
          ((state.currentIntake - action.payload) * 7) /
          3500
        ).toFixed(1);
        result > 0
          ? (state.calorieColor = ColorPalette.dark.secondary200)
          : (state.calorieColor = ColorPalette.dark.error);
        state.currentPacing = result > 0 ? `+ ${result} ` : result;
      } else {
        state.currentPacing = "";
        state.calorieColor = ColorPalette.dark.gray400;
      }
    },

    setCurrentIntake(state, action) {
      state.currentIntake = action.payload;
      if (action.payload > 0 && state.tdee > 0) {
        const result = (((action.payload - state.tdee) * 7) / 3500).toFixed(1);
        result > 0
          ? (state.calorieColor = ColorPalette.dark.secondary200)
          : (state.calorieColor = ColorPalette.dark.error);
        state.currentPacing = result > 0 ? `+ ${result} ` : result;
      } else {
        state.currentPacing = "";
        state.calorieColor = ColorPalette.dark.gray400;
      }
    },

    setOverlayMessage(state, action) {
      state.overlayMessage = action.payload;
    },

    setWeightMeasurements(state, action) {
      state.weightMeasurements = action.payload;
    },

    addWeightMeasurement(state, action) {
      state.weightMeasurements.push(action.payload);
    },

    deleteWeightMeasurement(state, action) {
      const index = action.payload;
      state.weightMeasurements.splice(index, 1);
    },

    updateWeight(state, action) {
      if (!action.payload) {
        (state.currentBmi = 0),
          (state.currentWeight = {
            weight: 0,
            date: null,
          });
        return;
      }
      state.currentWeight = {
        weight: action.payload.weight,
        date: action.payload.date,
      };
      if (action.payload.height) {
        state.currentBmi = parseFloat(
          (
            (action.payload.weight /
              (parseInt(action.payload.height) *
                parseInt(action.payload.height))) *
            703
          ).toFixed(1)
        );
      }
    },
  },
});

export const {
  setTdee,
  setCurrentIntake,
  setOverlayMessage,
  setWeightMeasurements,
  addWeightMeasurement,
  deleteWeightMeasurement,
  updateWeight,
} = userDataSlice.actions;

export default userDataSlice.reducer;
