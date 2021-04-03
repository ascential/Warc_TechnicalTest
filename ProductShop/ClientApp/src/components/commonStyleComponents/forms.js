import styled from 'styled-components';
import { colors, spacings, fonts } from '../../global-style';
import { lighten } from 'polished';

export const StyledForm = styled.div`
    margin-left: ${spacings.container};    
    width: 30%;

    fieldset {
        border: 0px;
        vertical-align: top;
        width: auto;
        
        label {
            width: 200px;
        }
    }
`

export const StyledFormFooter = styled.fieldset`
    float:right;
`

export const Input = styled.input`
    min-width: 200px;
    min-height: 25px;
    padding: ${spacings.element};
    border: 1px solid: ${colors.border};
    border-radius: 5px;
    background-color: ${lighten(0.25, colors.pageHeader)};
    float: left;
`

export const LongText = styled.textarea`
    min-width: 200px;
    rows: 5;
    padding: ${spacings.element};
    border: 1px solid: ${colors.border};
    border-radius: 5px;
    background-color: ${lighten(0.25, colors.pageHeader)};
    float: left;
`

export const Caption = styled.label`
    min-width: 150px;
    min-height: 25px;
    padding: ${spacings.element};
    font-weight: ${fonts.bold};
    float: left;
`