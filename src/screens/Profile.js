import styled from "styled-components/native";
import { Button } from "../components";

// 프로필 화면 전체를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

// 프로필 컴포넌트를 생성한다
// 로그아웃 버튼 클릭 시 로그인 페이지로 이동
const Profile = ({ navigation, route }) => {
    console.log(route.params);
    return (
        <Container>
            <Button title="signout" onPress={() => navigation.navigate('Signin')} />
        </Container>
    );
};

export default Profile;