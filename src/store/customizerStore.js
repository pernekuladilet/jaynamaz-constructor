import { create } from 'zustand';

const DEFAULT_DESIGN = {
  color: 'dark_green',
  material: 'velvet',
  pattern: 'classic_mihrab',
  border: 'classic',
  size: 'standard',
  text: '',
  textFont: 'playfair',
  textColor: '#C9A227',
  tassels: false,
  tasselColor: '#C9A227',
};

export const useCustomizerStore = create((set) => ({
  ...DEFAULT_DESIGN,

  setColor: (color) => set({ color }),
  setMaterial: (material) => set({ material }),
  setPattern: (pattern) => set({ pattern }),
  setBorder: (border) => set({ border }),
  setSize: (size) => set({ size }),
  setText: (text) => set({ text: text.slice(0, 30) }),
  setTextFont: (textFont) => set({ textFont }),
  setTextColor: (textColor) => set({ textColor }),
  setTassels: (tassels) => set({ tassels }),
  setTasselColor: (tasselColor) => set({ tasselColor }),

  loadTemplate: (config) => set({ ...DEFAULT_DESIGN, ...config }),
  reset: () => set(DEFAULT_DESIGN),

  getSnapshot: () => {
    const state = useCustomizerStore.getState();
    return {
      color: state.color,
      material: state.material,
      pattern: state.pattern,
      border: state.border,
      size: state.size,
      text: state.text,
      textFont: state.textFont,
      textColor: state.textColor,
      tassels: state.tassels,
      tasselColor: state.tasselColor,
    };
  },
}));
