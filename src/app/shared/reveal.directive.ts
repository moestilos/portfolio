import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

const SHOWN_MS = 1100;
const STAGGER_MS = 70;
const MAX_STAGGER = 5;

/**
 * Aparición al entrar en pantalla (la de Aguilera Studio): sube y se funde, escalonada entre hermanos.
 * Sin JS o con «reducir movimiento» no hace nada y todo se ve desde el principio.
 */
@Directive({ selector: '[reveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private io: IntersectionObserver | null = null;

  constructor(private ref: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('rv-on');
    const el = this.ref.nativeElement;
    const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
    el.style.transitionDelay = Math.min(idx, MAX_STAGGER) * STAGGER_MS + 'ms';
    el.classList.add('rv');
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        this.io?.disconnect();
        el.classList.add('in');
        // Al acabar se quita: así el hover de las tarjetas vuelve a usar su propia transición.
        setTimeout(() => { el.classList.remove('rv', 'in'); el.style.transitionDelay = ''; }, SHOWN_MS);
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    this.io.observe(el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
