import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth";

// 네비게이션에 로그인 관련 페이지 추가
const Navigation = () => {
    return (
        <NavigationContainer>
            <Auth />
        </NavigationContainer>
    );
};

export default Navigation;