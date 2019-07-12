import React,{Component} from 'react'
import {View, StyleSheet,Text} from 'react-native'

class OfflineScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.button}>
                    Offline Screen
                </Text>
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
    button: {
        color: 'black'
    }
})

export default OfflineScreen;