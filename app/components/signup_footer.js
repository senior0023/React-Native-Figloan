import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import CommonStyles, {
	FontSize,
	LabelFontSize,
	ButtonColor,
	footerFontColor, Width
} from '../assets/style';

const SignupFooter = ({isText,buttonText,isActivate,onsubmit}) => {

	return (
		<>
			<View style={styles.footerContainer}>
				<View style={{marginTop: 100,
				}}>
					{isText &&
					<View style={{alignItems:'center', paddingBottom:10}}>
						<Text style={styles.footerText}>By tapping Continue, I agree to Fig Loan's </Text>
						<TouchableOpacity onPress={()=>alert('Please, visit www.figloans.com')}>
							<View style={{flexDirection:'row', }}>
								<Text style={[{textDecorationLine: 'underline'},styles.footerText]}>Esign</Text>
								<Text style={styles.footerText}> and </Text>
								<Text style={[{textDecorationLine: 'underline'},styles.footerText]}>Privacy Policy</Text>
							</View>
						</TouchableOpacity>
					</View>
					}
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						disabled={!isActivate}
						style={[styles.button,!isActivate?{backgroundColor: '#bcc2c2'}:{backgroundColor:ButtonColor}]}
						onPress={()=>onsubmit()}
					>
						<Text style={[styles.buttonText,buttonText=="Link your bank account"?{fontSize:FontSize*0.9}:{}]}>{buttonText}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
};

const styles = StyleSheet.create({
	...CommonStyles,

	footTextContainer:{
		flex:1,
		padding:10,
	},
	buttonContainer:{
		alignItems:"center",
		justifyContent:"center",
		height:40,
	},
	button: {
		borderRadius:5,
		height:50,
		alignItems:"center",
		justifyContent:'center',
		width:'100%',
		backgroundColor: ButtonColor,
	},
	buttonText:{
		fontSize:FontSize,
		color:'white',
		fontFamily: "OpenSans-Bold",
	},
	footerText:{
		fontSize:LabelFontSize*0.8,
		textAlign:'center',
		color:footerFontColor,
		fontFamily: "OpenSans-Regular",
	},
	footerContainer:{
		width:Width*0.9,
		bottom: 40,
		position:'absolute',
	}
});

export default SignupFooter;
