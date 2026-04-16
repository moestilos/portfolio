import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
    /* ── Inputs ── */
    .fi {
      width: 100%; padding: 10px 14px; border-radius: 10px; font-size: 13px;
      background: rgba(255,255,255,.03); border: 1px solid var(--border);
      color: var(--text-1); outline: none; transition: all .2s;
      box-sizing: border-box;
    }
    .fi:focus { border-color: rgba(245,158,11,.5); box-shadow: 0 0 0 3px rgba(245,158,11,.08); }
    .fi::placeholder { color: rgba(255,255,255,.2); }

    /* ── Buttons ── */
    .btn-p {
      padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600;
      background: var(--accent); color: #000; border: none; cursor: pointer;
      transition: all .2s; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-p:hover { opacity: .88; transform: translateY(-1px); }
    .btn-p:disabled { opacity: .5; cursor: not-allowed; transform: none; }

    .btn-g {
      padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 500;
      background: transparent; color: var(--text-2);
      border: 1px solid var(--border); cursor: pointer; transition: all .2s; white-space: nowrap;
    }
    .btn-g:hover { border-color: rgba(245,158,11,.4); color: var(--text-1); }

    .btn-icon {
      width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border);
      background: transparent; cursor: pointer; transition: all .2s;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .btn-icon:hover { background: rgba(255,255,255,.05); }
    .btn-icon.danger:hover { background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.3); }
    .btn-icon.edit:hover { background: rgba(245,158,11,.1); border-color: rgba(245,158,11,.3); }

    /* ── Project card ── */
    .proj-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 14px; overflow: hidden;
      transition: all .25s ease;
    }
    .proj-card:hover { border-color: rgba(245,158,11,.25); box-shadow: 0 4px 24px rgba(0,0,0,.3); }

    .proj-thumb {
      width: 56px; height: 56px; border-radius: 10px; flex-shrink: 0;
      background: rgba(255,255,255,.04); border: 1px solid var(--border);
      overflow: hidden; display: flex; align-items: center; justify-content: center;
    }
    .proj-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .proj-thumb-placeholder { color: var(--text-3); font-size: 18px; }

    /* ── Modal ── */
    .overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,.8); backdrop-filter: blur(8px);
      display: flex; align-items: flex-start; justify-content: center;
      padding: 1rem; overflow-y: auto;
      animation: fadeIn .2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .modal {
      background: #111; border: 1px solid var(--border);
      border-radius: 18px; width: 100%; max-width: 680px;
      margin: auto; animation: slideUp .25s ease;
      box-shadow: 0 24px 80px rgba(0,0,0,.6);
    }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
    }
    .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .modal-footer {
      padding: 1rem 1.5rem; border-top: 1px solid var(--border);
      display: flex; justify-content: flex-end; gap: .75rem; flex-wrap: wrap;
    }

    /* ── Section divider ── */
    .section-title {
      font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      color: var(--text-3); padding-bottom: 4px; margin-top: .25rem;
      font-family: var(--mono);
    }

    /* ── Grid helpers ── */
    .row-2 { display: grid; gap: .75rem; grid-template-columns: 1fr 1fr; }

    /* ── Image upload zone ── */
    .upload-zone {
      position: relative; border: 2px dashed var(--border); border-radius: 12px;
      padding: 1.5rem; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: .5rem; cursor: pointer; transition: all .25s;
      min-height: 140px; background: rgba(255,255,255,.015);
    }
    .upload-zone:hover, .upload-zone.drag-over {
      border-color: rgba(245,158,11,.5); background: rgba(245,158,11,.04);
    }
    .upload-zone.has-image { padding: 0; border-style: solid; }

    .upload-preview {
      width: 100%; border-radius: 10px; overflow: hidden; position: relative;
    }
    .upload-preview img {
      width: 100%; height: 180px; object-fit: cover; display: block;
    }
    .upload-preview-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,.6);
      display: flex; align-items: center; justify-content: center; gap: .5rem;
      opacity: 0; transition: opacity .2s;
    }
    .upload-preview:hover .upload-preview-overlay { opacity: 1; }

    .upload-progress {
      position: absolute; bottom: 0; left: 0; height: 3px; border-radius: 2px;
      background: var(--accent); transition: width .3s ease;
    }

    /* ── Label ── */
    .lbl { font-size: 11px; color: var(--text-3); display: block; margin-bottom: 4px; }

    /* ── Toast ── */
    .toast {
      position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 2000;
      padding: 12px 20px; border-radius: 12px; font-size: 13px; font-weight: 500;
      display: flex; align-items: center; gap: 8px;
      animation: toastIn .3s ease; box-shadow: 0 8px 32px rgba(0,0,0,.4);
    }
    .toast.success { background: rgba(34,197,94,.15); color: #4ade80; border: 1px solid rgba(34,197,94,.25); }
    .toast.error   { background: rgba(239,68,68,.15); color: #f87171; border: 1px solid rgba(239,68,68,.25); }
    @keyframes toastIn { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* ── Delete confirm ── */
    .confirm-overlay {
      position: fixed; inset: 0; z-index: 1100;
      background: rgba(0,0,0,.7); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn .15s ease;
    }
    .confirm-box {
      background: #111; border: 1px solid var(--border); border-radius: 16px;
      padding: 1.5rem; max-width: 380px; width: 90%;
      text-align: center; animation: slideUp .2s ease;
      box-shadow: 0 16px 48px rgba(0,0,0,.5);
    }

    /* ── Empty state ── */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 4rem 2rem; gap: 1rem; text-align: center;
    }
    .empty-icon {
      width: 64px; height: 64px; border-radius: 16px;
      background: rgba(245,158,11,.08); border: 1px solid rgba(245,158,11,.15);
      display: flex; align-items: center; justify-content: center;
    }

    /* ── Highlight row ── */
    .hl-row {
      display: flex; align-items: center; gap: .5rem; margin-bottom: .4rem;
    }
    .hl-row .fi { flex: 1; }
    .hl-remove {
      width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
      background: transparent; border: 1px solid rgba(239,68,68,.2);
      color: #f87171; cursor: pointer; display: flex; align-items: center;
      justify-content: center; transition: all .2s; font-size: 14px;
    }
    .hl-remove:hover { background: rgba(239,68,68,.12); }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .row-2 { grid-template-columns: 1fr; }
      .modal-body { padding: 1.25rem 1rem; }
      .modal-header, .modal-footer { padding-left: 1rem; padding-right: 1rem; }
      .proj-thumb { width: 44px; height: 44px; border-radius: 8px; }
    }
  `],
  template: `
    <div style="padding:.25rem;">

      <!-- Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:.75rem;">
        <div>
          <h2 style="font-size:1.05rem; font-weight:700; color:var(--text-1); margin:0;">Proyectos</h2>
          <p style="font-size:12px; color:var(--text-3); margin:0;">
            {{ projects.length }} proyecto{{ projects.length !== 1 ? 's' : '' }} en el portfolio
          </p>
        </div>
        <button class="btn-p" (click)="openCreate()">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo proyecto
        </button>
      </div>

      <!-- Loading skeleton -->
      @if (loading) {
        <div style="display:flex; flex-direction:column; gap:.75rem;">
          @for (s of [1,2,3]; track s) {
            <div style="background:var(--surface); border:1px solid var(--border); border-radius:14px;
                        padding:1rem 1.25rem; display:flex; align-items:center; gap:1rem;">
              <div style="width:56px; height:56px; border-radius:10px; background:rgba(255,255,255,.04);
                          animation: pulse 1.5s infinite;"></div>
              <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
                <div style="width:60%; height:14px; border-radius:6px; background:rgba(255,255,255,.04);
                            animation: pulse 1.5s infinite;"></div>
                <div style="width:40%; height:10px; border-radius:6px; background:rgba(255,255,255,.03);
                            animation: pulse 1.5s infinite;"></div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Project list -->
      @if (!loading) {

        <!-- Empty state -->
        @if (projects.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   stroke-width="1.5" style="color:var(--accent);">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              </svg>
            </div>
            <p style="font-size:14px; font-weight:600; color:var(--text-1); margin:0;">No hay proyectos</p>
            <p style="font-size:12px; color:var(--text-3); margin:0; max-width:260px;">
              Crea tu primer proyecto y empieza a construir tu portfolio.
            </p>
            <button class="btn-p" style="margin-top:.5rem;" (click)="openCreate()">
              Crear primer proyecto
            </button>
          </div>
        }

        <!-- Cards -->
        @if (projects.length > 0) {
          <div style="display:flex; flex-direction:column; gap:.75rem;">
            @for (p of projects; track p.id; let i = $index) {
              <div class="proj-card">
                <div style="display:flex; align-items:center; gap:1rem; padding:1rem 1.25rem;">

                  <!-- Thumbnail -->
                  <div class="proj-thumb">
                    @if (p.image) {
                      <img [src]="p.image" [alt]="p.name" onerror="this.style.display='none'"/>
                    } @else {
                      <span class="proj-thumb-placeholder">
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" style="color:var(--text-3);">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                      </span>
                    }
                  </div>

                  <!-- Info -->
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:2px;">
                      <span style="font-size:10px; font-weight:700; color:var(--accent); font-family:var(--mono);">
                        {{ p.num }}
                      </span>
                      <p style="font-size:14px; font-weight:600; color:var(--text-1); margin:0;
                                white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        {{ p.name }}
                      </p>
                    </div>
                    <p style="font-size:12px; color:var(--text-3); margin:0;
                              white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      {{ p.tagline }}
                    </p>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                      <span style="font-size:10px; color:var(--text-3); background:rgba(255,255,255,.04);
                                   padding:2px 8px; border-radius:20px; border:1px solid var(--border);">
                        {{ p.type }}
                      </span>
                      <span style="font-size:10px; color:var(--text-3); font-family:var(--mono);">
                        {{ p.year }}
                      </span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div style="display:flex; gap:6px; flex-shrink:0;">
                    <button class="btn-icon edit" (click)="openEdit(p)" title="Editar">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:var(--accent);">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button class="btn-icon danger" (click)="confirmDelete(p)" title="Borrar">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:#f87171;">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      }
    </div>

    <!-- ═══════════ MODAL CREAR / EDITAR ═══════════ -->
    @if (showModal) {
      <div class="overlay" (click)="closeModal($event)">
        <div class="modal" (click)="$event.stopPropagation()">

          <!-- Header -->
          <div class="modal-header">
            <div>
              <h3 style="font-size:1rem; font-weight:700; color:var(--text-1); margin:0;">
                {{ editing ? 'Editar proyecto' : 'Nuevo proyecto' }}
              </h3>
              <p style="font-size:11px; color:var(--text-3); margin:2px 0 0;">
                {{ editing ? 'Modifica los datos del proyecto' : 'Rellena los datos para crear un nuevo proyecto' }}
              </p>
            </div>
            <button (click)="showModal=false"
                    style="background:none; border:none; color:var(--text-3); cursor:pointer;
                           font-size:18px; line-height:1; padding:6px 8px; border-radius:8px;
                           transition: all .15s;"
                    onmouseover="this.style.background='rgba(255,255,255,.05)'"
                    onmouseout="this.style.background='none'">✕</button>
          </div>

          <!-- Body -->
          <div class="modal-body">

            <!-- ── Imagen ── -->
            <div>
              <span class="section-title">Imagen del proyecto</span>
              <div class="upload-zone"
                   [class.has-image]="imagePreview || form.image"
                   [class.drag-over]="isDragOver"
                   (click)="fileInput.click()"
                   (dragover)="onDragOver($event)"
                   (dragleave)="onDragLeave($event)"
                   (drop)="onDrop($event)">

                <input #fileInput type="file" accept="image/*" hidden (change)="onFileSelected($event)"/>

                @if (imagePreview || form.image) {
                  <div class="upload-preview">
                    <img [src]="imagePreview || form.image" alt="Preview"/>
                    <div class="upload-preview-overlay">
                      <button class="btn-g" style="padding:6px 14px; font-size:11px;"
                              (click)="$event.stopPropagation(); fileInput.click()">
                        Cambiar
                      </button>
                      <button class="btn-g" style="padding:6px 14px; font-size:11px; color:#f87171; border-color:rgba(239,68,68,.3);"
                              (click)="$event.stopPropagation(); removeImage()">
                        Quitar
                      </button>
                    </div>
                    @if (uploading) {
                      <div class="upload-progress" [style.width]="uploadProgress + '%'"></div>
                    }
                  </div>
                } @else {
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                       stroke-width="1.2" style="color:var(--text-3); opacity:.6;">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p style="font-size:12px; color:var(--text-2); margin:0; font-weight:500;">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                  <p style="font-size:10px; color:var(--text-3); margin:0;">
                    JPG, PNG, WebP o GIF · máx. 5 MB
                  </p>
                }
              </div>
            </div>

            <!-- ── Info básica ── -->
            <span class="section-title">Información básica</span>

            <div class="row-2">
              <div>
                <label class="lbl">Nº</label>
                <input class="fi" [(ngModel)]="form.num" placeholder="01" />
              </div>
              <div>
                <label class="lbl">Nombre *</label>
                <input class="fi" [(ngModel)]="form.name" placeholder="Mi Proyecto" />
              </div>
            </div>

            <div>
              <label class="lbl">Tagline *</label>
              <input class="fi" [(ngModel)]="form.tagline" placeholder="Breve descripción en una línea" />
            </div>

            <div>
              <label class="lbl">Descripción</label>
              <textarea class="fi" [(ngModel)]="form.description" rows="3"
                        placeholder="Descripción completa del proyecto..."
                        style="resize:vertical;"></textarea>
            </div>

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

            <!-- ── Links ── -->
            <span class="section-title">Enlaces</span>

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

            <!-- ── Highlights ── -->
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="section-title" style="margin:0;">Highlights</span>
                <button (click)="addHighlight()"
                        style="font-size:11px; color:var(--accent); background:none; border:none;
                               cursor:pointer; padding:2px 0; font-weight:600;">
                  + Añadir
                </button>
              </div>
              <div style="margin-top:6px;">
                @for (h of form.highlights; track $index) {
                  <div class="hl-row">
                    <input class="fi" [(ngModel)]="form.highlights[$index]"
                           placeholder="Característica clave..." />
                    <button class="hl-remove" (click)="removeHighlight($index)" title="Quitar">✕</button>
                  </div>
                }
              </div>
            </div>

            <!-- ── Stack ── -->
            <span class="section-title">Stack tecnológico</span>

            <div>
              <label class="lbl">JSON del stack</label>
              <textarea class="fi" [(ngModel)]="form.tech" rows="2"
                        placeholder='[{"name":"Angular","pct":60,"color":"#dd0031"}]'
                        style="resize:vertical; font-family:var(--mono); font-size:11px;"></textarea>
            </div>

            <div>
              <label class="lbl">Posición (orden)</label>
              <input class="fi" type="number" [(ngModel)]="form.position" placeholder="1" />
            </div>

            <!-- Error -->
            @if (formError) {
              <div style="font-size:12px; color:#f87171; background:rgba(239,68,68,.08);
                          padding:10px 14px; border-radius:10px; border:1px solid rgba(239,68,68,.2);
                          display:flex; align-items:center; gap:8px;">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="flex-shrink:0;">
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {{ formError }}
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn-g" (click)="showModal=false">Cancelar</button>
            <button class="btn-p" [disabled]="saving || uploading" (click)="save()">
              @if (saving) {
                <svg width="14" height="14" viewBox="0 0 24 24" style="animation: spin .8s linear infinite;">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2.5" opacity=".25"/>
                  <path d="M12 2a10 10 0 019.95 9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
                Guardando...
              } @else {
                {{ editing ? 'Guardar cambios' : 'Crear proyecto' }}
              }
            </button>
          </div>

        </div>
      </div>
    }

    <!-- ═══════════ DELETE CONFIRMATION ═══════════ -->
    @if (deleteTarget) {
      <div class="confirm-overlay" (click)="deleteTarget=null">
        <div class="confirm-box" (click)="$event.stopPropagation()">
          <div style="width:48px; height:48px; border-radius:12px; margin:0 auto 1rem;
                      background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.2);
                      display:flex; align-items:center; justify-content:center;">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#f87171" stroke-width="1.8">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </div>
          <p style="font-size:15px; font-weight:700; color:var(--text-1); margin:0 0 .5rem;">
            ¿Eliminar proyecto?
          </p>
          <p style="font-size:12px; color:var(--text-3); margin:0 0 1.25rem;">
            "{{ deleteTarget.name }}" se eliminará permanentemente. Esta acción no se puede deshacer.
          </p>
          <div style="display:flex; gap:.75rem; justify-content:center;">
            <button class="btn-g" (click)="deleteTarget=null">Cancelar</button>
            <button class="btn-p" style="background:#ef4444; color:#fff;"
                    [disabled]="deleting" (click)="executeDelete()">
              {{ deleting ? 'Eliminando...' : 'Sí, eliminar' }}
            </button>
          </div>
        </div>
      </div>
    }

    <!-- ═══════════ TOAST ═══════════ -->
    @if (toast) {
      <div class="toast" [class.success]="toast.type==='success'" [class.error]="toast.type==='error'">
        @if (toast.type === 'success') {
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        } @else {
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        }
        {{ toast.message }}
      </div>
    }
  `,
})
export class ProjectsAdminComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  projects:  AdminProject[] = [];
  loading   = true;
  showModal = false;
  editing   = false;
  saving    = false;
  formError = '';
  form: AdminProject = { ...EMPTY, highlights: [''] };

  // Image upload state
  imagePreview: string | null = null;
  imageFile: File | null = null;
  uploading = false;
  uploadProgress = 0;
  isDragOver = false;

  // Delete confirmation
  deleteTarget: AdminProject | null = null;
  deleting = false;

  // Toast notifications
  toast: { message: string; type: 'success' | 'error' } | null = null;
  private toastTimer: any;

  constructor(private supa: SupabaseService) {}

  ngOnInit(): void { this.load(); }

  // ─── CRUD ────────────────────────────────────────────────────────────────

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
    this.editing      = false;
    this.form         = { ...EMPTY, highlights: [''] };
    this.imagePreview = null;
    this.imageFile    = null;
    this.formError    = '';
    this.showModal    = true;
  }

  openEdit(p: AdminProject): void {
    this.editing      = true;
    this.form         = { ...p, highlights: [...(p.highlights?.length ? p.highlights : [''])] };
    this.imagePreview = null;
    this.imageFile    = null;
    this.formError    = '';
    this.showModal    = true;
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

    // Upload image if a new file was selected
    if (this.imageFile) {
      this.uploading = true;
      this.uploadProgress = 30;
      const { url, error } = await this.supa.uploadProjectImage(this.imageFile);
      this.uploadProgress = 100;
      if (error) {
        this.formError = `Error subiendo imagen: ${error}`;
        this.uploading = false;
        this.saving = false;
        return;
      }
      // Delete old image from storage if replacing
      if (this.editing && this.form.image && this.form.image.includes('supabase')) {
        await this.supa.deleteProjectImage(this.form.image);
      }
      this.form.image = url!;
      this.uploading = false;
    }

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
    this.showToast(this.editing ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente', 'success');
    await this.load();
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────

  confirmDelete(p: AdminProject): void {
    this.deleteTarget = p;
  }

  async executeDelete(): Promise<void> {
    if (!this.deleteTarget) return;
    this.deleting = true;

    // Delete image from storage if it's a Supabase URL
    if (this.deleteTarget.image && this.deleteTarget.image.includes('supabase')) {
      await this.supa.deleteProjectImage(this.deleteTarget.image);
    }

    const { error } = await this.supa.deleteProject(this.deleteTarget.id!) as any;
    this.deleting = false;

    if (error) {
      this.showToast('Error al eliminar: ' + error.message, 'error');
    } else {
      this.showToast(`"${this.deleteTarget.name}" eliminado`, 'success');
    }

    this.deleteTarget = null;
    await this.load();
  }

  // ─── IMAGE HANDLING ──────────────────────────────────────────────────────

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.handleFile(file);
    }
  }

  onFileSelected(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.handleFile(file);
  }

  private handleFile(file: File): void {
    if (file.size > 5 * 1024 * 1024) {
      this.formError = 'La imagen no puede superar 5 MB';
      return;
    }
    this.imageFile = file;
    this.formError = '';
    // Create local preview
    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagePreview = null;
    this.imageFile = null;
    this.form.image = '';
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  // ─── TOAST ───────────────────────────────────────────────────────────────

  private showToast(message: string, type: 'success' | 'error'): void {
    clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => { this.toast = null; }, 3000);
  }
}
