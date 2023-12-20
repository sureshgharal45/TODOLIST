import {
  CREATE_RECORD_REQUEST,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAIL,
  ALL_RECORDS_REQUEST,
  ALL_RECORDS_SUCCESS,
  ALL_RECORDS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

export const createRecord = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_RECORD_REQUEST });
    const config = {headers: {"Content-Type": "application/json"}};
    const { data } = await axios.post("/api/v1/tasks/create", userData, config);
    dispatch({ type: CREATE_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_RECORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllRecords = (due) => async (dispatch) => {
  try {
    dispatch({ type: ALL_RECORDS_REQUEST });
    const { data } = await axios.get(`/api/v1/tasks/allrecords?date=${due}`); 
    dispatch({ type: ALL_RECORDS_SUCCESS, payload: data.records });
  } catch (error) {
    dispatch({
      type: ALL_RECORDS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//to clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
