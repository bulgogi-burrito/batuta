import React from 'react'
import { connect } from 'react-redux';
import {Picker , View , Text } from 'react-native' ; 
import {changeSourceLang, changeTargetLang} from '../store/settings'


class Home extends React.Component {
    render () {
        return (
        <View> {'home'} </View>
        )
    }
}

export default Home ; 

    