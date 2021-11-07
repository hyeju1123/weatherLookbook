import React, { useState, useEffect } from 'react';
import { Text, 
         TouchableOpacity, 
         TextInput, 
         SafeAreaView, 
         View, 
         StyleSheet, 
         Dimensions, 
         ScrollView,
         Image, 
         Alert,
         Button} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleClientId } from '../../ipConfig'

function SignIn() {

    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google email: ', userInfo.user);
            return { email: userInfo.user.email, error: false };
        } catch (e) {
            return { email: '', error: e };
        }
    }

    const handleSnsSignIn = (type) => {
      if (type === 'google') {
        handleGoogleSignIn()
          .then(res => {
            if (res.error) {
              Alert.alert("정보를 가져오는 데 실패했습니다.")
              return
            }
            console.log(res)
          })
      }

    }

    useEffect(() => {
      GoogleSignin.configure({
        webClientId: googleClientId,
        forceCodeForRefreshToken: true,
        offlineAccess: true
      })
 
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Button onPress={() => handleSnsSignIn('google')} title="login" />
        </SafeAreaView>
    )
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
      topBlock: {
        width: '100%',
        height: 140,
        backgroundColor: '#D14124',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      loginText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: 'white',
        fontSize: width > 500 ? 60 : 40
      },
      inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%'
      }, 
      input: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: width > 500 ? 40 : 25,
        paddingLeft: 20,
        marginTop: 20,
        fontSize: width > 500 ? 27 : width * 0.035,
        paddingBottom: '1%',
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
      },
      bar: {
        width: width > 500 ? 50 : 30,
        height: width > 500 ? 7 : 5,
        backgroundColor: '#D14124',
        borderRadius: 50,
        marginTop: 70,
        marginBottom: 30
      },
      button: {
        width: (width * 81) / 100,
        height: (height * 7) / 100,
        backgroundColor: '#D14124',
        borderRadius: width > 500 ? 43 : 28,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 40
      },
      buttonText: {
        fontSize: width > 500 ? 30 : 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff'
      },
      googleLogo: {
        width: width > 500 ? (width * 18) / 100 : (width * 25) / 100,
        height: width > 500 ? (height * 4) / 100 : (height * 4.2) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
      },
      smallGoogleLogo: {
        width: (width * 20) / 100,
        height: (height * 4.5) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
      },
      naverLogo: {
        width: width > 500 ? (width * 19) / 100 : (width * 27) / 100,
        height: width > 500 ? (height * 2.3) / 100 : (height * 2.5) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
      },
      smallNaverLogo: {
        width: (width * 25) / 100,
        height: (height * 3.2) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
      },
      signInButton: {
        display: 'flex',
        flexDirection: 'row',
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: width > 500 ? 40 : 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 20
      },
      signInText: {
        fontSize: width > 500 ? 30 : 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
      },
      signUpContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '7%'
      },
      signUpQuestion: {
        fontSize: width > 500 ? 25 : 18,
        color: '#3E3A30',
        fontFamily: 'TmoneyRoundWindRegular',
        marginRight: '2%'
      },
      signUpText: {
        fontSize: width > 500 ? 25 : 18,
        fontWeight: 'bold',
        color: '#D14124',
        fontFamily: 'TmoneyRoundWindRegular',
        textDecorationLine: 'underline'
      }
})


export default SignIn
