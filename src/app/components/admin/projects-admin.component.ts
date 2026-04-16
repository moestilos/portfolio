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
    .form-input {
      width: 100%; padding: 10px 14px; border-radius: 10px; font-size: 13px;
      background: var(--surface-2); border: 1px solid var(--border);
      color: var(--text-1); outline: none; transition: border-color .2s;
    }
    .form-input:focus { border-color: rgba(245,158,11,0.5); }
    .btn-primary {
      padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 600;
      background: var(--accent); color: #000; border: none; cursor: pointer;
      transition: opacity .2s;
    }
    .btn-primary:hover { opacity: .85; }
    .btn-ghost {
      padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 500;
      background: transparent; color: var(--text-2);
      border: 1px solid var(--border); cursor: pointer; transition: all .2s;
    }
    .btn-ghost:hover { border-color: rgba(245,158,11,.4); color: var(--text-1); }
    .btn-danger {
      padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 500;
      background: rgba(239,68,68,.1); color: #f87171;
      border: 1px solid rgba(239,68,68,.2); cursor: pointer; transition: all .2s;
    }
    .btn-danger:hover { background: rgba(239,68,68,.2); }
    .proj-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 1rem 1.25rem;
      display: flex; align-items: center; gap: 1rem;
      transition: border-color .2s;
    }
    .proj-card:hover { border-color: rgba(245,158,11,.3); }
    .modal-overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,.7); backdrop-filter: blur(4px);
      display: flex; align-items: flex-start; justify-content: center;
      padding: 1rem; overflow-y: auto;
    }
    .modal {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 16px; width: 100%; max-width: 600px;
      padding: 1.5rem; margin: auto;
    }
  `],
  template: `
    <div style="padding: 1.5rem; max-width: 900px; margin: 0 auto;">

      <!-- Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:.75rem;">
        <div>
          <h2 style="font-size:1.1rem; font-weight:700; color:var(--text-1); margin:0;">Proyectos</h2>
          <p style="font-size:12px; color:var(--text-3); margin:0;">Gestiona los proyectos del portfolio</p>
        </div>
        <button class="btn-primary" (click)="openCreate()">+ Nuevo proyecto</button>
      </div>

      <!-- Loading -->
      @if (loading) {
        <div style="text-align:center; padding:3rem; color:var(--text-3); font-size:13px;">Cargando proyectos...</div>
      }

      <!-- Lista de proyectos -->
      @if (!loading) {
        <div style="display:flex; flex-direction:column; gap:.75rem;">
          @for (p of projects; track p.id) {
            <div class="proj-card">
              <!-- Número -->
              <span style="font-size:11px; font-weight:700; color:var(--accent); min-width:28px;">{{ p.num }}</span>

              <!-- Info -->
              <div style="flex:1; min-width:0;">
                <p style="font-size:14px; font-weight:600; color:var(--text-1); margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ p.name }}</p>
                <p style="font-size:12px; color:var(--text-3); margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ p.tagline }}</p>
              </div>

              <!-- Año + tipo -->
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:2px; flex-shrink:0;">
                <span style="font-size:11px; color:var(--text-3);">{{ p.year }}</span>
                <span style="font-size:10px; color:var(--text-3); background:var(--surface-2); padding:2px 8px; border-radius:20px;">{{ p.type }}</span>
              </div>

              <!-- Acciones -->
              <div style="display:flex; gap:.5rem; flex-shrink:0;">
                <button class="btn-ghost" style="padding:6px 12px; font-size:12px;" (click)="openEdit(p)">Editar</button>
                <button class="btn-danger" (click)="deleteProject(p)">Borrar</button>
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

    <!-- Modal crear/editar -->
    @if (showModal) {
      <div class="modal-overlay" (click)="closeModal($event)">
        <div class="modal" (click)="$event.stopPropagation()">

          <!-- Modal header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
            <h3 style="font-size:1rem; font-weight:700; color:var(--text-1); margin:0;">
              {{ editing ? 'Editar proyecto' : 'Nuevo proyecto' }}
            </h3>
            <button (click)="showModal=false" style="background:none; border:none; color:var(--text-3); cursor:pointer; font-size:18px;">✕</button>
          </div>

          <!-- Formulario -->
          <div style="display:flex; flex-direction:column; gap:.75rem;">

            <div style="display:grid; grid-template-columns:80px 1fr; gap:.75rem;">
              <div>
                <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Nº</label>
                <input class="form-input" [(ngModel)]="form.num" placeholder="01" />
              </div>
              <div>
                <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Nombre *</label>
                <input class="form-input" [(ngModel)]="form.name" placeholder="Mi Proyecto" />
              </div>
            </div>

            <div>
              <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Tagline *</label>
              <input class="form-input" [(ngModel)]="form.tagline" placeholder="Breve descripción en una línea" />
            </div>

            <div>
              <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Descripción</label>
              <textarea class="form-input" [(ngModel)]="form.description" rows="3"
                        placeholder="Descripción completa del proyecto..."
                        style="resize:vertical;"></textarea>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:.75rem;">
              <div>
                <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Tipo</label>
                <input class="form-input" [(ngModel)]="form.type" placeholder="Landing Page, App Web..." />
              </div>
              <div>
                <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Año</label>
                <input class="form-input" [(ngModel)]="form.year" placeholder="2024" />
              </div>
            </div>

            <div>
              <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Imagen URL</label>
              <input class="form-input" [(ngModel)]="form.image" placeholder="https://..." />
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:.75rem;">
              <div>
                <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Demo URL</label>
                <input class="form-input" [(ngModel)]="form.demo_url" placeholder="https://..." />
              </div>
              <div>
                <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">GitHub URL</label>
                <input class="form-input" [(ngModel)]="form.code_url" placeholder="https://github.com/..." />
              </div>
            </div>

            <!-- Highlights -->
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <label style="font-size:11px; color:var(--text-3);">Highlights</label>
                <button (click)="addHighlight()" style="font-size:11px; color:var(--accent); background:none; border:none; cursor:pointer;">+ Añadir</button>
              </div>
              @for (h of form.highlights; track $index) {
                <div style="display:flex; gap:.5rem; margin-bottom:.4rem;">
                  <input class="form-input" [(ngModel)]="form.highlights[$index]" placeholder="Característica clave..." />
                  <button (click)="removeHighlight($index)" class="btn-danger" style="flex-shrink:0;">✕</button>
                </div>
              }
            </div>

            <div>
              <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Stack (JSON)</label>
              <textarea class="form-input" [(ngModel)]="form.tech" rows="2"
                        placeholder='[{"name":"Angular","pct":60,"color":"#dd0031"}]'
                        style="resize:vertical; font-family:monospace; font-size:11px;"></textarea>
            </div>

            <div>
              <label style="font-size:11px; color:var(--text-3); display:block; margin-bottom:4px;">Posición</label>
              <input class="form-input" type="number" [(ngModel)]="form.position" placeholder="0" />
            </div>

            <!-- Error -->
            @if (formError) {
              <p style="font-size:12px; color:#f87171; margin:0;">{{ formError }}</p>
            }

            <!-- Acciones -->
            <div style="display:flex; justify-content:flex-end; gap:.75rem; margin-top:.25rem;">
              <button class="btn-ghost" (click)="showModal=false">Cancelar</button>
              <button class="btn-primary" [disabled]="saving" (click)="save()">
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
  projects: AdminProject[] = [];
  loading  = true;
  showModal = false;
  editing  = false;
  saving   = false;
  formError = '';
  form: AdminProject = { ...EMPTY, highlights: [''] };

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void { this.load(); }

  async load(): Promise<void> {
    this.loading = true;
    const { data } = await this.supa.getProjects();
    this.projects = (data ?? []).map(p => ({
      ...p,
      tech: JSON.stringify(p.tech ?? []),
      highlights: p.highlights ?? [''],
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
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.showModal = false;
  }

  addHighlight(): void    { this.form.highlights.push(''); }
  removeHighlight(i: number): void { this.form.highlights.splice(i, 1); }

  async save(): Promise<void> {
    if (!this.form.name.trim()) { this.formError = 'El nombre es obligatorio'; return; }
    if (!this.form.tagline.trim()) { this.formError = 'El tagline es obligatorio'; return; }
    this.saving = true; this.formError = '';

    let tech: any[] = [];
    try { tech = JSON.parse(this.form.tech || '[]'); } catch { tech = []; }

    const payload = {
      num:         this.form.num,
      name:        this.form.name,
      tagline:     this.form.tagline,
      description: this.form.description,
      highlights:  this.form.highlights.filter(h => h.trim()),
      image:       this.form.image,
      type:        this.form.type,
      year:        this.form.year,
      demo_url:    this.form.demo_url || null,
      code_url:    this.form.code_url || null,
      tech,
      position:    this.form.position ?? 0,
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
