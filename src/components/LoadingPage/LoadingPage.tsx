import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import SafeAreaViewWrapper from "../SafeAreaViewWrapper";

export default function LoadingPage(): React.ReactElement {
    return (
    <SafeAreaViewWrapper>
        <View>
            <ActivityIndicator size="large" />
        </View>
    </SafeAreaViewWrapper>);
}
