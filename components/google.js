import { Alert } from "react-native";
import { API_KEY } from "../secrets.js";

export async function callGoogleVision(image) {
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
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

  try {
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

    const text = result.responses[0].fullTextAnnotation.text
      .split("\n")
      .join(" ");
    return text;
  } catch (error) {
    Alert.alert("Please try again");
  }
}

export async function callGoogleTranslate(text, sourceLang, targetLang) {
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

export async function callGoogleSpeech(uri) {
  const API_URL = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;
  const body = {
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
      enableWordTimeOffsets: false,
    },
    audio: {
      content: uri,
    },
  };
  // curl -X POST --data-binary @OBJECT_LOCATION \
  // -H "Authorization: Bearer OAUTH2_TOKEN" \
  // -H "Content-Type: OBJECT_CONTENT_TYPE" \
  // "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o?uploadType=media&name=OBJECT_NAME"
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log("google speech res", result);
  // return result ;
}

export async function callGoogleLandmark(image) {
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            maxResults: 10,
            type: "LANDMARK_DETECTION",
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("callGoogleLandmark ===>", result);
    const landmark = result.responses[0].landmarkAnnotations[0].description;
    const latitude =
      result.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude;
    const longitude =
      result.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude;

    return { landmark, latitude, longitude };
  } catch (error) {
    Alert.alert("Please try again");
  }
}

export async function callGoogleObject(image) {
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "OBJECT_LOCALIZATION",
            maxResults: 10,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("callGoogleObject ===>", result);

    return result.responses[0].localizedObjectAnnotations[0].name;
  } catch (error) {
    Alert.alert("Please try again");
  }
}
