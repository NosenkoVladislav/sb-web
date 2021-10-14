import React from "react";
// import { useHistory } from "react-router-dom";

import { Container, Image, Wallet } from "components";
import styles from "./hero.module.css";

import solanaLogo from "assets/solana-logo.svg";
import heroGif from "assets/Shiba Family Solana Shiba Man.gif"

const mintPrice = 1.3;
const mintSupply = 1000;

const Hero = () => {

  const clearUrl = () => {};

  return (
    <Container>
      <div className={styles.hero}>
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>
            SHIBA MAN: <span className={styles.colorText}>PRE-SALE IS LIVE</span>
          </h2>
          <h4 className={styles.subtitle}>
            Mint your Shiba Man NFT from unique Shiba Family collection
          </h4>

          <div className={styles.numbersBlock}>
            <div className={styles.numbers}>
              <div className={styles.amount}>
                <span>{mintPrice}</span>
                <Image src={solanaLogo}/>
              </div>
              <div className={styles.text}>PRE-SALE MINT PRICE</div>
            </div>
            <div className={styles.numbers}>
              <div className={styles.amount}>
                <span>{mintSupply}</span>
              </div>
              <div className={styles.text}>PRE-SALE MINT PRICE</div>
            </div>
          </div>

          <p className={styles.description}>
            Only whitelisted users can participate in the Pre-Sale. <br/>
            Public Sale start: 17th October, 5PM UTC Time.
          </p>

          <div className={styles.buttonGroup}>
            <Wallet btnStyle={"blue"}/>
            <a href="#how-to" className={styles.link} onClick={clearUrl}>HOW TO MINT</a>
          </div>

        </div>
        <div className={styles.rightColumn}>
          <Image src={heroGif} className={styles.image}/>
        </div>
      </div>
    </Container>
  )
};

export default Hero;