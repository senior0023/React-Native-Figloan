import React, { useEffect } from 'react';
import LandingSlide from "../../components/Landing";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from 'react-native-fbsdk';

const Tab = createMaterialTopTabNavigator();

const Landing = () => {

    useEffect(() => {
        analytics().logEvent('LandingScreen', {
            contentType: 'Landing',
            itemId: 'Landing!',
            method: 'facebook'
        });
    }, [])

    return (
        <>
            <Tab.Navigator
                tabBarOptions={{
                    style: { height: 0 }
                }}
            >
                <Tab.Screen name="Home">
                    {props => <LandingSlide {...props} extraData={{
                        text: 'Borrowing from Fig is like borrowing from a friend',
                        source: 1,
                        slideId: 'Two',
                        buttonTitle: 'Get Started',
                        title: ''
                    }} />}
                </Tab.Screen>
                <Tab.Screen name="Two">
                    {props => <LandingSlide {...props} extraData={{
                        text: 'Borrow up to $500 and get transparent pricing up front. Get funds within one business day',
                        source: 2,
                        slideId: 'Three',
                        buttonTitle: 'Next',
                        title: 'No Hidden Fees'
                    }} />}
                </Tab.Screen>
                <Tab.Screen name="Three">
                    {props => <LandingSlide {...props} extraData={{
                        text: 'No credit checks required. Grow your credit by more than 50 points within your first year.',
                        source: 3,
                        slideId: 'Four',
                        buttonTitle: 'Next',
                        title: 'Build Credit on the Go'
                    }} />}
                </Tab.Screen>
                <Tab.Screen name="Four">
                    {props => <LandingSlide {...props} extraData={{
                        text: "When life doesn't go as planned, reschedule your payment from your phone.",
                        source: 4,
                        slideId: 'Five',
                        buttonTitle: 'Apply Now',
                        title: 'Pay at Your Own Pace'
                    }} />}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    )
}

export default Landing;
