import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {Icon} from "react-native-elements"

import CommonStyles, {FontColor, labelFontColor} from '../../assets/style';

import SignupHeader from '../../components/signup_header';
import SignupFooter from '../../components/signup_footer';

const Information = ({navigation}) => {
  const [account, setAccount] = useState('')
  const [routing, setRouting] = useState('')
  const [focusAccount, setFocusAccount] = useState(false)
  const [focusRouting, setFocusRouting] = useState(false)
  const [isActivate, setActivate] = useState(false)
  const [isFocus, setIsFocus]=useState(false)

  const onback = () => {
    navigation.navigate('Phone');
  }
  const focus = (value) => {
    if (value == 'account') setFocusAccount(true)
    if (value == 'routing') setFocusRouting(true)
    setIsFocus(true)
  }
  const blur = (value) => {
    if (value == 'account') setFocusAccount(false)
    if (value == 'routing') setFocusRouting(false)
    setIsFocus(false)
  }
  const change = (name, value) => {
    if (name == 'account') setAccount(value)
    if (name == 'routing') setRouting(value)
    if (account.length && routing.length) setActivate(true)
    else setActivate(false)
  }
  const onsubmit = () => {
    navigation.navigate('verification', {'account': account, 'routing': routing});
  }
  return (
    <>
      <View style={styles.myView}>
        <View style={styles.headerContainer}>
          <SignupHeader title={'Bank Information'} progress={95} onback={onback} isBack={true}/>
        </View>
        <ScrollView>
          <View style={styles.bodyContainer_Text}>
            <Text style={styles.bodyTextBold}>Your Bank Information</Text>
            <Text style={[styles.bodyText, {textAlign: 'justify', height:120}]}>Provide the bank account you would like funds
              deposited into. It should be a checking account.{"\n"}We do not accept prepaid cards at this time.{"\n"}Please
              double check these numbers as mistakes result in 5 business day delay.</Text>
          </View>
          <View style={styles.bodyContainer_body}>
            <View style={styles.bodyContainer_input}>
              {!(account == '' && !focusAccount) &&
              <Text style={[styles.label, focusAccount ? {color: FontColor} : {color: labelFontColor}]}>
                Account Number
              </Text>
              }
              <TextInput
                onChangeText={text => change('account', text)}
                value={account}
                placeholder={focusAccount ? '' : 'Account Number'}
                autoCorrect={true}
                style={[styles.input,{marginTop:10}, focusAccount ? {borderBottomColor: FontColor} : {borderBottomColor: '#d7dbdb'}]}
                onFocus={() => focus('account')}
                onBlur={() => blur('account')}
                keyboardType={"number-pad"}
                autoCapitalize='none'
              />
              {!(routing == '' && !focusRouting) &&
              <Text style={[styles.label, focusRouting ? {color: FontColor} : {color: labelFontColor}]}>
                Routing Number
              </Text>
              }
              <TextInput
                onChangeText={text => change('routing', text)}
                value={routing}
                placeholder={focusRouting ? '' : 'Routing Number'}
                style={[styles.input, {marginTop:10}, focusRouting ? {borderBottomColor: FontColor} : {borderBottomColor: '#d7dbdb'}]}
                onFocus={() => focus('routing')}
                onBlur={() => blur('routing')}
                keyboardType={"number-pad"}
                autoCapitalize='none'
              />
            </View>
            <View style={{flexDirection:'row', paddingBottom:15}}>
              <Icon name={'help-outline'} color={'#3fb29d'}></Icon>
              <Text style={{color:'#3fb29d', textAlignVertical:'center', justifyContent: 'center', flex: 1}}>
                 How do I find my account and routing number?
              </Text>
            </View>
          </View>
        </ScrollView>
        {isFocus && <></>}
        {!isFocus &&
        <View style={{width:'100%', alignItems:'center'}}>

          <SignupFooter isActivate={isActivate} onsubmit={onsubmit} isText={false} buttonText={'Link your bank account'}/>
        </View>
        }
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  ...CommonStyles,
});


export default Information;
