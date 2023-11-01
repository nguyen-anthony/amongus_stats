import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {NextPage} from "next";
import PlayerDropdown from "@/pages/components/PlayerDropdown";
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<{id: number, name: string} | null>(null);
    const [playerStats, setPlayerStats] = useState<any>(null);

    useEffect(() => {
        if (selectedPlayer) {
            fetch(`/api/playerStats?playerId=${selectedPlayer.id}`)
                .then((res) => res.json())
                .then(setPlayerStats);
        }
    }, [selectedPlayer]);

    return (
        <div>
            <h1>Among Us Stats</h1>
            <PlayerDropdown onSelect={setSelectedPlayer} />

            {playerStats && selectedPlayer && (
                <div>
                    <h2>Stats for {selectedPlayer.name}</h2>
                    <p>Games Played: {playerStats.games_played}</p>
                    <p>Games Won as Imposter: {playerStats.games_won_as_imposter}</p>
                    <p>Games Lost as Imposter: {playerStats.games_lost_as_imposter}</p>
                    <p>Times Died First: {playerStats.times_died_first}</p>
                </div>
            )}

        </div>
    );
};

export default Home;