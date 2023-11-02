import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {NextPage} from "next";
import PlayerDropdown from "@/pages/components/PlayerDropdown";
import {useState} from "react";

const inter = Inter({ subsets: ['latin'] })

// @ts-ignore
export default function Home({players, playerStats, games, topImposters, topDeaths}) {
    const [selectedPlayer, setSelectedPlayer] = useState<{id: number, name: string} | null>(null);

    // @ts-ignore
    const filteredStats = selectedPlayer ? playerStats.filter(stats => stats.id === selectedPlayer.id) : playerStats;

    return (
        <div>
            <h1>Among Us Stats</h1>
            <div>
                <h3>General Stats</h3>
                <p>Total Games Played: {games.games_played}</p>
                <p>Total Imposter Wins: {games.imposter_wins}</p>
                <p>Total Crewmate Wins: {games.crewmate_wins}</p>
            </div>

            <div>
                <h3>Imposter Wins Leaderboard</h3>
                {topImposters.map((player: any) => (
                    <p>{player.name} - {player.wins}</p>
                ))}
            </div>

            <div>
                <h3>First Deaths Leaderboard</h3>
                {topDeaths.map((player: any) => (
                    <p>{player.name} - {player.deaths}</p>
                ))}
            </div>

            <PlayerDropdown players={players} onSelect={(player) => {
                if (player && player.id !== -1) {
                    setSelectedPlayer(player);
                } else {
                    setSelectedPlayer(null);  // Reset when 'All' is selected
                }
            }} />


            {filteredStats.map((player: any) => (
                <div>
                    <p>Player Name: {player.name}</p>
                    <p>Games Played: {player.games_played}</p>
                    <p>Imposter Wins: {player.games_won_as_imposter}</p>
                    <p>Imposter Losses: {player.games_lost_as_imposter}</p>
                    <p>First Deaths: {player.times_died_first}</p>
                </div>
            ))}

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

    const topImpostersRes = await fetch(`${apiUrl}/api/topImposters`, {
        headers: headers
    })
    const topImposters = await topImpostersRes.json();
    console.log(topImposters);

    const topDeathsRes = await fetch(`${apiUrl}/api/topDeaths`, {
        headers: headers
    })
    const topDeaths = await topDeathsRes.json();
    console.log(topDeaths);

    return {
        props: {players, playerStats, games, topImposters, topDeaths}
    };
}