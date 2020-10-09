import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';

import CommonStyles, {ColorMain, Width, Height} from '../assets/style';
// import '../assets/fonts';

const renderPagination = (slideId) => {
    const ActiveDot = <View style={[styles.dot, styles.activeDot]}/>,
        Dot = <View style={styles.dot}/>;

    let dots = [];

    for (let key = 1; key <= 4; key++) {
        dots.push(
            key === slideId
                ? // Active dot
                React.cloneElement(ActiveDot, {key})
                : // Other dots
                React.cloneElement(Dot, {key})
        );
    }

    return (
        <View pointerEvents="none" style={styles.pagination}>
            {dots}
        </View>
    );
};

function LandingSlide({navigation, extraData}) {
    let imgSrc, imgWidth = Width*0.55, imgHeight = Width*0.55;
    switch (extraData.source) {
        case (1) :
            imgSrc = require('../assets/images/1.png');
            break;
        case (2) :
            imgSrc = require('../assets/images/2.png');
            break;
        case (3) :
            imgSrc = require('../assets/images/3.png');
            break;
        case (4) :
            imgSrc = require('../assets/images/4.png');
            break;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 3}}>
                <Image
                    style={{width: imgWidth, height: imgHeight, resizeMode: 'stretch', alignSelf: 'center'}}
                    source={imgSrc}
                />
                <Text style={[styles.textTitle]}>{extraData.title}</Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column', marginTop: 20}}>
                <Text style={[styles.myText]}>{extraData.text}</Text>
                <View style={styles.buttonContainer}>
                    {renderPagination(extraData.source)}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            (extraData.slideId == 'Five')? navigation.navigate('Loan') : navigation.navigate(extraData.slideId)
                        }}
                    >
                        <Text style={styles.buttonTitle}>{extraData.buttonTitle}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', flex: 2}}>
                        <Text style={styles.bottomText}>Have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                            <Text style={[styles.bottomText, {color: '#61B09D', fontFamily: 'OpenSans-Bold'}]}>Sign in Here</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ...CommonStyles,
    container: {
        justifyContent: 'center',
        marginTop: 50,
        flex: 1,
        flexDirection: 'column',
    },
    textTitle: {
        textAlign: 'center',
        fontSize: Width*0.05,
        color: '#4e4e4e',
        fontFamily: "OpenSans-Bold"
    },
    buttonTitle: {
        fontSize: Width*0.05,
        color: 'white',
        fontWeight: 'bold'
    },
    myText: {
        color: ColorMain,
        fontSize: Width/22,
        marginLeft: Width*0.15,
        marginRight: Width*0.15,
        textAlign: 'center',
        flex: 4,
        lineHeight: Height*0.04,
        fontFamily: "OpenSans-Light"
    },
    bottomText: {
        fontSize: Width/22,
        color: ColorMain,
        fontFamily: "OpenSans-Regular"
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        flex: 5,
        marginBottom: Height*0.05
    },
    button: {
        padding: 6,
        borderRadius: Width/60,
        textAlign: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#3FB39D',
        justifyContent: 'center',
        marginBottom: Height*0.03,
        flex: 1.5,
        alignItems:'center'
    },
    dot: {
        backgroundColor: "rgba(0,0,0,.25)",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: "#3FB39D"
    },
    pagination: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        marginBottom: Height*0.03
    }
});

export default LandingSlide;
