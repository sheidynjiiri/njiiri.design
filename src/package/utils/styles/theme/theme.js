import mergeWith from 'lodash/mergeWith';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
// import DESIGN_SYSTEM_DEFAULT_PALETTE from '@welovedevs/ui/styles/palettes';

import { THEME_SCHEMA } from './theme_schema';
import { transformTheme } from './theme_transforms';

// const DEFAULT_PALETTE = Object.freeze(cloneDeep(DESIGN_SYSTEM_DEFAULT_PALETTE));
const PREFERED_THEME = {
    primary: {
        50: '#efebea',
        100: '#dfd7d4',
        200: '#bfb0a9',
        300: '#9e887f',
        400: '#7e6154',
        500: '#5e3929',
        600: '#4b2e21',
        700: '#382219',
        800: '#261710',
        900: '#130b08',
        A100: '#b0adff',
        A200: '#7f7aff',
        A400: '#4e47ff',
        A700: '#352eff',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [239, 235, 234],
            100: [223, 215, 212],
            200: [191, 176, 169],
            300: [158, 136, 127],
            400: [126, 97, 84],
            500: [94, 57, 41],
            600: [75, 46, 33],
            700: [56, 34, 25],
            800: [38, 23, 16],
            900: [19, 11, 8]
        }
    },
    secondary: {
        50: '#faf4ee',
        100: '#f5e8dc',
        200: '#ebd1ba',
        300: '#e1ba97',
        400: '#d7a375',
        500: '#cd8c52',
        600: '#a47042',
        700: '#7b5431',
        800: '#523821',
        900: '#291c10',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [250, 244, 238],
            100: [245, 232, 220],
            200: [235, 209, 186],
            300: [225, 186, 151],
            400: [215, 163, 117],
            500: [205, 140, 82],
            600: [164, 112, 66],
            700: [123, 84, 49],
            800: [82, 56, 33],
            900: [41, 28, 16]
        }
    },
    tertiary: {
        50: '#f8faf6',
        100: '#f1f6ed',
        200: '#e2edda',
        300: '#d4e3c8',
        400: '#c5dab5',
        500: '#b7d1a3',
        600: '#92a782',
        700: '#6e7d62',
        800: '#495441',
        900: '#252a21',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [248, 250, 246],
            100: [241, 246, 237],
            200: [226, 237, 218],
            300: [212, 227, 200],
            400: [197, 218, 181],
            500: [183, 209, 163],
            600: [146, 167, 130],
            700: [110, 125, 98],
            800: [73, 84, 65],
            900: [37, 42, 33]
        }
    },
    dark: {
        50: '#E6E6E6',
        100: '#C1C1C1',
        200: '#979797',
        300: '#6D6D6D',
        400: '#4E4E4E',
        500: '#2F2F2F',
        600: '#2A2A2A',
        700: '#232323',
        800: '#1D1D1D',
        900: '#121212',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [230, 230, 230],
            100: [193, 193, 193],
            200: [151, 151, 151],
            300: [109, 109, 109],
            400: [78, 78, 78],
            500: [47, 47, 47],
            600: [42, 42, 42],
            700: [35, 35, 35],
            800: [29, 29, 29],
            900: [18, 18, 18]
        }
    },
    danger: {
        50: '#fdeaeb',
        100: '#fbcccc',
        200: '#f8aaaa',
        300: '#f58788',
        400: '#f26e6f',
        500: '#f05455',
        600: '#ee4d4e',
        700: '#ec4344',
        800: '#e93a3b',
        900: '#e5292a',
        A100: '#ffffff',
        A200: '#fff0f0',
        A400: '#ffbdbd',
        A700: '#ffa3a4',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [253, 234, 235],
            100: [251, 204, 204],
            200: [248, 170, 170],
            300: [245, 135, 136],
            400: [242, 110, 111],
            500: [240, 84, 85],
            600: [238, 77, 78],
            700: [236, 67, 68],
            800: [233, 58, 59],
            900: [229, 41, 42]
        }
    },
    safe: {
        50: '#ecf7f0',
        100: '#d0ebda',
        200: '#b1dec1',
        300: '#91d0a8',
        400: '#7ac695',
        500: '#62bc82',
        600: '#5ab67a',
        700: '#50ad6f',
        800: '#46a565',
        900: '#349752',
        A100: '#e1ffea',
        A200: '#aeffc5',
        A400: '#7bffa1',
        A700: '#62ff8f',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [236, 247, 240],
            100: [208, 235, 218],
            200: [177, 222, 193],
            300: [145, 208, 168],
            400: [122, 198, 149],
            500: [98, 188, 130],
            600: [90, 182, 122],
            700: [80, 173, 111],
            800: [70, 165, 101],
            900: [52, 151, 82]
        }
    },
    warn: {
        50: '#fff3e0',
        100: '#ffe0b2',
        200: '#ffcc80',
        300: '#ffb74d',
        400: '#ffa726',
        500: '#ff9800',
        600: '#fb8c00',
        700: '#f57c00',
        800: '#ef6c00',
        900: '#e65100',
        A100: '#ffd180',
        A200: '#ffab40',
        A400: '#ff9100',
        A700: '#ff6d00',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [255, 243, 224],
            100: [255, 224, 178],
            200: [255, 204, 128],
            300: [255, 183, 77],
            400: [255, 167, 38],
            500: [255, 152, 0],
            600: [251, 140, 0],
            700: [245, 124, 0],
            800: [239, 108, 0],
            900: [230, 81, 0]
        }
    },
    orange: {
        50: '#FFF0E9',
        100: '#FFD8C8',
        200: '#FFBFA3',
        300: '#FFA57E',
        400: '#FF9163',
        500: '#FF7E47',
        600: '#FF7640',
        700: '#FF6B37',
        800: '#FF612F',
        900: '#FF4E20',
        contrastDefaultColor: 'light',
        rgbShades: {
            50: [255, 240, 233],
            100: [255, 216, 200],
            200: [255, 191, 163],
            300: [255, 165, 126],
            400: [255, 145, 99],
            500: [255, 126, 71],
            600: [255, 118, 64],
            700: [255, 107, 55],
            800: [255, 97, 47],
            900: [255, 78, 32]
        }
    },
    light: {
        500: '#fff',
        900: '#fff',
        contrastDefaultColor: 'dark',
        rgbShades: {
            500: [255, 255, 255],
            900: [255, 255, 255]
        }
    }
};
// console.info(DEFAULT_PALETTE);
// console.error(PREFERED_THEME);
export const DEFAULT_THEME = Object.freeze({
    palette: PREFERED_THEME,
    miscellaneous: {
        backgroundColor: PREFERED_THEME.dark[50],
        color: PREFERED_THEME.dark[500],
        fontFamily: ['Avenir Next', 'Open Sans', 'Roboto', 'Arial'],
        spacing: 8
    },
    screenSizes: {
        xs: 400,
        small: 500,
        medium: 900
    },
    components: {
        banner: {
            overlayColor: 'primary',
            imageSource: 'https://cdn.filestackcontent.com/8I2wVnCRTFxypXRYLRsp'
        },
        cards: {
            height: 470,
            width: 470,
            borderRadius: 20,
            default: {
                backgroundColor: 'dark',
                color: 'light',
                backBackgroundColor: 'light',
                backColor: 'dark'
            },
            variants: [
                ['primary', 'light', 'light', 'primary'],
                ['tertiary', 'primary', 'light', 'primary'],
                ['light', 'secondary', 'light', 'secondary'],
                ['secondary', 'light', 'light', 'secondary'],
                ['light', 'primary', 'light', 'primary']
            ].map(([backgroundColor, color, backBackgroundColor, backColor]) => ({
                backgroundColor,
                color,
                backBackgroundColor,
                backColor
            }))
        }
    }
});

export const getRandomCardVariant = (theme) => Math.floor(Math.random() * theme.components?.cards?.variants?.length);

const mergeFunction = (objValue, srcValue) => {
    if (isArray(objValue)) {
        return srcValue;
    }
    return merge(objValue, srcValue);
};

export const buildTheme = (theme) => {
    const merged = mergeWith(cloneDeep(DEFAULT_THEME), theme, mergeFunction);
    try {
        THEME_SCHEMA.validateSync(merged, {
            context: { palette: merged?.palette },
            strict: true
        });
        return transformTheme(merged);
    } catch (error) {
        console.error('Invalid theme! Using default theme instead.', { error });
        return transformTheme({ ...DEFAULT_THEME });
    }
};
