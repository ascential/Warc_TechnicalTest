import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const colors = {
    bg: `#FFFFFF`,
    text: '#121212',
    link: '#F78FAD',
    appHeader: '#E13680',
    pageHeader: '#5583EE',
    border: '#aaaaaa',
    spotlight: '#f2f3b4',
    alert: '#ff3300'
}

export const spacings = {
    body: `10vh`,
    container: `2vh`,
    element: `1vh`,
    none: `0px`
}

export const fonts = {
    family: `Arial, Courier New, Georgia, serif`,
    normal: '0.9em',
    bold: 'bolder'
}

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.bg};
    color: ${colors.text};
    margin: ${spacings.container};
    padding: ${spacings.none};
    font-family: ${fonts.family};
    font-size: ${fonts.normal};
    width:100%;
    height:100%;   
  }
`

export const ApplicationHeading = styled.h1`
  font-size: calc(${fonts.normal} * 3);
  font-weight: bold;
  color: ${colors.appHeader};
  margin-bottom: ${spacings.container};
`

export const PageHeading = styled(ApplicationHeading)`
  font-size: calc(${fonts.normal} * 2);
  color: ${colors.pageHeader};
`

export const SectionHeading = styled(ApplicationHeading)`
  font-size: calc(${fonts.normal} * 1.5);
  color: ${darken(0.2, colors.pageHeader)};
`

export const StyledLink = styled(Link)`
  color: ${darken(0.3, colors.link)};
  text-decoration: none;
  font-weight: ${fonts.bold};

  &:hover {
    background-color: ${colors.spotlight}
  }
`