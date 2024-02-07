import actions from "./actions";

const {
  EMPLOYER_READ_BEGIN,
  EMPLOYER_READ_SUCCESS,
  EMPLOYER_READ_ERR,

  EMPLOYER_SINGLE_BEGIN,
  EMPLOYER_SINGLE_SUCCESS,
  EMPLOYER_SINGLE_ERR,

  EMPLOYER_UPDATE_BEGIN,
  EMPLOYER_UPDATE_SUCCESS,
  EMPLOYER_UPDATE_ERR,

  EMPLOYER_UPLOAD_BEGIN,
  EMPLOYER_UPLOAD_SUCCESS,
  EMPLOYER_UPLOAD_ERR,

  EMPLOYER_LOCATION_BEGIN,
  EMPLOYER_LOCATION_SUCCESS,
  EMPLOYER_LOCATION_ERR,

  EMPLOYER_LOCATION_READ_BEGIN,
  EMPLOYER_LOCATION_READ_SUCCESS,
  EMPLOYER_LOCATION_READ_ERR,
} = actions;

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const initialSingleState = {
  data: null,
  image: null,
  loading: false,
  fileLoading: false,
  error: null,
  locationData: null,
  locationLoading: false,
};

const employerReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case EMPLOYER_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYER_READ_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case EMPLOYER_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

const employerSingle = (state = initialSingleState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case EMPLOYER_SINGLE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYER_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
      };
    case EMPLOYER_SINGLE_ERR:
      return {
        ...state,
        loading: false,
        error: err,
      };
    case EMPLOYER_UPLOAD_BEGIN:
      return {
        ...state,
        fileLoading: true,
      };
    case EMPLOYER_UPLOAD_SUCCESS:
      return {
        ...state,
        fileLoading: false,
        image: data,
      };
    case EMPLOYER_UPLOAD_ERR:
      return {
        ...state,
        fileLoading: false,
        error: err,
      };
    case EMPLOYER_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
      };
    case EMPLOYER_UPDATE_ERR:
      return {
        ...state,
        loading: false,
        error: err,
      };
    case EMPLOYER_LOCATION_BEGIN:
      return {
        ...state,
        locationLoading: true,
      };
    case EMPLOYER_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        locationLoading: data,
      };
    case EMPLOYER_LOCATION_ERR:
      return {
        ...state,
        locationLoading: false,
        error: err,
      };
    case EMPLOYER_LOCATION_READ_BEGIN:
      return {
        ...state,
        locationLoading: true,
      };
    case EMPLOYER_LOCATION_READ_SUCCESS:
      return {
        ...state,
        locationLoading: false,
        locationData: data,
      };
    case EMPLOYER_LOCATION_READ_ERR:
      return {
        ...state,
        locationLoading: false,
        error: err,
      };
    default:
      return state;
  }
};

export { employerReducer, employerSingle };
