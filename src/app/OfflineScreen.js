import React,{Component} from 'react'
import {View, StyleSheet, TouchableOpacity,Text,NetInfo,Button,Modal, AsyncStorage,
    TextInput} from 'react-native'

class OfflineScreen extends Component {
    constructor(){
        super()
        this.state = {
            ModalVisibleStatus: false,name: '',
            email: '',
          }
    }
    ShowModalFunction(visible) {
        this.setState({ModalVisibleStatus: visible});
      } 
    navigate = () =>{
        this.props.navigation.navigate('OnlineScreen');
        this.setState({ModalVisibleStatus:false})
    } 
    componentDidMount(){
          this.getValueFromStorage();
    }
      setName = value => {
        this.setState({ name: value });
      };
      setEmail = value => {
        this.setState({ email: value });
      };
      getValueFromStorage = () => {
        let keys = ['name', 'email'];
        AsyncStorage.multiGet(keys).then(result => {
          this.setState({
            name: result[0][1],
            email: result[1][1],
          });
        });
      };
      saveText = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if(isConnected != true)
            {
                this.ShowModalFunction(true);
            }
            else {
                const value1 = this.state.name;
                const value2 = this.state.email;
                let keys = [['name', value1], ['email', value2]];
                AsyncStorage.multiSet(keys, err => {
                console.log('Value1' + value1 + ' ' + value2);
                this.setState({
                    name: value1,
                    email: value2,
                });
            });
            }
          });  
      };
    
      clearText = () => {
        let keys = ['name', 'email'];
        AsyncStorage.multiRemove(keys, err => {
          this.getValueFromStorage();
        });
      };
    render(){
        return(
     <View style={styles.container}>
                <Modal
                    transparent={false}
                    animationType={"slide"}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.ModalInsideView}>
                        <Text style={styles.TextStyle}>Offline Would you like to continue, with out internet </Text>
                        <TouchableOpacity style={styles.button} onPress={this.navigate}>
                            <Text style={styles.text}>
                                Click here for Offline
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Name"
                    text="bndsbbsdn"
                    onChangeText={this.setName}
                    />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Email"
                    onChangeText={this.setEmail}
                    />
                <Text>
                    Name: {this.state.name}
                </Text>
                <Text>
                    Email: {this.state.email}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 50, }}>
                <Button title="Clear" color="#841584" onPress={this.clearText} />
                <Button title="Save" color="#841584" onPress={this.saveText} />
                </View>
     </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray'
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
    ModalInsideView:{
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor : "#00BCD4", 
        height: 300 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      TextStyle:{
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
        padding:5,
      },
})

export default OfflineScreen;