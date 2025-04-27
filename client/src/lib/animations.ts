import { gsap } from "gsap";

// Configurações globais das animações
gsap.config({
  nullTargetWarn: false,
});

// Funções de animação
const animations = {
  // Timeline para animação da tela de login
  loginAnimation: () => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".login-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(
      ".login-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );
    
    tl.fromTo(
      ".form-field",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
    
    tl.fromTo(
      ".login-button",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.1"
    );
    
    return tl;
  },

  // Animação para mudança entre modos (cliente/admin)
  switchModeAnimation: () => {
    const tl = gsap.timeline();
    
    tl.to(
      ".login-form",
      { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" }
    );
    
    tl.to(
      ".login-form",
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      "+=0.1"
    );
    
    return tl;
  },

  // Animação para decorações de fundo
  backgroundAnimation: () => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(
      ".bg-shape",
      { 
        y: -15, 
        rotation: "+=5", 
        duration: 4, 
        stagger: 0.2, 
        ease: "sine.inOut" 
      }
    );
    
    return tl;
  }
};

// Função para inicializar todas as animações
export function setupAnimations() {
  animations.backgroundAnimation();
}

export const { loginAnimation, switchModeAnimation, backgroundAnimation } = animations;