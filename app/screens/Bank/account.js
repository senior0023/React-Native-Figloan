import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk";

import SignupHeader from '../../components/signup_header';
import API from '../../lib/API';
import CommonStyles, { FontSize, LabelFontSize, Height } from '../../assets/style';


const account = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [spinner, setSpinnerState] = useState(false)
    const press = () => {
        setModalVisible(false);
        navigation.navigate('information');
    }
    const submit = () => {
        setSpinnerState(true);
        API.post('/bank_info',
            {
                email: API.email,
                token: API.token,
                bank: {
                    account_number: "123499182",
                    routing_number: "129818383",
                    amt: 300
                },

            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                setSpinnerState(false);
                analytics().logEvent('BankAccount', {
                    contentType: 'BankAccount',
                    status: 'success',
                    email: API.email
                });
                AppEventsLogger.logEvent('BankAccountSuccess');
                setSuccessVisible(true)
                // navigation.navigate("Phone");
            }).catch(err => {
                setSpinnerState(false);
                analytics().logEvent('BankAccount', {
                    contentType: 'BankAccount',
                    status: 'error',
                    email: API.email
                });
                AppEventsLogger.logEvent('BankAccountFailed');
                if (err.response) {
                    // client received an error response (5xx, 4xx)
                    // console.log('response',err.response.data.errors[0])
                    setModalVisible(true);
                } else if (err.request) {
                    // client never received a response, or request never left
                    console.log('request', err.request)
                } else {
                    // anything else
                    console.log('else ', err)
                }
            });

    }
    const onback = () => {
        navigation.navigate('verification');

    }

    return (
        <>
            <View style={[styles.myView]}>
                <Spinner
                    visible={spinner}
                    textContent={'checking...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={styles.headerContainer}>
                    <SignupHeader title={'Bank Verification'} progress={0} onback={onback} isBack={false} />
                </View>
                <ScrollView style={styles.bodyContainer}>
                    <View style={styles.bodyContainer_body}>
                        <Text style={[styles.bodyTextBold, { color: '#2f8c94', textAlign: 'center' }]}>Verify Your Bank Account</Text>
                        <Text style={[styles.bodyText, { textDecorationLine: 'underline', color: '#ff884d', textAlign: 'center' }]}>what is this?</Text>
                        <TouchableOpacity onPress={submit}>
                            <View style={styles.linkBank}>
                                <Text style={styles.linkBankText}>Link Your Bank Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.errorVerification}>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#ffaa80', '#ffeee6']}
                                    style={{ padding: 15, alignItems: 'center', borderRadius: 5, width: '100%' }}>
                                    <Text style={styles.errorVerificationHeader}>
                                        Unsuccuessful Verification
                                    </Text>
                                    <Text style={styles.errorVerificationBody}> You must complete bank verification.
                                        Please try again or use the Backup Verification Link</Text>
                                </LinearGradient>
                                <View style={styles.errorVerificatinFooter}>
                                    <TouchableOpacity onPress={() => press()} style={{ width: 290 }}>
                                        <Text style={{ textAlign: 'center', color: '#66a3ff', fontSize: LabelFontSize * 0.9 }}>Dismiss</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={successVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.errorVerification}>
                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['#ffaa80', '#ffeee6']}
                                    style={{ padding: 15, alignItems: 'center', borderRadius: 5, width: '100%' }}>
                                    <Text style={styles.errorVerificationHeader}>
                                        Completed Verification
                                    </Text>
                                    <Text style={styles.errorVerificationBody}> You completed bank verification.
                                        Please login the Figloan Site</Text>
                                </LinearGradient>
                                <View style={styles.errorVerificatinFooter}>
                                    <TouchableOpacity onPress={() => press()} style={{ width: 290 }}>
                                        <Text style={{ textAlign: 'center', color: '#66a3ff', fontSize: LabelFontSize * 0.9 }}>Dismiss</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,

    linkBank: {
        height: FontSize * 3,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#ff884d',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    linkBankText: {
        color: 'white',
        fontSize: LabelFontSize,
    },
    errorVerification: {
        alignItems: 'center',
        width: '100%',
    },
    errorVerificationHeader: {
        fontFamily: "OpenSans-Bold",
        fontSize: LabelFontSize,
        textAlign: 'center',
    },
    errorVerificationBody: {
        fontSize: LabelFontSize * 0.8,
        textAlign: 'justify',
        fontFamily: "OpenSans-Regular",
    },
    errorVerificatinFooter: {
        borderTopColor: '#adad85',
        borderTopWidth: 1,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#ffeee6',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '75%',
        alignSelf: 'center',
        marginTop: Height / 2 - 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 50,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
export default account;
