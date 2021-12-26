import { useContext } from "react";
import styled from "styled-components/native";
import { Button } from "../components";
import { UserContext } from "../contexts";

// 프로필 화면 전체를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

// 프로필 컴포넌트를 생성한다
const Profile = ({ navigation, route }) => {
    // 회원 정보 컨텍스트를 제어하는 함수를 호출
    const {setUser} = useContext(UserContext);
    return (
        <Container>
            {/* 로그아웃 클릭 시 회원 정보 컨텍스트 초기화 */}
            <Button 
                title="signout" 
                onPress={() => setUser({})} 
            />
        </Container>
    );
};

export default Profile;