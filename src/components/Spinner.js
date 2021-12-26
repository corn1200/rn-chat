import styled from "styled-components/native";

// 로딩 화면을 감싸는 스타일 컴포넌트
const Container = styled.View`
    position: absolute;
    z-index: 2;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: ${({ theme }) => theme.spinnerBackground};
`;

// 스피너의 속성 설정을 반환하는 함수
const spinnerIndicator = (theme) => {
    return {
        size: 'large',
        color: theme.spinnerIndicator
    };
};

// 스피너가 돌아가는 로딩 컴포넌트
const Indicator = styled.ActivityIndicator.attrs(({ theme }) => 
    spinnerIndicator(theme)
)``;

// 스피너 컴포넌트 생성
const Spinner = () => {
    return (
        <Container>
            <Indicator />
        </Container>
    );
};

export default Spinner;