import { createStackNavigator } from "@react-navigation/stack";
import { Profile, Channel, ChannelCreation, ChannelList } from "../screens";
import { ThemeContext } from "styled-components/native";
import { theme } from "../theme";
import Home from "./Home";

// 로그인 후의 메인화면에 대한 네비게이션 생성
const Stack = createStackNavigator();

// 메인 네비게이션의 페이지들을 설정
const Main = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleColor: theme.text,
                headerBackTitleVisible: false,
                cardStyle: { backgroundColor: theme.background }
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="ChannelCreation"
                component={ChannelCreation}
            />
            <Stack.Screen
                name="Channel"
                component={Channel}
            />
        </Stack.Navigator>
    );
};

export default Main;