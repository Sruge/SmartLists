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

export default class BlackQueen extends React.Component {
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
            fill="#000"
            fillRule="evenodd"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <G fill="#000" stroke="none">
              <Circle cx={6} cy={12} r={2.75} />
              <Circle cx={14} cy={9} r={2.75} />
              <Circle cx={22.5} cy={8} r={2.75} />
              <Circle cx={31} cy={9} r={2.75} />
              <Circle cx={39} cy={12} r={2.75} />
            </G>
            <Path
              d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z"
              strokeLinecap="butt"
            />
            <Path
              fill="none"
              d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
              strokeLinecap="butt"
            />
            <Path
              d="M11 38.5a35 35 1 0 0 23 0"
              fill="none"
              strokeLinecap="butt"
            />
            <Path
              d="M11 29a35 35 1 0 1 23 0M12.5 31.5h20M11.5 34.5a35 35 1 0 0 22 0M10.5 37.5a35 35 1 0 0 24 0"
              fill="none"
              stroke="#000"
            />
          </G>
        </Svg>
      </View>
    );
  }
}
