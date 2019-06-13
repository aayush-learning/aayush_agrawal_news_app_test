export const NEWSDATA = "NEWSDATA";

export function getData(endPoint) {
  return dispatch => {
    fetch(endPoint)
      .then(result => result.json())
      .then(result => {
        dispatch ({
          type: NEWSDATA,
          data: result.articles
        });
      });
  };
}
