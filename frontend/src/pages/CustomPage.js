import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, PermissionsAndroid, Image } from 'react-native'
import Header from './Header'
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/AntDesign';

function CustomPage() {

    const [data, setData] = useState([]);
    const getPhotos = () => {
        CameraRoll.getPhotos({
            first: 50,
            assetType: 'Photos',
            })
            .then((res) => {
                res.edges.map(res => console.log(res.node.image))
                setData(res.edges);
            })
            .catch((error) => {
                console.log(error);
        });
    }

    const askPermission = async () => {
        if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
            title: 'Permission Explanation',
            message: 'ReactNativeForYou would like to access your photos!',
            },
        );
        if (result !== 'granted') {
            console.log('Access to pictures was denied');
            return;
        } else {
            getPhotos();
        }
        } else {
            getPhotos();
        }
    };

    const showImages = () => {
        console.log(data.length)
        let contents = []
        for (let i = 0; i < data.length; i++) {
            contents.push(
                <View  key={i} style={styles.imageCard}>
                    <Image style={styles.image} source={{uri: data[i].node.image.uri}}/>
                </View>
            )
        }
        return contents
    }

    const showSkeleton = () => {
        let contents = []
        for (let i = 0; i < 3; i++) {
            contents.push(
                <View  key={i} style={styles.imageCard}>
                    <View style={styles.skeleton} backgroundColor='#f0f0f0'>
                        <Icon name="picture" size={52} color="#c0c0c0" />
                    </View>
                </View>
            )
        }
        return contents
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false}>
            <Header color={false} />
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>After selecting the temperature,{`\n`}Check what you're wearing{`\n`}at that temperature.</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.selectButtonContainer}>
                    <TouchableOpacity style={styles.selectButton} onPress={askPermission}>
                        <Text style={styles.tempText}>0°</Text>
                        <View style={styles.bar} />
                        <Text style={styles.tempHighText}>TODAY'S{`\n`}LOWEST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.tempText}>0°</Text>
                        <View style={styles.bar} />
                        <Text style={styles.tempHighText}>CURRENT{`\n`}TEMPERATURE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.tempText}>0°</Text>
                        <View style={styles.bar} />
                        <Text style={styles.tempHighText}>TODAY'S{`\n`}HIGHEST</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Text style={styles.imageText}>Please choose{`\n`}the temperature above!</Text>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        {
                            data.length === 0
                            ? showSkeleton()
                            : showImages()
                        }
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#262444',
        width: width,
        height: height
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'center',
        width: width, 
        height: width * 0.4,
        paddingLeft: width * 0.03
    },
    titleText: {
        color: '#ffb687',
        fontFamily: 'sans-serif-medium',
        fontSize: width * 0.06,
        fontWeight: '800',
    },
    bottomContainer: {
        width: width,
        minHeight: height * 0.8,
        alignItems: 'center',
        backgroundColor: '#ffe6d3',
        borderTopRightRadius: width * 0.15,
        borderTopLeftRadius: width * 0.15,
        elevation: 10
    },
    selectButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
        height: width * 0.4,
    },
    selectButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.26,
        height: width * 0.26,
        borderWidth: 4,
        borderColor: '#262444',
        borderTopLeftRadius: width * 0.14,
        borderTopRightRadius: width * 0.14,
        borderBottomRightRadius: width * 0.14,
        borderBottomLeftRadius: width * 0.14,
    },
    tempText: {
        color: '#262444',
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.06,
    },
    bar: {
        width: '50%',
        height: width * 0.006,
        backgroundColor: '#262444',
        marginTop: width * -0.03,
        marginBottom: width * 0.01,
        borderTopLeftRadius: width * 0.2,
        borderTopRightRadius: width * 0.2,
        borderBottomRightRadius: width * 0.2,
        borderBottomLeftRadius: width * 0.2,
    },
    tempHighText: {
        color: '#262444',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.018,
        textAlign: 'center',
        lineHeight: width * 0.025,
    },
    imageContainer: {
        width: width * 0.9,
        height: width * 0.8,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        borderBottomRightRadius: width * 0.05,
        borderBottomLeftRadius: width * 0.05,
    }, 
    imageCard: {
        display: 'flex',
        alignItems: 'center',
        width : width * 0.45,
        height: width * 0.55,
        backgroundColor: '#ffffff',
        marginLeft: width * 0.08
    },
    image: {
        width : width * 0.4,
        height: width * 0.4,
        marginTop: width * 0.02
    },
    skeleton: {
        width : width * 0.4,
        height: width * 0.4,
        marginTop: width * 0.02,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageText: {
        color: '#262444',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.04,
        marginLeft: width * 0.08,
        marginTop: width * 0.05,
        marginBottom: width * 0.03
    }
})

export default CustomPage
