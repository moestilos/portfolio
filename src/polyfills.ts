// Sobrescribe navigator.locks en el prototipo para evitar fallos en Supabase
// Esto se ejecuta antes que cualquier otro bundle de la app
try {
  const mockLocks = {
    request: (_name: string, optionsOrFn: any, fn?: Function) => {
      const cb = typeof optionsOrFn === 'function' ? optionsOrFn : fn!;
      return Promise.resolve(cb());
    },
    query: () => Promise.resolve({ held: [], pending: [] }),
  };
  Object.defineProperty(Navigator.prototype, 'locks', {
    get: () => mockLocks,
    configurable: true,
  });
} catch (_e) {
  // Si falla el override, no hacer nada
}
