import styled from "styled-components/native";
import { Button, Image, Input, ErrorMessage } from "../components";
import { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signup } from "../firebase";
import { Alert } from "react-native";
import { validateEmail, removeWhitespace } from "../utils";

// 로그인 페이지를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 50px 20px;
`;

// props가 없을 시 기본적으로 이용하는 값 설정
const DEFAULT_PHOTO = 'https://firebasestorage.googleapis.com/v0/b/rn-chat-1eec3.appspot.com/o/face.png?alt=media';

// 로그인 화면 컴포넌트
const Signup = ({ navigation }) => {
    // 입력을 저장하는 state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [photo, setPhoto] = useState(DEFAULT_PHOTO);
    const [errorMessage, setErrorMessage] = useState('');

    // 버튼 활성화 여부 결정하는 state
    const [disabled, setDisabled] = useState(true);

    // 키보드에서 다음 버튼을 눌렀을 때 다음 입력으로 이동되게 함
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);

    // 마운트 시 오류 분기 처리용 state
    const refDidMount = useRef(null);

    // 회원 정보 입력이 되어있지 않을 시 회원가입 버튼 비활성화
    useEffect(() => {
        setDisabled(
            !(name && email && passwordConfirm && !errorMessage)
        );
    }, [email, name, passwordConfirm, password, errorMessage]);

    // 회원 정보 state가 없을 시 해당하는 에러 메세지 출력
    useEffect(() => {
        if (refDidMount.current) {
            let error = '';
            if (!name) {
                error = 'Pleas enter your name';
            } else if (!email) {
                error = 'Pleas enter your email';
            } else if (!validateEmail(email)) {
                error = 'Pleas verify your email';
            }else if (password.length < 6) {
                error = 'The password must contain 6 character at least';
            } else if (password !== passwordConfirm) {
                error = 'Password need to match';
            } else {
                error = '';
            }
            setErrorMessage(error);
        } else {
            refDidMount.current = true;
        }
    }, [email, name, passwordConfirm, password]);

    // state 값으로 회원가입 후 프로필 화면으로 이동
    const _handleSignupBtnPress = async () => {
        try {
            const user = await signup({ name, email, password, photo });
            navigation.navigate('Profile', { user });
        } catch (e) {
            Alert.alert('Signup Error', e.message);
        }
    };

    return (
        // 스크롤 기능과 인풋 포커스 시 스크롤 이동되는 컴포넌트
        <KeyboardAwareScrollView
            extraScrollHeight={20}
        >
            <Container>
                {/* 사진 선택 컴포넌트를 출력하고 사진의 값을 state로 정한다
                사진 선택 후 state를 변경하여 이미지를 업데이트한다 */}
                <Image
                    showButton={true}
                    url={photo}
                    onChangePhoto={setPhoto}
                />
                <Input
                    label="Name"
                    placeholder="Name"
                    returnKeyType="next"
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                    onBlur={() => setName(name.trim())}
                    maxLength={12}
                />
                <Input
                    ref={refEmail}
                    label="Email"
                    placeholder="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}
                    onBlur={() => setEmail(removeWhitespace(email))}
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
                    onBlur={() => setPassword(removeWhitespace(password))}
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
                    onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
                />
                {/* 에러 메세지를 출력하는 컴포넌트 */}
                <ErrorMessage message={errorMessage} />
                {/* 클릭 시 네비게이션에 Signup 으로 등록된 화면으로 이동 */}
                <Button
                    title="Sign up"
                    onPress={_handleSignupBtnPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;