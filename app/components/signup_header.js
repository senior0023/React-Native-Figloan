import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import {Icon} from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import CommonStyles from '../assets/style';

const SignupHeader = ({title, progress, onback, isBack }) => {
    return (
        <>
            <SafeAreaView style={{marginBottom: 10, borderColor:'white',}}>

                <View style={styles.headerTitleContainer}>
                  {isBack &&
                    <TouchableOpacity style={styles.btnBack} onPress={()=>onback()}>
                       <Icon name={'keyboard-arrow-left'} size={50} color={'#3fb29d'} style={{width: 35, height: 35}}/>
                    </TouchableOpacity>
                  }
                    <Text style={styles.textTitle}>{title}</Text>
                    <TouchableOpacity style={styles.btnHelp} onPress={()=>alert("Contact Phone Number")}>
                        <Text style={styles.textHelp}>Help</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.progressContainer,title=="Bank Verification"?{height:2}:{}]}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={["#3fb29d", "#3a7da7"]}
                      style={{
                          width: progress+"%",
                          height: 5,
                      }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    ...CommonStyles,
});


export default SignupHeader;
