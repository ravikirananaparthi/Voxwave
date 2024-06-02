import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { FaPlayCircle, FaPauseCircle, FaStepBackward } from 'react-icons/fa';
import { FaForwardStep } from "react-icons/fa6";

export const Player = ({ station, onClose, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let hls;

    if (Hls.isSupported() && station.type === 'application/x-mpegURL') {
      hls = new Hls();
      hls.loadSource(station.url);
      hls.attachMedia(audioRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audioRef.current.play();
      });

      hls.on(Hls.Events.BUFFERING, () => setLoading(true));
      hls.on(Hls.Events.BUFFER_FLUSHED, () => setLoading(false));

      return () => {
        hls.destroy();
      };
    } else {
      audioRef.current.src = station.url;
      audioRef.current.load();
      audioRef.current.play();
    }

    setIsPlaying(true);
    setLoading(true);

    const handleCanPlay = () => setLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const audioElement = audioRef.current;

    audioElement.addEventListener('canplay', handleCanPlay);
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('canplay', handleCanPlay);
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
      }
    };
  }, [station]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  const formatText = (text) => {
    return text.split(' ').length > 2 ? (
      <marquee>{text}</marquee>
    ) : (
      text
    );
  };
  return (
    <div className="fixed bottom-[55px] sm:bottom-0 left-0 right-0 bg-white/50  p-4 shadow-lg flex items-center z-10 rounded-tr-3xl rounded-tl-3xl backdrop-blur-3xl md:bg-slate-600">
      <img src={station.image} alt={station.name} className="w-16 h-16 object-cover rounded rounded-tl-3xl mr-4" />
      <div className="flex-1">
      <h3 className="text-lg font-bold text-black md:text-white">{formatText(station.name)}</h3>
        <p className="text-gray-800 md:text-slate-300">{formatText(station.genre)}</p>
      </div>
      <button onClick={onPrev} className="text-gray-600 md:text-slate-300 ml-4">
        <FaStepBackward size={32} />
      </button>
      <button onClick={handlePlayPause} className="text-black ml-4">
        {loading ? (
          <div className="text-center">
            <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : isPlaying ? (
          <FaPauseCircle size={37} className='text-black md:text-white'/>
        ) : (
          <FaPlayCircle size={37} className='text-black md:text-white'/>
        )}
      </button>
      <button onClick={onNext} className="text-gray-600 md:text-slate-300 ml-4">
        <FaForwardStep size={32} />
      </button>
      <button
        className="ml-1 px-1 py-1 bg-red-500 rounded hover:bg-red-400"
        onClick={onClose}
      >
        Stop
      </button>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};
