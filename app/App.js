import React, { useEffect, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar } from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import Landing from './screens/Landing/Landing';
import Loan from './screens/Landing/Loan';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Bank from './screens/Bank';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, [])
    return (
        <Fragment>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                    <Stack.Screen name="Loan" component={Loan} options={{ headerShown: false }} />
                    <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    <Stack.Screen name="Bank" component={Bank} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Fragment>
    )
};

export default App;
