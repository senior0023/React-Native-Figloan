import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import CommonStyles, {LabelFontSize, bankButtonColor } from '../assets/style';

const BankFooter = ({onsubmit}) => {

    return (
        <>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>By selecting "Continue" you agree to the </Text>
                <Text style={[styles.footerText,{textDecorationLine: 'underline',marginTop: 0,}]}>
                    Plaid End User Privacy Policy
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        //  onPress={() => checkContine()}
                        style={styles.button}
                        onPress={onsubmit}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,
    footerContainer: {
        alignSelf:'center',
        marginTop: 20,

    },
    buttonContainer:{
        alignItems:"center",
        justifyContent:"center",
        height:50,
    },
    button: {
        padding: 10,
        borderRadius:10,
        textAlign:'center',
        width:'120%',
        backgroundColor: bankButtonColor,
    },
    buttonText:{
        fontSize:LabelFontSize,
        color:'white',
        textAlign:'center',
        fontFamily: "OpenSans-Regular",
    },
    footerText:{
        fontSize:LabelFontSize*0.7,
        textAlign:'center',
        marginTop: LabelFontSize,
        fontFamily: "OpenSans-Regular",
        color:'#a0a2a5'
    }

});


export default BankFooter;
