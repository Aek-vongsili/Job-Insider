import actions from "./actions";

const {
  CANDIDATE_READ_BEGIN,
  CANDIDATE_READ_SUCCESS,
  CANDIDATE_READ_ERR,

  CANDIDATE_SINGLE_BEGIN,
  CANDIDATE_SINGLE_SUCCESS,
  CANDIDATE_SINGLE_ERR,

  CANDIDATE_UPDATE_BEGIN,
  CANDIDATE_UPDATE_SUCCESS,
  CANDIDATE_UPDATE_ERR,

  CANDIDATE_UPLOAD_BEGIN,
  CANDIDATE_UPLOAD_SUCCESS,
  CANDIDATE_UPLOAD_ERR,

  CANDIDATE_UPLOAD_CV_BEGIN,
  CANDIDATE_UPLOAD_CV_SUCCESS,
  CANDIDATE_UPLOAD_CV_ERR,

  CANDIDATE_RESUME_SUBMIT_BEGIN,
  CANDIDATE_RESUME_SUBMIT_SUCCESS,
  CANDIDATE_RESUME_SUBMIT_ERR,

  CANDIDATE_RESUME_READ_BEGIN,
  CANDIDATE_RESUME_READ_SUCCESS,
  CANDIDATE_RESUME_READ_ERR,

  CANDIDATE_JOB_APPLIED_BEGIN,
  CANDIDATE_JOB_APPLIED_SUCCESS,
  CANDIDATE_JOB_APPLIED_ERR,

  CANDIDATE_JOB_APPLIED_DELETE_BEGIN,
  CANDIDATE_JOB_APPLIED_DELETE_SUCCESS,
  CANDIDATE_JOB_APPLIED_DELETE_ERR,
} = actions;

const initialState = {
  data: [],
  error: null,
  loading: false,
};
const initialSingleState = {
  data: null,
  image: null,
  loading: false,
  resumeData: null,
  cvFile: null,
  fileLoading: false,
  error: null,
  fileError: null,
  applieJob: [],
  applieJobLoading: false,
};

const candidateReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case CANDIDATE_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CANDIDATE_READ_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CANDIDATE_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
const candidateSingleReducer = (state = initialSingleState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case CANDIDATE_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CANDIDATE_UPDATE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CANDIDATE_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CANDIDATE_UPLOAD_BEGIN:
      return {
        ...state,
        fileLoading: true,
      };
    case CANDIDATE_UPLOAD_SUCCESS:
      return {
        ...state,
        image: data,
        fileLoading: false,
      };
    case CANDIDATE_UPLOAD_ERR:
      return {
        ...state,
        fileError: err,
        fileLoading: false,
      };
    case CANDIDATE_SINGLE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CANDIDATE_SINGLE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CANDIDATE_SINGLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CANDIDATE_UPLOAD_CV_BEGIN:
      return {
        ...state,
        fileLoading: true,
      };
    case CANDIDATE_UPLOAD_CV_SUCCESS:
      return {
        ...state,
        cvFile: data,
        fileLoading: false,
      };
    case CANDIDATE_UPLOAD_CV_ERR:
      return {
        ...state,
        error: err,
        fileLoading: false,
      };
    case CANDIDATE_RESUME_SUBMIT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CANDIDATE_RESUME_SUBMIT_SUCCESS:
      return {
        ...state,
        resumeData: data,
        loading: false,
      };
    case CANDIDATE_RESUME_SUBMIT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CANDIDATE_RESUME_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CANDIDATE_RESUME_READ_SUCCESS:
      return {
        ...state,
        resumeData: data,
        loading: false,
      };
    case CANDIDATE_RESUME_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CANDIDATE_JOB_APPLIED_BEGIN:
      return {
        ...state,
        applieJobLoading: true,
      };
    case CANDIDATE_JOB_APPLIED_SUCCESS:
      return {
        ...state,
        applieJob: data,
        applieJobLoading: false,
      };

    case CANDIDATE_JOB_APPLIED_ERR:
      return {
        ...state,
        error: err,
        applieJobLoading: false,
      };
    case CANDIDATE_JOB_APPLIED_DELETE_BEGIN:
      return {
        ...state,
        applieJobLoading: true,
      };
    case CANDIDATE_JOB_APPLIED_DELETE_SUCCESS:
      return {
        ...state,
        applieJobLoading: false,
      };

    case CANDIDATE_JOB_APPLIED_DELETE_ERR:
      return {
        ...state,
        error: err,
        applieJobLoading: false,
      };
    default:
      return state;
  }
};

export { candidateReducer, candidateSingleReducer };
