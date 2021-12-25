import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup } from "../screens";
import { MaterialIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";

// 스택형 페이지 네비게이터 생성
const Stack = createStackNavigator();

// 로그인 관련 페이지 컴포넌트 정리
const Auth = () => {
    // 현재 컨텍스트의 테마 호출
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator>
            {/* 로그인 화면에선 상단바 노출되지 않게 함 */}
            <Stack.Screen
                name="Signin"
                component={Signin}
                options={
                    { headerShown: false }
                }
            />
            {/* 상단 페이지 정렬과 색상 회귀 아이콘을 재정의한다 */}
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: theme.text,
                    headerLeft: ({ onPress, tintColor }) => (
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={38}px
                            color={tintColor}
                            onPress={onPress}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
};

export default Auth;