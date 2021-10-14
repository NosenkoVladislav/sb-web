import React from "react";

import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
}

const Button = ( { text, disabled = false }: ButtonProps ) => {

  return (
    <button disabled={disabled} className={styles.button}>{text}</button>
  )
};

export default Button;