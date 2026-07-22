"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  id: number;
  bg: string;
  imageSrc: string;
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
    imageAlt: "Velune Pratas Modelo",
    imageClass: "object-contain object-center scale-200",
    imageContainerClass: "w-full md:w-[45%] flex items-end justify-center md:justify-start h-[350px] md:h-full relative",
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
    imageClass: "object-contain object-center scale-180",
    imageContainerClass: "w-full md:w-[45%] flex items-end justify-center md:justify-end h-[350px] md:h-full relative",
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
    imageClass: "object-contain object-center scale-170",
    imageContainerClass: "w-full md:w-[45%] flex items-end justify-center md:justify-start h-[350px] md:h-full relative",
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
      <div className="relative h-[650px] md:h-[550px] w-full flex items-end">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-end py-12 md:py-0 ${slide.bg} ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className={`mx-auto max-w-7xl px-6 md:px-10 w-full h-full flex flex-col gap-8 md:gap-16 justify-center ${
              slide.reverse ? "md:flex-row-reverse" : "md:flex-row"
            }`}>
              <div className={slide.imageContainerClass}>
                <div className="relative w-full h-full aspect-square md:aspect-auto">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    className={slide.imageClass}
                  />
                </div>
              </div>

              <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center items-start gap-6 h-full md:pl-8">
                <h2 className="font-playfair text-[32px] md:text-[46px] font-light leading-tight tracking-[2px] uppercase text-white">
                  {slide.title}
                </h2>
                <p className="font-sans text-[14px] text-zinc-400 font-light tracking-wide max-w-[280px]">
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
