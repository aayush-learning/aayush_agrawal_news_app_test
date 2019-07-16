import axios from 'axios';

export const NEWSDATA_SUCCESS = "NEWSDATA_SUCCESS";
export const NEWSDATA_FAILURE = "NEWSDATA_FAILURE";
export const NEWSDATA_PROGRESS = "NEWSDATA_PROGRESS";

export const newsDataBegin = () => ({
  type: NEWSDATA_PROGRESS
});

export const newsDataSuccess = news => ({
  type: NEWSDATA_SUCCESS,
  data:  news 
});

export const newsDataFailure = error => ({
  type: NEWSDATA_FAILURE,
  data: { error }
});

export function getData(endPoint) {
  return dispatch => {
    dispatch(newsDataBegin());
    // fetch(endPoint)
    //   .then(result => result.json())
    //   .then(result => {
    //     dispatch(newsDataSuccess(result.articles));
    //   })
    //   .catch(error => dispatch(newsDataFailure(error)));
    axios.get(endPoint)
                .then((res) => {
                  dispatch(newsDataSuccess(res.data.articles));
                  console.log("success call back called")
                }).catch((e) => {
                  dispatch(newsDataFailure(e));
                });
  };
}
