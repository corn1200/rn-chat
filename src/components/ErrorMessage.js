import styled from "styled-components/native";
import PropTypes from 'prop-types';

// 텍스트를 출력하기 위한 스타일 컴포넌트
const StyledText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

// 에러 메세지를 출력하는 컴포넌트를 생성
const ErrorMessage = ({ message }) => {
    return (
        <StyledText>{message}</StyledText>
    );
};

// 에러 메세지 컴포넌트 props의 타입과 필수 전달 여부 설정
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorMessage;