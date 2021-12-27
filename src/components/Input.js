import styled from "styled-components/native";
import PropTypes from "prop-types";
import { useState, forwardRef } from "react";

// 전체를 감싸는 컴포넌트
const Container = styled.View`
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;

// 입력 칸 위에 입력하는 값의 이름을 출력하는 컴포넌트
const Label = styled.Text`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({ theme, isFocused }) =>
        isFocused ? theme.text : theme.inputLabel};
`;

// 입력 스타일 컴포넌트 생성
const StyledInput = styled.TextInput.attrs(({ theme }) => {
    theme.inputPlaceholder
})`
    background-color: ${({ theme, editable }) => 
        editable ? theme.inputBackground : theme.inputDisabled};
    color: ${({ theme }) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid ${({ theme, isFocused }) =>
        (isFocused ? theme.text : theme.inputBorder)};
    border-radius: 4px;
`;

// 인풋 컴포넌트 생성
// 키보드에서 다음 누를 시 이동할 위치를 알 수 있게
// forwardRef로 한번 감싼다
const Input = forwardRef(
    (
        {
            label,
            value,
            onChangeText,
            onSubmitEditing,
            onBlur,
            placeholder,
            returnKeyType,
            maxLength,
            isPassword,
            disabled
        },
        ref
    ) => {
        // 현재 포커스 되어있는지 여부를 판단하는 state
        // 포커스 될 시 라벨과 입력의 스타일 변경
        const [isFocused, setIsFocused] = useState(false);
        return (
            <Container>
                <Label isFocused={isFocused}>{label}</Label>
                <StyledInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    placeholder={placeholder}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="none"
                    isFocused={isFocused}
                    onFocus={() => setIsFocused(true)}
                    secureTextEntry={isPassword}
                    editable={!disabled}
                />
            </Container>
        );
    }
);

// 인풋 컴포넌트의 기본 값 설정
Input.defaultProps = {
    onBlur: () => { }
};

// 인풋 컴포넌트 props의 타입과 필수 전달 여부를 설정
Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    isPassword: PropTypes.bool,
    disabled: PropTypes.bool
};

export default Input;