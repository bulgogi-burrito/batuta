export const addToRecents = (translationData) => {
  return {
    type: "ADD_NEW_TRANSLATION",
    translationData,
  };
};

let intialState = [];
// input object schema
// {
//   id:
//   content_type: ["image", "audio", "text"]
//   input_content:
//   input_text:
//   source_language:
//   translated_text:
//   target_language:
// }

export default function recentTranslationsReducer(state = intialState, action) {
  switch (action.type) {
    case "ADD_NEW_TRANSLATION":
      const newState = [action.translationData, ...state];
      return newState;
    default:
      return state;
  }
}
