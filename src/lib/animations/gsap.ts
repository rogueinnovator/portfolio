import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { browser } from '$app/environment';

// Register GSAP plugins
if (browser) {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in animation
export const fadeIn = (element: HTMLElement, delay: number = 0, duration: number = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out'
    }
  );
};

// Fade in from bottom animation
export const fadeInUp = (element: HTMLElement, delay: number = 0, duration: number = 1, y: number = 50) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out'
    }
  );
};

// Fade in from left animation
export const fadeInLeft = (element: HTMLElement, delay: number = 0, duration: number = 1, x: number = -50) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power2.out'
    }
  );
};

// Fade in from right animation
export const fadeInRight = (element: HTMLElement, delay: number = 0, duration: number = 1, x: number = 50) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power2.out'
    }
  );
};

// Staggered animation for multiple elements
export const staggerElements = (elements: HTMLElement[], staggerTime: number = 0.1, delay: number = 0) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerTime,
      delay,
      ease: 'power2.out'
    }
  );
};

// Scroll trigger animation
export const createScrollTrigger = (
  element: HTMLElement, 
  animation: gsap.core.Tween,
  trigger?: HTMLElement,
  start: string = 'top 80%',
  end?: string,
  scrub: boolean | number = false,
  markers: boolean = false
) => {
  return ScrollTrigger.create({
    trigger: trigger || element,
    start,
    end,
    scrub,
    markers,
    animation
  });
};

// Hover animation
export const hoverAnimation = (element: HTMLElement, scale: number = 1.05) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, { scale, duration: 0.3, ease: 'power2.out' });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
};

// Text reveal animation
export const textReveal = (element: HTMLElement, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { 
      backgroundSize: '0% 100%',
      backgroundPosition: 'left'
    },
    {
      backgroundSize: '100% 100%',
      duration: 1.5,
      delay,
      ease: 'power2.out'
    }
  );
};

// Parallax effect
export const parallaxEffect = (element: HTMLElement, speed: number = 0.5) => {
  ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const yPos = -self.progress * 100 * speed;
      gsap.set(element, { y: yPos });
    }
  });
}; 