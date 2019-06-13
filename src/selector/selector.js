import { createSelector } from "reselect";

const selectorState = state => state.news;

function immutableToJS(obj) {
  if (typeof obj === "object" && obj !== null) {
    return obj.toJS();
  }
  return obj;
}

function isEmpty(obj) {
  // console.log(typeof(obj));
  if (obj !== null && obj !== undefined) {
    // for general objects
    if (typeof obj === "string") {
      if (obj.trim() === "" || obj == "null") {
        // for string
        return true;
      }

      return false;
    } else if (obj.length <= 0) {
      // for array
      return true;
    } else if (typeof obj === "object") {
      const keys = Object.keys(obj);
      const len = keys.length;
      if (len <= 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  return true;
}

const newsSelector = () =>
  createSelector(
    [selectorState],
    news => (isEmpty(news) ? [] : immutableToJS(news.get("newsData")))
  );
const isLoadingSelector = () =>
  createSelector(
    [selectorState],
    news => immutableToJS(news.get("isLoading"))
  );

export { newsSelector, isLoadingSelector };
