import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import WalletButton from "./components/wallet-button";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";

import { useDispatch } from "react-redux";
import { setAddress, setUserBalance } from "store/wallet";

import styles from "./components/wallet-button.module.css";

// const btnStyles = "background-color: #E8963E !important; border-radius: 10px !important;";

const ConnectButton = styled( WalletDialogButton )``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled( Button )``; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
  btnStyle: "blue" | "purple";
}

const Home = ( props: HomeProps ) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState( false ); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState( false ); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState( false ); // true when user got to press MINT

  const [alertState, setAlertState] = useState<AlertState>( {
    open: false,
    message: "",
    severity: undefined,
  } );

  const [startDate, setStartDate] = useState( new Date( props.startDate ) );

  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const onMint = async () => {
    try {
      setIsMinting( true );
      if ( wallet.connected && candyMachine?.program && wallet.publicKey ) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if ( !status?.err ) {
          setAlertState( {
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          } );
        } else {
          setAlertState( {
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          } );
        }
      }
    } catch ( error: any ) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if ( !error.msg ) {
        if ( error.message.indexOf( "0x138" ) ) {
        } else if ( error.message.indexOf( "0x137" ) ) {
          message = `SOLD OUT!`;
        } else if ( error.message.indexOf( "0x135" ) ) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if ( error.code === 311 ) {
          message = `SOLD OUT!`;
          setIsSoldOut( true );
        } else if ( error.code === 312 ) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState( {
        open: true,
        message,
        severity: "error",
      } );
    } finally {
      if ( wallet?.publicKey ) {
        const balance = await props.connection.getBalance( wallet?.publicKey );
        setBalance( balance / LAMPORTS_PER_SOL );
      }
      setIsMinting( false );
    }
  };

  useEffect( () => {
    (async () => {
      if ( wallet?.publicKey ) {
        const balance = await props.connection.getBalance( wallet.publicKey );
        setBalance( balance / LAMPORTS_PER_SOL );

      }
    })();
  }, [wallet, props.connection] );

  useEffect( () => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as anchor.Wallet;

      const { candyMachine, goLiveDate, itemsRemaining } =
        await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection
        );

      setIsSoldOut( itemsRemaining === 0 );
      setStartDate( goLiveDate );
      setCandyMachine( candyMachine );
    })();
  }, [wallet, props.candyMachineId, props.connection] );

  const dispatch = useDispatch();

  useEffect( () => {
    if ( wallet.connected ) {
      const address = shortenAddress( wallet.publicKey?.toBase58() || "" );
      dispatch( setAddress( address ) );
      dispatch( setUserBalance( balance ) );
    }
  }, [wallet.connected, balance, dispatch, wallet.publicKey] );


  const btnColor = props.btnStyle === "purple" ? styles.purple : styles.blue;

  return (
    <main>
      <MintContainer>
        {!wallet.connected ? (
          <ConnectButton className={`${styles.connectButton} ${btnColor}`}>
            <WalletButton>
              <span className={styles.text}>Connect Wallet</span>
            </WalletButton>
          </ConnectButton>
        ) : (
          <MintButton
            disabled={isSoldOut || isMinting || !isActive}
            onClick={onMint}
            variant="contained"
            className={styles.mintButton}
          >
            {isSoldOut ? (
                <span className={styles.text}>SOLD OUT</span>
            ) : isActive ? (
              isMinting ? (
                <CircularProgress/>
              ) : (
                <WalletButton>
                  <span className={styles.text}>MINT</span>
                </WalletButton>
              )
            ) : (
              <Countdown
                date={startDate}
                onMount={( { completed } ) => completed && setIsActive( true )}
                onComplete={() => setIsActive( true )}
                renderer={renderCounter}
              />
            )}
          </MintButton>
        )}
      </MintContainer>
      {/*{wallet.connected && (*/}
      {/*  <p className={styles.highlightedText}>Address: {shortenAddress( wallet.publicKey?.toBase58() || "" )}</p>*/}
      {/*)}*/}

      {/*{wallet.connected && (*/}
      {/*  <p className={styles.highlightedText}>Balance: {(balance || 0).toLocaleString()} SOL</p>*/}
      {/*)}*/}

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState( { ...alertState, open: false } )}
      >
        <Alert
          className={styles.notifications}
          onClose={() => setAlertState( { ...alertState, open: false } )}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ( { days, hours, minutes, seconds, completed }: any ) => {
  return (
    <CounterText>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
