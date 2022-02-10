import * as t from "../types";

export const setInfo = (columns) => dispatch => {
  dispatch({
    type: t.SET_COLUMN,
    payload: columns
  });
}