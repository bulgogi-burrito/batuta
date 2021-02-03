import { API_KEY } from "../secrets.js";

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export async function callGoogleVision (image, sourceLang, targetLang) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log("callGoogleVision -> result", result);

  const text = result.responses[0].fullTextAnnotation.text.split("\n").join(" ");
  return text ; 
}

export async function callGoogleTranslate (text, sourceLang, targetLang) {
  const API_URL2 = `https://translation.googleapis.com/language/translate/v2?q=${text}&source=${sourceLang}&target=${targetLang}&format=text&key=${API_KEY}`;

  let response2 = await fetch(API_URL2, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  response2 = await response2.json();
  console.log(text);
  console.log(response2);

  return response2.data.translations[0].translatedText;
}