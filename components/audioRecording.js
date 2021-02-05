import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem  from 'expo-file-system';
import { Asset } from 'expo-asset';
import {callGoogleSpeech} from './google'

function PlaySound(props) {
    const {uri} = props ; 
    const [sound, setSound] = React.useState();
  
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
         { uri }
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync(); }
  
    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);
  
    return (
      <View style={soundStyles.container}>
        <Button title="Play Sound" onPress={playSound} />
      </View>
    );
  }

  


export default function AudioRecording() {
  const [recording, setRecording] = React.useState();
  const [uri, setUri] = React.useState('');
  
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      let audioRequest = await Audio.requestPermissionsAsync();
      console.log('audio Request' , audioRequest) ; 
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording(); 
      const recordingOptions = {
        // android not currently in use, but parameters are required
        android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
    };
      await recording.prepareToRecordAsync(recordingOptions); 
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log( 'recording object after stop' ,recording) 
    console.log('Recording stopped and stored at', uri);
    setUri(uri)
    let base64 = await base64Convert(uri) ; 
    console.log('base64 convertion' , base64 ) ; 
    callGoogleSpeech(base64) ; 
  }

  async function base64Convert (uri) { 
    // Base64 encoding for reading & writing
    const options = { encoding: FileSystem.EncodingType.Base64 };
    // Read the audio resource from it's local Uri
    const data = await FileSystem.readAsStringAsync(uri, options);
    console.log('base64??' ,  data )
    return data ; 
  }
  return (
    <View style={styles.container}>
       { uri.length === 0 ?   (
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      /> ) :
        <PlaySound uri={uri} /> }
    </View>
  );
}

const soundStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 10,
    },
  });
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});