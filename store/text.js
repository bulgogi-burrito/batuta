
export const setTranslation = (originalText,translatedText)  => {
    return {
        type : 'NEW_TRANSLATION' , 
        originalText , 
        translatedText
    }
}

let intialState = {
    originalText : '' , 
    translatedText : '' 
}

export default function textReducer (state = intialState, action) {
    switch (action.type) {
        case 'NEW_TRANSLATION' :
            return { originalText: action.originalText , 
                     translatedText: action.translatedText } ; 
        default : return state
    }
}