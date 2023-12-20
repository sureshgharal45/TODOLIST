import {
  CREATE_RECORD_REQUEST,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_RESET,
  ALL_RECORDS_REQUEST,
  ALL_RECORDS_SUCCESS,
  ALL_RECORDS_FAIL,
  CLEAR_ERRORS
} from "../constants/userConstants";

export const createRecordReducer = (state = { records: {} }, action) => {
  switch (action.type) {
    case CREATE_RECORD_REQUEST:
      return {
        loading: true,
      };

    case CREATE_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.user,
        success: action.payload.success,
      };

    case CREATE_RECORD_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allRecordReducer = (state = { allrecords: [] }, action) => {
  switch (action.type) {
    case ALL_RECORDS_REQUEST:
      return {
        loading: true,
      };

    case ALL_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        allrecords: action.payload,
      };

    case ALL_RECORDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
