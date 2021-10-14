import React from "react";

import styles from "./container.module.css";

type Props = {
  children: any;
  className?: string;
  wrapperClassName?: string;
};

const Container = ( { children, className = "", wrapperClassName = "" }: Props ) => {
  const containerStyles = `${styles.container} ${className}`

  return (
    <div className={wrapperClassName}>
      <div className={containerStyles}>{children}</div>
    </div>
  )
};

export default Container;