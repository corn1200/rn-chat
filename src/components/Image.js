import styled from "styled-components/native";
import PropTypes from "prop-types";

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
const Image = ({ url }) => {
    return (
        <Container>
            <ProfileImage source={{ uri: url }} />
        </Container>
    );
};

// props가 없을 시 기본적으로 이용하는 값 설정
Image.defaultProps = {
    url: 'https://firebasestorage.googleapis.com/v0/b/rn-chat-1eec3.appspot.com/o/face.png?alt=media'
};

// 이미지 컴포넌트가 받을 props의 타입과 필수 여부를 설정
Image.porptypes = {
    url: PropTypes.string
};

export default Image;