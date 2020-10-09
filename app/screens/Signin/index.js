import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ScrollView,
    Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import CommonStyles, { ColorMain, FontColor, FontSize, Height, LabelFontSize, Width, labelFontColor } from '../../assets/style';
import API from '../../lib/API';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk";

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setEmailState] = useState(false);
    const [isValidPassword, setPasswordState] = useState(false);
    const [isDisabled, setDisableState] = useState(true);
    const [isHidden, setHiddenState] = useState(true);
    const [spinner, setSpinnerState] = useState(false);

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setEmail(text);
            setEmailState(false);
            setDisableState(true);
        } else {
            setEmail(text);
            setEmailState(true);
            if (isValidPassword) {
                setDisableState(false);
            }
        }
    }

    const checkEmail = () => {
        // if (!isValidEmail) alert('Invalid Email!');
    }

    const checkEmptyPassword = (text) => {
        if (text.length >= 8) {
            setPasswordState(true);
            setPassword(text);
            if (isValidEmail) setDisableState(false);
        } else {
            setPassword(text);
            setPasswordState(false);
            setDisableState(true);
        }
    }

    const onSubmit = () => {
        setSpinnerState(true);
        API.post('/session',
            {
                user: {
                    email: email,
                    password: password
                }
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(res => {
                setSpinnerState(false);
                // console.log('result: ', res.data);
                Alert.alert('Signin Success!');
                analytics().logEvent('SignIn', {
                    contentType: 'SignIn',
                    status: 'Success',
                    email: email
                });
                AppEventsLogger.logEvent('SignInSuccess');
                // Input the component name what you wanna go as follows:
                navigation.navigate('Loan');
            }).catch(err => {
                setSpinnerState(false);
                analytics().logEvent('SignIn', {
                    contentType: 'SignIn',
                    status: 'Failed'
                });
                AppEventsLogger.logEvent('SignInFailed');
                if (err.response) {
                    // client received an error response (5xx, 4xx)
                    Alert.alert(err.response.data.errors[0]);
                } else if (err.request) {
                    // client never received a response, or request never left
                    // console.log('request', err.request)
                } else {
                    // anything else
                    // console.log('else ', err)
                }
            });
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <Spinner
                        visible={spinner}
                        textContent={'Login checking...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/1.png')}
                            style={{ width: Width * 0.6, height: Height * 0.3, resizeMode: 'stretch' }} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: Height * 0.04 }}>
                        <View style={{ width: Width * 0.75 }}>
                            <Text style={{ fontSize: LabelFontSize, fontFamily: "OpenSans-Regular", marginBottom: -10, paddingLeft: 5, color: labelFontColor }}>Email</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={text => validate(text)}
                                    onBlur={() => checkEmail()}
                                    value={email}
                                    autoCorrect={true}
                                    style={[
                                        styles.input,
                                        { marginTop: 10 }, { flex: 1 },
                                        isValidEmail ? { borderBottomColor: FontColor } : !email.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' }
                                    ]}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                                {isValidEmail &&
                                    <TouchableOpacity style={[{ borderBottomColor: FontColor }, styles.secure]}>
                                        <Image
                                            source={require('../../assets/icons/email_check.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                }
                                {!isValidEmail &&
                                    <TouchableOpacity
                                        style={[
                                            !email.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' },
                                            styles.secure
                                        ]}>
                                        <Image
                                            source={require('../../assets/icons/wrong.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            <Text style={{ fontSize: LabelFontSize, fontFamily: "OpenSans-Regular", marginBottom: -10, paddingLeft: 5, color: labelFontColor }}>Password</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    onChangeText={text => checkEmptyPassword(text)}
                                    value={password}
                                    secureTextEntry={isHidden}
                                    style={[
                                        styles.input, { marginTop: 10 },
                                        { flex: 1 },
                                        isValidPassword ? { borderBottomColor: FontColor } : !password.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' }
                                    ]}
                                    autoCapitalize='none'
                                />
                                {isHidden &&
                                    <TouchableOpacity
                                        style={[
                                            isValidPassword ? { borderBottomColor: FontColor } : !password.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' },
                                            styles.secure
                                        ]}
                                        onPress={() => setHiddenState(false)}
                                    >
                                        <Image
                                            source={require('../../assets/icons/hidden.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                }
                                {!isHidden &&
                                    <TouchableOpacity
                                        style={[
                                            isValidPassword ? { borderBottomColor: FontColor } : !password.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' },
                                            styles.secure
                                        ]}
                                        onPress={() => setHiddenState(true)}
                                    >
                                        <Image
                                            source={require('../../assets/icons/show.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                }
                                {!isValidPassword &&
                                    <TouchableOpacity
                                        style={[
                                            isValidPassword ? { borderBottomColor: FontColor } : !password.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' },
                                            styles.secure
                                        ]}>
                                        <Image
                                            source={require('../../assets/icons/wrong.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                }
                                {isValidPassword &&
                                    <TouchableOpacity
                                        style={[
                                            isValidPassword ? { borderBottomColor: FontColor } : !password.length ? { borderBottomColor: ColorMain } : { borderBottomColor: 'red' },
                                            styles.secure
                                        ]}>
                                        <Image
                                            source={require('../../assets/icons/email_check.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={[styles.buttonContainer, { paddingTop: Height * 0.3 }]}>
                            <TouchableOpacity
                                style={[styles.button, isDisabled ? { backgroundColor: '#96d4c9' } : { backgroundColor: '#3FB39D' }]}
                                disabled={isDisabled}
                                onPress={() => onSubmit()}
                            >
                                <Text style={{ color: 'white', fontSize: LabelFontSize, fontFamily: "OpenSans-Bold" }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                    <Text style={styles.SignUpButton}>I Need To Create an Account!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,
    spinnerTextStyle: {
        color: '#FFF'
    },
    buttonContainer: {
        width: Width * 0.8,
    },
    button: {
        padding: 6,
        borderRadius: Height * 0.06 * 0.15,
        textAlign: 'center',
        alignItems: "center",
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: Height * 0.07,
        marginBottom: Height * 0.02
    },
    SignUpButton: {
        color: 'blue',
        fontSize: LabelFontSize * 0.9,
        textDecorationLine: 'underline',
        fontFamily: "OpenSans-SemiBold"
    },
    secure: {
        paddingTop: FontSize * 0.2,
        marginTop: 9,
        height: FontSize * 1.54,
        width: FontSize * 1.5,
        borderBottomWidth: 1,
        alignItems: 'center'
    }
});


export default Signin;
