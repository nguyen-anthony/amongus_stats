import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Collapse, Grid, Typography} from '@mui/material';
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
    const [avatarUrl, setAvatarUrl] = useState("/images/blankavatar.png");
    const [status, setStatus] = useState("offline");

    const saveAvatarDataToLocalStorage = (playerName: string, avatarUrl: string) => {
        const avatarData = {
            url: avatarUrl,
            timestamp: new Date().getTime(),
        };
        localStorage.setItem(`avatarData_${playerName}`, JSON.stringify(avatarData));
    };

    const getAvatarDataFromLocalStorage = (playerName: string) => {
        const avatarData = localStorage.getItem(`avatarData_${playerName}`);
        return avatarData ? JSON.parse(avatarData) : null;
    };

    const isCacheValid = (timestamp: number, expiryDuration: number) => {
        return new Date().getTime() - timestamp < expiryDuration;
    };

    useEffect(() => {
        const fetchTwitchAvatar = async () => {
            const cachedAvatarData = getAvatarDataFromLocalStorage(player.name);

            // Check if we have valid cached data
            if (cachedAvatarData && isCacheValid(cachedAvatarData.timestamp, 60 * 60 * 1000)) { // 1 hour cache validity
                setAvatarUrl(cachedAvatarData.url);
            } else {
                const response = await fetch(`/api/twitchAvatar?playerName=${player.name}`);
                const data = await response.json();
                setAvatarUrl(data.profileImageUrl);
                saveAvatarDataToLocalStorage(player.name, data.profileImageUrl);
            }
        };

        fetchTwitchAvatar();
    }, [player.name]);

    useEffect(() => {
        const fetchTwitchStatus = async () => {
            const response = await fetch(`/api/twitchLive?playerName=${player.name}`);
            const data = await response.json();
            data.status ? setStatus(data.status) : setStatus("offline");
        }

        fetchTwitchStatus();
    }, [player.name]);

    return (
        <Grid item xs={12} sm={6} md={3} key={player.name}>
            <Card>
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h5">{player.name}</Typography>
                    <img
                        src={player.creator_flag ? avatarUrl : "/images/blankavatar.png"}
                        width="192px"
                        height="192px"
                        alt={`${player.name}'s avatar`}
                        style={{ borderRadius: '50%' }} // This adds the curve to the corners
                    />

                    <div style={{ height: '40px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {player.creator_flag &&
                            <a href={`https://twitch.tv/${player.name}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faTwitch} color="#9146FF" size="2x" />
                                {status === "live" ? <img src="/images/live.png" style={{ height: '36px', width: '36px', marginLeft: '8px' }} alt="Live Status" /> : ""}
                            </a>
                        }
                    </div>


                    <Collapse in={!isCollapsed}>
                        <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body1" align="left">Games Played</Typography>
                            <Typography variant="body1" align="right">{player.games_played}</Typography>
                        </Box>
                        <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body1" align="left">Imposter Wins</Typography>
                            <Typography variant="body1" align="right">{player.games_won_as_imposter}</Typography>
                        </Box>
                        <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body1" align="left">Imposter Win/Loss Ratio</Typography>
                            <Typography variant="body1" align="right">{player.games_lost_as_imposter !== 0
                                ? (player.games_won_as_imposter / player.games_lost_as_imposter).toFixed(2)
                                : 'N/A'}</Typography>
                        </Box>
                        <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body1" align="left">Imposter Losses</Typography>
                            <Typography variant="body1" align="right">{player.games_lost_as_imposter}</Typography>
                        </Box>
                        <Box key={player.name} display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body1" align="left">First Deaths</Typography>
                            <Typography variant="body1" align="right">{player.times_died_first}</Typography>
                        </Box>
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
