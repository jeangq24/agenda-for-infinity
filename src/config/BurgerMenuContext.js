import React, { createContext, useState, useContext } from 'react';
import gsap from 'gsap';

// Crear el contexto
const BurgerMenuContext = createContext();

// Hook para usar el contexto fácilmente
export const useBurgerMenu = () => useContext(BurgerMenuContext);

// Proveedor del contexto
export const BurgerMenuProvider = ({ children }) => {
  const [isOpenMenuBurguer, setIsOpenMenuBurguer] = useState(false);

  const handleBurgerClick = () => {
    setIsOpenMenuBurguer(!isOpenMenuBurguer);

    if (!isOpenMenuBurguer) {
      // Abrir el menú con GSAP
      gsap.to('.nav-items', { duration: 0.5, x: '0%', opacity: 1, ease: 'power2.out', right: 0 });
    } else {
      // Cerrar el menú con GSAP
      gsap.to('.nav-items', { duration: 0.3, x: '-100%', opacity: 0, ease: 'power2.inOut' });
    }
  };

  return (
    <BurgerMenuContext.Provider value={{ isOpenMenuBurguer, handleBurgerClick }}>
      {children}
    </BurgerMenuContext.Provider>
  );
};
