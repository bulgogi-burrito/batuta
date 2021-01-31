
export const changeSourceLang = (newSource) => {
    return {
        type : 'NEW_SOURCE' , 
        newSource   
    }
}

export const changeTargetLang = (newTarget) => {
    return {
        type : 'NEW_TARGET' , 
        newTarget   
    }
}

let initialState = {
    sourceLang : 'en' , 
    targetLang : 'ko'
}

export default function LanguageReducer (state = initialState , action) {
    switch (action.type) {
        case 'NEW_TARGET' :
            return {...state , targetLang : action.newTarget } ; 
        case 'NEW_SOURCE' :
            return {...state , sourceLang : action.newSource } ;      
        default : return state
    }
}