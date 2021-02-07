import { combineReducers, createStore } from "redux";
import LanguageReducer from "./settings";
import textReducer from "./text";
import recentTranslationsReducer from "./recentTranslations";
import permissionsReducer from "./permissions";

const reducer = combineReducers({
  language: LanguageReducer,
  textTranslations: textReducer,
  permissions: permissionsReducer,
  recentTranslations: recentTranslationsReducer,
});

const store = createStore(reducer);
export default store;
