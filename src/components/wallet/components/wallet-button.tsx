import styles from "./wallet-button.module.css";

const WalletButton = ( { children }: any ) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
};

export default WalletButton;