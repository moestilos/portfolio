import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

export interface AdminProject {
  id?:          string;
  num:          string;
  name:         string;
  tagline:      string;
  description:  string;
  highlights:   string[];
  image:        string;
  type:         string;
  year:         string;
  demo_url:     string;
  code_url:     string;
  tech:         string;   // JSON string para el formulario
  position:     number;
}

const EMPTY: AdminProject = {
  num: '', name: '', tagline: '', description: '',
  highlights: [''], image: '', type: '', year: '',
  demo_url: '', code_url: '', tech: '[]', position: 0,
};

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    /* ── Form inputs ── */
    .fi {
      width: 100%; padding: 10px 14px; border-radius: 10px; font-size: 13px;
      background: var(--surface-2, #1a1a1a); border: 1px solid var(--border);
      color: var(--text-1); outline: none; transition: border-color .2s;
      box-sizing: border-box;
    }
    .fi:focus { border-color: rgba(245,158,11,.5); }

    /* ── Buttons ── */
    .btn-p {
      padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600;
      background: var(--accent); color: #000; border: none; cursor: pointer;
      transition: opacity .2s; white-space: nowrap;
    }
    .btn-p:hover { opacity: .85; }
    .btn-p:disabled { opacity: .5; cursor: not-allowed; }
    .btn-g {
      padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 500;
      background: transparent; color: var(--text-2);
      border: 1px solid var(--border); cursor: pointer; transition: all .2s; white-space: nowrap;
    }
    .btn-g:hover { border-color: rgba(245,158,11,.4); color: var(--text-1); }
    .btn-edit {
      padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 500;
      background: rgba(245,158,11,.08); color: var(--accent);
      border: 1px solid rgba(245,158,11,.2); cursor: pointer; transition: all .2s; white-space: nowrap;
    }
    .btn-edit:hover { background: rgba(245,158,11,.15); }
    .btn-del {
      padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 500;
      background: rgba(239,68,68,.08); color: #f87171;
      border: 1px solid rgba(239,68,68,.2); cursor: pointer; transition: all .2s; white-space: nowrap;
    }
    .btn-del:hover { background: rgba(239,68,68,.18); }

    /* ── Project card ── */
    .proj-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 1rem 1.25rem;
      transition: border-color .2s;
    }
    .proj-card:hover { border-color: rgba(245,158,11,.3); }

    /* ── Modal ── */
    .overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,.75); backdrop-filter: blur(4px);
      display: flex; align-items: flex-start; justify-content: center;
      padding: 1rem; overflow-y: auto;
    }
    .modal {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; width: 100%; max-width: 620px;
      padding: 1.5rem; margin: auto;
    }

    /* ── Grid helpers ── */
    .row-2 { display: grid; gap: .75rem; grid-template-columns: 1fr 1fr; }
    .row-num { display: grid; gap: .75rem; grid-template-columns: 80px 1fr; }

    @media (max-width: 480px) {
      .row-2   { grid-template-columns: 1fr; }
      .row-num { grid-template-columns: 60px 1fr; }
      .modal   { padding: 1.25rem 1rem; }
    }

    /* ── Label ── */
    .lbl { font-size: 11px; color: var(--text-3); display: block; margin-bottom: 4px; }
  `],
  template: `
    <div style="padding:.25rem;">

      <!-- Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:.75rem;">
        <div>
          <h2 style="font-size:1.05rem; font-weight:700; color:var(--text-1); margin:0;">Proyectos</h2>
          <p style="font-size:12px; color:var(--text-3); margin:0;">Gestiona los proyectos del portfolio</p>
        </div>
        <button class="btn-p" (click)="openCreate()">+ Nuevo proyecto</button>
      </div>

      <!-- Loading -->
      @if (loading) {
        <div style="text-align:center; padding:3rem; color:var(--text-3); font-size:13px;">
          Cargando proyectos...
        </div>
      }

      <!-- Lista -->
      @if (!loading) {
        <div style="display:flex; flex-direction:column; gap:.75rem;">

          @for (p of projects; track p.id) {
            <div class="proj-card">

              <!-- Fila superior: num + nombre + año -->
              <div style="display:flex; align-items:flex-start; gap:.75rem; margin-bottom:.5rem;">
                <span style="font-size:11px; font-weight:700; color:var(--accent); min-width:26px; padding-top:2px;">{{ p.num }}</span>
                <div style="flex:1; min-width:0;">
                  <p style="font-size:14px; font-weight:600; color:var(--text-1); margin:0; word-break:break-word;">{{ p.name }}</p>
                  <p style="font-size:12px; color:var(--text-3); margin:0; word-break:break-word;">{{ p.tagline }}</p>
                </div>
                <span style="font-size:11px; color:var(--text-3); white-space:nowrap; padding-top:2px;">{{ p.year }}</span>
              </div>

              <!-- Fila inferior: tipo + botones -->
              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:.5rem;">
                <span style="font-size:10px; color:var(--text-3); background:rgba(255,255,255,.05);
                             padding:3px 10px; border-radius:20px; border:1px solid var(--border);">
                  {{ p.type }}
                </span>
                <div style="display:flex; gap:.5rem;">
                  <button class="btn-edit" (click)="openEdit(p)">Editar</button>
                  <button class="btn-del"  (click)="deleteProject(p)">Borrar</button>
                </div>
              </div>
            </div>
          }

          @if (projects.length === 0) {
            <div style="text-align:center; padding:3rem; color:var(--text-3); font-size:13px;">
              No hay proyectos aún. ¡Crea el primero!
            </div>
          }
        </div>
      }
    </div>

    <!-- Modal crear / editar -->
    @if (showModal) {
      <div class="overlay" (click)="closeModal($event)">
        <div class="modal" (click)="$event.stopPropagation()">

          <!-- Modal header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
            <h3 style="font-size:1rem; font-weight:700; color:var(--text-1); margin:0;">
              {{ editing ? 'Editar proyecto' : 'Nuevo proyecto' }}
            </h3>
            <button (click)="showModal=false"
                    style="background:none; border:none; color:var(--text-3); cursor:pointer; font-size:20px; line-height:1; padding:4px 8px;">✕</button>
          </div>

          <!-- Formulario -->
          <div style="display:flex; flex-direction:column; gap:.8rem;">

            <!-- Nº + Nombre -->
            <div class="row-num">
              <div>
                <label class="lbl">Nº</label>
                <input class="fi" [(ngModel)]="form.num" placeholder="01" />
              </div>
              <div>
                <label class="lbl">Nombre *</label>
                <input class="fi" [(ngModel)]="form.name" placeholder="Mi Proyecto" />
              </div>
            </div>

            <!-- Tagline -->
            <div>
              <label class="lbl">Tagline *</label>
              <input class="fi" [(ngModel)]="form.tagline" placeholder="Breve descripción en una línea" />
            </div>

            <!-- Descripción -->
            <div>
              <label class="lbl">Descripción</label>
              <textarea class="fi" [(ngModel)]="form.description" rows="3"
                        placeholder="Descripción completa del proyecto..."
                        style="resize:vertical;"></textarea>
            </div>

            <!-- Tipo + Año -->
            <div class="row-2">
              <div>
                <label class="lbl">Tipo</label>
                <input class="fi" [(ngModel)]="form.type" placeholder="Landing Page · Frontend" />
              </div>
              <div>
                <label class="lbl">Año</label>
                <input class="fi" [(ngModel)]="form.year" placeholder="2025" />
              </div>
            </div>

            <!-- Imagen -->
            <div>
              <label class="lbl">Imagen (URL o ruta)</label>
              <input class="fi" [(ngModel)]="form.image" placeholder="images/proyecto.png" />
            </div>

            <!-- Demo + GitHub -->
            <div class="row-2">
              <div>
                <label class="lbl">Demo URL</label>
                <input class="fi" [(ngModel)]="form.demo_url" placeholder="https://..." />
              </div>
              <div>
                <label class="lbl">GitHub URL</label>
                <input class="fi" [(ngModel)]="form.code_url" placeholder="https://github.com/..." />
              </div>
            </div>

            <!-- Highlights -->
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <label class="lbl" style="margin:0;">Highlights</label>
                <button (click)="addHighlight()"
                        style="font-size:11px; color:var(--accent); background:none; border:none; cursor:pointer; padding:0;">
                  + Añadir
                </button>
              </div>
              @for (h of form.highlights; track $index) {
                <div style="display:flex; gap:.5rem; margin-bottom:.4rem;">
                  <input class="fi" [(ngModel)]="form.highlights[$index]"
                         placeholder="Característica clave..." style="flex:1;" />
                  <button (click)="removeHighlight($index)" class="btn-del"
                          style="flex-shrink:0; padding:8px 12px;">✕</button>
                </div>
              }
            </div>

            <!-- Stack JSON -->
            <div>
              <label class="lbl">Stack tecnológico (JSON)</label>
              <textarea class="fi" [(ngModel)]="form.tech" rows="2"
                        placeholder='[{"name":"Angular","pct":60,"color":"#dd0031"},{"name":"TypeScript","pct":40,"color":"#3178c6"}]'
                        style="resize:vertical; font-family:monospace; font-size:11px;"></textarea>
            </div>

            <!-- Posición -->
            <div>
              <label class="lbl">Posición (orden en el listado)</label>
              <input class="fi" type="number" [(ngModel)]="form.position" placeholder="1" />
            </div>

            <!-- Error -->
            @if (formError) {
              <p style="font-size:12px; color:#f87171; margin:0; background:rgba(239,68,68,.08);
                         padding:8px 12px; border-radius:8px; border:1px solid rgba(239,68,68,.2);">
                {{ formError }}
              </p>
            }

            <!-- Acciones -->
            <div style="display:flex; justify-content:flex-end; gap:.75rem; margin-top:.25rem; flex-wrap:wrap;">
              <button class="btn-g" (click)="showModal=false">Cancelar</button>
              <button class="btn-p" [disabled]="saving" (click)="save()">
                {{ saving ? 'Guardando...' : (editing ? 'Guardar cambios' : 'Crear proyecto') }}
              </button>
            </div>

          </div>
        </div>
      </div>
    }
  `,
})
export class ProjectsAdminComponent implements OnInit {
  projects:  AdminProject[] = [];
  loading   = true;
  showModal = false;
  editing   = false;
  saving    = false;
  formError = '';
  form: AdminProject = { ...EMPTY, highlights: [''] };

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void { this.load(); }

  async load(): Promise<void> {
    this.loading = true;
    const { data } = await this.supa.getProjects();
    this.projects = (data ?? []).map((p: any) => ({
      ...p,
      tech:       JSON.stringify(p.tech ?? []),
      highlights: p.highlights?.length ? p.highlights : [''],
    }));
    this.loading = false;
  }

  openCreate(): void {
    this.editing   = false;
    this.form      = { ...EMPTY, highlights: [''] };
    this.formError = '';
    this.showModal = true;
  }

  openEdit(p: AdminProject): void {
    this.editing   = true;
    this.form      = { ...p, highlights: [...(p.highlights?.length ? p.highlights : [''])] };
    this.formError = '';
    this.showModal = true;
  }

  closeModal(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.showModal = false;
  }

  addHighlight(): void            { this.form.highlights.push(''); }
  removeHighlight(i: number): void { this.form.highlights.splice(i, 1); }

  async save(): Promise<void> {
    if (!this.form.name.trim())    { this.formError = 'El nombre es obligatorio'; return; }
    if (!this.form.tagline.trim()) { this.formError = 'El tagline es obligatorio'; return; }
    this.saving = true;
    this.formError = '';

    let tech: any[] = [];
    try { tech = JSON.parse(this.form.tech || '[]'); } catch { tech = []; }

    const payload: Record<string, unknown> = {
      num:         this.form.num,
      name:        this.form.name,
      tagline:     this.form.tagline,
      description: this.form.description,
      highlights:  this.form.highlights.filter(h => h.trim()),
      image:       this.form.image,
      type:        this.form.type,
      year:        this.form.year,
      demo_url:    this.form.demo_url  || null,
      code_url:    this.form.code_url  || null,
      tech,
      position:    this.form.position  ?? 0,
    };

    const { error } = this.editing
      ? await this.supa.updateProject(this.form.id!, payload)
      : await this.supa.createProject(payload);

    if (error) { this.formError = error.message; this.saving = false; return; }

    this.saving    = false;
    this.showModal = false;
    await this.load();
  }

  async deleteProject(p: AdminProject): Promise<void> {
    if (!confirm(`¿Borrar "${p.name}"?`)) return;
    await this.supa.deleteProject(p.id!);
    await this.load();
  }
}
