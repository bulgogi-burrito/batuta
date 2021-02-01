_convertToText = async (photo) => {
  try {
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        fd7af1c5aab3ad7c5a5f34b1a8ba2bae3ebcbadd,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: photo,
              },
              features: [
                {
                  type: `${
                    this.props.documentMode ? "DOCUMENT_" : ""
                  }TEXT_DETECTION`,
                  maxResults: 1,
                },
              ],
            },
          ],
        }),
      }
    );
    const responseJSON = await response.json();
    if (
      !(
        responseJSON &&
        responseJSON.responses &&
        responseJSON.responses[0] &&
        responseJSON.responses[0].fullTextAnnotation
      )
    ) {
      Alert.alert(
        "There was no readable text in your image. Please try again."
      );
    } else {
      const text = responseJSON.responses[0].fullTextAnnotation.text;
      console.log(text);
    }
  } catch (err) {
    console.error("An error occurred during text conversion:", err);
  }
};
