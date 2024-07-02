import {Link, Stack, router} from 'expo-router';
import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {
    GestureDetector,
    Gesture,
    Directions,
} from 'react-native-gesture-handler';

import Animated, {
    FadeIn,
    FadeOut,
    BounceInRight,
    SlideOutLeft,
    BounceOutLeft,
    SlideInRight,
} from 'react-native-reanimated';

const onboardingSteps = [
    {
        icon: 'heart',
        title: 'Tam Thử Kê',
        description: 'Chú gà chọi bách chiến bách thắng trên mọi đấu trường - ' +
            'đã từng đánh bại nhiều chiến binh trên con hành trình xưng bá ' +
            'khiến mọi chiến kê xưng thần.',
    },
    {
        icon: 'snowflake',
        title: 'Phong hào: Tam Thử kê vương',
        description: 'BTam Thử Kê thường hạ đối phương trong 2 "hồ" (hiệp kéo dài 10 phút). ' +
            'Và mỗi chiến thắng thường kết thúc bằng cú đá Tam Thử Thối' +
            ' hạ gục đối phương ngay tại trận',
    },
    {
        icon: 'moon',
        title: 'Chiến tích: 25 trận đấu lớn',
        description:
            'Với cân nặng tới 2.5kg kg Tam Thử Kê chiến thắng những đối thủ 1 cách nhanh gọn, bá khí ...',
    },
];

export default function DayDetailsScreen() {
    const [screenIndex, setScreenIndex] = useState(0);

    const data = onboardingSteps[screenIndex];

    const onContinue = () => {
        const isLastScreen = screenIndex === onboardingSteps.length - 1;
        if (isLastScreen) {
            endOnboarding();
        } else {
            setScreenIndex(screenIndex + 1);
        }
    };

    const onBack = () => {
        const isFirstScreen = screenIndex === 0;
        if (isFirstScreen) {
            endOnboarding();
        } else {
            setScreenIndex(screenIndex - 1);
        }
    };

    const endOnboarding = () => {
        setScreenIndex(0);
        router.back();
    };

    const swipes = Gesture.Simultaneous(
        Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
        Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
    );

    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen options={{headerShown: false}}/>
            <StatusBar style="light"/>

            <ImageBackground
                source={{uri: 'https://klt.vn/wp-content/uploads/2021/01/cach-lam-chuong-nuoi-ga-tre-don-gian-ma-hieu-qua-ga-tre.jpg'}}
                style={styles.background}>

                <View style={styles.stepIndicatorContainer}>
                    {onboardingSteps.map((step, index) => (
                        <View
                            key={index}
                            style={[
                                styles.stepIndicator,
                                {backgroundColor: index === screenIndex ? '#CEF202' : 'grey'},
                            ]}
                        />
                    ))}
                </View>

                <GestureDetector gesture={swipes}>
                    <View style={styles.pageContent} key={screenIndex}>
                        <Animated.View entering={FadeIn} exiting={FadeOut}>
                            <FontAwesome5
                                style={styles.image}
                                name={data.icon}
                                size={150}
                                color="#CEF202"
                            />
                        </Animated.View>

                        <View style={styles.footer}>
                            <Animated.Text
                                entering={SlideInRight}
                                exiting={SlideOutLeft}
                                style={styles.title}
                            >
                                {data.title}
                            </Animated.Text>
                            <Animated.Text
                                entering={SlideInRight.delay(50)}
                                exiting={SlideOutLeft}
                                style={styles.description}
                            >
                                {data.description}
                            </Animated.Text>

                            <View style={styles.buttonsRow}>
                                <Text onPress={endOnboarding} style={styles.buttonText}>
                                    Skip
                                </Text>

                                <Pressable onPress={onContinue} style={styles.button}>
                                    <Text style={styles.buttonText}>Continue</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </GestureDetector>
            </ImageBackground>
        </SafeAreaView>
    );
};


// export default DayDetailsScreen;


const styles = StyleSheet.create({
    page: {
        // alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#15141A',
    },
    pageContent: {
        padding: 20,
        flex: 1,
    },
    image: {
        alignSelf: 'center',
        margin: 20,
        marginTop: 70,
    },
    title: {
        color: '#FDFDFD',
        fontSize: 50,
        fontFamily: 'InterBlack',
        letterSpacing: 1.3,
        marginVertical: 10,
    },
    description: {
        color: '#F9EDE3',
        fontSize: 20,
        fontFamily: 'Inter',
        lineHeight: 28,
        backgroundColor: 'rgba(20,23,65,0.89)',
        padding: 20,
        borderRadius: 20
    },
    footer: {
        marginTop: 'auto',
    },

    buttonsRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        backgroundColor: '#302E38',
        borderRadius: 50,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: '#FDFDFD',
        fontFamily: 'InterSemi',
        fontSize: 16,

        padding: 15,
        paddingHorizontal: 25,
    },

    // steps
    stepIndicatorContainer: {
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: 15,
    },
    stepIndicator: {
        flex: 1,
        height: 3,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        opacity: 0.7
    }
});