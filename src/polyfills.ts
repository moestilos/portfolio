// Override navigator.locks ANTES de que Supabase se inicialice
// Supabase usa navigator.locks para sesiones y falla en algunos entornos
(window as any).__navigatorLocksOriginal = (navigator as any).locks;
Object.defineProperty(navigator, 'locks', {
  get: () => ({
    request: (_name: string, optionsOrFn: any, fn?: Function) => {
      const cb = typeof optionsOrFn === 'function' ? optionsOrFn : fn!;
      return Promise.resolve(cb());
    },
    query: () => Promise.resolve({ held: [], pending: [] }),
  }),
  configurable: true,
});
