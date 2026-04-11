import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */

// Extract valid names
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];
type EntypoIconName = React.ComponentProps<typeof Entypo>["name"];
type AntDesignIconName = React.ComponentProps<typeof AntDesign>["name"];
type FontistoIconName = React.ComponentProps<typeof Fontisto>["name"];
type FontAwesome5IconName = React.ComponentProps<typeof FontAwesome5>["name"];
type IoniconsIconName = React.ComponentProps<typeof Ionicons>["name"];
type FontAwesome6IconName = React.ComponentProps<typeof FontAwesome6>["name"];

type IconSymbolProps =
  | {
      type: "MaterialIcons";
      name: MaterialIconName;
    }
  | {
      type: "Entypo";
      name: EntypoIconName;
    }
  | {
      type: "AntDesign";
      name: AntDesignIconName;
    }
  | {
      type: "Fontisto";
      name: FontistoIconName;
    }
  | {
      type: "FontAwesome5";
      name: FontAwesome5IconName;
    }
  | {
      type: "Ionicons";
      name: IoniconsIconName;
    }
  | {
      type: "FontAwesome6";
      name: FontAwesome6IconName;
    };

type BaseProps = {
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
};

export function IconSymbol(props: IconSymbolProps & BaseProps) {
  const { size = 24, color, style } = props;

  switch (props.type) {
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={props.name}
          size={size}
          color={color}
          style={style}
        />
      );

    case "Entypo":
      return (
        <Entypo name={props.name} size={size} color={color} style={style} />
      );

    case "AntDesign":
      return (
        <AntDesign name={props.name} size={size} color={color} style={style} />
      );

    case "Fontisto":
      return (
        <Fontisto name={props.name} size={size} color={color} style={style} />
      );

    case "FontAwesome5":
      return (
        <FontAwesome5
          name={props.name}
          size={size}
          color={color}
          style={style}
        />
      );

    case "Ionicons":
      return (
        <Ionicons name={props.name} size={size} color={color} style={style} />
      );

    case "FontAwesome6":
      return (
        <FontAwesome6
          name={props.name}
          size={size}
          color={color}
          style={style}
        />
      );

    default:
      return null;
  }
}
