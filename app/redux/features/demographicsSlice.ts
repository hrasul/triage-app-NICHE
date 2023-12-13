// Redux slice for Demographics and Past Medical History Form

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DemographicsState {
  age: string | null;
  gender: 'Male' | 'Female' | null | string;
  mi: boolean;
  arrhythmia: boolean;
  strokeOrTIA: { hadBefore: boolean; date: string | null };
  htn: boolean;
  dm: boolean;
  smoking: boolean;
  functionalStatus: 'independent' | 'partially dependent' | 'caregiver dependent' | string;
  codeStatus: 'Full' | 'DNR' | 'AMM' | 'DNI' | 'TBD' | string;
}

const initialState: DemographicsState = {
  age: null,
  gender: null,
  mi: false,
  arrhythmia: false,
  strokeOrTIA: { hadBefore: false, date: null },
  htn: false,
  dm: false,
  smoking: false,
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
