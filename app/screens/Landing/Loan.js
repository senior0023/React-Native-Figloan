import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Picker,
  Image,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Slider from '../../components/slider';
import API from '../../lib/API';
import { Width } from '../../assets/style';
import analytics from '@react-native-firebase/analytics';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppEventsLogger } from 'react-native-fbsdk';

const normalSize = 18
const conditionSize = 15

const Loan = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState('')
  const [isSelectedHabitat, setIsSelectedHabitat] = useState(false)
  const [Loan, setLoan] = useState(0)
  const [loanSelected, setLoanSelected] = useState({})
  const [loanRange, setLoanRange] = useState([])
  const [data, setData] = useState({})
  const [isThumbClick, setIsThumbClick] = useState(false)
  const [state_names, setStateNames] = useState([
    { label: 'Illinois', value: 'IL' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Florida', value: 'FL' }
  ])
  const [spinner, setSpinnerState] = useState(false);

  const habitatChange = (itemValue) => {
    if (itemValue != '') {
      setSpinnerState(true);
      API.get(`default_products?state=${itemValue}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          setSpinnerState(false);
          analytics().logEvent('Loan', {
            contentType: 'Loan',
            status: 'Success'
          });
          AppEventsLogger.logEvent('GetProductsSuccess');
          setData(res.data)
          setSelectedLocation(itemValue)
          setLoan(Math.min(...Object.keys(res.data)))
          setLoanSelected(res.data[Math.min(...Object.keys(res.data))])
          setLoanRange(Object.keys(res.data))
          setIsSelectedHabitat(true)
        }).catch(err =>{
          setSpinnerState(false);
        })
    } else {
      setIsSelectedHabitat(false)
      setSelectedLocation('')
    }
  }

  const loanChange = (loanvalue) => {
    setLoan(loanvalue);
    setLoanSelected(data[loanvalue])
  }

  const onNextPage = () => {
    analytics().logEvent('LoanComplete', {
      contentType: 'Loan',
      status: 'Success'
    });
    AppEventsLogger.logEvent('LoanComplete');
    navigation.navigate('Signup')
  }
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', bottom: 'always' }}>
      <Spinner
        visible={spinner}
        textContent={'checking...'}
        textStyle={{color: '#FFF'}}
      />
      <LinearGradient
        colors={['#3FB39D', '#3B7CA8']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 1000,
        }}
      />
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.description}>
            <Text style={styles.top_text}>Let's find the right loan for you today.</Text>
            <Text style={styles.down_text}>I live in...</Text>
          </View>
          <DropDownPicker
            items={state_names}
            defaultIndex={0}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            placeholder="Select the location"
            containerStyle={[styles.habitat, !isSelectedHabitat ? { marginBottom: 500 } : { marginBottom: 0 }]}
            onChangeItem={(item) => habitatChange(item.value)}
          />
          {(isSelectedHabitat) && <View style={styles.loanField}>
            <Text style={styles.loanText}>I need a loan amount of...</Text>
            <Text style={styles.loan}>${Loan}</Text>
            <View style={{ alignItems: 'center', paddingTop: 10, }}>
              <Slider
                value={Loan}
                minimumValue={Math.min(...loanRange)}
                maximumValue={Math.max(...loanRange)}
                onValueChange={(value) => loanChange(value)}
                step={50}
                sliderWidth={Width * 0.8}
                sliderHeight={20}
                sliderBorderRadius={10}
                thumbButtonSize={36}
                maximumTrackTintColor={'#FFFFFF'}
                minimumTrackTintColor={'#2a6e88'}
                thumbTintColor={'#F5F5F5'}
                onSlidingStart={() => setIsThumbClick(!isThumbClick)}
                onSlidingComplete={() => setIsThumbClick(!isThumbClick)}
                customMinimumTrack={
                  <View style={{ marginTop: 0 }}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={["#6B6B6B", "#0094DB"]}
                      style={{
                        width: "100%",
                        height: 20,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10
                      }}
                    />
                  </View>
                }
                customThumb={
                  isThumbClick ? (
                    <Image
                      source={require('../../assets/images/toggle.png')}
                      style={{
                        width: 90,
                        height: 90
                      }}
                    />
                  ) : null
                }
              />
            </View>
            <View style={styles.loanRange}>
              <Text style={styles.minLoan}>${Math.min(...loanRange)}</Text>
              <Text style={styles.maxLoan}>${Math.max(...loanRange)}</Text>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
              <View style={styles.conditionLoanField}>
                <View style={styles.conditionLoan}>
                  <Text style={styles.loanInfoText}>Monthly Payment</Text>
                  <Text style={[styles.loanInfoText, { fontWeight: 'bold' }]}>${loanSelected.pmt}</Text>
                </View>
                <View style={styles.conditionLoan}>
                  <Text style={styles.loanInfoText}>APR</Text>
                  <Text style={[styles.loanInfoText, { fontWeight: 'bold' }]}>{loanSelected.apr}%</Text>
                </View>
                <View style={styles.conditionLoan}>
                  <Text style={styles.loanInfoText}>Payments</Text>
                  <Text style={[styles.loanInfoText, { fontWeight: 'bold' }]}>{loanSelected.length}</Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
              <View style={styles.conditionLoanField}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/check1.png')} />
                  <Text style={styles.loanConditionText}> No late fees</Text>
                </View><View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/check1.png')} />
                  <Text style={styles.loanConditionText}> No bounce fees</Text>
                </View><View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/check1.png')} />
                  <Text style={styles.loanConditionText}> No rescheduling fees</Text>
                </View><View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/check1.png')} />
                  <Text style={styles.loanConditionText}> Repay early && earn a discount!</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 10, alignItems: 'center' }}>
              <TouchableOpacity style={styles.applyLoanButton} onPress={onNextPage}>
                <Text style={styles.buttonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
        </View>
      </ScrollView>
      <TouchableOpacity style={{ paddingTop: 30, position: 'absolute' }} onPress={() => navigation.navigate('Home')}>
        <Image style={styles.backImage}
          source={require('../../assets/images/arrow_left.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#595959',
  },
  backImage: {
    width: 40,
    height: 40,
    paddingTop: 30,
    paddingLeft: 50
  },
  description: {
    paddingTop: 80,
    width: '90%',
    color: '#fff',
    fontSize: normalSize,
  },
  top_text: {
    color: '#fff',
    fontSize: normalSize,
    height: 60,
    fontFamily: 'OpenSans-Regular'
  },
  down_text: {
    color: '#fff',
    fontSize: normalSize,
    fontFamily: 'OpenSans-Regular'
  },
  habitat: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    paddingTop: 5,
  },
  habitatSelect: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingLeft: 10
  },
  loanField: {
    width: '90%',
  },
  loanText: {
    color: '#fff',
    fontSize: normalSize,
    fontFamily: 'OpenSans-Regular',
    paddingTop: 20,
  },
  loanRange: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  minLoan: {
    color: '#fff',
    fontSize: normalSize,
    textAlign: 'left',
    fontFamily: 'OpenSans-Regular'
  },
  maxLoan: {
    color: '#fff',
    fontSize: normalSize,
    textAlign: 'right',
    fontFamily: 'OpenSans-Regular'
  },
  loan: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
    height: 60,
    textAlign: 'center',
    paddingTop: 10,
    textShadowColor: '#000000',
    textShadowRadius: 10,
    fontFamily: 'OpenSans-Regular'
  },
  conditionLoanField: {
    width: '80%',
    height: 120,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#afe3de',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conditionLoan: {
    fontSize: normalSize,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  applyLoanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 42,
    backgroundColor: '#e37937',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Regular'
  },
  loanInfoText: {
    fontSize: normalSize,
    color: '#3f5968',
    lineHeight: 40,
    fontFamily: 'OpenSans-Regular'
  },
  loanConditionText: {
    fontSize: conditionSize,
    color: '#3f5968',
    fontFamily: 'OpenSans-Regular'
  }
})

export default Loan;
