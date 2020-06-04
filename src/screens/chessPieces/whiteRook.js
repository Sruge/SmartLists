import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

/* Use this if you are using Expo
  import * as Svg from 'react-native-svg';
  const { Circle, Rect } = Svg;
  */

import React from "react";
import { View, StyleSheet } from "react-native";

export default class WhiteRook extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Svg>
          <G
            fill="#fff"
            fillRule="evenodd"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path
              d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"
              strokeLinecap="butt"
            />
            <Path d="M34 14l-3 3H14l-3-3" />
            <Path
              d="M31 17v12.5H14V17"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
            <Path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
            <Path d="M11 14h23" fill="none" strokeLinejoin="miter" />
          </G>
        </Svg>
      </View>
    );
  }
}
