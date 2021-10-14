import React from "react";

import { Container, Image } from "../../index";

import styles from "./footer.module.css";

import logo from "assets/logo.svg";
import discord from "assets/discord.svg";
import twitter from "assets/twitter.svg";

const discordLink = "https://discord.com/invite/VU7sMvXDyE";
const twitterLink = "https://twitter.com/shibafamily_nft";

const Footer = () => {
  return (
    <Container wrapperClassName={styles.wrapper}>
      <footer className={styles.footer}>
        <Image src={logo} className={styles.footerLogo}/>
        <div className={styles.socialBlock}>
          <div className={styles.social}>
            <Image src={discord} link={discordLink} isBlank={true}/>
          </div>
          <div className={styles.social}>
            <Image src={twitter} link={twitterLink} isBlank={true}/>
          </div>
        </div>
        <div className={styles.copyright}>© Shiba Family Copyright 2021</div>
      </footer>
    </Container>
  )
};

export default Footer;