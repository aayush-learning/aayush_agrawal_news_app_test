import { fromJS } from "immutable";
import { combineReducers } from "redux";
import { NEWSDATA } from "../action/action";

const intialState = {
  newsData: [],
  isLoading: true
};

function news(state = fromJS(intialState), action) {
  let oldState = {};
  switch (action.type) {
    case NEWSDATA:
      oldState = state.toJS();
      oldState.newsData = [...oldState.newsData, ...action.data];
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
