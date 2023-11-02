import React, { useState } from 'react';
import { Button, Card, CardContent, Collapse, Grid, Typography } from '@mui/material';

type Player = {
    id: number;
    name: string;
    games_played: number;
    games_won_as_imposter: number;
    games_lost_as_imposter: number;
    times_died_first: number;
    creator_flag: boolean;
    guest_flag: boolean;
};

type Props = {
    player: Player;
};

const PlayerCard: React.FC<Props> = ({ player }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <Grid item xs={12} sm={6} md={3} key={player.name}>
            <Card>
                <CardContent>
                    <img src="/images/blankavatar.png" width="100px" alt={`${player.name}'s avatar`} /> {/* Assuming avatar images are named after the player and stored in a specific directory */}
                    <Typography>{player.name}</Typography>
                    <a href={`https://twitch.tv/${player.name}`} target="_blank">Twitch</a> {/* Assuming twitch_url exists in your data */}

                    <div>
                        <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                            {isCollapsed ? "Expand for Player Stats" : "Collapse"}
                        </Button>
                    </div>

                    <Collapse in={!isCollapsed}>
                        <Typography>Games Played: {player.games_played}</Typography>
                        <Typography>Imposter Wins: {player.games_won_as_imposter}</Typography>
                        <Typography>
                            Imposter Win/Loss Ratio: {player.games_lost_as_imposter !== 0
                            ? (player.games_won_as_imposter / player.games_lost_as_imposter).toFixed(2)
                            : 'N/A'}
                        </Typography>
                        <Typography>Imposter Losses: {player.games_lost_as_imposter}</Typography>
                        <Typography>First Deaths: {player.times_died_first}</Typography>
                    </Collapse>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PlayerCard;
