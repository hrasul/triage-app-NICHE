// Redux slice for Symptoms and Exam Form

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SymptomsState {
  dateTime: string;
  weakness: { hasWeakness: boolean; side: 'Right' | 'Left' | '' };
  aphasia: boolean;
  facialdrool: boolean;
  visualSymptoms: boolean;
  durationOfSymptoms: string;
  resolutionOfSymptoms: 'complete' | 'partial' | 'none';
}

const initialState: SymptomsState = {
  dateTime: '',
  weakness: { hasWeakness: false, side: "" },
  aphasia: false,
  facialdrool: false,
  visualSymptoms: false,
  durationOfSymptoms: '',
  resolutionOfSymptoms: 'none',
};

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    setSymptomsData: (state, action: PayloadAction<SymptomsState>) => {
      return action.payload;
    },
  },
});

export const { setSymptomsData } = symptomsSlice.actions;

export default symptomsSlice.reducer;
