import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupAnimations() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Make sure our animations are only set up once
  if (document.querySelector('[data-animations-initialized="true"]')) {
    return;
  }

  // Mark animations as initialized
  document.body.setAttribute('data-animations-initialized', 'true');

  // Animation for cards with rotate hover effect
  const cards = document.querySelectorAll('.card-rotate-hover');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -5, rotate: 1, duration: 0.3, ease: 'power2.out' });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Animation for staggered entrance of elements on scroll
  const animateEntrance = () => {
    const elements = document.querySelectorAll('.animate-entrance');
    
    elements.forEach(element => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom-=100px',
        onEnter: () => {
          gsap.to(element, { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: 'power2.out' 
          });
        },
        once: true
      });
    });
  };

  // Initialize entrance animations
  animateEntrance();

  // Animation for credit card flip effect
  const creditCard = document.querySelector('.credit-card');
  if (creditCard) {
    creditCard.addEventListener('click', function() {
      creditCard.classList.toggle('flipped');
    });
  }
}
