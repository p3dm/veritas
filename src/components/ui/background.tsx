"use client";

import { useEffect, useRef, useState} from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const getFileExtension = (url: string): string => {
    return url.split(".").pop()?.toLowerCase() || "";

};

const isVideo = (extension:string): boolean => {
    const videoExtensions = ["mp4", "webm", "mov", "avi", "wmv", "flv", "mkv"]
    return videoExtensions.includes(extension);
};

const VideoWithPlaceholder = ({
    src,
    placeholder,
    className,
}:{
    src:string;
    placeholder?:string;
    className?:string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const[videoLoaded, setVideoLoaded] = useState(false);
    
    useEffect(() => {
        if(process.env.NODE_ENV === "development" && !placeholder){
            console.warn("No placeholder provided for video");
        };
    }, [placeholder]);

    useEffect(() => {
        const video = videoRef.current;

        if(video){
            const handleLoadedData = () => {
                setVideoLoaded(true);
            };
            const handleCanPlay = () => {
                setVideoLoaded(true);
            };

            video.addEventListener("loadeddata", handleLoadedData);
            video.addEventListener("canplay", handleCanPlay);
            video.load();

            if(video.readyState >= 2){
                setVideoLoaded(true);
            }

            return () => {
                video.removeEventListener("loadeddata", handleLoadedData);
                video.removeEventListener("canplay", handleCanPlay);
            };
        }
    }, [src]);

    useEffect(() => {
        if(videoRef.current && videoLoaded){
            videoRef.current.play();
        }
    }, [videoLoaded]);

    return (
        <>
            {placeholder? (
                <Image 
                    src={placeholder}
                    alt="Background"
                    priority
                    sizes="100vw"
                    fill
                    loading="eager"
                    className={cn(className, {invisible: videoLoaded})}
                    quality={100}
                />

            ): null}
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                loop
                controls={false}
                preload="auto"
                poster={placeholder}
                className={(cn(className,{invisible: placeholder? !videoLoaded:false}))}
            />
        </>
    );
};

export const Background = ({
    src,
    placeholder, 
}: {
    src:string;
    placeholder?: string;
}) => {
    const extension = getFileExtension(src);
    const isVideoFile = isVideo(extension);

    const classNames = "top-0 bg-background absolute inset-0 w-full h-full object-cover";

    if(isVideoFile){
        return(
            <VideoWithPlaceholder
                src={src}
                placeholder={placeholder}
                className={classNames}
            />
        );
    }

    return(
        <Image
            src={src}
            alt="Background"
            priority
            loading="eager"
            sizes="100vw"
            fill    
            className={classNames}
        />
    );

};

