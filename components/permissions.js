import React from "react";
import { connect } from "react-redux";
import { Button, Text, View } from "react-native";
import {updateCameraPermission} from '../store/permissions'
import * as ImagePicker from "expo-image-picker";

function Permissions (props) {
    const {setCameraPermission, type} = props ; 
    const askPermissionsCamera = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
             
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        } else {
            setCameraPermission(true);
        }
      };
    return (
        <Button onPress={askPermissionsCamera} title='ask permissions'/>
        // <View><Text>hello</Text></View>
    )
}
const mapDispatch = (dispatch) => {
    return {
        setCameraPermission : (res) => dispatch(updateCameraPermission(res)) 
    }
}

export default connect(null,mapDispatch)(Permissions) ;  