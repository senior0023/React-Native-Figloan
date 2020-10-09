import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@react-native-firebase/analytics';
import {AppEventsLogger} from "react-native-fbsdk";

import CommonStyles, { FontColor, FontSize, labelFontColor } from '../../assets/style';
import SignupHeader from '../../components/signup_header';
import SignupFooter from '../../components/signup_footer';
import API from '../../lib/API';

const Welcome = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusCode, setFocusCode] = useState(false)
    const [isSecured, setSecure] = useState(true)
    const [isActivate, setActivate] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [spinner, setSpinnerState] = useState(false)

    const onsubmit = () => {
        setSpinnerState(true);
        API.post('/signup',
            {
                user: {
                    email: email,
                    password: password,
                    password_confirmation: password,
                    referral_code: code
                }
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(res => {
                setSpinnerState(false);
                analytics().logEvent('SignUp', {
                    contentType: 'SignUp',
                    status: 'Success',
                    email: email
                });
                AppEventsLogger.logEvent('SignUpSuccess');
                API.email = res.data.email;
                API.token = res.data.api_token;
                navigation.navigate("Birthday");
            }).catch(err => {
                setSpinnerState(false);
                analytics().logEvent('SignUp', {
                    contentType: 'SignUp',
                    status: 'Failed'
                });
                AppEventsLogger.logEvent('SignUpFailed');
                if (err.response) {
                    Alert.alert(err.response.data.errors[0]);
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            });

    }
    const onback = () => {
        navigation.navigate('Loan');
    }

    const focus = (value) => {
        if (value == 'email') setFocusEmail(true)
        if (value == 'password') setFocusPassword(true)
        if (value == 'code') setFocusCode(true)
        setIsFocus(true)
    }
    const blur = (value) => {
        if (value == 'email') setFocusEmail(false)
        if (value == 'password') setFocusPassword(false)
        if (value == 'code') setFocusCode(false)
        setIsFocus(false)
    }
    const validateEmail = email => {
        var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return re.test(String(email).toLowerCase());
    };
    const validatePassword = password => {
        var re = /(?=.{8,})(?=.*[0-9])(?=.*[a-zA-Z])/;
        return re.test(String(password).toLowerCase());
    };
    const end = (name, value) => {
        if (name == 'email') setEmail(value);
        else setPassword(value);
        let pass = (name == 'password') ? value : password;
        if (validatePassword(pass) && validateEmail(email)) setActivate(true)
        else setActivate(false);
    }
    return (
        <>
            <View style={styles.myView}>
                <Spinner
                    visible={spinner}
                    textContent={'checking...'}
                    textStyle={{color: '#FFF'}}
                />
                <View style={styles.headerContainer}>
                    <SignupHeader title={'Sign Up'} progress={10} onback={onback} isBack={true} />
                </View>
                <ScrollView>
                    <View style={[styles.bodyContainer_body, { paddingTop: 30 }]}>
                        <Text style={[styles.bodyTextBold, { height: FontSize * 2 }]}>Welcome to Fig!</Text>
                        <Text style={styles.bodyText}>create an account to get started.</Text>
                        <View>
                            <View>
                                {!(email == '' && !focusEmail) &&
                                    <Text style={[styles.label, focusEmail ? { color: FontColor } : { color: labelFontColor }]}>
                                        Email
                                </Text>
                                }
                                <TextInput
                                    onChangeText={text => end('email', text)}
                                    value={email}
                                    placeholder={focusEmail ? '' : 'Email'}
                                    autoCorrect={true}
                                    style={[styles.input, { marginTop: 10 }, focusEmail ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}
                                    onFocus={() => focus('email')}
                                    onBlur={() => blur('email')}
                                    keyboardType={"email-address"}
                                    autoCapitalize='none'

                                />
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                {!(password == '' && !focusPassword) &&
                                    <Text style={[styles.label, focusPassword ? { color: FontColor } : { color: labelFontColor }]}>
                                        Password
                                </Text>
                                }
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            onChangeText={text => end('password', text)}
                                            value={password}
                                            placeholder={focusPassword ? '' : 'Password'}
                                            secureTextEntry={isSecured}
                                            style={[styles.input, { marginTop: 10 }, { flex: 1 }, focusPassword ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}
                                            onFocus={() => focus('password')}
                                            onBlur={() => blur('password')}
                                            autoCapitalize='none'
                                        />
                                        {isSecured &&
                                            <TouchableOpacity onPress={() => setSecure(false)} style={[styles.secure, { marginTop: 9 }, focusPassword ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}>
                                                <Image
                                                    source={require('../../assets/icons/unshown.png')}
                                                    style={{ width: FontSize * 0.8, height: FontSize * 0.8, marginTop: 10 }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        {!isSecured &&
                                            <TouchableOpacity onPress={() => setSecure(true)} style={[styles.secure, { marginTop: 9 }, focusPassword ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}>
                                                <Image
                                                    source={require('../../assets/icons/shown.png')}
                                                    style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                                />
                                            </TouchableOpacity>
                                        }

                                    </View>
                                </View>
                                {((!validatePassword(password) && password.length != 0) || (password.length == 0 && focusPassword)) &&
                                    <Text style={styles.passwordAlarm}>Must have at least 8 characters and 1 number</Text>
                                }
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                {!(code == '' && !focusCode) &&
                                    <Text style={[styles.label, focusCode ? { color: FontColor } : { color: labelFontColor }]}
                                    // style =}
                                    >Referral Code (Optional)</Text>
                                }
                                <TextInput
                                    onChangeText={text => setCode(text)}
                                    value={code}
                                    placeholder={focusCode ? '' : 'Referral Code (Optional)'}
                                    autoCorrect={true}
                                    style={[styles.input, { marginTop: 10 }, focusCode ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}
                                    onFocus={() => focus('code')}
                                    onBlur={() => blur('code')}
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {isFocus && <></>}
                {!isFocus &&
                    <View style={{ width: '100%', alignItems: 'center' }}>

                        <SignupFooter isActivate={isActivate} onsubmit={onsubmit} isText={true} buttonText={'Continue'} />
                    </View>
                }
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,
    secure: {
        paddingTop: FontSize * 0.2,
        marginTop: 30,
        height: FontSize * 1.54,
        width: FontSize * 1.5,
        borderBottomWidth: 1,
        alignItems: 'center'
    }
});


export default Welcome;
