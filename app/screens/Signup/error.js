import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import CommonStyles, { FontSize, Width } from '../../assets/style';
const error = ({ navigation }) => {
    return (
        <>
            <View style={[styles.myView,{justifyContent:'center'}]}>
                <View>
                    <ScrollView>
                        <View>
                        <Text style={[styles.bodyTextBold, {textAlign:'center', paddingBottom:20}]}>Uh oh! It looks like you encountered some errors:</Text>
                        <Text style={[styles.bodyText, { color: 'red', textAlign: 'justify', paddingLeft:20,  }]}>
                                        -This phone number has already been registered with the email address vincent********@fig.com. Please 'Sign in' using that email address. Our system does not allow multiple accounts to share phone numbers. Email service@figloans.com if you need more information
                        </Text>
                        </View>
                        <View style={{height:Width*0.3}}/>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Phone')}
                                style={[styles.button, { backgroundColor: '#FFFFFF' }]}
                            >
                                <Text style={[styles.buttonText, { color: '#3399ff' }]}>Dismiss</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,

    buttonContainer: {
        alignItems: "center",
        height: 50,
        marginTop: FontSize,
    },
    button: {
        borderRadius: 15,
        textAlign: 'center',
        alignItems: "center",
        width: '80%',
        backgroundColor: '#53c653',
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: FontSize,
        color: 'white',
    },
});


export default error;
