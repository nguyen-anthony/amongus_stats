import React from "react";
import { Grid } from "@mui/material";
import PlayerCard from "@/pages/components/PlayerCard";

type SelectedPlayerGridProps = {
    selectedPlayer: { id: number, name: string };
    playerStats: PlayerStat[];
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

const SelectedPlayerGrid: React.FC<SelectedPlayerGridProps> = ({ selectedPlayer, playerStats }) => {
    const filteredStats = playerStats.filter(stats => stats.id === selectedPlayer.id);

    return (
        <Grid container item xs={12} spacing={3} justifyContent="center" alignItems="center">
            {filteredStats.map((player) => (
                <PlayerCard player={player} />
            ))}
        </Grid>
    );
};

export default SelectedPlayerGrid;