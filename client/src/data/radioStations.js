import radiomirchi from "../assets/mirchi-telugu.png";
import hum from "../assets/hum.jpg";
import mix from "../assets/mix.png";
import melody from "../assets/melody.jpg";
import london from "../assets/london.jpg";
import big from "../assets/big.png";
import che from "../assets/che.png";
import ml from "../assets/ml.png";
import mt from "../assets/mt.jpg";
import rm from "../assets/rm.png";
import rmh from "../assets/rmh.png";
import hell from "../assets/hell.png";
import air from "../assets/air.jpg";
import arr from "../assets/arr.jpg";
import ars from "../assets/as.jpg";
import u1 from "../assets/u11.jpg";
import harris from "../assets/harris.jpg";
import ty from "../assets/ty.jpg";
import ri from "../assets/ri.jpg";
import mj from "../assets/mj.jpg";
import tw from "../assets/tw.jpg";
import ag from "../assets/ag.jpg";
import jb from "../assets/jb.jpg";
import ed from "../assets/ed.jpg";
export const radioStations = [
  {
    name: "Radio Mirchi Telugu",
    image: radiomirchi,
    languages: ["Telugu"],
    genre: "Telugu",
    popularity: 5,
    url: "https://19013.live.streamtheworld.com/MTL_TEL_ESTAAC/HLS/playlist.m3u8",
    type: "application/x-mpegURL",
  },
  {
    name: "Humm Fm 106.2",
    image: hum,
    languages: ["Hindi"],
    genre: "Bollywood Music",
    popularity: 4,
    url: "https://ice10.securenetsystems.net/HUMFM?playSessionID=DB18F8E2-5A22-4C3F-A030B300FD1B0936",
    type: "audio/mp3",
  },
  {
    name: "Arjit Singh Radio",
    image: ars,
    languages: ["Hindi", "Telugu"],
    genre: "Artist",
    popularity: 5,
    url: "https://drive.uber.radio/uber/bollywoodaruitsingh/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "London Telugu Radio",
    image: london,
    languages: ["Telugu"],
    genre: "Telugu Old Songs",
    popularity: 4,
    url: "https://c8.radioboss.fm/stream/33",
    type: "audio/mp3",
  },
  {
    name: "Melody Radio Telugu",
    image: melody,
    languages: ["Telugu"],
    genre: "Popular Telugu Music",
    popularity: 4,
    url: "https://a1.asurahosting.com:9580/radio.mp3",
    type: "audio/mp3",
  },
  {
    name: "Mixify New Hindi Hits",
    image: mix,
    languages: ["Hindi"],
    genre: "Popular Hindi Music",
    popularity: 4,
    url: "https://server.mixify.in:8020/radio.mp3",
    type: "audio/mp3",
  },

  {
    name: "Big FM 92.7",
    image: big,
    languages: ["Tamil"],
    genre: "Popular Tamil Music",
    popularity: 4,
    url: "https://stream.zeno.fm/r2gn1pgm4qruv",
    type: "audio/mp3",
  },
  {
    name: "Hello FM Chennai 106.4",
    image: hell,
    languages: ["Tamil"],
    genre: "Popular Tamil Music",
    popularity: 4,
    url: "https://listen.openstream.co/4428/audio",
    type: "audio/mp3",
  },
  {
    name: "Chennai Live 104.8 FM",
    image: che,
    languages: ["English", "Tamil"],
    genre: "English Music",
    popularity: 4,
    url: "https://c2.radioboss.fm:8332/stream",
    type: "audio/mp3",
  },
  {
    name: "Mirchi Love",
    image: ml,
    languages: ["Hindi"],
    genre: "Popular Bollywood Music",
    popularity: 4,
    url: "https://drive.uber.radio/uber/bollywoodlove/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "Mirchi Top 20",
    image: mt,
    languages: ["Hindi"],
    genre: "Top 20 Playlist Bollywood",
    popularity: 4,
    url: "https://drive.uber.radio/uber/bollywoodnow/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "Radio Mirchi 2",
    image: rm,
    languages: ["Hindi"],
    genre: "Bollywood Music",
    popularity: 4,
    url: "https://s3.radio.co/se787a5a6f/listen",
    type: "audio/mp3",
  },
  {
    name: "Radio Mirchi Hindi 102.4",
    image: rmh,
    languages: ["Hindi"],
    genre: "Bollywood Music",
    popularity: 5,
    url: "https://eu8.fastcast4u.com/proxy/clyedupq/stream",
    type: "audio/mp3",
  },
  {
    name: "All India Radio Air Visakhapatnam",
    image: air,
    languages: ["Hindi", "Telugu"],
    genre: "News",
    popularity: 5,
    url: "https://air.pc.cdn.bitgravity.com/air/live/pbaudio080/playlist.m3u8",
    type: "application/x-mpegURL",
  },
  {
    name: "AR Rahman Radio",
    image: arr,
    languages: ["Tamil", "Hindi", "Telugu"],
    genre: "Artist",
    popularity: 5,
    url: "https://ec5.yesstreaming.net:2320/stream",
    type: "audio/mp3",
  },

  {
    name: "Harris Jayaraj Radio",
    image: harris,
    languages: ["Tamil", "Telugu"],
    genre: "Artist",
    popularity: 5,
    url: "https://psrlive2.listenon.in/hjr?ah=0e81749e37789e5fb8c290926ce87e3f",
    type: "audio/mp3",
  },
  {
    name: "Yuvan Shankar Raja Radio",
    image: u1,
    languages: ["Tamil", "Telugu"],
    genre: "Artist",
    popularity: 5,
    url: "https://psrlive2.listenon.in/ysr?ah=0e81749e37789e5fb8c290926ce87e3f",
    type: "audio/mp3",
  },
  {
    name: "Taylor Swift Radio",
    image: ty,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://stream-175.zeno.fm/xiothj9jrxfvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ4aW90aGo5anJ4ZnZ2IiwiaG9zdCI6InN0cmVhbS0xNzUuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6Ik50azl5UXVYVDltMENHSkZLTGZmVUEiLCJpYXQiOjE3MTcyOTc4MDMsImV4cCI6MTcxNzI5Nzg2M30.KB8mTbdSQvInqcJ3ZOdAKsklqSib9HwOgsyCMGru2VQ",
    type: "audio/mp3",
  },
  {
    name: "Rihanna Radio",
    image: ri,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://streaming.exclusive.radio/er/rihanna/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "Justin Bieber Radio",
    image: jb,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://streaming.exclusive.radio/er/justinbieber/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "Michael Jackson Radio",
    image: mj,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://stream.vagalume.fm/hls/1498504131678502/aac.m3u8",
    type: "application/x-mpegURL",
  },
  {
    name: "The Weeknd Radio",
    image: tw,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://streaming.exclusive.radio/er/theweeknd/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "Ariana Grande Radio",
    image: ag,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://streaming.exclusive.radio/er/arianagrande/icecast.audio",
    type: "audio/mp3",
  },
  {
    name: "Ed Sheeran Radio",
    image: ed,
    languages: ["English"],
    genre: "Artist",
    popularity: 5,
    url: "https://streaming.exclusive.radio/er/edsheeran/icecast.audio",
    type: "audio/mp3",
  },
];
