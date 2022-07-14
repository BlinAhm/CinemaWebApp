import { useState } from 'react';
import ReactPlayer from "react";
import './Video.css';
import React from "react";
import bgVideo from '../../video/video-highlight.mp4';

function Video(){
    return (
        <div classname="background">
            <video autoPlay loop muted plays-inline>
                <source src={bgVideo} type="video/mp4" />
            </video>
        </div>
    );
}
export default Video;

