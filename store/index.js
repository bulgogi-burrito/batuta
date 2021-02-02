import {combineReducers, createStore} from 'redux'
import LanguageReducer from './settings'  
import textReducer from './text'


const reducer = combineReducers({
    language : LanguageReducer , 
    textTranslations : textReducer
})

const store = createStore(reducer) ; 
export default store ; 