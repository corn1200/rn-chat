import { useContext, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { Button, Image, Input } from "../components";
import { UserContext } from "../contexts";
import { getCurrentUser, updateUserInfo, signout } from "../firebase";
import { ProgressContext } from "../contexts";
import { theme } from "../theme";

// 프로필 화면 전체를 감싸는 컴포넌트
const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

// 프로필 컴포넌트를 생성한다
const Profile = ({ navigation, route }) => {
    const {spinner} = useContext(ProgressContext);
    // 회원 정보 컨텍스트를 제어하는 함수를 호출
    const {setUser} = useContext(UserContext);
    const user = getCurrentUser();

    const [photo, setPhoto] = useState(user.photo);

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const photoURL = await updateUserInfo(url);
            setPhoto(photoURL);
        } catch (e) {
            Alert.alert('Photo Error', e.message);
        } finally {
            spinner.stop();
        }
    }

    return (
        <Container>
            <Image 
                showButton 
                url={photo}
                onChangePhoto={_handlePhotoChange}
            />
            <Input label='Name' value={user.name} disabled />
            <Input label='Email' value={user.email} disabled />
            {/* 로그아웃 클릭 시 회원 정보 컨텍스트 초기화 */}
            <Button 
                title="signout" 
                onPress={async () => {
                    try {
                        spinner.start();
                        await signout();
                    } catch (e) {
                    } finally {
                        setUser({});
                        spinner.stop();
                    }
                }} 
                containerStyle={{
                    backgroundColor: theme.btnSignout
                }}
            />
        </Container>
    );
};

export default Profile;