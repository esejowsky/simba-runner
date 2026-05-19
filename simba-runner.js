/**
 * SIMBA RUNNER v2.0 — vanilla JS, drop-in WordPress.
 * Usage: <div id="simba-runner"></div>
 * Power-ups, parallax background, particles, clean leaderboard.
 */
(function() {
    'use strict';
    var ROOT_ID = 'simba-runner';
    var LB_KEY = 'simba_leaderboard_v2';
    var NICK_KEY = 'simba_nick';

    var SIMBA_CSS = ".sr-wrap { border: 1px solid #7c4dff; border-left: 3px solid #7c4dff; background: #0e0e1c; padding: 18px; margin: 14px 0; width: 100%; max-width: 100%; overflow: hidden; box-sizing: border-box; font-family: \"JetBrains Mono\", \"Fira Code\", monospace; color: #ececec; position: relative; }\n.sr-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; padding-bottom: 8px; color: #9090b0; flex-wrap: wrap; gap: 6px; }\n.sr-title { color: #7c4dff; font-weight: 600; letter-spacing: 1px; font-size: 16px; }\n.sr-dim { color: #6a6a82; font-weight: 400; font-size: 11px; letter-spacing: 0; }\n.sr-score-line { font-size: 14px; color: #00e5ff; }\n.sr-wrap canvas { display: block; width: 100%; max-width: 100%; height: auto; background: #08080f; border: 1px solid #25253a; image-rendering: pixelated; cursor: pointer; box-sizing: border-box; }\n.sr-help { font-size: 12px; color: #888; padding-top: 8px; line-height: 1.6; }\n.sr-key { background: #25253a; color: #ececec; padding: 1px 5px; }\n.sr-pu-legend { display: flex; flex-wrap: wrap; gap: 10px 14px; padding-top: 8px; font-size: 11px; color: #888; }\n.sr-pu-legend span b { color: #c9b0ff; font-weight: 600; }\n.sr-modal-wrap { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; }\n.sr-modal-wrap[hidden] { display: none !important; }\n.sr-modal { background: #08080f; border: 1px solid #7c4dff; border-left: 4px solid #7c4dff; padding: 28px 32px; width: 420px; max-width: 90%; font-family: \"JetBrains Mono\", monospace; text-align: center; color: #ececec; }\n.sr-modal h2 { color: #7c4dff; margin: 0 0 4px; font-size: 18px; font-weight: 600; }\n.sr-modal-sub { color: #888; font-size: 12px; margin-bottom: 18px; font-style: italic; }\n.sr-modal-score { color: #00e5ff; font-size: 36px; font-weight: 700; margin: 12px 0; font-variant-numeric: tabular-nums; }\n.sr-modal-meta { color: #888; font-size: 12px; margin-bottom: 14px; }\n.sr-modal input { width: 100%; background: transparent; border: 1px solid #25253a; border-left: 2px solid #00b0d4; color: #ececec; font-family: \"JetBrains Mono\", monospace; font-size: 14px; padding: 10px; outline: none; text-align: center; letter-spacing: 1px; box-sizing: border-box; }\n.sr-modal input:focus { border-color: #00e5ff; border-left-color: #00e5ff; }\n.sr-modal-btns { display: flex; gap: 8px; justify-content: center; margin-top: 14px; flex-wrap: wrap; }\n.sr-btn { background: transparent; border: 1px solid #25253a; color: #c9b0ff; font-family: \"JetBrains Mono\", monospace; font-size: 12.5px; padding: 8px 14px; cursor: pointer; }\n.sr-btn:hover { color: #00e5ff; border-color: #00b0d4; }\n.sr-btn.primary { background: #001a22; border-color: #00b0d4; color: #00e5ff; }\n.sr-btn.primary:hover { background: #00e5ff; color: #08080f; }\n.sr-btn.ghost { color: #888; }\n.sr-modal-hint { color: #888; font-size: 10.5px; margin-top: 10px; font-style: italic; }\n.sr-lb { margin-top: 14px; border: 1px solid #25253a; border-left: 2px solid #00b0d4; padding: 16px 20px; background: rgba(0,0,0,0.25); font-family: \"JetBrains Mono\", monospace; color: #ececec; }\n.sr-lb-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }\n.sr-lb-head h3 { font-size: 13px; color: #00e5ff; margin: 0; font-weight: 600; letter-spacing: 1px; }\n.sr-lb-head h3::before { content: \"$ cat \"; color: #9090b0; font-weight: 400; }\n.sr-lb-count { color: #888; font-size: 11px; }\n.sr-lb-row { display: grid; grid-template-columns: 48px minmax(120px, 1fr) 80px 80px 90px; gap: 4px 12px; align-items: center; font-size: 12.5px; padding: 6px 0; border-bottom: 1px dotted rgba(255,255,255,0.04); }\n.sr-lb-hdr { color: #9090b0; font-size: 10.5px; border-bottom: 1px dashed #25253a; padding: 4px 0 8px; letter-spacing: 0.5px; }\n.sr-lb-pos { color: #888; font-size: 13px; }\n.sr-lb-row.gold .sr-lb-pos { color: #ffb020; font-size: 16px; }\n.sr-lb-row.silver .sr-lb-pos { color: #ccc; font-size: 15px; }\n.sr-lb-row.bronze .sr-lb-pos { color: #cd7f32; font-size: 14px; }\n.sr-lb-name { color: #00e5ff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.sr-lb-score { color: #ffb020; font-weight: 600; text-align: right; font-variant-numeric: tabular-nums; }\n.sr-lb-dist { color: #888; text-align: right; font-variant-numeric: tabular-nums; }\n.sr-lb-date { color: #6a6a82; font-size: 11px; }\n.sr-lb-empty { color: #6a6a82; font-size: 12px; font-style: italic; padding: 14px 0; text-align: center; }\n@media (max-width: 600px) { .sr-lb-row { grid-template-columns: 36px 1fr 60px 60px; } .sr-lb-row .sr-lb-date { display: none; } }";

    var POWER_UPS = {
        shield:   { color: '#00e5ff', glow: 'rgba(0,229,255,0.55)',  duration: 0,    label: 'TARCZA',   icon: 'shield' },
        magnet:   { color: '#ff6699', glow: 'rgba(255,102,153,0.55)',duration: 480,  label: 'MAGNES',   icon: 'magnet' },
        x2:       { color: '#ffd700', glow: 'rgba(255,215,0,0.55)',  duration: 480,  label: 'x2',       icon: 'x2'     },
        slowmo:   { color: '#a78bfa', glow: 'rgba(167,139,250,0.55)',duration: 360,  label: 'SLOW-MO',  icon: 'slow'   },
        boost:    { color: '#ff7043', glow: 'rgba(255,112,67,0.55)', duration: 240,  label: 'BOOST',    icon: 'boost'  }
    };
    var PU_KEYS = ['shield', 'magnet', 'x2', 'slowmo', 'boost'];

    function loadLB() {
        try { return JSON.parse(localStorage.getItem(LB_KEY) || '[]'); } catch (e) { return []; }
    }
    function saveLBEntry(entry) {
        var all = loadLB();
        all.push(entry);
        all.sort(function(a, b){ return b.score - a.score; });
        var t = all.slice(0, 50);
        try { localStorage.setItem(LB_KEY, JSON.stringify(t)); } catch (e) {}
        return t;
    }
    function seedLB() {
        // v2 starts clean — no mock entries
        return;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function(c){
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
        });
    }

    function init() {
        var root = document.getElementById(ROOT_ID);
        if (!root) return;
        seedLB();

        if (!document.getElementById('simba-runner-styles')) {
            var css = document.createElement('style');
            css.id = 'simba-runner-styles';
            css.textContent = SIMBA_CSS;
            document.head.appendChild(css);
        }

        root.innerHTML =
            '<div class="sr-wrap">' +
                '<div class="sr-head">' +
                    '<span class="sr-title">SIMBA RUNNER <span class="sr-dim">// v2.0 — power-up edition</span></span>' +
                    '<span class="sr-score-line">smaczki: <span data-score>0</span> &middot; best: <span data-best>0</span></span>' +
                '</div>' +
                '<canvas tabindex="0"></canvas>' +
                '<div class="sr-help">' +
                    '<span class="sr-key">SPACJA</span>/<span class="sr-key">&uarr;</span>/<span class="sr-key">W</span> = skok (&times;2) &middot; ' +
                    '<span class="sr-key">ESC</span> = wyj&#347;cie &nbsp;&middot;&nbsp; ' +
                    'przeskakuj laptopy/aparaty, omijaj drony/ptaki, &#322;ap smaczki + power-upy.' +
                '</div>' +
                '<div class="sr-pu-legend">' +
                    '<span><b>&#9670; TARCZA</b> = jedno trafienie do zignorowania</span>' +
                    '<span><b>&#9670; MAGNES</b> = przyci&#261;ga smaczki</span>' +
                    '<span><b>&#9670; x2</b> = podw&#243;jne punkty</span>' +
                    '<span><b>&#9670; SLOW-MO</b> = wolniejsze przeszkody</span>' +
                    '<span><b>&#9670; BOOST</b> = przy&#347;pieszenie + nietykalno&#347;&#263;</span>' +
                '</div>' +
                '<div class="sr-modal-wrap" hidden data-save-modal>' +
                    '<div class="sr-modal">' +
                        '<h2>NOWY REKORD</h2>' +
                        '<div class="sr-modal-sub">// Simba spad&#322;, ale ty nie. zapisz wynik albo skip.</div>' +
                        '<div class="sr-modal-score" data-final-score>0</div>' +
                        '<div class="sr-modal-meta" data-final-meta></div>' +
                        '<input type="text" placeholder="tw&#243;j nick" maxlength="20" data-nick-input>' +
                        '<div class="sr-modal-btns">' +
                            '<button class="sr-btn primary" data-save-btn>$ save &amp; play [SPACJA/ENTER]</button>' +
                            '<button class="sr-btn ghost" data-skip-btn>&#10007; skip [ESC]</button>' +
                        '</div>' +
                        '<div class="sr-modal-hint">// SPACJA lub ENTER zapisuje i wraca do gry &middot; ESC pomija</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="sr-lb">' +
                '<div class="sr-lb-head"><h3>leaderboard.dat</h3><span class="sr-lb-count" data-lb-count></span></div>' +
                '<div class="sr-lb-table">' +
                    '<div class="sr-lb-row sr-lb-hdr"><span>#</span><span>nick</span><span>smaczki</span><span>dystans</span><span>data</span></div>' +
                    '<div data-lb-rows></div>' +
                '</div>' +
            '</div>';

        var canvas = root.querySelector('canvas');
        var scoreEl = root.querySelector('[data-score]');
        var bestEl = root.querySelector('[data-best]');
        var lbRowsEl = root.querySelector('[data-lb-rows]');
        var lbCountEl = root.querySelector('[data-lb-count]');
        var modalEl = root.querySelector('[data-save-modal]');
        var finalScoreEl = root.querySelector('[data-final-score]');
        var finalMetaEl = root.querySelector('[data-final-meta]');
        var nickInput = root.querySelector('[data-nick-input]');
        var saveBtn = root.querySelector('[data-save-btn]');
        var skipBtn = root.querySelector('[data-skip-btn]');

        var bestEntry = loadLB()[0] || { score: 0, name: '—' };

        function renderLB() {
            var entries = loadLB();
            bestEntry = entries[0] || { score: 0, name: '—' };
            bestEl.textContent = bestEntry.score;
            var top = entries.slice(0, 10);
            lbCountEl.textContent = '// top ' + Math.min(10, entries.length) + ' / ' + entries.length + ' ogółem';
            if (!top.length) {
                lbRowsEl.innerHTML = '<div class="sr-lb-empty">// no entries yet. zostań pierwszym kotem na liście.</div>';
                return;
            }
            lbRowsEl.innerHTML = top.map(function(e, i) {
                var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1);
                var cls = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
                return '<div class="sr-lb-row ' + cls + '">' +
                    '<span class="sr-lb-pos">' + medal + '</span>' +
                    '<span class="sr-lb-name">' + escapeHtml(e.name) + '</span>' +
                    '<span class="sr-lb-score">' + e.score + '</span>' +
                    '<span class="sr-lb-dist">' + e.dist + 'm</span>' +
                    '<span class="sr-lb-date">' + escapeHtml(e.date) + '</span>' +
                    '</div>';
            }).join('');
        }
        renderLB();

        var state = {
            phase: 'ready',
            catY: 0, catVel: 0, onGround: true, jumpsLeft: 1,
            obstacles: [], treats: [], powerups: [], particles: [], popups: [], clouds: [], stars: [],
            speed: 0, dist: 0, score: 0,
            spawnTimer: 0, treatTimer: 0, puTimer: 0,
            frame: 0,
            saveOpen: false,
            finalScore: 0, finalDist: 0,
            active: { shield: 0, magnet: 0, x2: 0, slowmo: 0, boost: 0 },
            shake: 0
        };
        var W, H, scale, GROUND_Y, CAT_X, CAT_W, CAT_H, GRAVITY, JUMP, PIXEL;
        var ctx = canvas.getContext('2d');

        function resize() {
            var dpr = window.devicePixelRatio || 1;
            var rect = canvas.getBoundingClientRect();
            var w = Math.max(280, Math.floor(rect.width || root.clientWidth - 40));
            var h = Math.max(220, Math.min(480, Math.floor(w * 0.34)));
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = false;
            W = w; H = h;
            scale = H / 360;
            GROUND_Y = H - Math.floor(60 * scale);
            CAT_X = Math.floor(100 * scale);
            CAT_W = Math.floor(80 * scale);
            CAT_H = Math.floor(56 * scale);
            GRAVITY = 1.0 * scale;
            JUMP = -16 * scale;
            PIXEL = Math.max(3, Math.floor(5 * scale));
            initBackground();
        }

        function initBackground() {
            state.stars = [];
            for (var i = 0; i < 80; i++) {
                state.stars.push({
                    x: Math.random() * W,
                    y: Math.random() * GROUND_Y * 0.7,
                    s: Math.random() * 1.6 + 0.4,
                    twink: Math.random() * Math.PI * 2,
                    speed: 0.05 + Math.random() * 0.15
                });
            }
            state.clouds = [];
            for (var c = 0; c < 5; c++) {
                state.clouds.push({
                    x: Math.random() * W,
                    y: 30 * scale + Math.random() * 70 * scale,
                    w: (60 + Math.random() * 100) * scale,
                    h: (16 + Math.random() * 12) * scale,
                    speed: 0.2 + Math.random() * 0.3
                });
            }
        }

        function drawCat(g, x, y, frame) {
            var p = PIXEL;
            function pix(cx, cy, w, h, color) {
                g.fillStyle = color;
                g.fillRect(Math.floor(x + cx * p), Math.floor(y + cy * p), w * p, h * p);
            }
            var orange = '#cf6d1a', orangeLight = '#e89a4f', orangeDark = '#8a4408', orangeStripe = '#7a3a06';
            var cream = '#f5d4a0', creamLight = '#fae8c5';
            var black = '#1a1208', eyeGreen = '#7fd420', nosePink = '#cc5577';
            var run = frame % 14 < 7;
            var blink = (frame % 180 >= 174);
            var tailWag = Math.sin(frame * 0.15) * 1;

            // tail
            pix(-3, 4 + Math.floor(tailWag), 1, 2, orange);
            pix(-4, 3 + Math.floor(tailWag), 1, 2, orangeLight);
            pix(-5, 2 + Math.floor(tailWag), 1, 2, orange);
            pix(-5, 1, 1, 1, orangeDark);
            // body
            pix(-1, 3, 11, 1, orangeLight);
            pix(0, 4, 11, 1, orange);
            pix(0, 5, 11, 2, orange);
            pix(1, 4, 1, 2, orangeStripe);
            pix(4, 4, 1, 2, orangeStripe);
            pix(7, 4, 1, 2, orangeStripe);
            pix(2, 6, 7, 1, cream);
            pix(3, 7, 5, 1, creamLight);
            // head
            pix(8, 0, 5, 1, orangeLight);
            pix(7, 1, 7, 2, orange);
            pix(8, 3, 5, 1, orange);
            pix(9, 1, 1, 2, orangeStripe);
            pix(11, 1, 1, 2, orangeStripe);
            // ears
            pix(7, -1, 1, 2, orangeDark);
            pix(13, -1, 1, 2, orangeDark);
            pix(7, -2, 1, 1, creamLight);
            pix(13, -2, 1, 1, creamLight);
            // eyes
            if (blink) { pix(9, 2, 1, 1, black); pix(11, 2, 1, 1, black); }
            else { pix(9, 2, 1, 1, eyeGreen); pix(11, 2, 1, 1, eyeGreen); }
            // nose + mouth
            pix(10, 3, 1, 1, nosePink);
            pix(10, 4, 1, 1, orange);
            pix(9, 4, 1, 1, cream);
            pix(11, 4, 1, 1, cream);
            // cheek mark
            pix(6, 3, 2, 2, creamLight);

            // legs (animated)
            if (state.phase === 'playing') {
                if (run) {
                    pix(2, 7, 1, 2, orange); pix(2, 9, 2, 1, orangeDark);
                    pix(7, 7, 1, 1, orange); pix(6, 8, 2, 1, orange); pix(6, 9, 2, 1, orangeDark);
                } else {
                    pix(3, 7, 1, 2, orange); pix(3, 9, 2, 1, orangeDark);
                    pix(8, 7, 1, 1, orange); pix(7, 8, 2, 1, orange); pix(7, 9, 2, 1, orangeDark);
                }
            } else {
                pix(2, 7, 1, 2, orange); pix(2, 9, 2, 1, orangeDark);
                pix(4, 7, 1, 2, orange); pix(4, 9, 2, 1, orangeDark);
                pix(7, 7, 1, 2, orange); pix(7, 9, 2, 1, orangeDark);
            }
        }

        function drawObstacle(g, o) {
            var x = o.x, y = GROUND_Y - o.h + (o.yOffset || 0), w = o.w, h = o.h;
            // soft shadow under ground obstacles
            if (!o.yOffset) {
                g.fillStyle = 'rgba(0,0,0,0.35)';
                g.beginPath();
                g.ellipse(x + w/2, GROUND_Y + 2, w * 0.55, 4 * scale, 0, 0, Math.PI * 2);
                g.fill();
            }
            if (o.type === 'laptop') {
                g.fillStyle = '#1a1a2a'; g.fillRect(x, y + h * 0.55, w, h * 0.45);
                g.fillStyle = '#3a3a4a'; g.fillRect(x + 2, y + h * 0.55 + 2, w - 4, 3);
                g.fillStyle = '#2a2a3a'; g.fillRect(x + 2, y, w - 4, h * 0.55);
                var grad = g.createLinearGradient(x, y, x, y + h * 0.55);
                grad.addColorStop(0, '#0a3a5a'); grad.addColorStop(0.5, '#0066aa'); grad.addColorStop(1, '#003366');
                g.fillStyle = grad; g.fillRect(x + 4, y + 2, w - 8, h * 0.55 - 4);
                g.fillStyle = '#00e5ff'; g.fillRect(x + w / 2 - 2, y + h * 0.25, 4, 4);
                g.fillStyle = '#0a0a14';
                g.fillRect(x + 4, y + h * 0.62, w - 8, 2);
                g.fillRect(x + 4, y + h * 0.7, w - 8, 2);
                g.fillRect(x + 4, y + h * 0.78, w - 8, 2);
                g.fillRect(x + w / 2 - 8, y + h * 0.88, 16, 4);
                g.fillStyle = '#ffcc00';
                g.font = Math.floor(7 * scale) + 'px monospace';
                g.fillText('UNRAID', x + 4, y + 12);
            } else if (o.type === 'camera') {
                g.fillStyle = '#2a2a2a'; g.fillRect(x, y + 4, w, h - 4);
                g.fillStyle = '#1a1a1a'; g.fillRect(x + w * 0.35, y, w * 0.3, 8);
                g.fillStyle = '#0a0a0a';
                g.beginPath(); g.arc(x + w * 0.55, y + h * 0.55, h * 0.32, 0, Math.PI * 2); g.fill();
                g.fillStyle = '#1a3a5a';
                g.beginPath(); g.arc(x + w * 0.55, y + h * 0.55, h * 0.24, 0, Math.PI * 2); g.fill();
                g.fillStyle = '#00e5ff';
                g.beginPath(); g.arc(x + w * 0.5, y + h * 0.5, h * 0.08, 0, Math.PI * 2); g.fill();
                g.fillStyle = '#444'; g.fillRect(x + w * 0.05, y + 8, w * 0.18, h * 0.32);
                g.fillStyle = '#ff1744'; g.fillRect(x + 4, y + 6, 3, 3);
                g.fillStyle = '#fff'; g.font = Math.floor(7 * scale) + 'px monospace';
                g.fillText('SONY', x + 4, y + h - 4);
            } else if (o.type === 'cucumber') {
                var cgrad = g.createLinearGradient(x, y, x, y + h);
                cgrad.addColorStop(0, '#5fa84a'); cgrad.addColorStop(0.5, '#3a7a2a'); cgrad.addColorStop(1, '#2a5a1a');
                g.fillStyle = cgrad; g.fillRect(x, y + h * 0.15, w, h * 0.85);
                g.fillStyle = '#3a5a1a'; g.fillRect(x + w / 2 - 2, y, 4, h * 0.15);
                // highlights
                g.fillStyle = 'rgba(255,255,255,0.15)';
                g.fillRect(x + 2, y + h * 0.2, 2, h * 0.65);
            } else if (o.type === 'box') {
                g.fillStyle = '#a07040'; g.fillRect(x, y, w, h);
                g.fillStyle = '#7a4a20'; g.fillRect(x, y, w, 3);
                g.fillStyle = '#dca080'; g.fillRect(x, y + h / 2 - 3, w, 5);
                g.fillStyle = '#3a1a08'; g.font = Math.floor(8 * scale) + 'px monospace';
                g.fillText('KOTY', x + 2, y + h / 2 + 2);
            } else if (o.type === 'vacuum') {
                g.fillStyle = '#2a2a2a'; g.fillRect(x, y + h - 14 * scale, w, 14 * scale);
                g.fillStyle = '#4a4a4a'; g.fillRect(x + 4, y + h - 18 * scale, w - 8, 6 * scale);
                g.fillStyle = '#ff3030'; g.fillRect(x + w - 8, y + h - 15 * scale, 4, 4);
                // sensor dot
                g.fillStyle = '#00e5ff'; g.fillRect(x + 6, y + h - 15 * scale, 3, 3);
            } else if (o.type === 'drone') {
                var tt = state.frame * 0.5;
                // rotor blur
                g.fillStyle = 'rgba(255,255,255,0.08)';
                g.beginPath(); g.arc(x + 2, y + 0, 8 * scale, 0, Math.PI * 2); g.fill();
                g.beginPath(); g.arc(x + w - 2, y + 0, 8 * scale, 0, Math.PI * 2); g.fill();
                g.beginPath(); g.arc(x + 2, y + h, 8 * scale, 0, Math.PI * 2); g.fill();
                g.beginPath(); g.arc(x + w - 2, y + h, 8 * scale, 0, Math.PI * 2); g.fill();
                g.fillStyle = '#222'; g.fillRect(x + 6, y + 4, w - 12, h - 8);
                g.fillStyle = '#444'; g.fillRect(x + 8, y + 6, w - 16, 3);
                g.fillStyle = 'rgba(124,77,255,0.4)';
                g.fillRect(x - 4, y - 2, 12, 2);
                g.fillRect(x + w - 8, y - 2, 12, 2);
                g.fillRect(x - 4, y + h - 2, 12, 2);
                g.fillRect(x + w - 8, y + h - 2, 12, 2);
                g.fillStyle = Math.sin(tt) > 0 ? '#ff1744' : '#660020';
                g.fillRect(x + w / 2 - 2, y + h - 5, 3, 3);
                g.fillStyle = '#00e5ff'; g.fillRect(x + w / 2 + 4, y + h / 2, 3, 3);
                g.fillStyle = '#fff'; g.font = Math.floor(6 * scale) + 'px monospace';
                g.fillText('DJI', x + w / 2 - 7, y - 6);
            } else if (o.type === 'bird') {
                var flap = Math.sin(state.frame * 0.3) > 0;
                g.fillStyle = '#1a1a2a';
                g.fillRect(x + 8, y + 6, w - 16, h - 8);
                g.fillRect(x + w - 10, y + 4, 6, 8);
                g.fillStyle = '#ffaa00'; g.fillRect(x + w - 4, y + 7, 4, 2);
                g.fillStyle = '#ff1744'; g.fillRect(x + w - 7, y + 6, 2, 2);
                g.fillStyle = '#0a0a14';
                if (flap) { g.fillRect(x + 2, y - 4, 14, 4); g.fillRect(x + 2, y - 6, 8, 4); }
                else { g.fillRect(x + 2, y + h, 14, 4); g.fillRect(x + 2, y + h + 2, 8, 4); }
            }
        }

        function drawTreat(g, t) {
            var s = 14 * scale;
            // pulsing glow
            var pulse = 0.3 + 0.2 * Math.sin(state.frame * 0.15 + t.x * 0.01);
            g.fillStyle = 'rgba(255,204,0,' + pulse + ')';
            g.fillRect(t.x - 4, t.y - 4, s + 8, s + 8);
            g.fillStyle = '#ffcc00'; g.fillRect(t.x, t.y, s, s);
            g.fillStyle = '#ffeb88'; g.fillRect(t.x + 2, t.y + 2, s - 6, s - 6);
            g.strokeStyle = '#aa8800'; g.strokeRect(t.x, t.y, s, s);
        }

        function drawPowerUp(g, p) {
            var s = 22 * scale;
            var cx = p.x + s / 2, cy = p.y + s / 2;
            var spec = POWER_UPS[p.kind];
            // outer pulsing glow (multi-ring)
            var pulse = 0.5 + 0.3 * Math.sin(state.frame * 0.12 + p.x * 0.01);
            g.fillStyle = spec.glow.replace('0.55', String(0.18 * pulse));
            g.beginPath(); g.arc(cx, cy, s * 1.4, 0, Math.PI * 2); g.fill();
            g.fillStyle = spec.glow.replace('0.55', String(0.35 * pulse));
            g.beginPath(); g.arc(cx, cy, s * 0.95, 0, Math.PI * 2); g.fill();
            // diamond body
            g.save();
            g.translate(cx, cy);
            g.rotate(Math.PI / 4);
            g.fillStyle = spec.color;
            g.fillRect(-s/2, -s/2, s, s);
            g.fillStyle = 'rgba(255,255,255,0.35)';
            g.fillRect(-s/2 + 2, -s/2 + 2, s/3, s/3);
            g.strokeStyle = '#fff';
            g.lineWidth = 1.5;
            g.strokeRect(-s/2, -s/2, s, s);
            g.restore();
            // icon
            drawPUIcon(g, spec.icon, cx, cy, s * 0.55, '#0e0e1c');
        }

        function drawPUIcon(g, kind, cx, cy, sz, c) {
            g.save();
            g.translate(cx, cy);
            g.fillStyle = c;
            g.strokeStyle = c;
            g.lineWidth = Math.max(1.4, sz * 0.18);
            g.lineCap = 'round';
            g.lineJoin = 'round';
            if (kind === 'shield') {
                g.beginPath();
                g.moveTo(0, -sz * 0.5);
                g.lineTo(sz * 0.45, -sz * 0.25);
                g.lineTo(sz * 0.45, sz * 0.15);
                g.lineTo(0, sz * 0.5);
                g.lineTo(-sz * 0.45, sz * 0.15);
                g.lineTo(-sz * 0.45, -sz * 0.25);
                g.closePath();
                g.fill();
            } else if (kind === 'magnet') {
                g.lineWidth = Math.max(2, sz * 0.32);
                g.beginPath();
                g.arc(0, sz * 0.05, sz * 0.42, Math.PI * 1.1, Math.PI * 1.9);
                g.stroke();
                g.fillStyle = '#ff1744';
                g.fillRect(-sz * 0.55, -sz * 0.05, sz * 0.22, sz * 0.18);
                g.fillStyle = '#1a4aff';
                g.fillRect(sz * 0.33, -sz * 0.05, sz * 0.22, sz * 0.18);
            } else if (kind === 'x2') {
                g.font = 'bold ' + Math.floor(sz * 1.0) + 'px monospace';
                g.textAlign = 'center';
                g.textBaseline = 'middle';
                g.fillText('x2', 0, 1);
            } else if (kind === 'slow') {
                // clock
                g.beginPath();
                g.arc(0, 0, sz * 0.45, 0, Math.PI * 2);
                g.stroke();
                g.beginPath();
                g.moveTo(0, 0); g.lineTo(0, -sz * 0.32);
                g.moveTo(0, 0); g.lineTo(sz * 0.22, sz * 0.08);
                g.stroke();
            } else if (kind === 'boost') {
                // lightning bolt
                g.beginPath();
                g.moveTo(-sz * 0.1, -sz * 0.5);
                g.lineTo(sz * 0.2, -sz * 0.05);
                g.lineTo(-sz * 0.05, -sz * 0.05);
                g.lineTo(sz * 0.15, sz * 0.5);
                g.lineTo(-sz * 0.2, sz * 0.05);
                g.lineTo(sz * 0.05, sz * 0.05);
                g.closePath();
                g.fill();
            }
            g.restore();
        }

        function spawnObstacle() {
            var groundTypes = ['laptop', 'camera', 'cucumber', 'box', 'vacuum'];
            var flyTypes = ['drone', 'bird'];
            var isFly = Math.random() < 0.30;
            var t = isFly ? flyTypes[Math.floor(Math.random() * flyTypes.length)] : groundTypes[Math.floor(Math.random() * groundTypes.length)];
            var w, h, yOffset = 0;
            if (t === 'laptop')   { w = 50 * scale; h = 38 * scale; }
            else if (t === 'camera') { w = 42 * scale; h = 32 * scale; }
            else if (t === 'cucumber') { w = 18 * scale; h = 44 * scale; }
            else if (t === 'box')   { w = 40 * scale; h = 42 * scale; }
            else if (t === 'vacuum'){ w = 52 * scale; h = 26 * scale; }
            else if (t === 'drone') { w = 36 * scale; h = 18 * scale; yOffset = -80 * scale - Math.random() * 30 * scale; }
            else { w = 32 * scale; h = 22 * scale; yOffset = -100 * scale - Math.random() * 40 * scale; }
            state.obstacles.push({ type: t, x: W + 30, w: w, h: h, yOffset: yOffset });
        }

        function spawnTreat() {
            var lane = Math.random();
            var y;
            if (lane < 0.45) y = GROUND_Y - 30 * scale - Math.random() * 15 * scale;
            else if (lane < 0.85) y = GROUND_Y - 90 * scale - Math.random() * 30 * scale;
            else y = GROUND_Y - 160 * scale - Math.random() * 30 * scale;
            state.treats.push({ x: W + 20, y: y });
        }

        function spawnPowerUp() {
            var kind = PU_KEYS[Math.floor(Math.random() * PU_KEYS.length)];
            var lane = Math.random();
            var y;
            if (lane < 0.5) y = GROUND_Y - 60 * scale - Math.random() * 20 * scale;
            else y = GROUND_Y - 130 * scale - Math.random() * 30 * scale;
            state.powerups.push({ kind: kind, x: W + 30, y: y });
        }

        function spawnParticles(x, y, color, n, opts) {
            opts = opts || {};
            for (var i = 0; i < n; i++) {
                state.particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * (opts.spread || 4),
                    vy: (opts.upward ? -(2 + Math.random() * 3) : (Math.random() - 0.5) * 4),
                    life: opts.life || (24 + Math.floor(Math.random() * 18)),
                    size: opts.size || (2 + Math.random() * 2),
                    color: color,
                    grav: opts.grav == null ? 0.18 : opts.grav
                });
            }
        }

        function spawnPopup(x, y, text, color) {
            state.popups.push({ x: x, y: y, text: text, color: color, life: 50 });
        }

        function activatePU(kind) {
            var spec = POWER_UPS[kind];
            if (kind === 'shield') {
                state.active.shield = 1; // count, not duration
            } else {
                state.active[kind] = spec.duration;
            }
        }

        function reset() {
            state.phase = 'ready';
            state.catY = 0; state.catVel = 0; state.onGround = true; state.jumpsLeft = 1;
            state.obstacles = []; state.treats = []; state.powerups = []; state.particles = []; state.popups = [];
            state.speed = 5.5 * scale;
            state.score = 0; state.dist = 0;
            state.spawnTimer = 80; state.treatTimer = 110; state.puTimer = 380 + Math.floor(Math.random() * 200);
            state.frame = 0;
            state.active = { shield: 0, magnet: 0, x2: 0, slowmo: 0, boost: 0 };
            state.shake = 0;
            scoreEl.textContent = '0';
        }
        function start() { reset(); state.phase = 'playing'; }
        function jump() {
            if (state.onGround) { state.catVel = JUMP; state.onGround = false; }
            else if (state.jumpsLeft > 0) { state.catVel = JUMP * 0.9; state.jumpsLeft--; }
        }
        function die() {
            state.phase = 'dead';
            state.shake = 14;
            spawnParticles(CAT_X + CAT_W/2, GROUND_Y - CAT_H/2 + state.catY, '#ff6680', 28, { spread: 7, life: 50 });
            spawnParticles(CAT_X + CAT_W/2, GROUND_Y - CAT_H/2 + state.catY, '#ffcc00', 14, { spread: 5, life: 40 });
            var finalScore = state.score + Math.floor(state.dist / 10);
            state.finalScore = finalScore;
            state.finalDist = Math.floor(state.dist);
            var lb = loadLB();
            var qual = lb.length < 50 || finalScore > ((lb[lb.length - 1] && lb[lb.length - 1].score) || 0);
            if (finalScore > 0 && qual) setTimeout(openSave, 800);
        }
        function openSave() {
            state.saveOpen = true;
            finalScoreEl.textContent = state.finalScore;
            finalMetaEl.textContent = 'dystans ' + state.finalDist + 'm · smaczki ' + (state.finalScore - Math.floor(state.finalDist / 10));
            nickInput.value = localStorage.getItem(NICK_KEY) || '';
            modalEl.hidden = false;
            setTimeout(function(){ nickInput.focus(); }, 50);
        }
        function closeSave() { state.saveOpen = false; modalEl.hidden = true; }
        function submitSave() {
            var name = (nickInput.value || '').trim();
            if (!name) { closeSave(); return; }
            try { localStorage.setItem(NICK_KEY, name); } catch (e) {}
            saveLBEntry({ name: name.slice(0, 20), score: state.finalScore, dist: state.finalDist, date: new Date().toISOString().slice(0, 10) });
            renderLB();
            closeSave();
            reset();
            state.phase = 'ready';
        }

        function drawSky(dayT, isNight) {
            var bg = ctx.createLinearGradient(0, 0, 0, H);
            if (isNight) {
                bg.addColorStop(0, '#0a0a25');
                bg.addColorStop(0.55, '#1a0a30');
                bg.addColorStop(1, '#000');
            } else {
                // dawn/dusk feel near transitions
                var dawn = Math.min(1, Math.abs(dayT - 0.5) * 4);
                if (dawn < 0.5) {
                    bg.addColorStop(0, '#5a2a55');
                    bg.addColorStop(0.5, '#a85540');
                    bg.addColorStop(1, '#3a1530');
                } else {
                    bg.addColorStop(0, '#2a1a55');
                    bg.addColorStop(0.5, '#4a2870');
                    bg.addColorStop(1, '#1a0a25');
                }
            }
            ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        }

        function drawStarsAndClouds(isNight) {
            if (isNight) {
                for (var i = 0; i < state.stars.length; i++) {
                    var st = state.stars[i];
                    st.twink += 0.04;
                    st.x -= st.speed;
                    if (st.x < -2) { st.x = W + Math.random() * 30; st.y = Math.random() * GROUND_Y * 0.7; }
                    var alpha = 0.4 + 0.45 * (0.5 + 0.5 * Math.sin(st.twink));
                    ctx.fillStyle = 'rgba(255,255,255,' + alpha.toFixed(2) + ')';
                    ctx.fillRect(st.x, st.y, st.s, st.s);
                }
            } else {
                for (var c = 0; c < state.clouds.length; c++) {
                    var cl = state.clouds[c];
                    cl.x -= cl.speed;
                    if (cl.x + cl.w < 0) { cl.x = W + Math.random() * 50; cl.y = 30 * scale + Math.random() * 70 * scale; }
                    drawCloud(ctx, cl.x, cl.y, cl.w, cl.h);
                }
            }
        }

        function drawCloud(g, x, y, w, h) {
            g.fillStyle = 'rgba(255,240,255,0.18)';
            g.beginPath();
            g.ellipse(x + w * 0.25, y + h * 0.6, w * 0.32, h * 0.55, 0, 0, Math.PI * 2);
            g.ellipse(x + w * 0.55, y + h * 0.4, w * 0.4, h * 0.7, 0, 0, Math.PI * 2);
            g.ellipse(x + w * 0.78, y + h * 0.65, w * 0.3, h * 0.5, 0, 0, Math.PI * 2);
            g.fill();
            g.fillStyle = 'rgba(255,255,255,0.07)';
            g.beginPath();
            g.ellipse(x + w * 0.55, y + h * 0.3, w * 0.35, h * 0.5, 0, 0, Math.PI * 2);
            g.fill();
        }

        function drawMountains(parallaxX) {
            // far layer
            ctx.fillStyle = '#1a0e30';
            ctx.beginPath();
            var step = 80 * scale;
            ctx.moveTo(0, GROUND_Y);
            for (var x = 0; x < W + step; x += step) {
                var off = (x + parallaxX * 0.3) % (step * 6);
                var peak = GROUND_Y - (40 + 30 * Math.sin(off * 0.04)) * scale;
                ctx.lineTo(x, peak);
            }
            ctx.lineTo(W, GROUND_Y);
            ctx.closePath();
            ctx.fill();
            // mid layer
            ctx.fillStyle = '#2a1855';
            ctx.beginPath();
            var step2 = 40 * scale;
            ctx.moveTo(0, GROUND_Y);
            for (var x2 = 0; x2 < W + step2; x2 += step2) {
                var off2 = (x2 + parallaxX * 0.6) % (step2 * 7);
                var peak2 = GROUND_Y - (20 + 18 * Math.sin(off2 * 0.07) + 8 * Math.cos(off2 * 0.15)) * scale;
                ctx.lineTo(x2, peak2);
            }
            ctx.lineTo(W, GROUND_Y);
            ctx.closePath();
            ctx.fill();
            // city silhouettes near ground
            ctx.fillStyle = '#0a0418';
            var bw = 16 * scale;
            for (var bx = -((parallaxX * 0.85) % (bw * 3)); bx < W; bx += bw + Math.random() * 0 + bw * 0.4) {
                var bh = (12 + ((bx * 13) % 18)) * scale;
                ctx.fillRect(bx, GROUND_Y - bh, bw, bh);
                // window light
                if (((bx | 0) + state.frame) % 60 < 30) {
                    ctx.fillStyle = '#ffcc66';
                    ctx.fillRect(bx + bw * 0.3, GROUND_Y - bh + 3, 2, 2);
                    ctx.fillStyle = '#0a0418';
                }
            }
        }

        function drawSunMoon(isNight) {
            var cx = W * 0.75, cy = 60 * scale + Math.sin(state.frame * 0.001) * 4;
            if (isNight) {
                // moon halo
                var halo = ctx.createRadialGradient(cx, cy, 8 * scale, cx, cy, 40 * scale);
                halo.addColorStop(0, 'rgba(255,255,255,0.35)');
                halo.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = halo;
                ctx.beginPath(); ctx.arc(cx, cy, 40 * scale, 0, Math.PI * 2); ctx.fill();
                // moon body
                ctx.fillStyle = '#f0f0f0';
                ctx.beginPath(); ctx.arc(cx, cy, 22 * scale, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#bababa';
                ctx.beginPath(); ctx.arc(cx - 6 * scale, cy - 3 * scale, 3 * scale, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx + 4 * scale, cy + 5 * scale, 2.4 * scale, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx + 8 * scale, cy - 6 * scale, 1.6 * scale, 0, Math.PI * 2); ctx.fill();
            } else {
                // sun halo
                var sh = ctx.createRadialGradient(cx, cy, 10 * scale, cx, cy, 50 * scale);
                sh.addColorStop(0, 'rgba(255,210,120,0.55)');
                sh.addColorStop(1, 'rgba(255,210,120,0)');
                ctx.fillStyle = sh;
                ctx.beginPath(); ctx.arc(cx, cy, 50 * scale, 0, Math.PI * 2); ctx.fill();
                // sun body
                ctx.fillStyle = '#ffd060';
                ctx.beginPath(); ctx.arc(cx, cy, 24 * scale, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#fff1a8';
                ctx.beginPath(); ctx.arc(cx - 3 * scale, cy - 4 * scale, 14 * scale, 0, Math.PI * 2); ctx.fill();
            }
        }

        function drawGround() {
            // ground band
            var g1 = ctx.createLinearGradient(0, GROUND_Y, 0, H);
            g1.addColorStop(0, '#1a0a30');
            g1.addColorStop(1, '#08040f');
            ctx.fillStyle = g1;
            ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
            // top line
            ctx.strokeStyle = '#7c4dff'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, GROUND_Y + 1); ctx.lineTo(W, GROUND_Y + 1); ctx.stroke();
            // dashes
            ctx.fillStyle = '#3a2a8a';
            for (var i = (state.dist * 2) % 30; i < W; i += 30) ctx.fillRect(i, GROUND_Y + 5, 6, 2);
            // grass tufts (foreground parallax)
            ctx.fillStyle = '#2a1855';
            var gs = 18 * scale;
            for (var gx = -((state.dist * 4) % gs); gx < W; gx += gs) {
                var gh = 3 + ((gx * 7) % 4);
                ctx.fillRect(gx, GROUND_Y + 10, 2, gh);
                ctx.fillRect(gx + 4, GROUND_Y + 12, 1, gh - 1);
            }
        }

        function drawCatTrail() {
            if (state.phase !== 'playing') return;
            if (!state.onGround) return;
            if (state.frame % 4 !== 0) return;
            spawnParticles(CAT_X - 2, GROUND_Y - 4, 'rgba(180,150,200,0.55)', 1, { spread: 1.5, life: 18, size: 2, upward: false, grav: 0 });
        }

        function updateParticles() {
            for (var i = state.particles.length - 1; i >= 0; i--) {
                var p = state.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.grav;
                p.life--;
                if (p.life <= 0) state.particles.splice(i, 1);
            }
        }

        function drawParticles() {
            for (var i = 0; i < state.particles.length; i++) {
                var p = state.particles[i];
                var alpha = Math.max(0, p.life / 30);
                if (p.color.charAt(0) === '#') {
                    ctx.globalAlpha = Math.min(1, alpha);
                    ctx.fillStyle = p.color;
                } else {
                    ctx.fillStyle = p.color;
                }
                ctx.fillRect(p.x, p.y, p.size, p.size);
                ctx.globalAlpha = 1;
            }
        }

        function updatePopups() {
            for (var i = state.popups.length - 1; i >= 0; i--) {
                var pp = state.popups[i];
                pp.y -= 0.7;
                pp.life--;
                if (pp.life <= 0) state.popups.splice(i, 1);
            }
        }

        function drawPopups() {
            ctx.font = 'bold ' + Math.floor(14 * scale) + 'px monospace';
            for (var i = 0; i < state.popups.length; i++) {
                var pp = state.popups[i];
                ctx.globalAlpha = Math.min(1, pp.life / 30);
                ctx.fillStyle = pp.color;
                ctx.fillText(pp.text, pp.x, pp.y);
                ctx.globalAlpha = 1;
            }
        }

        function drawActivePUBar() {
            var x = 20, y = 50 * scale;
            var any = false;
            for (var k = 0; k < PU_KEYS.length; k++) {
                var key = PU_KEYS[k];
                var v = state.active[key];
                if (!v) continue;
                any = true;
                var spec = POWER_UPS[key];
                var max = key === 'shield' ? 1 : spec.duration;
                var w = 70 * scale;
                // backdrop
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(x, y, w, 18 * scale);
                ctx.strokeStyle = spec.color;
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, w, 18 * scale);
                // fill
                ctx.fillStyle = spec.glow.replace('0.55', '0.35');
                ctx.fillRect(x + 1, y + 1, (w - 2) * (v / max), 18 * scale - 2);
                // icon
                drawPUIcon(ctx, spec.icon, x + 9 * scale, y + 9 * scale, 10 * scale, spec.color);
                // label
                ctx.font = Math.floor(9 * scale) + 'px monospace';
                ctx.fillStyle = spec.color;
                ctx.fillText(spec.label, x + 19 * scale, y + 12 * scale);
                x += w + 6;
            }
        }

        function loop() {
            // day-night phase
            var dayPhase = (state.dist / 1100) % 2;
            var isNight = dayPhase >= 1;
            var dayT = dayPhase % 1;

            // screen shake
            var sk = 0;
            if (state.shake > 0) {
                sk = state.shake;
                ctx.save();
                ctx.translate((Math.random() - 0.5) * sk, (Math.random() - 0.5) * sk);
                state.shake -= 0.6;
            }

            drawSky(dayT, isNight);
            drawSunMoon(isNight);
            drawStarsAndClouds(isNight);
            drawMountains(state.dist);
            drawGround();

            // HUD top
            var hudY = 30 * scale;
            ctx.font = Math.floor(16 * scale) + 'px monospace';
            ctx.fillStyle = '#9090b0';
            ctx.fillText('DIST ' + String(Math.floor(state.dist)).padStart(5, '0'), 20, hudY);
            ctx.fillStyle = '#ffcc00';
            ctx.fillText('SMACZKI ' + String(state.score).padStart(3, '0'), W - 200 * scale, hudY);
            ctx.fillStyle = '#888';
            var bestLabel = bestEntry.score > 0 ? 'BEST ' + bestEntry.score + ' (' + bestEntry.name + ')' : 'BEST —';
            ctx.fillText(bestLabel, W / 2 - ctx.measureText(bestLabel).width / 2, hudY);

            if (state.phase === 'playing') {
                state.frame++;
                state.dist += state.speed * 0.18;

                // physics
                state.catVel += GRAVITY;
                state.catY += state.catVel;
                if (state.catY >= 0) { state.catY = 0; state.catVel = 0; state.onGround = true; state.jumpsLeft = 1; }

                if (state.frame % 200 === 0) state.speed = Math.min(11 * scale, state.speed + 0.3 * scale);

                // tick power-ups
                ['magnet', 'x2', 'slowmo', 'boost'].forEach(function(k){
                    if (state.active[k] > 0) state.active[k]--;
                });

                // spawn timers
                state.spawnTimer--;
                if (state.spawnTimer <= 0) { spawnObstacle(); state.spawnTimer = 60 + Math.floor(Math.random() * 50); }
                state.treatTimer--;
                if (state.treatTimer <= 0) { spawnTreat(); state.treatTimer = 90 + Math.floor(Math.random() * 60); }
                state.puTimer--;
                if (state.puTimer <= 0) { spawnPowerUp(); state.puTimer = 400 + Math.floor(Math.random() * 320); }

                // movement
                var effSpeed = state.speed;
                if (state.active.slowmo > 0) effSpeed *= 0.55;
                if (state.active.boost > 0) effSpeed *= 1.35;

                state.obstacles.forEach(function(o){ o.x -= effSpeed; });
                state.treats.forEach(function(t){
                    t.x -= effSpeed;
                    if (state.active.magnet > 0) {
                        var dx = (CAT_X + CAT_W/2) - (t.x + 7 * scale);
                        var dy = (GROUND_Y - CAT_H/2 + state.catY) - (t.y + 7 * scale);
                        var d = Math.sqrt(dx*dx + dy*dy);
                        if (d < 160 * scale) {
                            t.x += dx * 0.08;
                            t.y += dy * 0.08;
                        }
                    }
                });
                state.powerups.forEach(function(p){ p.x -= effSpeed; });

                state.obstacles = state.obstacles.filter(function(o){ return o.x + o.w > -10; });
                state.treats = state.treats.filter(function(t){ return t.x > -20; });
                state.powerups = state.powerups.filter(function(p){ return p.x > -30; });

                var catBox = { x: CAT_X + 8, y: GROUND_Y - CAT_H + state.catY + 8, w: CAT_W - 18, h: CAT_H - 14 };

                // collisions with obstacles
                for (var oi = state.obstacles.length - 1; oi >= 0; oi--) {
                    var o = state.obstacles[oi];
                    var ob = { x: o.x, y: GROUND_Y - o.h + (o.yOffset || 0), w: o.w, h: o.h };
                    if (catBox.x < ob.x + ob.w && catBox.x + catBox.w > ob.x &&
                        catBox.y < ob.y + ob.h && catBox.y + catBox.h > ob.y) {
                        if (state.active.boost > 0) {
                            // smash through
                            state.obstacles.splice(oi, 1);
                            spawnParticles(ob.x + ob.w/2, ob.y + ob.h/2, '#ff7043', 14, { spread: 6, life: 30 });
                            spawnPopup(ob.x + ob.w/2 - 14, ob.y, '+SMASH', '#ff7043');
                            state.score += 5;
                            scoreEl.textContent = state.score;
                            state.shake = 6;
                        } else if (state.active.shield > 0) {
                            state.active.shield = 0;
                            state.obstacles.splice(oi, 1);
                            spawnParticles(ob.x + ob.w/2, ob.y + ob.h/2, '#00e5ff', 20, { spread: 6, life: 36 });
                            spawnPopup(catBox.x + catBox.w/2 - 18, catBox.y, 'TARCZA!', '#00e5ff');
                            state.shake = 5;
                        } else {
                            die();
                            break;
                        }
                    }
                }

                // collect treats
                state.treats = state.treats.filter(function(t){
                    var ts = 14 * scale;
                    var tb = { x: t.x, y: t.y, w: ts, h: ts };
                    if (catBox.x < tb.x + tb.w && catBox.x + catBox.w > tb.x &&
                        catBox.y < tb.y + tb.h && catBox.y + catBox.h > tb.y) {
                        var pts = state.active.x2 > 0 ? 20 : 10;
                        state.score += pts;
                        scoreEl.textContent = state.score;
                        spawnParticles(t.x + ts/2, t.y + ts/2, '#ffcc00', 10, { spread: 4, life: 24 });
                        spawnPopup(t.x, t.y - 4, '+' + pts, state.active.x2 > 0 ? '#ffd700' : '#ffcc00');
                        return false;
                    }
                    return true;
                });

                // collect power-ups
                state.powerups = state.powerups.filter(function(p){
                    var ps = 22 * scale;
                    var pb = { x: p.x, y: p.y, w: ps, h: ps };
                    if (catBox.x < pb.x + pb.w && catBox.x + catBox.w > pb.x &&
                        catBox.y < pb.y + pb.h && catBox.y + catBox.h > pb.y) {
                        activatePU(p.kind);
                        spawnParticles(p.x + ps/2, p.y + ps/2, POWER_UPS[p.kind].color, 22, { spread: 6, life: 32, upward: true });
                        spawnPopup(p.x, p.y - 4, POWER_UPS[p.kind].label, POWER_UPS[p.kind].color);
                        return false;
                    }
                    return true;
                });

                drawCatTrail();
                updateParticles();
                updatePopups();
            } else {
                updateParticles();
                updatePopups();
            }

            // draw entities
            state.obstacles.forEach(function(o){ drawObstacle(ctx, o); });
            state.treats.forEach(function(t){ drawTreat(ctx, t); });
            state.powerups.forEach(function(p){ drawPowerUp(ctx, p); });

            // cat shadow
            var shY = GROUND_Y + 2;
            var shAlpha = 0.45 - Math.min(0.4, Math.abs(state.catY) / (140 * scale));
            var shScale = Math.max(0.45, 1 - Math.abs(state.catY) / (200 * scale));
            ctx.fillStyle = 'rgba(0,0,0,' + shAlpha.toFixed(2) + ')';
            ctx.beginPath();
            ctx.ellipse(CAT_X + CAT_W/2, shY, (CAT_W * 0.42) * shScale, 4 * scale, 0, 0, Math.PI * 2);
            ctx.fill();

            // shield aura around cat
            if (state.active.shield > 0) {
                var ccx = CAT_X + CAT_W/2;
                var ccy = GROUND_Y - CAT_H/2 + state.catY;
                var pulse = 0.4 + 0.25 * Math.sin(state.frame * 0.18);
                ctx.strokeStyle = 'rgba(0,229,255,' + pulse.toFixed(2) + ')';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(ccx, ccy, CAT_W * 0.6, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = 'rgba(0,229,255,' + (pulse * 0.5).toFixed(2) + ')';
                ctx.beginPath(); ctx.arc(ccx, ccy, CAT_W * 0.7, 0, Math.PI * 2); ctx.stroke();
            }
            // boost aura
            if (state.active.boost > 0) {
                ctx.strokeStyle = 'rgba(255,112,67,0.55)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(CAT_X + CAT_W/2, GROUND_Y - CAT_H/2 + state.catY, CAT_W * 0.55, 0, Math.PI * 2);
                ctx.stroke();
                if (state.frame % 2 === 0) {
                    spawnParticles(CAT_X - 4, GROUND_Y - CAT_H/2 + state.catY + (Math.random()-0.5)*CAT_H*0.6, '#ff7043', 1, { spread: 1, life: 14, size: 2 });
                }
            }
            // magnet aura
            if (state.active.magnet > 0) {
                ctx.strokeStyle = 'rgba(255,102,153,0.3)';
                ctx.setLineDash([6, 4]);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(CAT_X + CAT_W/2, GROUND_Y - CAT_H/2 + state.catY, 160 * scale, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            // slow-mo vignette
            if (state.active.slowmo > 0) {
                var vg = ctx.createRadialGradient(W/2, H/2, W*0.3, W/2, H/2, W*0.7);
                vg.addColorStop(0, 'rgba(167,139,250,0)');
                vg.addColorStop(1, 'rgba(167,139,250,0.18)');
                ctx.fillStyle = vg;
                ctx.fillRect(0, 0, W, H);
            }
            // x2 tint
            if (state.active.x2 > 0 && state.frame % 6 < 3) {
                ctx.fillStyle = 'rgba(255,215,0,0.04)';
                ctx.fillRect(0, 0, W, H);
            }

            drawCat(ctx, CAT_X, GROUND_Y - CAT_H + state.catY, state.frame);
            drawParticles();
            drawPopups();
            drawActivePUBar();

            // overlays
            if (state.phase === 'ready') {
                ctx.fillStyle = 'rgba(10, 10, 20, 0.7)';
                ctx.fillRect(0, GROUND_Y * 0.3, W, H * 0.5);
                ctx.fillStyle = '#00e5ff';
                ctx.font = Math.floor(28 * scale) + 'px monospace';
                var t1 = 'SIMBA RUNNER';
                ctx.fillText(t1, W / 2 - ctx.measureText(t1).width / 2, H / 2 - 28 * scale);
                ctx.font = Math.floor(16 * scale) + 'px monospace';
                ctx.fillStyle = '#7c4dff';
                var t2 = '[ SPACJA / KLIK ] = start  ·  [ ↑/W ] = skok (×2)';
                ctx.fillText(t2, W / 2 - ctx.measureText(t2).width / 2, H / 2 + 2 * scale);
                ctx.fillStyle = '#9090b0';
                ctx.font = Math.floor(13 * scale) + 'px monospace';
                var t3 = 'łap smaczki, kolekcjonuj power-upy, unikaj dronów';
                ctx.fillText(t3, W / 2 - ctx.measureText(t3).width / 2, H / 2 + 26 * scale);
                ctx.fillStyle = '#6a6a82';
                ctx.font = Math.floor(11 * scale) + 'px monospace';
                var t4 = 'v2.0 · 5 power-upów · dzień/noc · parallax';
                ctx.fillText(t4, W / 2 - ctx.measureText(t4).width / 2, H / 2 + 46 * scale);
            } else if (state.phase === 'dead') {
                ctx.fillStyle = 'rgba(10, 10, 20, 0.82)';
                ctx.fillRect(0, GROUND_Y * 0.2, W, H * 0.6);
                ctx.fillStyle = '#ff1744';
                ctx.font = Math.floor(30 * scale) + 'px monospace';
                var dt1 = '✗ SIMBA UCIEKŁ NA SZAFĘ';
                ctx.fillText(dt1, W / 2 - ctx.measureText(dt1).width / 2, H / 2 - 20 * scale);
                ctx.fillStyle = '#00e5ff';
                ctx.font = Math.floor(16 * scale) + 'px monospace';
                var fs = state.score + Math.floor(state.dist / 10);
                var dt2 = 'smaczki: ' + state.score + ' · dystans: ' + Math.floor(state.dist) + 'm · total: ' + fs;
                ctx.fillText(dt2, W / 2 - ctx.measureText(dt2).width / 2, H / 2 + 8 * scale);
                ctx.fillStyle = '#ffcc00';
                var dt3 = '[ SPACJA ] jeszcze raz';
                ctx.fillText(dt3, W / 2 - ctx.measureText(dt3).width / 2, H / 2 + 38 * scale);
            }

            if (sk > 0) ctx.restore();
            requestAnimationFrame(loop);
        }

        resize();
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(resize).observe(canvas);
        }
        window.addEventListener('resize', resize);
        requestAnimationFrame(loop);

        function tryJumpOrStart() {
            if (state.saveOpen) return;
            if (state.phase === 'ready') start();
            else if (state.phase === 'playing') jump();
            else if (state.phase === 'dead') start();
        }

        window.addEventListener('keydown', function(e){
            if (state.saveOpen) {
                if (e.code === 'Escape') { e.preventDefault(); closeSave(); }
                if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); submitSave(); }
                return;
            }
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                var tag = (document.activeElement && document.activeElement.tagName || '').toLowerCase();
                if (tag === 'input' || tag === 'textarea') return;
                var rect = canvas.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                e.preventDefault();
                tryJumpOrStart();
            }
        });
        canvas.addEventListener('pointerdown', function(){ if (!state.saveOpen) tryJumpOrStart(); });

        nickInput.addEventListener('keydown', function(e){
            e.stopPropagation();
            if (e.key === 'Enter') { e.preventDefault(); submitSave(); }
            if (e.key === 'Escape') { e.preventDefault(); closeSave(); }
            if (e.code === 'Space') { e.preventDefault(); submitSave(); }
        });
        saveBtn.addEventListener('click', submitSave);
        skipBtn.addEventListener('click', closeSave);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
