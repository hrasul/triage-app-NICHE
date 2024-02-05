// Redux slice for Symptoms and Exam Form

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SymptomsState {
  dateTime: string;
  weakness: { hasWeakness: 'Yes' | 'No' | 'Unknown'; side: 'Right' | 'Left' | '' };
  aphasia: 'Yes' | 'No' | 'Unknown';
  facialdrool: 'Yes' | 'No' | 'Unknown';
  visualSymptoms: 'Yes' | 'No' | 'Unknown';
  durationOfSymptoms: string;
  resolutionOfSymptoms: 'complete' | 'partial' | 'none';
}

const initialState: SymptomsState = {
  dateTime: '',
  weakness: { hasWeakness: 'Yes', side: "" },
  aphasia: 'No',
  facialdrool: 'No',
  visualSymptoms: 'No',
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
