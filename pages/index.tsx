import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {NextPage} from "next";
import PlayerDropdown from "@/pages/components/PlayerDropdown";
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

// @ts-ignore
export default function Home({players, playerStats, games}) {
    const [selectedPlayer, setSelectedPlayer] = useState<{id: number, name: string} | null>(null);

    // @ts-ignore
    const selectedPlayerStats = selectedPlayer ? playerStats.find(stats => stats.id === selectedPlayer.id) : null;

    return (
        <div>
            <h1>Among Us Stats</h1>
            <div>
                <h3>General Stats</h3>
                <p>Total Games Played: {games.games_played}</p>
                <p>Total Imposter Wins: {games.imposter_wins}</p>
                <p>Total Crewmate Wins: {games.crewmate_wins}</p>
            </div>

            <PlayerDropdown players={players} onSelect={setSelectedPlayer} />

            {playerStats && selectedPlayer && (
                <div>
                    <h2>Stats for {selectedPlayerStats.name}</h2>
                    <p>Games Played: {selectedPlayerStats.games_played}</p>
                    <p>Games Won as Imposter: {selectedPlayerStats.games_won_as_imposter}</p>
                    <p>Games Lost as Imposter: {selectedPlayerStats.games_lost_as_imposter}</p>
                    <p>Times Died First: {selectedPlayerStats.times_died_first}</p>
                </div>
            )}

        </div>
    );
};

export async function getServerSideProps() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const headers: Record<string, string> = {};

    if(process.env.SECRET_API_TOKEN) {
        headers['x-secret-token'] = process.env.SECRET_API_TOKEN;
    }

    const playersRes = await fetch(`${apiUrl}/api/players`, {
        headers: headers
    });
    const players = await playersRes.json();

    const statsRes = await fetch(`${apiUrl}/api/playerStats`, {
        headers: headers
    });
    const playerStats = await statsRes.json();

    const gamesRes = await fetch(`${apiUrl}/api/games`, {
        headers: headers
    })
    const games = await gamesRes.json();

    return {
        props: {players, playerStats, games}
    };
}