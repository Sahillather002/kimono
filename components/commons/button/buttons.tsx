import React from "react";
import styles from "./button.module.css";

type ButtonProps = {
  buttonName?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode; // Add this line to define the children prop
};

const Button = ({
  buttonName,
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${className || ''}`} onClick={onClick} disabled={disabled}>
      {children || buttonName}
    </button>
  );
};

export default Button;
