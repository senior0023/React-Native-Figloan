import { Dimensions } from 'react-native';
export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
export const ColorMain = '#324d5d';

export const FontSize = Width*0.05;
export const LabelFontSize = FontSize*0.8;
export const UnitHeight = Height/12;

export const inputColor = '#0a0a0a';
export const FontColor = '#3fb29d';
export const ButtonColor = '#3fb29d';
export const bankButtonColor = "#3b83e3";
export const boldFontColor = "#49494a";
export const labelFontColor = "#3d3d3d";
export const footerFontColor="#a0a2a5";

const CommonStyles = {
    myView: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection:'column',
    },
    textTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: FontSize*0.9,
        fontFamily: "OpenSans-SemiBold",
        paddingLeft: 40,
        paddingTop:10,
        color:boldFontColor,
    },
    headerContainer: {
        paddingTop: 20,
        width:'100%',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        marginTop: FontSize*1.5,
        justifyContent: 'space-between',
    },
    btnBack: {
        width: 50,
        paddingRight:LabelFontSize,
        alignItems: 'center',
    },
    btnBackimage:{
        width:Width*0.05,
        height:Width*0.1,
        position:'absolute',
        bottom:0,
    },
    btnHelp: {
        width: 100,
        alignItems: 'flex-end',
    },
    textHelp :{
        fontSize : LabelFontSize,
        color : FontColor,
        textAlign : 'right',
        position:'absolute',
        bottom:0,
        paddingRight:LabelFontSize,
        fontFamily: "OpenSans-SemiBold",
    },
    progressContainer: {
        marginTop: 10,
        height: 5,
        width: '100%',
        backgroundColor: '#e8e6e3',
        borderColor: '#000',
        borderRadius: 5,

    },
    absoluteFill:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    bodyContainer_body:{
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
    },
    bodyContainer_Text:{
        paddingLeft: 30,
        paddingTop: 30,
    },
    bodyTextBold: {
        fontSize:FontSize*0.95,
        fontFamily: "OpenSans-SemiBold",
        textAlign:'left',
        color:labelFontColor,
    },
    bankTextBold: {
        height:FontSize*3,
        fontSize:FontSize,
        fontFamily: "OpenSans-Bold",
        textAlign:'center',
        color:labelFontColor,
    },
    bodyText: {
        fontSize:LabelFontSize*0.9,
        textAlign:'left',
        fontFamily: "OpenSans-Regular",
        color:labelFontColor,
    },
    input:{
        padding: 5,
        marginTop:30,
        marginBottom:10,
        height: FontSize*1.5,
        fontSize:FontSize*0.8,
        color:inputColor,
        borderBottomWidth:1,
        fontFamily: "OpenSans-Regular",
    },
    label:{
        fontSize:LabelFontSize*0.9,
        marginTop:15,
        marginBottom:-FontSize/2,
        paddingLeft:5,
        fontFamily: "OpenSans-Regular",
    },
    passwordAlarm:{
        color:FontColor,
        marginBottom:10,
        marginLeft:10,
        fontSize:LabelFontSize*0.8,
        fontFamily: "OpenSans-Regular",
    },

};
export default CommonStyles;
