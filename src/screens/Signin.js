import styled, { ThemeContext } from "styled-components/native";
import { Button, Image, Input, ErrorMessage } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signin } from "../firebase";
import { Alert } from "react-native";
import { validateEmail, removeWhitespace } from "../utils";

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

// 파이어베이스에 저장된 이미지 주소
const LOGO = 'https://firebasestorage.googleapis.com/v0/b/rn-chat-1eec3.appspot.com/o/icon_new.png?alt=media';

// 로그인 화면 컴포넌트
const Signin = ({ navigation }) => {
    // 노치 디자인 대응을 위한 함수
    const insets = useSafeAreaInsets();

    // 테마를 바로 사용할 수 없기 때문에 context에서 불러옴
    const theme = useContext(ThemeContext);

    // 입력을 저장하는 state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState('');

    // 키보드에서 다음 버튼을 눌렀을 때 이메일에서 비밀번호 입력으로 이동되게 함
    const refPassword = useRef(null);

    // 이메일과 비밀번호가 입력되어 있고 오류가 없다면 로그인 버튼 활성화
    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    // 이메일을 입력할 때 공백을 없애고 state에 저장한다
    // 이메일 형식과 맞지 않는 입력일 시 오류 메세지 출력
    const _handleEmailChange = email => {
        const changeEmail = removeWhitespace(email);
        setEmail(changeEmail);
        setErrorMessage(
            validateEmail(changeEmail) ? '' : 'Please verify your email'
        );
    };

    // 비밀번호를 입력할 때 공백을 없애고 state에 저장한다
    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    // 로그인 시도를 하고 성공 시 프로필 화면으로 이동, 실패 시 오류 얼럿을 띄운다
    const _handleSigninBtnPress = async () => {
        try {
            const user = await signin({ email, password });
            navigation.navigate('Profile', { user });
        } catch (e) {
            Alert.alert('Sign in Error', e.message);
        }
        console.log('signin');
    }
    return (
        // 로그인 화면이 스크롤 가능하도록 만들고 인풋 포커스 시 스크롤 이동하게함
        // 로그인 화면이 전체 화면을 이용하도록 설정
        <KeyboardAwareScrollView
            extraScrollHeight={20}
            contentContainerStyle={{ flex: 1 }}
        >
            <Container insets={insets}>
                <Image url={LOGO} />
                <Input
                    label="Email"
                    placeholder="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <Input
                    ref={refPassword}
                    label="Password"
                    placeholder="Password"
                    returnKeyType="done"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    isPassword={true}
                    onSubmitEditing={_handleSigninBtnPress}
                />
                {/* 에러 메세지를 출력한다 */}
                <ErrorMessage message={errorMessage} />
                {/* 클릭 시 네비게이션에 Signup 으로 등록된 화면으로 이동
                경우에 따라 버튼이 비활성화 혹은 활성화 되고 기본적으로 비활성화 상태이다 */}
                <Button
                    title="Sign in"
                    onPress={_handleSigninBtnPress}
                    disabled={disabled}
                />
                {/* 버튼의 스타일을 정의함 */}
                <Button
                    title="or Sign up"
                    onPress={() => navigation.navigate('Signup')}
                    containerStyle={{ marginTop: 0, backgroundColor: 'trasparent' }}
                    textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signin;