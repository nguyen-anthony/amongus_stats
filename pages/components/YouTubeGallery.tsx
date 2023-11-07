import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Card, CardContent } from "@mui/material";

type YouTubeGalleryProps = {
    videoIds: string[];
};

const YouTubeGallery: React.FC<YouTubeGalleryProps> = ({ videoIds }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" align="center">Video Highlights</Typography>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showIndicators={true}
                    showThumbs={false}
                    useKeyboardArrows={true}
                    autoPlay={false}
                    dynamicHeight={true}
                >
                    {videoIds.map((id) => (
                        <div key={id}>
                            <iframe
                                width="100%"
                                height="400" // You can use dynamic height if you prefer
                                src={`https://www.youtube.com/embed/${id}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </Carousel>
            </CardContent>
        </Card>
    );
};

export default YouTubeGallery;
