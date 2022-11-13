import { createSlice } from "@reduxjs/toolkit";
import api from "./api";

const slice = createSlice({
  name: "news",

  initialState: {
    ids: {},
    details: {
      stories: [],
      requesting: false,
      error: null,
    },
    filter: "score",
    ascending: true,
  },

  reducers: {
    getNewsConfirm: (state) => {
      state.ids = { requesting: true };
      state.details.stories = [];
      state.details.error = null;
    },
    getNewsSuccess: (state, action) => {
      state.ids = { data: action.payload };
    },
    getNewsFailed: (state, action) => {
      state.ids = { error: action.payload };
    },
    getDetailsConfirm: (state) => {
      state.details.requesting = true;
    },
    getDetailsSuccess: (state, action) => {
      const { data, last } = action.payload;
      state.details.stories = [...state.details.stories, data];
      if (last) {
        state.details.requesting = false;
      }
    },
    getDetailsFailed: (state, action) => {
      state.details.error = action.payload;
    },
    setNewFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state) => {
      state.ascending = !state.ascending;
    },
  },
});

export default slice.reducer;

const {
  getNewsConfirm,
  getNewsSuccess,
  getDetailsConfirm,
  getDetailsSuccess,
  setNewFilter,
  setSort,
  getNewsFailed,
  getDetailsFailed,
} = slice.actions;

export const getIds = () => async (dispatch) => {
  dispatch(getNewsConfirm());
  const response = await api.getStoryIds();
  if (response.error) {
    dispatch(getNewsFailed(response.error));
  } else {
    dispatch(getNewsSuccess(response));
    // Get details for each ID
    response.forEach((id, i) => {
      dispatch(getDetails(id, i === response.length - 1));
    });
  }
};

export const getDetails = (id, last) => async (dispatch) => {
  dispatch(getDetailsConfirm());
  const response = await api.getStoryDetails(id);
  if (response.error) {
    dispatch(getDetailsFailed(response.error));
  } else {
    dispatch(getDetailsSuccess({ data: response, last }));
  }
};

export const setFilter = (filter) => (dispatch) => {
  dispatch(setNewFilter(filter));
};

export const flipSort = () => (dispatch) => {
  dispatch(setSort());
};
