import { FC } from "react";
import PhysicalKeyboard from "./PhysicalKeyboard";
import Keyboard from "./Keyboard";
import Return from "./Return";

export interface IconProps {
  className?: string;
  name: IconName;
  pathFill?: string;
}

export type IconName = "physical-input" | "keyboard" | "return";

const IconCmpMap: Record<IconName, FC<{ className?: string; pathFill?: string }>> = {
  "physical-input": PhysicalKeyboard,
  keyboard: Keyboard,
  return: Return,
};
const Icon: FC<IconProps> = (props) => {
  const { className, name, pathFill } = props;

  const getIcon = () => {
    if (!name) return null;
    const IconCmp = IconCmpMap[name];
    return <IconCmp className={className} pathFill={pathFill} />;
  };

  return <>{getIcon()}</>;
};

export default Icon;
