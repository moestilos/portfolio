import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Polyfill navigator.locks para entornos donde no está disponible
if (typeof navigator !== 'undefined' && !navigator.locks) {
  (navigator as any).locks = {
    request: (_name: string, optionsOrFn: any, fn?: Function) => {
      const cb = typeof optionsOrFn === 'function' ? optionsOrFn : fn!;
      return Promise.resolve(cb());
    },
    query: () => Promise.resolve({ held: [], pending: [] }),
  };
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
