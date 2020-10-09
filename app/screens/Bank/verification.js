import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import CommonStyles, {Height, FontSize, LabelFontSize} from '../../assets/style';

import SignupHeader from '../../components/signup_header';
import BankFooter from '../../components/bank_footer';

const verification = ({route, navigation}) => {
  const [isSecured, setSecure] = useState(true)
  const [isPrivate, setPrivate] = useState(true)
  const onback = () => {
    navigation.navigate('information');
  }
  const onsubmit = () => {
    const {account, routing} = route.params;
    navigation.navigate('account', {'account': account, 'routing': routing});
  }
  return (
    <>
      <View style={styles.myView}>
        <View style={styles.headerContainer}>
          <SignupHeader title={'Bank Verification'} progress={0} onback={onback} isBack={false}/>
        </View>
        <ScrollView>
          <View style={[styles.bodyContainer_body, {marginTop:60}]}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../assets/icons/bank_verification.jpg')}/>
            </View>
            <Text style={styles.bankTextBold}>Figs uses Paid to{'\n'}link your bank
            </Text>
            <View style={{width: '80%', alignSelf: 'center', marginTop: FontSize}}>
              <View style={styles.checkboxContainer}>
                {!isSecured &&
                <TouchableOpacity onPress={() => setSecure(!isSecured)}>
                  <Image
                    source={require('../../assets/icons/nocheck.png')}
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
                }
                {isSecured &&
                <TouchableOpacity onPress={() => setSecure(!isSecured)}>
                  <Image
                    source={require('../../assets/icons/check.png')}
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
                }
                <View style={{paddingLeft: LabelFontSize * 0.5}}>
                  <Text style={styles.checkTextHeader}>Secure</Text>
                  <Text style={styles.checkTextBody}>Transfer of your information is </Text>
                  <Text style={styles.checkTextBody}>encrypted end-to-end</Text>
                </View>
              </View>
            </View>
            <View style={styles.bankText}>
              <View style={styles.checkboxContainer}>
                {!isPrivate &&
                <TouchableOpacity onPress={() => setPrivate(!isPrivate)}>
                  <Image
                    source={require('../../assets/icons/nocheck.png')}
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
                }
                {isPrivate &&
                <TouchableOpacity onPress={() => setPrivate(!isPrivate)}>
                  <Image
                    source={require('../../assets/icons/check.png')}
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
                }
                <View style={{paddingLeft: LabelFontSize * 0.5}}>
                  <Text style={styles.checkTextHeader}>Private</Text>
                  <Text style={styles.checkTextBody}>Your credentials will never be made</Text>
                  <Text style={styles.checkTextBody}> accessible to Fig</Text>
                </View>
              </View>
            </View>
            <BankFooter onsubmit={onsubmit}/>
          </View>
        </ScrollView>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  ...CommonStyles,

  checkboxContainer: {
    flexDirection: "row",

  },
  checkbox: {
    marginTop: FontSize * 0.4,
    width: FontSize,
    height: FontSize,
  },
  checkTextHeader: {
    color:'#3d3d3d',
    marginTop: 8,
    fontSize: LabelFontSize * 0.9,
    fontFamily:'OpenSans-SemiBold'
  },
  checkTextBody: {
    color:'#a0a2a5',
    fontSize: LabelFontSize * 0.9,
    textAlign: 'left',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: Height * 0.45,
    height: Height * 0.15,
  },
  bankText:{
    width: '80%',
    alignSelf: 'center',
    paddingBottom:20
  }
});

export default verification;
