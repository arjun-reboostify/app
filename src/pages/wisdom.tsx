import React, { useState, useRef, useEffect } from 'react';
import soundFile from './x/b.mp3'; // Import the MP3 file for quote
import track1 from '../pages/x/fainted.mp3';
import musicconcentration from '../pages/x/conc.mp3';
import track2 from '../pages/x/memory.mp3';
import coverImage from './x/conc.jpg'; // Assuming the cover image is the same for all tracks

const songsList = [
  { name: "hans zimmer", artist: 'interstellar theme', src: musicconcentration, cover: coverImage },
  { name: "narvent", artist: 'Fainted', src: track1, cover: coverImage },
  { name: "narvent", artist: 'Memory Reboot', src: track2, cover: coverImage },
  { name: "", artist: 'fainted', src: track2, cover: coverImage },
  // Add other tracks here...
];

const QuoteBox = () => {
  const quotes = [
    "Don't explain your philosophy. Embody it",
    "It is not the man who has too little, but the man who craves more, that is poor",
    "The best revenge is to be unlike him who performed the injury",
    // ... Add more quotes as needed
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loop, setLoop] = useState(false); // State for loop functionality
  const song = useRef(new Audio(songsList[currentSong].src));
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSong(currentSong);
    song.current.addEventListener('timeupdate', updateProgress);
    song.current.addEventListener('ended', handleSongEnd);

    return () => {
      song.current.removeEventListener('timeupdate', updateProgress);
      song.current.removeEventListener('ended', handleSongEnd);
    };
  }, [currentSong]);

  const loadSong = (index: number) => {
    song.current.src = songsList[index].src;
    setPlaying(false);
    setProgress(0);
  };

  const updateProgress = () => {
    if (song.current.duration) {
      setProgress((song.current.currentTime / song.current.duration) * 100);
    }
  };

  const togglePlayPause = () => {
    if (playing) {
      song.current.pause();
    } else {
      song.current.play();
    }
    setPlaying(!playing);
  };

  const handleSongEnd = () => {
    if (loop) {
      song.current.currentTime = 0; // Reset to the beginning of the song
      song.current.play(); // Play the song again
    } else {
      nextSong(); // Move to the next song
    }
  };

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % songsList.length);
    song.current.play(); // Autoplay the next song
  };

  const prevSong = () => {
    setCurrentSong((currentSong - 1 + songsList.length) % songsList.length);
    song.current.play(); // Autoplay the previous song
  };

  const seek = (e: React.MouseEvent) => {
    const rect = progressBarRef.current?.getBoundingClientRect();
    if (rect) {
      const pos = ((e.clientX - rect.left) / rect.width) * song.current.duration;
      song.current.currentTime = pos;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Function to toggle loop
  const toggleLoop = () => {
    setLoop(!loop);
    song.current.loop = !loop; // Update the audio element's loop property
  };

  const showNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    const quoteAudio = new Audio(soundFile);
    quoteAudio.play();
  };

  return (
    <div className="flex flex-col bg-gray-900 items-center justify-center h-50% space-y-8">
      <div className="bg-black p-6 rounded-lg shadow-md w-80 text-center">
        <p className="text-white mb-4">{quotes[currentQuoteIndex]}</p>
        <button
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
          onClick={showNextQuote}
        >
          Show Next Quote
        </button>
      </div>
      <div className="relative p-4">
        
          <div className="text-white font-bold text-lg">{songsList[currentSong].artist}</div>
          <div className="text-gray-400 text-sm my-1">{songsList[currentSong].name}</div>
          <div ref={progressBarRef} className="w-full h-1 bg-gray-600 rounded-full cursor-pointer" onClick={seek}>
            <div className="bg-green-500 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-gray-400 text-sm mt-2">
            {formatTime(song.current.currentTime)} - {formatTime(song.current.duration)}
          </div>
        

        <div className="flex justify-center items-center">
          <div
            className={`w-36 h-36 bg-cover bg-center rounded-full border-4 border-black shadow-lg ${
              playing ? 'animate-spin' : ''
            }`}
            style={{ backgroundImage: `url(${songsList[currentSong].cover})` }}
          ></div>
        </div>

        <div className="flex justify-center items-center gap-4 bg-gray-800 mt-4 rounded-xl p-4 shadow-lg">
          <span
            onClick={prevSong}
            className="text-red-500 text-3xl cursor-pointer hover:text-white transition-colors"
          >
            ⏮️
          </span>
          <span
            onClick={togglePlayPause}
            className={`text-3xl cursor-pointer text-teal-500 bg-blue-700 p-4 rounded-full hover:bg-green-700 transition-colors`}
          >
            {playing ? '⏸️' : '▶️'}
          </span>
          <span
            onClick={nextSong}
            className="text-red-500 text-3xl cursor-pointer hover:text-white transition-colors"
          >
            ⏭️
          </span>
          
          {/* Loop Button with circular background */}
          <div
            onClick={toggleLoop}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${loop ? 'bg-yellow-500' : 'bg-black'}`}
          >
            <span className="text-2xl cursor-pointer text-white">🔁</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBox;
