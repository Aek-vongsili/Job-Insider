import actions from "./actions";

const {
  JOBS_READ_BEGIN,
  JOBS_READ_SUCCESS,
  JOBS_READ_ERR,

  JOB_INSERT_BEGIN,
  JOB_INSERT_SUCCESS,
  JOB_INSERT_ERR,

  JOB_SINGLE_BEGIN,
  JOB_SINGLE_SUCCESS,
  JOB_SINGLE_ERR,

  FAV_JOB_BEGIN,
  FAV_JOB_SUCCESS,
  FAV_JOB_ERR,

  REMOVE_FAV_JOB_BEGIN,
  REMOVE_FAV_JOB_SUCCESS,
  REMOVE_FAV_JOB_ERR,

  FAV_JOB_GET_BEGIN,
  FAV_JOB_GET_SUCCESS,
  FAV_JOB_GET_ERR,
} = actions;

const initialState = {
  data: [],
  error: null,
  loading: false,
  jobFavLike: null,
  jobFavData: [],
  jobFavLoading: false,
};

const initialStateSingle = {
  data: null,
  loading: false,
  error: null,
};

const jobReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case JOBS_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case JOBS_READ_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case JOBS_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case JOB_INSERT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case JOB_INSERT_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case JOB_INSERT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case FAV_JOB_BEGIN:
      return {
        ...state,
        jobFavLoading: true,
      };
    case FAV_JOB_SUCCESS:
      return {
        ...state,
        jobFavLike: data,
        jobFavLoading: false,
      };
    case FAV_JOB_ERR:
      return {
        ...state,
        error: err,
        jobFavLoading: false,
      };

    case REMOVE_FAV_JOB_BEGIN:
      return {
        ...state,
        jobFavLoading: true,
      };
    case REMOVE_FAV_JOB_SUCCESS:
      return {
        ...state,
        jobFavLike: data,
        jobFavLoading: false,
      };
    case REMOVE_FAV_JOB_ERR:
      return {
        ...state,
        error: err,
        jobFavLoading: false,
      };

    case FAV_JOB_GET_BEGIN:
      return {
        ...state,
        jobFavLoading: true,
      };
    case FAV_JOB_GET_SUCCESS:
      return {
        ...state,
        jobFavData: data,
        jobFavLoading: false,
      };
    case FAV_JOB_GET_ERR:
      return {
        ...state,
        error: err,
        jobFavLoading: false,
      };
    default:
      return state;
  }
};

const jobSingleReducer = (state = initialStateSingle, action) => {
  const { type, data, err } = action;
  switch (type) {
    case JOB_SINGLE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case JOB_SINGLE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case JOB_SINGLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export { jobReducer, jobSingleReducer };
