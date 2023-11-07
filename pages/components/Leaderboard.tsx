import React, {useState} from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

type PlayerStats = {
    name: string;
    count: number;
};

type LeaderboardProps = {
    title: string;
    stats: PlayerStats[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ title, stats }) => {
    // State to control the visibility of the full leaderboard
    const [showAll, setShowAll] = useState(false);

    // Function to toggle the full leaderboard visibility
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" align="center">{title}</Typography>
                {stats.slice(0, showAll ? stats.length : 5).map((player) => (
                    <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body1" align="left">{player.name}</Typography>
                        <Typography variant="body1" align="right">{player.count}</Typography>
                    </Box>
                ))}
                {stats.length > 5 && ( // Only show the toggle button if there are more than 5 players
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="outlined" onClick={toggleShowAll}>
                            {showAll ? 'Show Less' : 'Show More'}
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Leaderboard;
