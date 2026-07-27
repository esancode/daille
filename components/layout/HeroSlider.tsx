"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  id: number;
  bg: string;
  imageSrc: string;
  imageMobileSrc?: string;
  imageAlt: string;
  imageClass: string;
  imageContainerClass: string;
  title: React.ReactNode;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  reverse: boolean;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    bg: "bg-[#0F0F0F]",
    imageSrc: "/banners/modelo_v2.png",
    imageMobileSrc: "/banners/modelo_v2_mobile.png",
    imageAlt: "Velune Pratas Modelo",
    imageClass: "object-contain object-bottom origin-bottom scale-200",
    imageContainerClass: "absolute bottom-0 md:left-6 right-0 md:right-auto w-full md:w-[48%] h-full flex items-end justify-end md:justify-start pointer-events-none z-0",
    title: (
      <>
        A Elegância <br />
        do Prata 925
      </>
    ),
    subtitle: "Descubra a Nova Coleção",
    buttonText: "Explore",
    buttonLink: "/catalogo",
    reverse: false,
  },
  {
    id: 2,
    bg: "bg-[#0F0F0F]",
    imageSrc: "/banners/modelo_slider_2_nova.png",
    imageAlt: "Modelo Joias Velune",
    imageClass: "object-contain object-bottom origin-bottom scale-160 md:scale-180",
    imageContainerClass: "absolute bottom-0 md:right-6 left-0 md:left-auto w-full md:w-[48%] h-full flex items-end justify-center md:justify-end pointer-events-none z-0",
    title: (
      <>
        Elegância <br />
        Minimalista
      </>
    ),
    subtitle: "Minimalismo atemporal em anéis colecionáveis",
    buttonText: "Ver Anéis",
    buttonLink: "/catalogo?categoria=Anéis",
    reverse: true,
  },
  {
    id: 3,
    bg: "bg-[#0F0F0F]",
    imageSrc: "/banners/modelo_slider_3_hd.png",
    imageAlt: "Modelo Masculino Joias Velune",
    imageClass: "object-contain object-bottom origin-bottom scale-150 md:scale-170",
    imageContainerClass: "absolute bottom-0 md:left-6 right-0 md:right-auto w-full md:w-[48%] h-full flex items-end justify-end md:justify-start pointer-events-none z-0",
    title: (
      <>
        Brilho <br />
        Certificado
      </>
    ),
    subtitle: "Sua personalidade refletida em detalhes de luxo",
    buttonText: "Ver Colares",
    buttonLink: "/catalogo?categoria=Colares",
    reverse: false,
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative w-full overflow-hidden group">
      <div
        className="flex w-full h-[650px] md:h-[550px] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-full h-full flex-shrink-0 relative overflow-hidden flex items-center ${slide.bg}`}
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <div className="w-full max-w-7xl h-full mx-auto px-6 md:px-10 relative flex items-end">
                <div className={slide.imageContainerClass}>
                  <div className="relative w-full h-[88%] md:h-full flex items-end">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      className={`${slide.imageClass} ${slide.imageMobileSrc ? "hidden md:block" : ""}`}
                    />
                    {slide.imageMobileSrc && (
                      <Image
                        src={slide.imageMobileSrc}
                        alt={slide.imageAlt}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className="object-contain object-bottom origin-bottom scale-105 block md:hidden"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 md:px-10 w-full h-full flex items-center relative z-10 pointer-events-auto">
              <div className={`w-full md:w-[55%] flex flex-col justify-center items-start gap-6 py-8 md:py-0 ${
                slide.reverse ? "md:mr-auto" : "md:ml-auto md:pl-8"
              }`}>
                <h2 className="font-playfair text-[32px] md:text-[46px] font-light leading-tight tracking-[2px] uppercase text-white drop-shadow-sm">
                  {slide.title}
                </h2>
                <p className="font-sans text-[14px] text-zinc-300 font-light tracking-wide max-w-[280px] drop-shadow-sm">
                  {slide.subtitle}
                </p>
                <Link href={slide.buttonLink}>
                  <button className="px-8 py-3.5 bg-[linear-gradient(110deg,#d4d4d8,35%,#fafafa,50%,#a1a1aa)] bg-[length:250%_100%] bg-[100%_0] hover:bg-[0_0] text-zinc-950 font-sans text-[13px] font-bold uppercase tracking-widest rounded-[4px] border border-zinc-200 shadow-md transition-[background-position] duration-700 ease-in-out cursor-pointer">
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10"
        aria-label="Slide anterior"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10"
        aria-label="Próximo slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
