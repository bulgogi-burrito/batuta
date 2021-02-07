export const addToRecents = (translationData) => {
  return {
    type: "ADD_NEW_TRANSLATION",
    translationData,
  };
};

let intialState = [];
// objs in recent translation array look like below
// { originalText: "",
//   source: "",
//   translatedText: "",
//   target: "",
// };

export default function recentTranslationsReducer(state = intialState, action) {
  switch (action.type) {
    case "ADD_NEW_TRANSLATION":
      const newState = [action.translationData, ...state];
      return newState;
    default:
      return state;
  }
}
