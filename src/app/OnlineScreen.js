import React,{Component} from 'react'
import {View, StyleSheet, TouchableOpacity,Text,NetInfo,Button,Modal} from 'react-native'

class OnlineScreen extends Component {
    constructor(){
        super()
        this.state = {
            ModalVisibleStatus: false,
          }
    }
    ShowModalFunction(visible) {
        this.setState({ModalVisibleStatus: visible});
      } 
    navigate = () =>{
        this.props.navigation.navigate('OfflineScreen');
        this.setState({ModalVisibleStatus:false})
    } 
    componentDidMount(){
          NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if(isConnected != true)
            {
                this.ShowModalFunction(true);
            }
          });  
    }
    render(){
        return(
     <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('OfflineScreen')}}>
                    <Text style={styles.text}>
                        Click here for Offline
                    </Text>
                </TouchableOpacity>
                <Modal
                    transparent={false}
                    animationType={"slide"}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.ModalInsideView}>
                    <Text style={styles.TextStyle}>Would you like to continue, with out internet </Text>
                    <TouchableOpacity style={styles.button} onPress={this.navigate}>
                        <Text style={styles.text}>
                            Click here for Offline
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
     </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
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
        marginLeft: 140
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
      }
})

export default OnlineScreen;