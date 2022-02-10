import * as t from "../types";

const main = (state = {
    columns: [{name: "Date", slug: "date"}, {name: "App Name", slug: "app_name"}],
}, action) => {
  switch(action.type){
    case t.SET_COLUMN:
      return { 
        ...state,
        columns: [...action.payload]
      };
    default:
      return {...state};
    }
}

export default main;