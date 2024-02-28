import React, { ReactNode } from 'react';
import { StyleSheet} from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type BouncyComponentProps = {
    children: ReactNode,
}

export default function BouncyComponent({ children } : BouncyComponentProps) {
    const position = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: position.value },
            ],
        };
    });

    const pan = Gesture.Pan()
        .onBegin(() => {
            position.value = 0;
        })
        .onChange((event) => {
        if(event.translationY>0)
            position.value = event.translationY;
        })
        .onFinalize(() => {
            position.value = withSpring(0);
        });

    return (
        <GestureHandlerRootView style={styles.container}>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.container, animatedStyle]}>
                        {children}
                    </Animated.View>
                </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
