export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const isMobile = window.innerWidth <= 768;
