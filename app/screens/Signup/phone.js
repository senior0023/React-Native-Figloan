import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk";

import CommonStyles, { FontColor, LabelFontSize, labelFontColor } from '../../assets/style';

import SignupHeader from '../../components/signup_header';
import SignupFooter from '../../components/signup_footer';
import API from '../../lib/API';

const phone = ({ navigation }) => {
    const [phone, setPhone] = useState('1')
    const [focusPhone, setFocursPhone] = useState(false)
    const [isActivate, setActivate] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [spinner, setSpinnerState] = useState(false)
    const focus = (value) => {
        setFocursPhone(true)
        setIsFocus(true)
    }
    const blur = (value) => {
        setFocursPhone(false)
        setIsFocus(false)
    }
    const validatePhone = phone => {
        const onlyNums = /^[0-9]*$/;
        if (phone.length === 11 && phone[0] === "1") {
            phone = phone.slice(1);
        }
        if (phone.length !== 10 || !onlyNums.test(phone)) {
            return false;
        }
        return true;
    };
    const onback = () => {
        navigation.navigate('Birthday');
    }
    const change = (data) => {
        setPhone(data);
        setActivate(validatePhone(data));
    }
    const onsubmit = () => {
        setSpinnerState(true);
        API.post('/phone',
            {
                email: API.email,
                token: API.token,
                phone_number:
                {
                    phone_number: phone
                },

            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                setSpinnerState(false);
                analytics().logEvent('Phone', {
                    contentType: 'Phone',
                    status: 'Success',
                    email: API.email
                });
                AppEventsLogger.logEvent('PhoneSuccess');
                navigation.navigate("Bank");
            }).catch(err => {
                setSpinnerState(false);
                analytics().logEvent('Phone', {
                    contentType: 'Phone',
                    status: 'Error',
                    email: API.email
                });
                AppEventsLogger.logEvent('PhoneFailed');
                if (err.response) {
                    navigation.navigate("Error");
                } else if (err.request) {
                    // client never received a response, or request never left
                    console.log('request', err.request)
                } else {
                    // anything else
                    console.log('else ', err)
                }
            });
    }
    return (
        <>
            <View style={styles.myView}>
                <Spinner
                    visible={spinner}
                    textContent={'checking...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={styles.headerContainer}>
                    <SignupHeader title={'Basic Information'} progress={80} onback={onback} isBack={true} />
                </View>
                <ScrollView style={styles.bodyContainer}>
                    <View style={[styles.bodyContainer_Text, { paddingTop: 30 }]}>
                        <Text style={styles.bodyTextBold}>What's your phone number?</Text>
                        <Text style={styles.bodyText}>We'll text you to notify you of a decision and help you service your loan</Text>
                    </View>
                    <View style={[styles.bodyContainer_body]}>
                        <View style={styles.bodyContainer_input}>
                            {!(phone == '' && !focusPhone) &&
                                <Text style={[styles.label, focusPhone ? { color: FontColor } : { color: labelFontColor }]}>
                                    Mobile Number
                                </Text>
                            }
                            <TextInput
                                onChangeText={text => change(text)}
                                value={phone}
                                type={'date'}
                                placeholder={focusPhone ? '' : 'Mobile Number'}
                                autoCorrect={true}
                                style={[styles.input, { marginTop: 15 }, focusPhone ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}
                                onFocus={() => focus()}
                                onBlur={() => blur()}
                                keyboardType={"phone-pad"}
                                autoCapitalize='none'
                            />
                            <Text style={[{ color: FontColor }, { fontSize: LabelFontSize * 0.8 }, { paddingLeft: 5 }]}>We've filled in the country code for you.</Text>
                        </View>
                    </View>
                </ScrollView>
                {isFocus && <></>}
                {!isFocus &&
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <SignupFooter isActivate={isActivate} isText={false} buttonText={'Continue'} onsubmit={onsubmit} />
                    </View>
                }
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,
    bodyContainer_input: {
        paddingBottom: 140,
    }
});


export default phone;
