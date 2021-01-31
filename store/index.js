import {createStore} from 'redux'
import LanguageReducer from './settings'  

let store = createStore(LanguageReducer) ; 
export default store ; 