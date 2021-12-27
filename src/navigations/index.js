import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth";
import { UserContext, ProgressContext } from "../contexts";
import { useContext } from "react";
import Main from "./Main";
import { Spinner } from "../components";

// 네비게이션에 로그인 관련 페이지 추가
const Navigation = () => {
    // 회원 정보와 로딩 정보를 불러온다
    const { user } = useContext(UserContext);
    const { inProgress } = useContext(ProgressContext);

    return (
        <NavigationContainer>
            {/* 현재 로그인 상태로 네비게이션 분기 */}
            {user.uid ? <Main /> : <Auth />}
            {/* 로딩이 필요한 구간일 시 스피너 동작 */}
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;