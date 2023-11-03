import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";

type GeneralStatsProps = {
    gamesPlayed: number;
    imposterWins: number;
    crewmateWins: number;
};

const GeneralStatsCard: React.FC<GeneralStatsProps> = ({ gamesPlayed, imposterWins, crewmateWins }) => {
    const stats = [
        { label: 'Total Games Played', value: gamesPlayed },
        { label: 'Total Imposter Wins', value: imposterWins },
        { label: 'Total Crewmate Wins', value: crewmateWins }
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" align="center">General Stats</Typography>
                {stats.map((stat) => (
                    <Box key={stat.label} display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body1" align="left">{stat.label}</Typography>
                        <Typography variant="body1" align="right">{stat.value}</Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};


export default GeneralStatsCard;