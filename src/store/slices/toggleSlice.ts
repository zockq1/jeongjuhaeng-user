import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCommentOn: true,
  isContentBoxOn: true,
  isTopicOn: true,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    CommentOn(state) {
      state.isCommentOn = true;
    },
    CommentOff(state) {
      state.isCommentOn = false;
    },
    ContentBoxOn(state) {
      state.isContentBoxOn = true;
    },
    ContentBoxOff(state) {
      state.isContentBoxOn = false;
    },
    topicOn(state) {
      state.isTopicOn = true;
    },
    topicOff(state) {
      state.isTopicOn = false;
    },
  },
});

export const {
  CommentOff,
  CommentOn,
  ContentBoxOff,
  ContentBoxOn,
  topicOff,
  topicOn,
} = toggleSlice.actions;
export default toggleSlice.reducer;
