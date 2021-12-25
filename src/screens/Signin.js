import styled from "styled-components/native";
import { Button } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";

// 로그인 페이지를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

// 텍스트를 보여주는 스타일 컴포넌트
const StyledText = styled.Text`
    font-size: 30px;
    color: #111;
`;

// 로그인 화면 컴포넌트
const Signin = ({ navigation }) => {
    // 노치 디자인 대응을 위한 함수
    const insets = useSafeAreaInsets();
    // 테마를 바로 사용할 수 없기 때문에 context에서 불러옴
    const theme = useContext(ThemeContext);
    return (
        <Container insets={insets}>
            <StyledText>Signin</StyledText>
            {/* 클릭 시 네비게이션에 Signup 으로 등록된 화면으로 이동 */}
            <Button
                title="Sign in"
                onPress={() => console.log('signin')}
            />
            {/* 버튼의 스타일을 정의함 */}
            <Button
                title="or Sign up"
                onPress={() => navigation.navigate('Signup')}
                containerStyle={{ marginTop: 0, backgroundColor: 'trasparent' }}
                textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
            />
        </Container>
    );
};

export default Signin;