import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

// 전체를 감싸는 컴포넌트 생성
const Container = styled.View`
    background-color: ${({ theme }) => theme.btnBackground};
    padding: 10px;
    margin: 10px 0;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

// 텍스트를 보여주는 스타일 컴포넌트 생성
const Title = styled.Text`
    font-size: 24px;
    color: ${({ theme }) => theme.btnTitle};
`;

// 터치할 수 있는 버튼 컴포넌트를 생성
const Button = ({ title, onPress, containerStyle, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
            <Container style={containerStyle}>
                <Title style={textStyle}>{title}</Title>
            </Container>
        </TouchableOpacity>
    );
};

// 버튼이 props로 받게 될 값의 타입과 필수 여부를 설정
Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
};

export default Button;