// Redux slice for Investigation and Imaging Form

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvestigationState {
  ctaCarotidDisease: boolean;
  ctHead: {hasct: boolean, infarction: boolean; hemorrhage: boolean };
  ecgAtrialFibrillation: boolean;
}

const initialState: InvestigationState = {
  ctaCarotidDisease: false,
  ctHead: { hasct:false, infarction: false, hemorrhage: false },
  ecgAtrialFibrillation: false,
};

const investigationSlice = createSlice({
  name: 'investigation',
  initialState,
  reducers: {
    setInvestigationData: (state, action: PayloadAction<InvestigationState>) => {
      return action.payload;
    },
  },
});

export const { setInvestigationData } = investigationSlice.actions;

export default investigationSlice.reducer;
