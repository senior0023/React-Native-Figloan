import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import welcome from './welcome';
import birthday from './birthday';
import phone from './phone';
import error from './error';
import analytics from '@react-native-firebase/analytics';

const Stack = createStackNavigator();

const SignUp: () => React$Node = () => {
    useEffect(() => {
        analytics().logEvent('SignUpScreen', {
            contentType: 'SignUp', 
            itemId: 'Sign Up!', 
            method: 'Sign Up'
        });
    }, []);

    return (
        <>
            <Stack.Navigator initialRouteName="Signup">
                <Stack.Screen name="Signup" component={welcome} options={{ headerShown: false }}/>
                <Stack.Screen name="Birthday" component={birthday} options={{ headerShown: false }}/>
                <Stack.Screen name="Phone" component={phone} options={{ headerShown: false }}/>
                <Stack.Screen name="Error" component={error} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </>
    );
};

export default SignUp;
