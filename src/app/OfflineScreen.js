import React, { Component } from 'react'
import {
  View, StyleSheet, TouchableOpacity, Text, NetInfo, Button, Modal, AsyncStorage,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../action/action';

class OfflineScreen extends Component {
  constructor() {
    super()
    this.state = {
      ModalVisibleStatus: true,
      name: '',
      email: '',
      isConnected: false
    }
  }
  ShowModalFunction(visible) {
    this.setState({ ModalVisibleStatus: visible });
  }
  navigate = () => {
    this.props.navigation.navigate('OnlineScreen');
    this.setState({ ModalVisibleStatus: false })
  }

  componentDidMount() {
    // this.getValueFromStorage();
    AsyncStorage.getItem('name').then((name) => this.setState({ 'name': name }));
    AsyncStorage.getItem('email').then((email) => this.setState({ 'email': email }));
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      const API_URL =
        "https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=";
      const API_KEY = "9b64bcfe576047ba8e5bb7fd24c9e526";
      let endPoint = `${API_URL}${API_KEY}`;
      this.props.getData(endPoint);
      this.setState({ name: '', email: '' });
      AsyncStorage.removeItem('name');
      AsyncStorage.removeItem('email');
    }
    this.setState({ isConnected, ModalVisibleStatus: isConnected });
  };
  setName = (name) => {
    AsyncStorage.setItem('name', name);
    this.setState({ name: name });
  };
  setEmail = (email) => {
    AsyncStorage.setItem('email', email);
    this.setState({ email: email });
  };
  // getValueFromStorage = () => {
  //   let keys = ['name', 'email'];
  //   AsyncStorage.multiGet(keys).then(result => {
  //     this.setState({
  //       name: result[0][1],
  //       email: result[1][1],
  //     });
  //   });
  // };
  saveText = () => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      const value1 = this.state.name;
      const value2 = this.state.email;
      let keys = [['name', value1], ['email', value2]];
      AsyncStorage.multiSet(keys, err => {
        this.setState({
          name: '',
          email: '',
        });
      });
    }

  };

  // clearText = () => {
  //   let keys = ['name', 'email'];
  //   AsyncStorage.multiRemove(keys, err => {
  //     this.getValueFromStorage();
  //   });
  // };
  render() {
    if (this.state.isConnected) {
      return (
        <View style={styles.container}>
          <Text>offline </Text>
          <Modal
            transparent={false}
            animationType={"slide"}
            visible={this.state.ModalVisibleStatus}
            onRequestClose={() => { }} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.ModalInsideView}>
                <Text style={styles.TextStyle}>Online Would you like to continue, with internet </Text>
                <TouchableOpacity style={styles.button} onPress={this.navigate}>
                  <Text style={styles.text}>
                    Click here for Online
                        </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Name"
            onChangeText={this.setName}
            value={this.state.name}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter Email"
            onChangeText={this.setEmail}
            value={this.state.email}
          />
          {/* <Text>
            Name: {this.state.name}
          </Text>
          <Text>
            Email: {this.state.email}
          </Text> */}
          <View style={{ flexDirection: 'row', marginTop: 50, }}>
            {/* <Button title="Clear" color="#841584" onPress={this.clearText} /> */}
            <Button title="Save" color="#841584" onPress={this.saveText} />
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    paddingHorizontal: '7%',
    paddingTop: '4%'
  },
  button: {
    backgroundColor: 'white',
    width: "40%",
    height: "5%",
    paddingHorizontal: 2,
    marginLeft: 10,
    marginTop: '20%'
  },
  ModalInsideView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00BCD4",
    height: 300,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  TextStyle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
    padding: 20,
    textAlign: 'center'
  },
  textInput: {
    margin: 15,
    height: 35,
    width: 200,
    borderWidth: 1,
    padding: 5,
  },
})

export default connect(null, { getData })(OfflineScreen);