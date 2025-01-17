import Head from "next/head";

import {ExperienceBar} from "../components/ExperienceBar";
import {Profile} from "../components/Profile";
import {CompletedChallenges} from "../components/CompletedChallenges";

import styles from "../styles/pages/Home.module.css";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>  
      <Head>
        <title>Início | energy</title>
      </Head>
      
      <ExperienceBar/>

      <CountdownProvider>
        <section>
          <div >
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
  </div>   
  )
}
