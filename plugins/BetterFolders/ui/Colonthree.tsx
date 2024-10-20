import { React, ReactNative } from "@vendetta/metro/common";
const { useState } = React;
const { Pressable, Animated } = ReactNative;

export default ({ onPress, children, color: initialColor, pressedColor }) => {
    const [color] = useState(new Animated.Value(0));

    const animatedColor = color.interpolate({
        inputRange: [0, 1],
        outputRange: [initialColor, pressedColor],
    });

    const onPressIn = () => {
        Animated.timing(color, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const onPressOut = () => {
        Animated.timing(color, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={{ backgroundColor: animatedColor }}>{children}</Animated.View>
        </Pressable>
    );
};
