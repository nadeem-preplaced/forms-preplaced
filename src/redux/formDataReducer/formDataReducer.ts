import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormDataState {
  data: any;
  totalPage:number;
  currentPage:number;
  stepFormData:any;
}

const initialState: FormDataState = {
  data: {},
  totalPage:0,
  currentPage: 0,
  stepFormData:[]
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    settingData: (state,action:PayloadAction<any>) => {
        state.data = action.payload;
        state.totalPage = action.payload.sections.length - 1
        // state.totalPage = 2 //remove after testing
        // state.currentPage = 2 //remove after testing
    },
    upgradeCurrentPage: (state) => {
        state.currentPage = state.currentPage+1;
    },
    downgradeCurrentPage: (state) => {
        state.currentPage = (state.totalPage >= state.currentPage) ? state.currentPage-1 : state.totalPage ;
    },
    setStepFormData: (state,action:PayloadAction<any>) => {
      if(state.stepFormData[state.currentPage]){
        state.stepFormData[state.currentPage] = action.payload;
      }else{
        state.stepFormData = [...state.stepFormData,action.payload];
      }
    }
  },
});

export const { settingData, upgradeCurrentPage,  downgradeCurrentPage, setStepFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
