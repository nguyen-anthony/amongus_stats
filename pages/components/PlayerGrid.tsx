import React from "react";
import { Typography, Grid} from '@mui/material';
import PlayerCard from "@/pages/components/PlayerCard";

type PlayerGridProps = {
    title: string;
    players: PlayerStat[];
};

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

const PlayerGrid: React.FC<PlayerGridProps> = ({ title, players }) => (
    <>
        <Typography variant="h4" align="center">{title}</Typography>
        <Grid container item xs={12} spacing={3} justifyContent="center">
            {players && players.map((player) => (
                <PlayerCard key={player.id} player={player}/>
            ))}
        </Grid>
    </>
);

export default PlayerGrid;
