import styled from 'styled-components';
import { colors, spacings } from '../../global-style';
import { lighten } from 'polished';

export const Button = styled.button`
    min-width: 150px;
    min-height: 25px;
    padding: ${spacings.element};
    margin: ${spacings.element};
    border: 1px solid: ${colors.border};
    border-radius: 5px;
    background-color: ${lighten(0.35, colors.appHeader)};
`