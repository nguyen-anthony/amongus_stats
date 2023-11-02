import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

type GeneralStatsProps = {
    gamesPlayed: number;
    imposterWins: number;
    crewmateWins: number;
};

const GeneralStatsCard: React.FC<GeneralStatsProps> = ({ gamesPlayed, imposterWins, crewmateWins }) => (
    <Card>
        <CardContent>
            <Typography variant="h6">General Stats</Typography>
            <Typography>Total Games Played: {gamesPlayed}</Typography>
            <Typography>Total Imposter Wins: {imposterWins}</Typography>
            <Typography>Total Crewmate Wins: {crewmateWins}</Typography>
        </CardContent>
    </Card>
);

export default GeneralStatsCard;