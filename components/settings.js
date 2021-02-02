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
    return (
      <View>
        <Text>FROM: </Text>
        <SetLanguage
          initialValue={sourceLang}
          changeLang={(language) => this.props.changeSource(language)}
          style={{ width: "100%" }}
        />
        <Text>TO: </Text>
        <SetLanguage
          initialValue={targetLang}
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
    sourceLang: state.sourceLang,
    targetLang: state.targetLang,
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
