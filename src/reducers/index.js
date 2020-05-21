import formToRenderReducer from "./form-to-render-reducer";
import kegListReducer from "./keg-list-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  formToRender: formToRenderReducer,
  masterKegList: kegListReducer,
});

export default rootReducer;
