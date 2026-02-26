import { useRef, useEffect, useState } from "react";
import heroImage from "./assets/helo.jpg";

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

  // IntersectionObserver to animate cards on scroll
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

    document.querySelectorAll(".player-card").forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="text-white font-sans selection:bg-clubRed selection:text-white">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        <div className="relative z-7 px-4">
          <h1 className="text-6xl md:text-9xl font-serif uppercase tracking-tighter leading-none mb-6">
            44 <span className="text-clubRed font-serif italic block md:inline">Bulldogs</span> FC
          </h1>

          <p className="max-w-xl mx-auto text-gray-300 mb-10 text-lg md:text-xl font-sans uppercase tracking-widest font-light">
            Strength <span className="text-clubRed px-2">•</span> Unity <span className="text-clubRed px-2">•</span> Dominance
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-clubRed hover:bg-blueHover px-10 py-4 rounded-sm font-bold font-display uppercase tracking-wider transition-all transform hover:skew-x-[-10deg] shadow-[5px_5px_0px_0px_rgba(255,255,255,0.3)]">
              Fixtures
            </button>

            <button
              onClick={() => document.getElementById("team-section").scrollIntoView({ behavior: "smooth" })}
              className="bg-transparent border-2 border-white hover:bg-blueHover hover:text-white px-10 py-4 rounded-sm font-bold font-display uppercase tracking-wider transition-all transform hover:skew-x-[-10deg]"
            >
              Meet The Team
            </button>
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

            {/* Navigation Buttons */}
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

          {/* Player Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide"
          >
            {players.map((player, index) => (
              <div
                key={index}
                data-index={index}
                className={`player-card min-w-[280px] flex-shrink-0 bg-zinc-900 border-b-4 border-transparent hover:border-clubRed transition-all duration-300 snap-start
                  ${visibleCards.includes(index) ? "animate-slideFade opacity-100" : "opacity-0"}`}
              >
                {/* Visual Area */}
                <div className="relative h-80 bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
                  <span className="absolute -bottom-4 -right-4 text-9xl font-display text-white/5 italic">
                    {player.number}
                  </span>
                  <span className="absolute top-4 left-4 bg-clubRed text-white text-xl px-3 py-1 font-accent">
                    #{player.number}
                  </span>
                  <div className="text-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-6xl mb-2 grayscale opacity-40">🐶</div>
                    <p className="text-xs uppercase tracking-[0.2em] text-clubRed font-bold">Scouting Now</p>
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-display uppercase italic tracking-tight group-hover:text-clubRed transition-colors">
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