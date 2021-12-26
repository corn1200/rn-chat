import styled from "styled-components/native";
import { Button, Image, Input } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState, useRef } from "react";
import { ThemeContext } from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    // 이메일 입력과 비밀번호 입력을 저장하는 state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 키보드에서 다음 버튼을 눌렀을 때 이메일에서 비밀번호 입력으로 이동되게 함
    const refPassword = useRef(null);
    const _handleSigninBtnPress = () => {
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
                    onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <Input
                    ref={refPassword}
                    label="Password"
                    placeholder="Password"
                    returnKeyType="done"
                    value={password}
                    onChangeText={setPassword}
                    isPassword={true}
                    onSubmitEditing={_handleSigninBtnPress}
                />
                {/* 클릭 시 네비게이션에 Signup 으로 등록된 화면으로 이동 */}
                <Button
                    title="Sign in"
                    onPress={_handleSigninBtnPress}
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