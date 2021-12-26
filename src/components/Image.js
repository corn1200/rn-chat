import styled from "styled-components/native";
import PropTypes from "prop-types";
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, Platform } from "react-native";
import { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

// 사진 선택 아이콘 컴포넌트를 감싸는 컴포넌트
const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.imgBtnBackground};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

// 포토 아이콘에 반환할 오브젝트
const photoIcon = (theme) => {
    return {
        name: 'photo-camera',
        size: 22,
        color: theme.imgBtnIcon
    }
};

// 마테리얼 아이콘을 출력하는 아이콘 컴포넌트
const ButtonIcon = styled(MaterialIcons).attrs(({ theme }) => 
    photoIcon(theme)
)``;

// 클릭 시 사진 선택을 하는 아이콘 컴포넌트
const PhotoButton = ({onPress}) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonIcon/>
        </ButtonContainer>
    );
};

// 전체를 감싸는 컴포넌트
const Container = styled.View`
    margin-bottom: 30px;
`;

// 이미지를 표시하는 스타일 컴포넌트
const ProfileImage = styled.Image`
    background-color: ${({ theme }) => theme.imgBackground};
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

// url을 받고 이미지 컴포넌트에서 출력한다
const Image = ({ url, showButton, onChangePhoto }) => {
    // 저장소 권한을 얻는 코드
    useEffect(() => {
        (async () => {
            // 웹이 환경이 아닐 경우 저장소 권한을 얻어야 한다
            if(Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                // 권한 요청 거부 시 출력
                if(status !== 'granted') {
                    Alert.alert(
                        'Photo Permission', 
                        'Please turn on the camera permission.'
                    );
                }
            }
        })
    }, []);

    // 선택한 이미지를 저장하고 photo state 값을 변경
    const _handlePhotoBtnPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        });

        console.log(result);

        if(!result.cancelled) {
            onChangePhoto(result.uri);
        }
    }

    return (
        <Container>
            <ProfileImage source={{ uri: url }} />
            {/* 필요에 따라 보여주고 클릭 시 저장공간에서 이미지 선택 */}
            {showButton && <PhotoButton onPress={_handlePhotoBtnPress}/>}
        </Container>
    );
};

// 이미지 컴포넌트가 받을 props의 타입과 필수 여부를 설정
Image.porptypes = {
    url: PropTypes.string,
    showButton: PropTypes.bool,
    onChangePhoto: PropTypes.func
};

export default Image;