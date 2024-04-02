import 'styled-components';

import {
  Border,
  BorderRadius,
  Colors,
  FontSizes,
  FontWeight,
  Margin,
  Media,
  Padding,
  Shadow,
} from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizes: FontSizes;
    colors: Colors;
    fontWeight: FontWeight;
    shadow: Shadow;
    margin: Margin;
    padding: Padding;
    borderRadius: BorderRadius;
    border: Border;
    media: Media;
  }
}
