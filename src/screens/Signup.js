import styled from "styled-components/native";

// 화면 전체를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
`;

// 텍스트를 출력하는 스타일 컴포넌트
const StyledText = styled.Text`
    font-size: 30px;
    color: #111;
`;

// 회원가입 화면 컴포넌트
const Signup = () => {
    return (
        <Container>
            <StyledText>Signup</StyledText>
        </Container>
    );
};

export default Signup;