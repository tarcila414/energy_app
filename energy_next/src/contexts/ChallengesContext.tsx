import { createContext, ReactNode, useContext, useState } from 'react';

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
    resetChallenge: () => void
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

    function levelUp() {
        setLevel(level + 1);
    }
    
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random()*challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActivedChallenge(challenge);
    }

    function resetChallenge() {
        setActivedChallenge(null);
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
                resetChallenge
                }}>
            {children}
        </ChallengesContext.Provider>
    )
}