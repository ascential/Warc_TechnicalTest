import styled from 'styled-components';
import { colors, spacings } from '../../global-style';

export const StyledImage = styled.img`
    height: 75px;
    width: 75px;
    padding: ${spacings.element};
    margin: ${spacings.element};
    border: 1px solid: ${colors.border};
    border-radius: 75%;    
`