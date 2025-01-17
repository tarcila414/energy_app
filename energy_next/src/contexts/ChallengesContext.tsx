import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import challenges from "../../challenges.json";

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number, 
    currentExperience: number, 
    challengesCompleted: number,
    activedChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void, 
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activedChallenge, setActivedChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1)*4, 2);


    useEffect(() => {
        Notification.requestPermission();
    }, []) 


    function levelUp() {
        setLevel(level + 1);
    }
    
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random()*challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActivedChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === "granted") {
            new Notification("Novo desafio!!!", {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge() {
        setActivedChallenge(null);
    }

    function  completeChallenge() {
        if(!activedChallenge){
            return;
        }

        const { amount } = activedChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActivedChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                activedChallenge,
                experienceToNextLevel,
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}