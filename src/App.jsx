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
  const [showFixtures, setShowFixtures] = useState(false); 
  
  /*================= COUNTDOWN TIMER ================= */
  const [timeLeft, setTimeLeft] = useState({})
  const nextMatchDate = new Date("March 1, 2026 13:00:00").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = nextMatchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({});
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextMatchDate]);

  /*================= HORIZONTAL SCROLL & CARD ANIMATIONS ================= */
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

    document.querySelectorAll(".player-card").forEach((el) => observer.observe(el));
  }, []);

  /*================= HERO SLIDESHOW ================= */
  const slides = [heroImage, hero2, hero3, hero6];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
 
  const upcomingFixtures = [
    { opponent: "Red Berets FC", date: "01 Mar 2026", time: "1:00 PM" },
    { opponent: "Gatuanyaga FC", date: "05 Mar 2026", time: "3:00 PM" },
    { opponent: "Butterfly FC", date: "10 Mar 2026", time: "3:00 PM" },
    { opponent: "TBC", date: "15 Mar 2026", time: "3:00 PM" },
    { opponent: "TBC", date: "20 Mar 2026", time: "3:00 PM" },
  ];

  return (
    <div className="text-white font-sans selection:bg-clubRed selection:text-white">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
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

          <div className="hidden md:flex items-center gap-8 font-display uppercase tracking-widest text-base font-extrabold">
            <a href="#" className="hover:text-primary transition-colors duration-300">Home</a>
            <a href="#team-section" className="hover:text-primary transition-colors duration-300">Squad</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Fixtures</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Contact</a>
            <button 
            
            onClick={() => document.getElementById("next-match-section").scrollIntoView({behavior: "smooth"})}
            className="bg-clubRed hover:bg-blueHover px-5 py-2 rounded-sm font-bold font-display transition-all">
              Fixtures
            </button>
          </div>
        </div>
      </nav>

      {/* ================= CINEMATIC HERO SLIDESHOW ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide} alt="" className="w-full h-full object-cover scale-105 animate-slowZoom" />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
        <img src={badge} alt="" className="absolute w-[650px] opacity-20 pointer-events-none select-none" />

        <div className="items-center gap-4 z-10 flex flex-col absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex gap-6 flex-wrap justify-center">
            <button 
            onClick={() =>
              document.getElementById("next-match-section").scrollIntoView({behavior: "smooth"})

            }
            className="bg-clubRed hover:bg-blueHover px-12 py-5 rounded-sm font-bold font-display uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,0,0,0.5)]">
              Fixtures
            </button>

            <button
              onClick={() =>
                document.getElementById("team-section").scrollIntoView({ behavior: "smooth" })
              }
              className="bg-transparent border-2 border-white hover:bg-blueHover hover:text-white px-12 py-5 rounded-sm font-bold font-display uppercase tracking-wider transition-all transform hover:scale-105"
            >
              Meet The Team
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  index === currentSlide ? "bg-clubRed scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEXT MATCH SECTION ================= */}

<section id="next-match-section" className="bg-zinc-950 py-24 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
    
    {/* LEFT SIDE – MATCH INFO */}
    <div className="relative">
      <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest mb-8">
        Next <span className="text-clubRed">Match</span>
      </h2>

      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <h3 className="text-2xl font-bold mb-4">
          44 Bulldogs FC vs Red Berets FC
        </h3>
        <p className="text-gray-400 mb-2">📍 Kamiti Grounds</p>
        <p className="text-gray-400 mb-6">🗓 Sunday, 1:00 PM</p>

        <button
          onClick={() => setShowFixtures(!showFixtures)}
          className="bg-clubRed px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-all duration-300"
        >
          View Fixtures
        </button>
      </div>

      {/* Countdown Timer */}
      {timeLeft && Object.keys(timeLeft).length > 0 ? (
        <div className="mt-8 grid grid-cols-4 gap-4 max-w-md">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black/60 backdrop-blur-md border border-zinc-800 rounded-xl p-4 text-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-clubRed animate-pulseSlow">
                {item.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-clubRed text-lg font-bold animate-pulse">
          Matchday Is Here!
        </p>
      )}

      {/* FIXTURES DROPDOWN */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showFixtures ? "max-h-[500px] mt-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/70 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 space-y-4">
          {[
            "Bulldogs vs Red Berets FC",
            "Bulldogs vs Gatuanyaga FC",
            "Bulldogs vs Butterfly FC",
            "Bulldogs vs TBC",
            "Bulldogs vs TBC",
          ].map((fixture, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-zinc-800 pb-2 text-gray-300"
            >
              <span>{fixture}</span>
              <span>3:00 PM</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RIGHT SIDE – MATCHDAY IMAGE */}
    <div className="relative">
      <img
        src={hero6}
        alt="Matchday"
        className="rounded-2xl shadow-2xl object-cover w-full h-[450px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent rounded-2xl"></div>
    </div>

  </div>
</section>
     

      {/* ================= TEAM INFO SECTION ================= */}
      <section className="bg-zinc-950 py-24 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative overflow-hidden group">
            <img
              src={infoImage}
              alt="44 Bulldogs FC"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

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
                <span className="text-primary font-bold uppercase tracking-widest">Founded:</span>{" "}
                2023
              </div>

              <div>
                <span className="text-primary font-bold uppercase tracking-widest">Home Ground:</span>{" "}
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
                    <div className="text-6xl mb-2 grayscale opacity-40">🐶</div>
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

      {/* ================= JOIN OUR COMMUNITY ================= */}
<section className="relative py-28 px-6 bg-black overflow-hidden">
  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-clubRed/20 via-transparent to-clubRed/20 blur-3xl opacity-40"></div>

  <div className="relative max-w-5xl mx-auto text-center">
    <h2 className="text-5xl md:text-6xl font-display uppercase tracking-tight mb-6">
      Join The <span className="text-clubRed">Bulldogs</span> Community
    </h2>

    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
      Stay connected with 44 Bulldogs FC. Get match updates, exclusive
      behind-the-scenes content, and be part of our journey as we rise through
      the ranks.
    </p>

    <div className="flex flex-wrap justify-center gap-6">
      <a
        href="#"
        className="bg-clubRed px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blueHover transition-all transform hover:scale-105 shadow-lg"
      >
        Join WhatsApp
      </a>

      <a
        href="#"
        className="border-2 border-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105"
      >
        Follow On Instagram
      </a>

      <a
        href="#"
        className="border-2 border-gray-700 px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:border-clubRed transition-all transform hover:scale-105"
      >
        Contact Us
      </a>
    </div>
  </div>
</section>

{/* ================= SPONSORS SECTION ================= */}
<section className="bg-zinc-950 py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-center mb-12">
      Our <span className="text-clubRed">Sponsors</span>
    </h2>

    <div className="flex flex-wrap justify-center items-center gap-12">
      {/* Replace # with actual sponsor logos */}
      <img src="/assets/sponsor1.png" alt="Sponsor 1" className="h-16 object-contain" />
      <img src="/assets/sponsor2.png" alt="Sponsor 2" className="h-16 object-contain" />
      <img src="/assets/sponsor3.png" alt="Sponsor 3" className="h-16 object-contain" />
      <img src="/assets/sponsor4.png" alt="Sponsor 4" className="h-16 object-contain" />
      <img src="/assets/sponsor5.png" alt="Sponsor 5" className="h-16 object-contain" />
    </div>
  </div>
</section>

{/* ================= FOOTER ================= */}
<footer className="bg-black border-t border-zinc-800 py-12 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

    {/* Club Info */}
    <div className="text-center md:text-left">
      <h3 className="text-2xl font-display uppercase tracking-wider mb-2">44 Bulldogs FC</h3>
      <p className="text-gray-400 text-sm">
        Kamiti Prisons Ground, Nairobi<br />
        info@44bulldogsfc.com
      </p>
    </div>

    {/* Quick Links */}
    <div className="flex gap-6 uppercase tracking-widest font-bold text-white">
      <a href="#">Home</a>
      <a href="#team-section">Squad</a>
      <a href="#">Fixtures</a>
      <a href="#">Contact</a>
    </div>

    {/* Social Media */}
    <div className="flex gap-6 text-white text-2xl">
      <a href="#" className="hover:text-clubRed transition-colors"><i className="fab fa-facebook-f"></i></a>
      <a href="#" className="hover:text-clubRed transition-colors"><i className="fab fa-twitter"></i></a>
      <a href="#" className="hover:text-clubRed transition-colors"><i className="fab fa-instagram"></i></a>
      <a href="#" className="hover:text-clubRed transition-colors"><i className="fab fa-youtube"></i></a>
    </div>

  </div>

  <div className="mt-8 text-center text-gray-500 text-sm">
    &copy; 2026 44 Bulldogs FC. All rights reserved.
  </div>
</footer>
    </div>
  );
}
