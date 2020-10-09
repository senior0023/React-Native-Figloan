import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import information from './information';
import verification from './verification';
import account from './account';
import analytics from '@react-native-firebase/analytics';


const Stack = createStackNavigator();

const Bank: () => React$Node = () => {
    useEffect(() => {
        analytics().logEvent('BankScreen', {
            contentType: 'Bank', 
            itemId: 'Bank!', 
            method: 'Bank'
        });
    }, [])

    return (
        <>
            <Stack.Navigator initialRouteName="information">
                <Stack.Screen name="information" component={information} options={{ headerShown: false }}/>
                <Stack.Screen name="verification" component={verification} options={{ headerShown: false }}/>
                <Stack.Screen name="account" component={account} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </>
    );
};

export default Bank;
