import React from "react";
import { useSelector } from "react-redux";

import { Container, Image } from "components";
import { RootState } from "../../../store";

import styles from "./header.module.css";

import logo from "assets/logo.svg";

const Header = () => {
  const { address, balance } = useSelector( ( state: RootState ) => state.wallet );

  return (
    <Container>
      <header className={styles.header}>
        <div>
          <Image src={logo}/>
        </div>
        <div className={styles.wallet}>
          {address && <div>Address:<strong>{address}</strong></div>}
          {balance && <div>Balance:<strong>{balance}</strong></div>}
        </div>
      </header>
    </Container>
  )
};

export default Header;