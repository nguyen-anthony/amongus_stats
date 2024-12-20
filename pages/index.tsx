import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {NextPage} from "next";
import PlayerDropdown from "@/pages/components/PlayerDropdown";
import {useState} from "react";
import { Grid } from '@mui/material';
import Leaderboard from "@/pages/components/Leaderboard";
import PlayerGrid from "@/pages/components/PlayerGrid";
import GeneralStatsCard from "@/pages/components/GeneralStatsCard";
import SelectedPlayerGrid from "@/pages/components/SelectedPlayerGrid";
import YouTubeGallery from "@/pages/components/YouTubeGallery";

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
    creator_flag: boolean;
    guest_flag: boolean;
};

// @ts-ignore
export default function Home({players, playerStats, games, topImposters, topDeaths}) {
    const [selectedPlayer, setSelectedPlayer] = useState<{id: number, name: string} | null>(null);
    const sortedStats = playerStats.sort((a: Player, b: Player) => a.name.localeCompare(b.name));
    const regularPlayers = sortedStats.filter((stats: PlayerStat) => !stats.guest_flag);
    const guestPlayers = sortedStats.filter((stats: PlayerStat) => stats.guest_flag);

    let sortedPlayers = players.sort((a: Player, b: Player) => a.name.localeCompare(b.name));

    const videoIds = ['k9hyZg8Gf_E', 'Ydg_5hJmBAg', 'XyaZ5Mp7jfU', 'YvWJ_v9YpVo', 'FS59Ui16ZBs']; // Add your video IDs here


    const handlePlayerSelection = (player: {id: number, name: string} | null) => {
        if (player && player.id !== -1) {
            setSelectedPlayer(player);
        } else {
            setSelectedPlayer(null);  // Reset when 'All' is selected
        }
    };

    return (
        <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item xs={12} style={{ position: 'relative', textAlign: 'center' }}>
                <img src="/images/amongusbannerbetter.png" height="400px" width="1400px" style={{ maxWidth: '100%', borderRadius: '35%' }} alt="Among Us Banner"/>
            </Grid>

            <Grid container item xs={12} justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <GeneralStatsCard gamesPlayed={games.games_played} imposterWins={games.imposter_wins} crewmateWins={games.crewmate_wins} />
                </Grid>
            </Grid>

            <Grid container item xs={12} justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Leaderboard title={"Imposter Wins"} stats={topImposters} />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Leaderboard title={"First Deaths"} stats={topDeaths} />
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={3}>
                    <YouTubeGallery videoIds={videoIds} />
                </Grid>
            </Grid>

            <Grid item xs={12} style={{ width: '50%', margin: '0 auto' }}>
                <PlayerDropdown players={sortedPlayers} onSelect={handlePlayerSelection} />
            </Grid>

            {!selectedPlayer && <PlayerGrid title="The Squad" players={regularPlayers} />}
            {!selectedPlayer && <PlayerGrid title="Guest Players" players={guestPlayers} />}
            {selectedPlayer && (<SelectedPlayerGrid selectedPlayer={selectedPlayer} playerStats={sortedStats} />)}
        </Grid>
    );
};

export async function getServerSideProps() {
    const headers: Record<string, string> = {};

    if(process.env.SECRET_API_TOKEN) {
        headers['x-secret-token'] = process.env.SECRET_API_TOKEN;
    }

    const players = await fetchData('/api/players', headers);
    const playerStats = await fetchData('/api/playerStats', headers);
    const games = await fetchData('/api/games', headers);
    const topImposters = await fetchData('/api/topImposters', headers);
    const topDeaths = await fetchData('/api/topDeaths', headers);

    return {
        props: {players, playerStats, games, topImposters, topDeaths}
    };
}

async function fetchData(endpoint: string, headers: Record<string, string>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { headers });
    return response.json();
}
