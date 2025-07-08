"use client";
import { useState, useEffect } from "react";
import WeddingCountdown from "@/components/countdown/WeddingCountdown";
import Image from "next/image";
import LiveStreamEmbed from "@/components/hero/LiveStreamEmbed";
import Spinner from "@/components/ui/Spinner";
import { WEDDING_DETAILS } from "@/config/wedding";

// Images to populate slideshow
const IMAGES = [
  "/images/proposal/rings.jpg", // First img
  "/images/couple/pic1.jpg",
  "/images/couple/pic2.jpg",
  "/images/couple/pic3.jpg",
  "/images/couple/pic4.jpg",
  "/images/couple/pic5.jpg",
  "/images/couple/pic6.jpg",
];

// Static flower configuration for desktop
// NOTE: Using static to keep resource spend low
// Change positioning based on name & image positioning
const FLOWER_PATTERNS = [
  // Left side
  {
    position: "top-[12%] left-[9%]",
    color: "orange",
    size: 70,
    rotate: "-rotate-12",
  },
  {
    position: "top-[18%] left-[5%]",
    color: "blue",
    size: 70,
    rotate: "-rotate-12",
  },
  {
    position: "top-[15%] left-[13%]",
    color: "blue",
    size: 70,
    rotate: "-rotate-12",
  },
  {
    position: "top-[25%] left-[13%]",
    color: "blue",
    size: 60,
    rotate: "rotate-6",
  },
  {
    position: "top-[40%] left-[7%]",
    color: "orange",
    size: 80,
    rotate: "-rotate-8",
  },
  {
    position: "top-[45%] left-[13%]",
    color: "orange",
    size: 80,
    rotate: "-rotate-8",
  },
  {
    position: "top-[55%] left-[11%]",
    color: "blue",
    size: 55,
    rotate: "rotate-3",
  },
  {
    position: "top-[58%] left-[6%]",
    color: "orange",
    size: 65,
    rotate: "rotate-10",
  },
  {
    position: "top-[68%] left-[7%]",
    color: "orange",
    size: 75,
    rotate: "rotate-10",
  },
  {
    position: "top-[75%] left-[13%]",
    color: "blue",
    size: 75,
    rotate: "rotate-10",
  },
  {
    position: "top-[80%] left-[10%]",
    color: "blue",
    size: 65,
    rotate: "-rotate-5",
  },

  // Right side
  {
    position: "top-[12%] right-[8%]",
    color: "blue",
    size: 75,
    rotate: "rotate-10",
  },
  {
    position: "top-[13%] right-[13%]",
    color: "orange",
    size: 75,
    rotate: "rotate-10",
  },
  {
    position: "top-[25%] right-[12%]",
    color: "orange",
    size: 65,
    rotate: "-rotate-5",
  },
  {
    position: "top-[35%] right-[13%]",
    color: "orange",
    size: 65,
    rotate: "-rotate-5",
  },
  {
    position: "top-[30%] right-[6%]",
    color: "blue",
    size: 75,
    rotate: "rotate-10",
  },
  {
    position: "top-[40%] right-[9%]",
    color: "blue",
    size: 70,
    rotate: "rotate-8",
  },
  {
    position: "top-[55%] right-[13%]",
    color: "orange",
    size: 60,
    rotate: "-rotate-2",
  },
  {
    position: "top-[58%] right-[9%]",
    color: "blue",
    size: 60,
    rotate: "-rotate-2",
  },
  {
    position: "top-[70%] right-[8%]",
    color: "blue",
    size: 80,
    rotate: "-rotate-8",
  },
  {
    position: "top-[64%] right-[6%]",
    color: "orange",
    size: 60,
    rotate: "-rotate-2",
  },
  {
    position: "top-[70%] right-[13%]",
    color: "orange",
    size: 80,
    rotate: "-rotate-10",
  },
  {
    position: "top-[82%] right-[10%]",
    color: "orange",
    size: 60,
    rotate: "rotate-3",
  },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [liveStreamUrl, setLiveStreamUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const { title, date, location } = WEDDING_DETAILS;
  const weddingDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const fetchLiveStream = async () => {
      setLiveStreamUrl(null);
      setIsLoading(false);
    };

    fetchLiveStream();

    // set time image displays before switching to next
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => {
      const updated = new Set(prev);
      updated.add(src);
      return updated;
    });

    if (src === IMAGES[currentImage]) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loadedImages.has(IMAGES[currentImage])) {
      setIsLoading(true);
    }
  }, [currentImage, loadedImages]);

  // Render name (staggered - desktop only)
  const renderStaggeredName = (name: string) => {
    return name.split("").map((letter, index) => (
      <div key={index} className="staggered-letter">
        {letter}
      </div>
    ));
  };

  return (
    <div className="relative hero-section w-full max-w-[2000px] mx-auto bg-white">
      {/* Background Slideshow */}
      <div className="absolute inset-0 transition-opacity duration-1000 z-10">
        {IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            {isLoading && index === currentImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner />
              </div>
            )}
            <div className="relative w-full h-full">
              {/* Mobile/Tablet View */}
              <div className="md:hidden relative w-full h-full">
                <Image
                  src={src}
                  alt="Couple photos"
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={index === currentImage ? 90 : 70}
                  onLoad={() => handleImageLoad(src)}
                />
                <div className="image-vignette" />
              </div>

              {/* Desktop View */}
              <div className="hidden md:block desktop-image-container">
                <Image
                  src={src}
                  alt="Couple photos"
                  width={1920}
                  height={1080}
                  className="desktop-image rounded-sm"
                  priority={index === 0}
                  sizes="(max-width: 1200px) 100vw, 80vw"
                  quality={index === currentImage ? 85 : 65}
                  onLoad={() => handleImageLoad(src)}
                />
                <div className="image-vignette" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30" />
          </div>
        ))}
      </div>

      {/* Flower patterns (desktop) */}
      <div className="hidden md:block absolute inset-0 z-0">
        {FLOWER_PATTERNS.map((flower, index) => (
          <div
            key={index}
            className={`absolute ${flower.position} ${flower.rotate} opacity-30 hover:opacity-50 transition-opacity duration-300`}
          >
            <Image
              src={`/images/background/${flower.color}.png`}
              alt=""
              width={flower.size}
              height={flower.size}
              className="drop-shadow-sm"
            />
          </div>
        ))}
      </div>

      {/* Names on sides of slideshow (desktop) */}
      <div className="hidden md:block">
        <div className="staggered-name-container">
          <div className="staggered-name-side staggered-name-left drop-shadow-lg">
            {renderStaggeredName("GROOM")}
          </div>
          <div className="flex-grow" />
          <div className="staggered-name-side staggered-name-right drop-shadow-lg">
            {renderStaggeredName("PERSON")}
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 font-heading tracking-wide animate-fadeInUp text-white drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-body tracking-wider animate-fadeInUp text-white drop-shadow-xl">
          {weddingDate} • {location}
        </p>

        <div className="w-full max-w-4xl animate-fadeInUp">
          {liveStreamUrl ? (
            <LiveStreamEmbed url={liveStreamUrl} />
          ) : (
            <WeddingCountdown />
          )}
        </div>
      </div>
    </div>
  );
}
