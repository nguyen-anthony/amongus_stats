import React, { useState } from 'react';
import { Button, Card, CardContent, Collapse, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

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
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h5">{player.name}</Typography>
                    <img src="/images/blankavatar.png" width="128px" height="128px" alt={`${player.name}'s avatar`} />

                    <div style={{ height: '40px', marginTop: '10px' }}> {/* Reserved space */}
                        {player.creator_flag &&
                            <a href={`https://twitch.tv/${player.name}`} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTwitch} color="#9146FF" size="2x" />
                            </a>
                        }
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

                    <div onClick={() => setIsCollapsed(!isCollapsed)} style={{
                        width: '100%',
                        height: '40px',
                        backgroundColor: '#424242',
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white'
                    }}>
                        {isCollapsed ? `Expand for ${player.name}'s Stats` : "Collapse"}
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PlayerCard;
