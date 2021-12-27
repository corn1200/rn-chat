import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import styled from 'styled-components/native';
import { Button } from '../components';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

const Channel = ({ route }) => {
    return (
        <Container>
            <StyledText>Channel</StyledText>
            <StyledText>{route.params.id}</StyledText>
            <StyledText>{route.params.title}</StyledText>
        </Container>
    );
};

export default Channel;