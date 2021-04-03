import styled from 'styled-components';
import { colors, spacings, fonts } from '../../global-style';
import { lighten } from 'polished';

export const StyledList = styled.ul`
    padding: ${spacings.element};
    margin: ${spacings.container};
    border: 1px solid: ${colors.border};
    border-radius: 5px;
    background-color: ${lighten(0.35, colors.alert)};
    list-style-type: none;
    width: 50%;
    height: auto;
    font-weight: ${fonts.bold}
`