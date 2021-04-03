import styled from 'styled-components';
import { colors, spacings, fonts } from '../../global-style';
import { lighten } from 'polished';


export const CustomTable = styled.table`
    border: 1px solid ${colors.border};
    border-spacing: ${spacings.none};

    thead tr {
        background-color: ${lighten(0.1, colors.pageHeader)};                  
        padding: 2px;

        td {
            font-weight: ${fonts.bold}
        }
    }

    tbody tr:nth-child(2) {
        background-color: ${lighten(0.25, colors.pageHeader)}; 
    }

    td {
        min-width:100px;
        padding: 5px;
    }
`