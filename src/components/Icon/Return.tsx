import { FC } from "react";

export interface ReturnProps {
  className?: string;
  pathFill?: string;
}

const Return: FC<ReturnProps> = (props) => {
  const { className, pathFill } = props;

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fill="none" stroke-width="2" d="M9,4 L4,9 L9,14 M18,19 L18,9 L5,9" transform="matrix(1 0 0 -1 0 23)"></path>
    </svg>
  );
};

export default Return;
