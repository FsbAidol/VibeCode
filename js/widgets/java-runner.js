/**
 * Java & JavaScript Interactive Code Hub
 * Real-time JavaScript sandbox & simulated Java JVM execution engine
 */

import { sound } from '../audio.js';
import { triggerCelebration, triggerEmojiConfetti } from '../utils/confetti.js';

export class JavaRunner {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentMode = 'java'; // 'java' | 'js'

    this.javaSnippets = {
      coffee: {
        title: '☕ CoffeeBrewService.java',
        code: `// Java 21 Enterprise Coffee Service
import java.time.LocalDateTime;

public class CoffeeBrewService {
    public static void main(String[] args) {
        System.out.println("♨️ [JVM] Starting Java Virtual Machine...");
        System.out.println("⚙️ [Spring] Initializing CoffeeBeanFactory (1,842 beans loaded)");
        
        String blend = "Arabica Dark Roast";
        int temperature = 94; // Celsius
        
        System.out.println("☕ [Brew] Heating water to " + temperature + "°C...");
        System.out.println("☕ [Brew] Grinding fresh " + blend + "...");
        System.out.println("✨ [Duke] Cup is ready! Pouring liquid energy...");
        
        long heapUsed = Runtime.getRuntime().totalMemory() / (1024 * 1024);
        System.out.println("📊 [Stats] Brew completed in 1.42s | Heap: " + heapUsed + "MB");
        System.out.println("🎉 [Success] System.out.println(\\"Enjoy JavaVerse 3D!\\");");
    }
}`
      },
      battle: {
        title: '⚔️ JavaVsJavaScript.java',
        code: `public class JavaVsJavaScript {
    public static void main(String[] args) {
        System.out.println("⚔️ [DEBATE] Java vs JavaScript: The Truth");
        System.out.println("----------------------------------------------");
        System.out.println("JavaScript: typeof NaN === 'number'  // Wait, what?!");
        System.out.println("JavaScript: [] + [] === ''           // Empty string!");
        System.out.println("JavaScript: [] + {} === '[object Object]'");
        System.out.println("JavaScript: ('b' + 'a' + + 'a' + 'a').toLowerCase() === 'banana'");
        System.out.println("----------------------------------------------");
        System.out.println("Java: NullPointerException on line 42");
        System.out.println("Java: AbstractSingletonProxyFactoryBeanEnterpriseEdition");
        System.out.println("Java: public static void main(String[] args) { ... }");
        System.out.println("----------------------------------------------");
        System.out.println("Verdict: We love them BOTH! Java brews coffee, JS moves the web! ☕⚡");
    }
}`
      },
      duke: {
        title: '🐧 DukeAsciiArt.java',
        code: `public class DukeMascot {
    public static void main(String[] args) {
        System.out.println("      /\\\\      ");
        System.out.println("     /  \\\\     Java Duke says hi!");
        System.out.println("    / (o) \\\\   ");
        System.out.println("   /   __  \\\\  [Steaming Hot]");
        System.out.println("  /___/__\\\\_\\\\ ");
        System.out.println("    |  ☕  |   Enjoy writing code with JavaVerse 3D!");
        System.out.println("    |______|   ");
    }
}`
      }
    };

    this.jsSnippets = {
      confetti: {
        title: '🎉 EmojiBurst.js',
        code: `// Trigger celebratory particle explosion
console.log("🚀 Launching SVG Emoji Cannon...");
if (window.triggerCelebration) {
  window.triggerCelebration();
}
console.log("✨ 84 particles spawned across viewport!");
console.log("🌈 Check out the physics playground tab next!");`
      },
      audioSynth: {
        title: '🎵 ProceduralSynth.js',
        code: `// Procedural Web Audio Arpeggio
console.log("🎹 Synthesizing C-Major 7th Chord in Web Audio...");
const notes = [261.63, 329.63, 392.00, 493.88, 523.25];
notes.forEach((freq, idx) => {
  setTimeout(() => {
    console.log(\`♪ Note \${idx + 1}: \${freq.toFixed(1)} Hz\`);
    if (window.soundEngine) {
      window.soundEngine.playPop(freq);
    }
  }, idx * 120);
});`
      },
      benchmark: {
        title: '⚡ SpeedBenchmark.js',
        code: `// Array transformation benchmark
const startTime = performance.now();
const size = 100_000;
console.log(\`⏱️ Allocating and mapping \${size.toLocaleString()} elements...\`);

const list = Array.from({ length: size }, (_, i) => i * 2);
const sum = list.reduce((acc, n) => acc + (n % 7 === 0 ? n : 0), 0);

const duration = (performance.now() - startTime).toFixed(2);
console.log(\`✅ Result sum: \${sum.toLocaleString()}\`);
console.log(\`⚡ Finished in \${duration} ms! V8 Engine is lightning fast.\`);`
      }
    };

    this.init();
  }

  init() {
    this.renderLayout();
    this.bindEvents();
    this.loadSnippet('coffee');
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="terminal-card">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="terminal-tabs">
            <button class="terminal-tab active" data-lang="java">
              <span>☕ Java (OpenJDK 21)</span>
            </button>
            <button class="terminal-tab" data-lang="js">
              <span>⚡ JavaScript (V8 Engine)</span>
            </button>
          </div>
          <div class="terminal-presets" id="snippetDropdown">
            <!-- Snippet presets dynamically placed -->
          </div>
        </div>

        <div class="terminal-editor-pane">
          <div class="line-numbers" id="lineNumbers"></div>
          <textarea class="code-textarea" id="codeEditor" spellcheck="false"></textarea>
        </div>

        <div class="terminal-action-bar">
          <div class="action-left">
            <button class="btn btn-primary" id="runCodeBtn">
              <span id="runBtnLabel">▶ Скомпилировать и Запустить</span>
            </button>
            <button class="btn btn-secondary" id="clearTerminalBtn">
              <span>🧹 Очистить вывод</span>
            </button>
          </div>
          <div class="action-right">
            <span class="terminal-status" id="terminalStatus">Готов к запуску</span>
          </div>
        </div>

        <div class="terminal-console-pane">
          <div class="console-title-bar">
            <span>Вывод Консоли (stdout / stderr)</span>
            <span class="live-indicator">● LIVE</span>
          </div>
          <div class="console-output" id="consoleOutput">
            <div class="console-line line-dim">// Нажмите "Запустить", чтобы выполнить код...</div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Tab switching
    this.container.querySelectorAll('.terminal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.container.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentMode = tab.dataset.lang;
        sound.playClick();
        this.updateSnippetOptions();
        this.loadSnippet(this.currentMode === 'java' ? 'coffee' : 'confetti');
      });
    });

    // Run button
    const runBtn = this.container.querySelector('#runCodeBtn');
    runBtn.addEventListener('click', () => {
      this.executeCode();
    });

    // Clear button
    this.container.querySelector('#clearTerminalBtn').addEventListener('click', () => {
      sound.playClick();
      const consoleOut = this.container.querySelector('#consoleOutput');
      consoleOut.innerHTML = '<div class="console-line line-dim">// Консоль очищена.</div>';
    });

    // Line numbers update
    const editor = this.container.querySelector('#codeEditor');
    editor.addEventListener('input', () => {
      this.updateLineNumbers();
    });
    editor.addEventListener('scroll', () => {
      const lineNumbers = this.container.querySelector('#lineNumbers');
      lineNumbers.scrollTop = editor.scrollTop;
    });

    this.updateSnippetOptions();
  }

  updateSnippetOptions() {
    const dropdown = this.container.querySelector('#snippetDropdown');
    const isJava = this.currentMode === 'java';
    const snippets = isJava ? this.javaSnippets : this.jsSnippets;

    dropdown.innerHTML = `
      <select class="custom-select" id="snippetSelect">
        ${Object.entries(snippets).map(([key, item]) => `
          <option value="${key}">${item.title}</option>
        `).join('')}
      </select>
    `;

    dropdown.querySelector('#snippetSelect').addEventListener('change', (e) => {
      sound.playClick();
      this.loadSnippet(e.target.value);
    });

    const runBtnLabel = this.container.querySelector('#runBtnLabel');
    runBtnLabel.textContent = isJava ? '▶ javac & java Main' : '▶ Выполнить JS';
  }

  loadSnippet(key) {
    const snippets = this.currentMode === 'java' ? this.javaSnippets : this.jsSnippets;
    const snippet = snippets[key] || Object.values(snippets)[0];
    const editor = this.container.querySelector('#codeEditor');
    editor.value = snippet.code;
    this.updateLineNumbers();
  }

  updateLineNumbers() {
    const editor = this.container.querySelector('#codeEditor');
    const lineNumbers = this.container.querySelector('#lineNumbers');
    const count = (editor.value.match(/\n/g) || []).length + 1;
    let nums = '';
    for (let i = 1; i <= count; i++) {
      nums += `<span>${i}</span>`;
    }
    lineNumbers.innerHTML = nums;
  }

  appendConsoleLine(text, type = 'info') {
    const consoleOut = this.container.querySelector('#consoleOutput');
    const line = document.createElement('div');
    line.className = `console-line line-${type}`;
    line.textContent = text;
    consoleOut.appendChild(line);
    consoleOut.scrollTop = consoleOut.scrollHeight;
  }

  executeCode() {
    const editor = this.container.querySelector('#codeEditor');
    const code = editor.value;
    const status = this.container.querySelector('#terminalStatus');
    const runBtn = this.container.querySelector('#runCodeBtn');

    if (this.currentMode === 'java') {
      // Simulate Java Compilation and execution
      sound.playPop(500);
      status.textContent = 'Компиляция javac...';
      runBtn.disabled = true;

      this.appendConsoleLine('=========================================', 'dim');
      this.appendConsoleLine('$ javac Main.java && java Main', 'dim');

      setTimeout(() => {
        status.textContent = 'Выполнение JVM bytecode...';
        sound.playPop(700);

        setTimeout(() => {
          this.runSimulatedJava(code);
          status.textContent = 'Завершено успешно (Exit 0)';
          runBtn.disabled = false;
          sound.playCoin();
        }, 400);
      }, 500);

    } else {
      // Real JavaScript execution
      sound.playPop(650);
      status.textContent = 'Выполнение JS...';
      this.appendConsoleLine('=========================================', 'dim');
      this.appendConsoleLine('$ node script.js', 'dim');

      const originalConsoleLog = console.log;
      const logs = [];

      console.log = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };

      try {
        const startTime = performance.now();
        // Safe evaluation
        const fn = new Function(code);
        fn();
        const duration = (performance.now() - startTime).toFixed(2);

        logs.forEach(l => {
          this.appendConsoleLine(l, 'info');
        });

        this.appendConsoleLine(`Process exited with code 0 in ${duration}ms`, 'success');
        status.textContent = `Выполнено (${duration}ms)`;
        sound.playCoin();
      } catch (err) {
        sound.playJavaBuzzer();
        this.appendConsoleLine(`Error: ${err.message}`, 'error');
        status.textContent = 'Ошибка выполнения';
      } finally {
        console.log = originalConsoleLog;
      }
    }
  }

  runSimulatedJava(code) {
    // Extract System.out.println contents or simulate
    const printMatches = [...code.matchAll(/System\.out\.println\s*\(\s*(.*?)\s*\)\s*;/g)];

    if (printMatches.length > 0) {
      printMatches.forEach(m => {
        let content = m[1];
        // Clean basic quotes and concat
        content = content.replace(/^"/, '').replace(/"$/, '').replace(/\\" /g, '"');
        if (content.includes('+')) {
          content = content.replace(/"\s*\+\s*"/g, '').replace(/"\s*\+\s*/g, '').replace(/\s*\+\s*"/g, '');
        }
        this.appendConsoleLine(content, 'info');
      });
    } else {
      this.appendConsoleLine('[JVM] Main class executed without standard output.', 'dim');
    }

    this.appendConsoleLine('Build SUCCESSFUL (Total time: 1.2s)', 'success');
  }
}
