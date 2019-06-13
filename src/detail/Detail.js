import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ToastAndroid,
  Keyboard,
  WebView
} from "react-native";
// import styles from "./style";
const media = Dimensions.get("window");

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`,
    };
  };
  constructor(props) {
    super(props);
  }
  render() {
    const {url} = this.props.navigation.state.params;
    return (
      <WebView source={{ uri: url}} style={{ flex: 1 }} startInLoadingState={true} javaScriptEnabled={true} allowUniversalAccessFromFileURLs={true} thirdPartyCookiesEnabled={true}/>
    );
  }
}
