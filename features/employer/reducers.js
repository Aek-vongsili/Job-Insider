import actions from "./actions";

const {
  EMPLOYER_READ_BEGIN,
  EMPLOYER_READ_SUCESS,
  EMPLOYER_READ_ERR,

  EMPLOYER_SINGLE_BEGIN,
  EMPLOYER_SINGLE_SUCESS,
  EMPLOYER_SINGLE_ERR,

  EMPLOYER_UPDATE_BEGIN,
  EMPLOYER_UPDATE_SUCESS,
  EMPLOYER_UPDATE_ERR,

  EMPLOYER_UPLOAD_BEGIN,
  EMPLOYER_UPLOAD_SUCESS,
  EMPLOYER_UPLOAD_ERR,

  EMPLOYER_LOCATION_BEGIN,
  EMPLOYER_LOCATION_SUCESS,
  EMPLOYER_LOCATION_ERR,
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
};

const employerReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case EMPLOYER_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYER_READ_SUCESS:
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
    case EMPLOYER_SINGLE_SUCESS:
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
    case EMPLOYER_UPLOAD_SUCESS:
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
    case EMPLOYER_UPDATE_SUCESS:
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
        loading: true,
      };
    case EMPLOYER_LOCATION_SUCESS:
      return {
        ...state,
        loading: false,
        locationData: data,
      };
    case EMPLOYER_LOCATION_ERR:
      return {
        ...state,
        loading: false,
        error: err,
      };
    default:
      return state;
  }
};

export { employerReducer, employerSingle };
