import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LOCAL } from '../../ipConfig';
import { Alert } from 'react-native';

class AuthenticationService {

    executeJwtSignUpService(email, password, oauth) {
        return axios.post(`${LOCAL}/auth/signUp`, {
            email, password, oauth
        });
    }

    executeJwtAuthenticationService(email, password, snsType) {
        return axios.post(`${LOCAL}/auth/signIn`, {
            email, password, snsType
        });
    }

    async registerSuccessfullLoginForJwt(email, token, memberId, snsType) {
        console.log("===registerSuccessfulLoginForJwt===")

        console.log("token ", token);
        const stringId = JSON.stringify(memberId)
        let date = new Date();
        date.setDate(date.getDate() + 7);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('memberId', stringId);
        await AsyncStorage.setItem('snsType', snsType);
        await AsyncStorage.setItem('jwtValidTime', JSON.stringify(date.getTime()));
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }

    async checkJwtToken() {
        let validTime = await AsyncStorage.getItem('jwtValidTime');
        console.log('유효시간: ', validTime)
        validTime = new Date(parseInt(validTime))
        console.log('valid time: ', validTime)
        if (validTime < new Date()) {
            console.log('유효한 시간이 지났습니다.')
            let memberId = await AsyncStorage.getItem('memberId')
            let newToken = await axios.get(`${LOCAL}/auth/token/refresh`, { params:{ memberId: memberId } })
            console.log(`새 토큰: `, newToken.data.message, `\n\n성공 여부: `, newToken.data.success)
            if (newToken.data.success) {
                let newValidTime= new Date();
                newValidTime.setDate(newValidTime.getDate() + 7);
                await AsyncStorage.setItem('token', newToken.data.message)
                await AsyncStorage.setItem('jwtValidTime', JSON.stringify(newValidTime.getTime()))
                return true;
            } else {
                Alert.alert("로그인 암호가 만료되었습니다. 다시 로그인해주세요.");
                return false;
            }
            
        } else return true;
    }

    handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google email: ', userInfo.user.email);
            return { email: userInfo.user.email, error: false };
        } catch (e) {
            return { email: '', error: true };
        }
    }

    googleLogout = async () => {
        try {
            await GoogleSignin.signOut();
            return { error : false }
        } catch (e) {
            return { error: true }
        }
    }

    async logout() {
        try {
            let logout = await AsyncStorage.getItem('token')
            let snsType = await AsyncStorage.getItem('snsType');
            if (snsType === 'google') await this.googleLogout();
            if (snsType === 'naver') this.naverLogout();
            console.log('snsType: ', snsType);
            console.log("logout ", logout)
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('stringId');
            await AsyncStorage.removeItem('snsType');
            await AsyncStorage.removeItem('jwtValidTime');
            logout = await AsyncStorage.getItem('token')
            console.log("logout ", logout)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthenticationService();