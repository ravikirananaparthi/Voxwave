import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import fm from "../assets/fm.jpg";
import audio from "../assets/audio.jpg";
import radio from "../assets/radio.jpg";

// Animation Variants
const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 2 },
  },
};

export default function Landing() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex min-h-screen flex-col bg-gradient-to-br from-[#1E1E1E] to-[#121212] text-white"
    >
      <header className="flex items-center justify-between px-6 py-4 sm:px-8 md:px-10">
        <Link className="flex items-center gap-2" to="#">
          <MicIcon className="h-6 w-6" />
          <span className="text-xl font-semibold">Voxwave</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link
            className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800"
            to="#"
          >
            Features
          </Link>
          <Link
            className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800"
            to="#"
          >
            About
          </Link>
          <Link
            className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800"
            to="#"
          >
            Contact
          </Link>
        </nav>
        <button className="md:hidden flex items-center justify-center p-2 rounded-md border border-gray-700 bg-transparent hover:bg-gray-800">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </header>
      <main className="flex-1">
        <motion.section
          variants={container}
          className="container mx-auto px-6 py-12 sm:px-8 md:px-10 md:py-20 lg:py-24"
        >
          <motion.div
            variants={item}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
          >
            <div className="space-y-6">
              <motion.h1
                variants={item}
                className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
              >
                Elevate Your Voice with Voxwave
              </motion.h1>
              <motion.p variants={item} className="text-lg text-gray-300">
                Experience seamless voice communication and explore a world of
                public FM radios, all in one powerful app.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Link to={"/app/login"}>
                  <button className="bg-[#E0573C] text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-[#F9D372] w-full sm:w-auto">
                    Join Audiorooms
                  </button>
                </Link>
                <Link to={"/app/fm"}>
                  <button className="border border-gray-700 text-gray-300 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-600 w-full sm:w-auto">
                    Discover FM Radios
                  </button>
                </Link>
              </motion.div>
            </div>
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <motion.img
                  variants={item}
                  alt="Voxwave App"
                  className="object-cover rounded-xl"
                  src={fm}
                />
              </div>
            </div>
          </motion.div>
        </motion.section>
        <motion.section
          variants={container}
          className="bg-gray-900 py-12 sm:py-16 md:py-20 lg:py-24"
        >
          <motion.div
            variants={item}
            className="container mx-auto px-6 sm:px-8 md:px-10"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
              <div className="space-y-6">
                <motion.h2
                  variants={item}
                  className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
                >
                  Audiorooms: Connect, Collaborate, and Communicate
                </motion.h2>
                <motion.p variants={item} className="text-lg text-gray-300">
                  Voxwave's Audiorooms feature allows you to create and join
                  real-time voice communication channels, enabling seamless
                  collaboration and engaging conversations.
                </motion.p>
                <Link to={"/app/login"}>
                <motion.button
                  variants={item}
                  className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
                >
                  Join Audiorooms
                </motion.button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <motion.img
                    variants={item}
                    alt="Audiorooms"
                    className="object-cover rounded-xl"
                    src={audio}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
        <motion.section
          variants={container}
          className="container mx-auto px-6 py-12 sm:px-8 md:px-10 md:py-20 lg:py-24"
        >
          <motion.div
            variants={item}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
          >
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <motion.img
                  variants={item}
                  alt="Public FM Radios"
                  className="object-cover rounded-xl"
                  src={radio}
                />
              </div>
            </div>
            <div className="space-y-6">
              <motion.h2
                variants={item}
                className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
              >
                Explore the World of Public FM Radios
              </motion.h2>
              <motion.p variants={item} className="text-lg text-gray-300">
                Voxwave's public FM radio feature allows you to discover a
                diverse range of radio stations from around the world, catering
                to all your musical tastes and interests.
              </motion.p>
              <Link to={"/app/fm"}>
              <motion.button
                variants={item}
                className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
              >
                Discover FM Radios
              </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <footer className="bg-gray-800 py-6 sm:py-8 md:py-10">
        <motion.div
          variants={item}
          className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8 md:px-10"
        >
          <p className="text-sm text-gray-400">
            © 2024 Voxwave. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              to="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              to="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              to="#"
            >
              Contact Us
            </Link>
          </nav>
        </motion.div>
      </footer>
    </motion.div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none" 
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
