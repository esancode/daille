"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "A Daille é simplesmente incrível! As peças são lindas, de ótima qualidade e chegaram super rápido. Já virei cliente fiel!",
    author: "Amanda Silva",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 2,
    text: "Comprei um colar para dar de presente e fiquei apaixonada pelo cuidado na embalagem. A prata é belíssima e tem um brilho único.",
    author: "Carolina Mendes",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 3,
    text: "Atendimento impecável e joias deslumbrantes. O anel que comprei superou todas as minhas expectativas, não tiro mais do dedo!",
    author: "Juliana Costa",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    rating: 5
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const current = testimonials[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
      <h2 className="font-cinzel text-[24px] md:text-[32px] text-[#0A101A] uppercase tracking-wide mb-12">
        O QUE NOSSAS CLIENTES DIZEM
      </h2>

      {/* Animate content change */}
      <div className="min-h-[250px] md:min-h-[200px] flex flex-col items-center justify-center">
        <p className="font-sans text-[16px] md:text-[20px] text-[#333333] italic leading-relaxed max-w-2xl mb-10 transition-opacity duration-300">
          "{current.text}"
        </p>

        <div className="flex items-center gap-4 transition-opacity duration-300">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative">
            <Image src={current.image} alt={current.author} fill className="object-cover" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-sans text-[14px] text-[#0A101A] font-bold">{current.author}</span>
            <div className="flex items-center mt-1">
              {[...Array(current.rating)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px] text-[#0A101A] fill-[#0A101A]">
                  star
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-12">
        <button 
          onClick={prevTestimonial}
          className="text-[#0A101A] opacity-60 hover:opacity-100 transition-opacity p-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <button 
          onClick={nextTestimonial}
          className="text-[#0A101A] opacity-60 hover:opacity-100 transition-opacity p-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
}
