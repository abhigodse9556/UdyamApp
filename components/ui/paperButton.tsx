import React from "react";
import { Button, ButtonProps } from "react-native-paper";

type PaperButtonProps = {
  title: string;
};
const PaperButton = (
  props: PaperButtonProps & Omit<ButtonProps, "children">,
) => {
  const { title, ...rest } = props;
  return <Button {...rest}>{title}</Button>;
};

export default PaperButton;
