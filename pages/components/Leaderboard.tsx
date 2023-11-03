import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

type PlayerStats = {
    name: string;
    count: number;
};

type LeaderboardProps = {
    title: string;
    stats: PlayerStats[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ title, stats }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" align="center">{title}</Typography>
                {stats.map((player) => (
                    <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body1" align="left">{player.name}</Typography>
                        <Typography variant="body1" align="right">{player.count}</Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default Leaderboard;
