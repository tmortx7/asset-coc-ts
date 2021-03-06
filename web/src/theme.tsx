import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: '#000000',
    white: '#ffffff',
    coc_main: '#c8102e',
    coc_secondary:'#4b4f55',
    coc_secondary_1l: '#5d6066',
    coc_secondary_2l: '#6f7277',
    coc_secondary_3l: '#818388',
    coc_secondary_4l: '#939599',
    coc_secondary_5l: '#a5a7aa',
    coc_secondary_6l: '#b7b9bb',
    coc_secondary_7l: '#c9cacc',
    coc_secondary_8l: '#dbdcdd',
    coc_secondary_9l: '#ededee',
    coc_secondary_10l: '#f6f6f6',
    coc_secondary_1d: '#191919',
    coc_secondary_2d: '#333333',
    coc_secondary_3d: '#4c4c4c',
    coc_secondary_4d: '#666666',
    coc_secondary_5d: '#7f7f7f',
    coc_secondary_6d: '#999999',
    coc_secondary_7d: '#b2b2b2',
    coc_secondary_8d: '#cccccc',
    coc_secondary_9d: '#e5e5e5',
    coc_secondary_orange:'#E57200',
    coc_secondary_yellow:'#FFC600',
    coc_secondary_green:'#4C8C2B',
    coc_secondary_blue:'#0085AD',
    coc_secondary_dark_blue:'#003865',
    coc_secondary_purple: '#642F6C',
    coc_secondary_pink:'#AC145A',
    coc_secondary_orange_l:'#ED8B00',
    coc_secondary_orage_d:"#DC4405",
    coc_secondary_yellow_l: "#FEDB00",
    coc_secondary_yellow_d: "#F2A900",
    coc_secondary_green_l: '#78BE20',
    coc_secondary_green_d:'#44693D',
    coc_seconary_blue_l: '#00A3E0',
    coc_secondary_blue_d: '#005670',
    coc_secondary_dark_blue_d: '#041E42',
    coc_secondary_purple_l: '#93328E',
    coc_secondary_purple_d: '#3C1053',
    coc_secondary_pink_l: '#CE0F69',
    coc_secondary_pink_d: '#6C1D45'

  },
  fonts,
  breakpoints,
})

export default theme
