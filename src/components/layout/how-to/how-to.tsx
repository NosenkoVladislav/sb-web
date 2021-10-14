import React from "react";

import { Container } from "components";

import styles from "./how-to.module.css";

const HowTo = () => {
  return (
    <Container>
      <div className={styles.container} id={"how-to"}>
        <h4 className={styles.subtitle}>HOW TO MINT</h4>
        <h2 className={styles.title}>SHIBA MAN NFT</h2>
        <div className={styles.description}>
          <div className={styles.listBlock}>
            <ul className={styles.list}>
              <li className={styles.item}>Click <strong>“Connect Wallet”</strong> button;</li>
              <li className={styles.item}>Choose <strong>Phantom</strong> or <strong>Sollet</strong> wallet in the
                popup. ( Phantom Recommended );
              </li>
              <li className={styles.item}>Login to your wallet if It’s asking you;</li>
              <li className={styles.item}>Back to the Minting page;</li>
              <li className={styles.item}>The <strong>“Connect Wallet”</strong> button will be replaced with “Mint”
                button;
              </li>
              <li className={styles.item}>Click <strong>“Mint”</strong> button ( make sure you got enough SOL on your
                balance );
              </li>
              <li className={styles.item}>Click <strong>“Approve”</strong> transaction;</li>
              <li className={styles.item}>After confirmation, you will be redirected back to the Minting page;</li>
              <li className={styles.item}>Wait. It can take up to few minutes to mint NFT</li>
              <li className={styles.item}>If everything is fine, you will see you NFT in your Phantom wallet</li>
              <li className={styles.item}>Click <strong>“Mint”</strong> again if you would like to get more Shiba Man
              </li>
            </ul>
            <div className={styles.ital}>
              *Don’t forget to post your NFT in social networks and tag @shibafamily_nft 🚀
            </div>
          </div>
          <div className={styles.videoBlock}>
            <iframe src="https://www.youtube.com/embed/vH6pe_4DTmA?controls=0&hl=en&modestbranding=1&rel=0"
                    frameBorder="0"
                    title="Shiba Family"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </Container>
  )
};

export default HowTo;