import { fromJS } from "immutable";
import { combineReducers } from "redux";
import { NEWSDATA_FAILURE, NEWSDATA_PROGRESS, NEWSDATA_SUCCESS } from "../action/action";

const intialState = {
  newsData: [],
  isLoading: true,
  error: {}
};

function news(state = fromJS(intialState), action) {
  let oldState = {};
  switch (action.type) {
    case NEWSDATA_SUCCESS:
      oldState = state.toJS();
      oldState.newsData = [...oldState.newsData, ...action.data];
      oldState.isLoading = false;
      return fromJS(oldState);
    case NEWSDATA_PROGRESS:
      oldState = state.toJS();
      oldState.isLoading = true;
      return fromJS(oldState);
    case NEWSDATA_FAILURE:
      oldState = state.toJS();
      oldState.error = action.data;
      oldState.isLoading = false;
      return fromJS(oldState);
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  news
});

export default rootReducer;
