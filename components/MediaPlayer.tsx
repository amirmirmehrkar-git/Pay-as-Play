'use client';

import { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface MediaPlayerProps {
  mediaUrl?: string;
  type: 'video' | 'audio';
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  title: string;
}

export default function MediaPlayer({
  mediaUrl,
  type,
  isPlaying,
  onPlay,
  onPause,
  title,
}: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    } else if (type === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, type]);

  if (type === 'video') {
    return (
      <div className="relative aspect-video w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {mediaUrl ? (
          <video
            ref={videoRef}
            src={mediaUrl}
            className="w-full h-full object-contain"
            controls={false}
            onPlay={onPlay}
            onPause={onPause}
            onError={(e) => {
              console.error('Video error:', e);
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-zinc-500 dark:text-zinc-400">
              <p className="text-lg font-medium">Video Player</p>
              <p className="text-sm mt-2">Content: {title}</p>
              <p className="text-xs mt-2 text-zinc-400">
                {mediaUrl ? 'Loading video...' : 'No video file available'}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Audio player
  return (
    <div className="relative w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 p-8">
      {mediaUrl ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <audio
              ref={audioRef}
              src={mediaUrl}
              controls={false}
              onPlay={onPlay}
              onPause={onPause}
              onError={(e) => {
                console.error('Audio error:', e);
              }}
            />
            {isPlaying ? (
              <PauseIcon className="w-12 h-12 text-white" />
            ) : (
              <PlayIcon className="w-12 h-12 text-white ml-1" />
            )}
          </div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            {mediaUrl ? 'Audio ready' : 'No audio file available'}
          </p>
        </div>
      ) : (
        <div className="text-center text-zinc-500 dark:text-zinc-400">
          <p className="text-lg font-medium">Audio Player</p>
          <p className="text-sm mt-2">Content: {title}</p>
          <p className="text-xs mt-2 text-zinc-400">No audio file available</p>
        </div>
      )}
    </div>
  );
}

