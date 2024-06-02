import React, { useState } from "react";
import { radioStations } from "../data/radioStations";
import { Player } from "../components/Player";
import { FiSearch } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
const FmRadios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStationIndex, setCurrentStationIndex] = useState(null);

  const filteredStations = radioStations
    .map((station, index) => ({ ...station, originalIndex: index }))
    .filter(
      (station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.languages
          .join(", ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        station.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleNext = () => {
    if (currentStationIndex !== null) {
      const nextIndex = (currentStationIndex + 1) % filteredStations.length;
      setCurrentStationIndex(filteredStations[nextIndex].originalIndex);
    }
  };

  const handlePrev = () => {
    if (currentStationIndex !== null) {
      const prevIndex =
        (currentStationIndex - 1 + filteredStations.length) %
        filteredStations.length;
      setCurrentStationIndex(filteredStations[prevIndex].originalIndex);
    }
  };

  const genres = [...new Set(radioStations.map((station) => station.genre))];

  const handleGenreClick = (genre) => {
    const genreSection = document.getElementById(genre);
    if (genreSection) {
      genreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className=" mb-4 text-3xl">Public Radio Stations</h1>
        <div className="relative w-80 md:w-64 lg:w-96 mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-4 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
        </div>
        <div className="flex flex-row">
        <FaInfoCircle className="text-red-500 mr-3 mt-[3px]"/>
        <p>Streams may have breaking issues</p>
        </div>
        <div className="text-center mb-8 p-4">
          <h2 className="text-3xl font-bold">Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {genres.map((genre, index) => (
              <button
                key={index}
                className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-pink-500 hover:to-purple-500 text-center"
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 w-full p-4">
  <h2 className="text-2xl font-bold mb-4">Featured Radios</h2>
  <div className="flex overflow-x-auto space-x-10 p-4">
    {filteredStations.map((station) => (
      <div key={station.originalIndex} className="bg-gray-800 rounded-xl shadow-lg w-60 flex-none overflow-hidden flex flex-col justify-between">
        <img src={station.image} alt={station.name} className="w-full h-40 object-cover rounded-t" />
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-lg font-bold">{station.name}</h3>
            <p className="text-gray-400">Languages: {station.languages.join(', ')}</p>
            <p className="text-gray-400">Genre: {station.genre}</p>
            <p className="text-gray-400">Popularity: {station.popularity}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-400 w-full"
            onClick={() => setCurrentStationIndex(station.originalIndex)}
          >
            Play
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


        {genres.map((genre, index) => (
          <div key={index} id={genre} className="my-4 w-full p-4">
            <h2 className="text-2xl font-bold mb-4">{genre}</h2>
            <div className="flex overflow-x-auto space-x-4 p-4">
              {filteredStations
                .filter((station) => station.genre === genre)
                .map((station) => (
                  <div
                    key={station.originalIndex}
                    className="bg-gray-800 rounded-2xl shadow-lg w-60 flex-none overflow-hidden"
                  >
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-40 object-cover rounded-t"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{station.name}</h3>
                      <p className="text-gray-400">
                        Languages: {station.languages.join(", ")}
                      </p>
                      <p className="text-gray-400">Genre: {station.genre}</p>
                      <p className="text-gray-400">
                        Popularity: {station.popularity}
                      </p>
                      <button
                        className="mt-4 px-4 py-2 bg-blue-500 rounded-2xl hover:bg-blue-400 w-full"
                        onClick={() =>
                          setCurrentStationIndex(station.originalIndex)
                        }
                      >
                        Play
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {currentStationIndex !== null && (
        <Player
          station={radioStations[currentStationIndex]}
          onClose={() => setCurrentStationIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      <div className="h-[300px]"></div>
    </div>
  );
};

export default FmRadios;
