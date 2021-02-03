import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, } from "react-native";
import { useNavigation } from "@react-navigation/native";

function GoToButton({ screenName }) {
    const navigation = useNavigation();
    return (
      <Button
        title={`Go to ${screenName}`}
        onPress={() => navigation.navigate(screenName)}
      />
    );
  }


function TranslatedText (props) {
    let {originalText, translatedText, result} = props ; 
    console.log('original' , originalText) ; 
    console.log('translated' , translatedText) ; 
    console.log('result' , result) ; 
    if ( result !== translatedText ) return (
      <View> 
        <Text>Loading Translation</Text> 
      </View> )
    else return (
        <View>
            <Text> {originalText} </Text>
            <Text>  {translatedText} </Text>
            <GoToButton screenName="Home" />
            <GoToButton screenName="Camera" />
        </View>
    )
}


const mapState = (state) => {
    return {
        originalText : state.textTranslations.originalText , 
        translatedText : state.textTranslations.translatedText
    }
} 

export default connect(mapState)(TranslatedText)