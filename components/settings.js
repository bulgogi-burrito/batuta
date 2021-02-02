import React from "react";
import { connect } from "react-redux";
import { Picker, View, Button, Text } from "react-native";
import { changeSourceLang, changeTargetLang } from "../store/settings";
import Home from "./home";
import SetLanguage from "./setLanguage";
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

class Settings extends React.Component {
  render() {
    const { sourceLang, targetLang } = this.props;
    console.log('source' , sourceLang) ; 
    console.log('target' , targetLang) ; 
    return (
      <View>
        <Text>FROM: </Text>
        <SetLanguage
          initialValue={sourceLang}
          selectedValue={sourceLang}
          changeLang={(language) => this.props.changeSource(language)}
          style={{ width: "100%" }}
        />
        <Text>TO: </Text>
        <SetLanguage
          initialValue={targetLang} 
          selectedValue={targetLang}
          changeLang={(language) => this.props.changeTarget(language)}
          style={{ width: "100%" }}
        />

        <GoToButton screenName="Home" />
      </View>
    );
  }
}

const mapState = (state) => {
  return {
    sourceLang: state.language.sourceLang,
    targetLang: state.language.targetLang,
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeSource: (newSource) => {
      dispatch(changeSourceLang(newSource));
    },
    changeTarget: (newTarget) => {
      dispatch(changeTargetLang(newTarget));
    },
  };
};

export default connect(mapState, mapDispatch)(Settings);
