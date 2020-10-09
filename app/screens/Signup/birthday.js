import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk";

import DateTimePicker from '@react-native-community/datetimepicker';
import CommonStyles, { FontColor, FontSize, labelFontColor } from '../../assets/style';
import SignupHeader from '../../components/signup_header';
import SignupFooter from '../../components/signup_footer';
import API from '../../lib/API';

const birthday = ({ name, navigation }) => {
    const [birthday, setBirthday] = useState('');
    const [focusBirthday, setFocursBirthday] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    const [date, setDate] = useState(new Date('01/01/1990'));
    const [show, setShow] = useState(false);
    const [isActivate, setActivate] = useState(false)
    const [spinner, setSpinnerState] = useState(false)
    const onback = () => {
        navigation.navigate('Signup');
    }
    const end = (date) => {
        if (dateValidation(date)) {
            date = fomart(date);
            setBirthday(date);
            setDate(new Date(date));
            setActivate(true);
        } else {
            setBirthday('')
            setDate(new Date('01/01/1990'));
            setActivate(false);
        }
    }
    const change = (date) => {
        setBirthday(date);
        if (dateValidation(date)) setActivate(true);
        else setActivate(false);
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (event.type == 'dismissed') return;
        setBirthday(formatDate(currentDate));
        setActivate(true);
    };
    const showMode = () => {
        setShow(true);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const formatDate = (date) => {
        return `${(date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)}/${date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()}/${date.getFullYear()}`;
    };
    const dateValidation = date => {
        const defaultDate = [0, 31, 29, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30]
        const [m, d, y] = date.split("/");
        if (y * 1 < (new Date().getFullYear() - 18) && y * 1 > 1910 && (y * 1) % 1 == 0) {
            if (m * 1 >= 1 && m * 1 < 13 && ((m * 1) % 1 == 0)) {
                if (d * 1 >= 1 && d * 1 <= defaultDate[m * 1] && ((d * 1) % 1 == 0)) {
                    if (m * 1 != 2 || d * 1 < 29) return true;
                    if ((!(y % 4) && y % 100) || !(y % 400)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    const fomart = date => {
        const [m, d, y] = date.split("/");
        let [mm, dd, yy] = [m * 1, d * 1, y * 1];
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        const birth = [mm, dd, yy].join("/");
        return birth;
    }
    const onsubmit = () => {
        setSpinnerState(true);
        let birth = fomart(birthday);
        setBirthday(birth);
        API.post('/birthday',
            {
                email: API.email,
                token: API.token,
                birthday: {
                    birthday: birth
                },
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                setSpinnerState(false);
                analytics().logEvent('BirthDay', {
                    contentType: 'BirthDay',
                    status: 'Success',
                    email: API.email
                });
                AppEventsLogger.logEvent('BirthDaySuccess');
                navigation.navigate("Phone");
            }).catch(err => {
                setSpinnerState(false);
                analytics().logEvent('BirthDay', {
                    contentType: 'BirthDay',
                    status: 'Error'
                });
                AppEventsLogger.logEvent('BirthDayFailed');
                if (err.response) {
                    // client received an error response (5xx, 4xx)
                    console.log('response', err.response.data.errors[0])
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
            <View style={[styles.myView, { justifyContent: 'flex-start', alignItems: 'stretch' }]}>
                <Spinner
                    visible={spinner}
                    textContent={'checking...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={styles.headerContainer}>
                    <SignupHeader title={'Basic Information'} progress={40} onback={onback} isBack={true} />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                        minimumDate={new Date("1910-01-01")}
                        maximumDate={
                            new Date(
                                new Date().getFullYear() - 18,
                                new Date().getMonth(),
                                new Date().getDay()
                            )
                        }
                    // dateFormat="dayofweek day month"
                    />
                )}
                <ScrollView style={styles.bodyContainer}>
                    <View style={styles.bodyContainer_body}>
                        <View style={{ height: 30 }} />
                        <Text style={styles.bodyTextBold}>Thanks {name}</Text>
                        <Text style={styles.bodyText}>What is the your date of birth?</Text>
                        <View style={styles.bodyContainer_input}>
                            {!(birthday == '' && !focusBirthday) &&
                                <Text style={[styles.label, focusBirthday ? { color: FontColor } : { color: labelFontColor }]}
                                // style =}
                                >Birthday(MM/DD/YYYY)</Text>
                            }
                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <TextInput
                                        // editable = {false}
                                        onChangeText={(date) => change(date)}
                                        value={birthday}
                                        type={'date'}
                                        placeholder={focusBirthday ? '' : 'MM/DD/YYYY'}
                                        autoCorrect={true}
                                        style={[styles.input, { flex: 1 }, focusBirthday ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}
                                        onFocus={() => { setFocursBirthday(true); setIsFocus(true) }}
                                        onBlur={(event) => { setFocursBirthday(false); setIsFocus(false) }}
                                        onEndEditing={(event) => end(event.nativeEvent.text)}
                                        autoCapitalize='none'
                                    />
                                    <TouchableOpacity onPress={showDatepicker} style={[styles.calendar, focusBirthday ? { borderBottomColor: FontColor } : { borderBottomColor: '#d7dbdb' }]}>
                                        <Image
                                            source={require('../../assets/icons/calendar.png')}
                                            style={{ width: FontSize * 0.8, height: FontSize * 0.8 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
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
        paddingTop: 50,
        paddingBottom: 120,
    },
    calendar: {
        paddingTop: FontSize * 0.2,
        marginTop: 30,
        height: FontSize * 1.5,
        width: FontSize * 1.5,
        borderBottomWidth: 1,
        alignItems: 'center'
    }
});

export default birthday;
