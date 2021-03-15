import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { changeSourceLang, changeTargetLang } from "../../store/settings";
import SetLanguage from "./setLanguage";
import { Entypo } from "@expo/vector-icons";
import { Styles } from "../utils";

class Settings extends React.Component {
  render() {
    const { sourceLang, targetLang } = this.props;
    console.log("source", sourceLang);
    console.log("target", targetLang);
    return (
      <View style={Styles.container}>
        <SetLanguage
          initialValue={sourceLang}
          selectedValue={sourceLang}
          changeLang={(language) => this.props.changeSource(language)}
          style={{ width: "100%" }}
        />

        <Entypo name="select-arrows" size={50} color="black" />

        <SetLanguage
          initialValue={targetLang}
          selectedValue={targetLang}
          changeLang={(language) => this.props.changeTarget(language)}
          style={{ width: "100%" }}
        />
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
