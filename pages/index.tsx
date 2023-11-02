import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {NextPage} from "next";
import PlayerDropdown from "@/pages/components/PlayerDropdown";
import {useState} from "react";
import { Card, CardContent, Grid, Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

type Player = {
    id: number;
    name: string;
    creator_flag: boolean;
    guest_flag: boolean;
}

type PlayerStat = {
    id: number;
    name: string;
    games_played: number;
    games_won_as_imposter: number;
    games_lost_as_imposter: number;
    times_died_first: number;
};

// @ts-ignore
export default function Home({players, playerStats, games, topImposters, topDeaths}) {
    const [selectedPlayer, setSelectedPlayer] = useState<{id: number, name: string} | null>(null);

    const filteredStats = (selectedPlayer ? playerStats.filter((stats: PlayerStat) => stats.id === selectedPlayer.id)
            : playerStats
    ).sort((a: PlayerStat, b: PlayerStat) => a.name.localeCompare(b.name));

    let sortedPlayers = players.sort((a: Player, b: Player) => a.name.localeCompare(b.name));

    return (
        <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">Among Us Stats</Typography>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">General Stats</Typography>
                        <Typography>Total Games Played: {games.games_played}</Typography>
                        <Typography>Total Imposter Wins: {games.imposter_wins}</Typography>
                        <Typography>Total Crewmate Wins: {games.crewmate_wins}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid container item xs={12} justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Imposter Wins Leaderboard</Typography>
                            {topImposters.map((player: any) => (
                                <Typography key={player.name}>{player.name} - {player.wins}</Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">First Deaths Leaderboard</Typography>
                            {topDeaths.map((player: any) => (
                                <Typography key={player.name}>{player.name} - {player.deaths}</Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <Grid item xs={12} style={{ width: '50%', margin: '0 auto' }}>
                <PlayerDropdown players={sortedPlayers} onSelect={(player) => {
                    if (player && player.id !== -1) {
                        setSelectedPlayer(player);
                    } else {
                        setSelectedPlayer(null);  // Reset when 'All' is selected
                    }
                }} />
            </Grid>

            <Grid container item xs={12} spacing={3}>
                {filteredStats.map((player: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={player.name}>
                        <Card>
                            <CardContent>
                                <Typography>Player Name: {player.name}</Typography>
                                <Typography>Games Played: {player.games_played}</Typography>
                                <Typography>Imposter Wins: {player.games_won_as_imposter}</Typography>
                                <Typography>
                                    Imposter Win/Loss Ratio: {player.games_lost_as_imposter !== 0
                                    ? (player.games_won_as_imposter / player.games_lost_as_imposter).toFixed(2)
                                    : 'N/A'}
                                </Typography>
                                <Typography>Imposter Losses: {player.games_lost_as_imposter}</Typography>
                                <Typography>First Deaths: {player.times_died_first}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Grid>
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
    console.log("Players Info", players);

    const statsRes = await fetch(`${apiUrl}/api/playerStats`, {
        headers: headers
    });
    const playerStats = await statsRes.json();
    console.log("Player Stats", playerStats);

    const gamesRes = await fetch(`${apiUrl}/api/games`, {
        headers: headers
    })
    const games = await gamesRes.json();
    console.log("Games", games);

    const topImpostersRes = await fetch(`${apiUrl}/api/topImposters`, {
        headers: headers
    })
    const topImposters = await topImpostersRes.json();
    console.log("Top Imposters:", topImposters)

    const topDeathsRes = await fetch(`${apiUrl}/api/topDeaths`, {
        headers: headers
    })
    const topDeaths = await topDeathsRes.json();
    console.log("Top Deaths:", topDeaths)


    return {
        props: {players, playerStats, games, topImposters, topDeaths}
    };
}