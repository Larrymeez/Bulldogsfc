import { useRef, useEffect, useState } from "react";
import heroImage from "./assets/helo.jpg";
import badge from "./assets/Bulldog.png";
import infoImage from "./assets/helo2.jpg";
import hero2 from "./assets/helo2.jpg";
import hero3 from "./assets/helo3.jpg";
import hero6 from "./assets/helo6.jpg";


export default function App() {
  const players = Array.from({ length: 20 }, (_, i) => ({
    name: `Player ${i + 1}`,
    number: i + 1,
    position: "Position TBD",
  }));

  const scrollRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Animate cards on scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.3 }
    );

    document
      .querySelectorAll(".player-card")
      .forEach((el) => observer.observe(el));
  }, []);

  const slides = [heroImage, hero2, hero3, hero6,];
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000); // change every 5 seconds

  return () => clearInterval(interval);
}, []);

// ================= NEXT MATCH COUNTDOWN =================
const matchDate = new Date("2026-03-01T15:00:00"); 

const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

function getTimeRemaining() {
  const total = matchDate - new Date();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(getTimeRemaining());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  return (
    <div className="text-white font-sans selection:bg-clubRed selection:text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* LEFT — BADGE + CLUB NAME */}
          <div className="flex items-center gap-3">
            <img
              src={badge}
              alt="44 Bulldogs FC Badge"
              className="w-12 md:w-14 drop-shadow-[0_0_12px_rgba(255,0,0,0.6)]"
            />

            <span className="text-xl md:text-2xl font-display uppercase tracking-wider font-extrabold">
              44 <span className="text-clubRed bolder">Bulldogs</span> FC
            </span>
          </div>

          {/* RIGHT — NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 font-display uppercase tracking-widest text-base font-extrabold">

            <a href="#" className="hover:text-primary transition-colors duration-300">
              Home
            </a>

            <a
              href="#team-section"
              className="hover:text-primary transition-colors duration-300"
            >
              Squad
            </a>

            <a href="#" className="hover:text-primary transition-colors duration-300">
              Fixtures
            </a>

            <a href="#" className="hover:text-primary transition-colors duration-300">
              Contact
            </a>

            <button className="bg-clubRed hover:bg-blueHover px-5 py-2 rounded-sm font-bold font-display transition-all">
              Fixtures
            </button>
          </div>
        </div>
      </nav>

     {/* ================= CINEMATIC HERO SLIDESHOW ================= */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">

  {/* SLIDES */}
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={slide}
        alt=""
        className="w-full h-full object-cover scale-105 animate-slowZoom"
      />
    </div>
  ))}

  {/* Dark cinematic overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>

  {/* TRANSLUCENT WATERMARK BADGE */}
  <img
    src={badge}
    alt=""
    className="absolute w-[650px] opacity-20 pointer-events-none select-none"
  />

  {/* BUTTON HUB */}
  <div className="relative z-10 flex flex-col items-center gap-10">

    <div className="flex gap-6 flex-wrap justify-center">

      <button className="bg-clubRed hover:bg-blueHover px-12 py-5 rounded-sm font-bold font-display uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,0,0,0.5)]">
        Fixtures
      </button>

      <button
        onClick={() =>
          document
            .getElementById("team-section")
            .scrollIntoView({ behavior: "smooth" })
        }
        className="bg-transparent border-2 border-white hover:bg-blueHover hover:text-white px-12 py-5 rounded-sm font-bold font-display uppercase tracking-wider transition-all transform hover:scale-105"
      >
        Meet The Team
      </button>

    </div>

    {/* SLIDE DOTS */}
    <div className="flex gap-3 mt-6">
      {slides.map((_, index) => (
        <div
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
            index === currentSlide
              ? "bg-clubRed scale-125"
              : "bg-white/40"
          }`}
        />
      ))}
    </div>

  </div>

</section>

{/* ================= NEXT MATCH SECTION ================= */}
<section className="bg-zinc-950 py-24 px-6 border-t border-zinc-800 text-center">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-5xl font-display uppercase tracking-widest mb-4">
      Next <span className="text-clubRed">Match</span>
    </h2>

    <div className="h-1 w-24 bg-clubRed mx-auto mb-10"></div>

    {/* MATCH INFO */}
    <div className="mb-12">
      <p className="text-2xl md:text-4xl font-display uppercase">
        44 Bulldogs FC <span className="text-primary">vs</span> Red Berets Fc
      </p>

      <p className="text-gray-400 mt-3 uppercase tracking-widest text-sm">
        01 March 2026 • 3:00 PM • Kamiti Prisons Ground
      </p>
    </div>

    {/* COUNTDOWN */}
    {timeLeft.total > 0 ? (
      <div className="flex justify-center gap-6 flex-wrap">

        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            className="bg-black border border-zinc-800 px-8 py-6 w-28"
          >
            <div className="text-3xl font-display text-clubRed">
              {timeLeft[unit]}
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-400 mt-2">
              {unit}
            </div>
          </div>
        ))}

      </div>
    ) : (
      <p className="text-clubRed text-2xl font-display">
        Match Day Is Here!
      </p>
    )}

    {/* CTA BUTTON */}
    <div className="mt-12">
      <button className="bg-clubRed hover:bg-blueHover px-12 py-4 font-display uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,0,0,0.6)]">
        View Fixtures
      </button>
    </div>

  </div>

</section>

      {/* ================= TEAM INFO SECTION ================= */}
      <section className="bg-zinc-950 py-24 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE SIDE */}
          <div className="relative overflow-hidden group">
            <img
              src={infoImage}
              alt="44 Bulldogs FC"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          {/* TEXT SIDE */}
          <div>
            <h2 className="text-5xl font-display uppercase italic tracking-tighter mb-6">
              About <span className="text-clubRed">44 Bulldogs FC</span>
            </h2>

            <div className="h-1 w-24 bg-clubRed mb-8"></div>

            <p className="text-gray-300 text-lg leading-relaxed font-sans mb-10">
              44 Bulldogs FC is a men's football club founded in 2023,
              currently competing in the FKF Nairobi East Division 2 league.
              The club is dedicated to fostering local talent and promoting
              the sport within the community.
            </p>

            <div className="space-y-4 text-gray-300 font-sans">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest">
                  Founded:
                </span>{" "}
                2023
              </div>

              <div>
                <span className="text-primary font-bold uppercase tracking-widest">
                  Home Ground:
                </span>{" "}
                Kamiti Prisons Ground, Nairobi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section id="team-section" className="bg-black py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-display uppercase italic tracking-tighter">
                Meet The <span className="text-clubRed">Squad</span>
              </h2>
              <div className="h-1 w-20 bg-clubRed mt-2"></div>
            </div>

            <div className="hidden md:flex gap-4">
              <button
                onClick={() => scroll("left")}
                className="border border-gray-700 hover:border-clubRed p-4 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                className="border border-gray-700 hover:border-clubRed p-4 transition-colors"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide"
          >
            {players.map((player, index) => (
              <div
                key={index}
                data-index={index}
                className={`player-card min-w-[280px] flex-shrink-0 bg-zinc-900 border-b-4 border-transparent hover:border-clubRed transition-all duration-300 snap-start ${
                  visibleCards.includes(index)
                    ? "animate-slideFade opacity-100"
                    : "opacity-0"
                }`}
              >
                <div className="relative h-80 bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
                  <span className="absolute -bottom-4 -right-4 text-9xl font-display text-white/5 italic">
                    {player.number}
                  </span>

                  <span className="absolute top-4 left-4 bg-primary text-white text-xl px-3 py-1 font-accent">
                    #{player.number}
                  </span>

                  <div className="text-center">
                    <div className="text-6xl mb-2 grayscale opacity-40">
                      🐶
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-clubRed font-bold">
                      Coming Soon
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-display uppercase italic tracking-tight">
                    {player.name}
                  </h3>

                  <p className="text-gray-500 text-sm uppercase tracking-widest font-sans mt-1">
                    {player.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}