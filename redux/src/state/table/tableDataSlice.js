import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { useDispatch } from "react-redux";




const initialState = {
  data : null,
  loading : false,
  err : null,
  selectedData : null,
}


export const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        fetchDataRequest : (state) =>{
            state.loading = true;
            state.err = null;
        },
        fetchDataSuccess : (state, action) =>{
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure : (state, action) =>{
            state.loading = false;
            state.err = action.payload;
        },
        selectedDataItem : (state, action) =>{
            state.selectedData = action.payload;
        },
    },
})



export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure, selectedDataItem } = tableDataSlice.actions
export default tableDataSlice.reducer


//get request
export const fetchTableData = (url) => async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get("http://127.0.0.1:8000/category-list/");
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };


//post add request
export const addNewData = (data) => async (dispatch) => {
    try {
      const response =  await axios.post("http://127.0.0.1:8000/category-list/", data);
      dispatch(fetchTableData());
      return response.data.message
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
};


//post update request
export const updateDataRequest = (id,data) => async (dispatch) => {
  console.log("updating")
  try {
    const response =  await axios.post(`http://127.0.0.1:8000/category-filter/${id}/`, data);
    dispatch(fetchTableData());
    return response.data.message
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};


//delete request
export const deleteDataRequest = (data) => async (dispatch) => {
    try {
      const response =  await axios.delete(`http://127.0.0.1:8000/category-filter/${data.id}/`);
      dispatch(fetchTableData());
      return response.data.message
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
};




  

  

