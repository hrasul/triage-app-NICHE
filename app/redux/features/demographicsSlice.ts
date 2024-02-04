// Redux slice for Demographics and Past Medical History Form

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DemographicsState {
  age: string | null;
  gender: 'Male' | 'Female' | null | string;
  mi: 'Yes' | 'No' | 'Unknown';
  arrhythmia: 'Yes' | 'No' | 'Unknown';
  strokeOrTIA: { hadBefore: 'Yes' | 'No' | 'Unknown'; date: string | null };
  htn: 'Yes' | 'No' | 'Unknown';
  dm: 'Yes' | 'No' | 'Unknown';
  smoking: 'Yes' | 'No' | 'Unknown';
  functionalStatus: 'independent' | 'partially dependent' | 'caregiver dependent' | string;
  codeStatus: 'Full' | 'DNR' | 'AMM' | 'DNI' | 'TBD' | string;
}

const initialState: DemographicsState = {
  age: null,
  gender: null,
  mi: 'No',
  arrhythmia: 'No',
  strokeOrTIA: { hadBefore: 'No', date: null },
  htn: "No",
  dm: 'No',
  smoking: 'No',
  functionalStatus: 'independent',
  codeStatus: 'Full',
};

const demographicsSlice = createSlice({
  name: 'demographics',
  initialState,
  reducers: {
    setDemographicData: (state, action: PayloadAction<DemographicsState>) => {
      return action.payload;
    },
  },
});

export const { setDemographicData } = demographicsSlice.actions;

export default demographicsSlice.reducer;
