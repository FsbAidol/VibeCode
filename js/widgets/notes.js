/**
 * Quick Notes & Emoji Scratchpad Widget
 */

import { sound } from '../audio.js';
import { triggerEmojiConfetti } from '../utils/confetti.js';

export class NotesWidget {
  constructor(containerEl) {
    this.container = containerEl;
    this.notes = [];

    this.defaultNotes = [
      { id: 1, text: 'Написать крутой сайт с SVG эмодзи и Java/JS виджетами', emoji: '☕', status: 'done', color: 'note-blue' },
      { id: 2, text: 'Протестировать физику эмодзи в гравитационной песочнице', emoji: '🚀', status: 'active', color: 'note-amber' },
      { id: 3, text: 'Заварить чашку свежего эспрессо и послушать Lo-Fi бит', emoji: '✨', status: 'idea', color: 'note-purple' }
    ];

    this.loadNotes();
    this.init();
  }

  loadNotes() {
    try {
      const saved = localStorage.getItem('vibecode_notes');
      this.notes = saved ? JSON.parse(saved) : this.defaultNotes;
    } catch (e) {
      this.notes = this.defaultNotes;
    }
  }

  saveNotes() {
    try {
      localStorage.setItem('vibecode_notes', JSON.stringify(this.notes));
    } catch (e) {}
  }

  init() {
    this.renderLayout();
    this.bindEvents();
    this.renderNotesList();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="notes-panel">
        <div class="notes-header">
          <div class="notes-title-group">
            <span class="notes-badge">Стикеры & Идеи</span>
            <h3 class="notes-title">📝 Быстрые Заметки</h3>
          </div>
          <button class="btn btn-primary btn-sm" id="addNoteBtn">
            <span>+ Добавить Заметку</span>
          </button>
        </div>

        <div class="notes-composer" id="notesComposer" style="display: none;">
          <input type="text" class="custom-input" id="newNoteText" placeholder="Что нужно сделать или придумать?..." maxlength="120" />
          <div class="composer-toolbar">
            <div class="emoji-picker-row" id="composerEmojis">
              <span class="emoji-chip active" data-emoji="☕">☕</span>
              <span class="emoji-chip" data-emoji="🚀">🚀</span>
              <span class="emoji-chip" data-emoji="⚡">⚡</span>
              <span class="emoji-chip" data-emoji="🔥">🔥</span>
              <span class="emoji-chip" data-emoji="⭐">⭐</span>
              <span class="emoji-chip" data-emoji="💡">💡</span>
            </div>
            <div class="composer-actions">
              <button class="btn btn-secondary btn-sm" id="cancelNoteBtn">Отмена</button>
              <button class="btn btn-primary btn-sm" id="saveNoteBtn">Сохранить</button>
            </div>
          </div>
        </div>

        <div class="notes-grid" id="notesGrid">
          <!-- Rendered dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const addBtn = this.container.querySelector('#addNoteBtn');
    const composer = this.container.querySelector('#notesComposer');
    const cancelBtn = this.container.querySelector('#cancelNoteBtn');
    const saveBtn = this.container.querySelector('#saveNoteBtn');
    const input = this.container.querySelector('#newNoteText');

    addBtn.addEventListener('click', () => {
      sound.playClick();
      composer.style.display = 'block';
      input.focus();
    });

    cancelBtn.addEventListener('click', () => {
      sound.playClick();
      composer.style.display = 'none';
      input.value = '';
    });

    // Emoji chip selection
    this.container.querySelectorAll('.emoji-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.container.querySelectorAll('.emoji-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        sound.playPop(550);
      });
    });

    // Save note
    const submitNote = () => {
      const text = input.value.trim();
      if (!text) return;

      const activeChip = this.container.querySelector('.emoji-chip.active');
      const emoji = activeChip ? activeChip.dataset.emoji : '☕';
      const colors = ['note-blue', 'note-amber', 'note-purple', 'note-emerald', 'note-rose'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const newNote = {
        id: Date.now(),
        text,
        emoji,
        status: 'active',
        color
      };

      this.notes.unshift(newNote);
      this.saveNotes();
      this.renderNotesList();

      sound.playCoin();
      const rect = composer.getBoundingClientRect();
      triggerEmojiConfetti(rect.left + 50, rect.top, [emoji, '✨']);

      input.value = '';
      composer.style.display = 'none';
    };

    saveBtn.addEventListener('click', submitNote);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitNote();
    });

    // Grid delegation (toggle done or delete)
    const grid = this.container.querySelector('#notesGrid');
    grid.addEventListener('click', e => {
      const deleteBtn = e.target.closest('.note-delete-btn');
      if (deleteBtn) {
        const id = parseInt(deleteBtn.dataset.id, 10);
        this.deleteNote(id);
        return;
      }

      const noteCard = e.target.closest('.note-card');
      if (noteCard) {
        const id = parseInt(noteCard.dataset.id, 10);
        this.toggleNoteStatus(id);
      }
    });
  }

  deleteNote(id) {
    sound.playPop(300);
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveNotes();
    this.renderNotesList();
  }

  toggleNoteStatus(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    sound.playPop(650);
    note.status = note.status === 'done' ? 'active' : 'done';
    this.saveNotes();
    this.renderNotesList();
  }

  renderNotesList() {
    const grid = this.container.querySelector('#notesGrid');

    if (this.notes.length === 0) {
      grid.innerHTML = '<div class="notes-empty">Заметок пока нет. Создайте первую! ✍️</div>';
      return;
    }

    grid.innerHTML = this.notes.map(note => `
      <div class="note-card ${note.color} ${note.status === 'done' ? 'is-done' : ''}" data-id="${note.id}">
        <div class="note-top">
          <span class="note-emoji-stamp">${note.emoji}</span>
          <button class="note-delete-btn" data-id="${note.id}" title="Удалить">✕</button>
        </div>
        <div class="note-content">${this.escapeHtml(note.text)}</div>
        <div class="note-bottom">
          <span class="note-status-badge ${note.status}">
            ${note.status === 'done' ? '✅ Выполнено' : '⏳ В процессе'}
          </span>
        </div>
      </div>
    `).join('');
  }

  escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
