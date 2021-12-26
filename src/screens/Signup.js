import styled from "styled-components/native";
import { Button, Image, Input } from "../components";
import { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// 로그인 페이지를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 50px 20px;
`;

// 로그인 화면 컴포넌트
const Signup = () => {
    // 입력을 저장하는 state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // 키보드에서 다음 버튼을 눌렀을 때 다음 입력으로 이동되게 함
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);

    const _handleSignupBtnPress = () => {
        console.log('Signup');
    }
    return (
        // 스크롤 기능과 인풋 포커스 시 스크롤 이동되는 컴포넌트
        <KeyboardAwareScrollView
            extraScrollHeight={20}
        >
            <Container>
                <Image />
                <Input
                    label="Name"
                    placeholder="Name"
                    returnKeyType="next"
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                />
                <Input
                    ref={refEmail}
                    label="Email"
                    placeholder="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <Input
                    ref={refPassword}
                    label="Password"
                    placeholder="Password"
                    returnKeyType="next"
                    value={password}
                    onChangeText={setPassword}
                    isPassword={true}
                    onSubmitEditing={() => refPasswordConfirm.current.focus()}
                />
                <Input
                    ref={refPasswordConfirm}
                    label="Password Confirm"
                    placeholder="Password"
                    returnKeyType="done"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    isPassword={true}
                    onSubmitEditing={_handleSignupBtnPress}
                />
                {/* 클릭 시 네비게이션에 Signup 으로 등록된 화면으로 이동 */}
                <Button
                    title="Sign up"
                    onPress={_handleSignupBtnPress}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;