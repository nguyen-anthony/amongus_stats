import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
                <Typography variant="h6">{title}</Typography>
                {stats.map((player) => (
                    <Typography key={player.name}>
                        {player.name} - {player.count}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default Leaderboard;
