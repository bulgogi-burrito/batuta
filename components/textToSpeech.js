import * as React from 'react';
import { View, StyleSheet, Button,Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function TextToSpeech (props) {
    const {originalText , sourceLang ,translatedText, targetLang} = props ; 
    console.log('translation language inside TextToSpeech' , targetLang) ; 
      return (
        <View>
          <Button title={'say original'} onPress={() => Speech.speak(originalText ,
                {
                language: sourceLang } 
                )} />
          <Button title={'say Translation'} onPress={() => Speech.speak(translatedText ,
                {
                language: targetLang } 
                )} />
        </View>
      );
    }
