# simba-runner

> Endless runner gdzie kot jest bohaterem, parallax tłem, a strona 404 — sceną.

[![status](https://img.shields.io/badge/status-live-success)]() [![version](https://img.shields.io/badge/version-2.0-blue)]() [![deps](https://img.shields.io/badge/deps-0-7c4dff)]() [![runtime](https://img.shields.io/badge/runtime-vanilla%20JS-yellow)]() [![size](https://img.shields.io/badge/size-18%20KB-green)]() [![license](https://img.shields.io/badge/license-MIT-green)]()

Każda strona ma 404. Większość 404 to *"Strona nie istnieje, zawróć"*. Moja 404 to **arcade z kotem**. Bo Simba zasługuje na coś więcej niż leniwe spanie na klawiaturze (chociaż to też lubi).

▶ **Play now:** [esej.space/404](https://esej.space/404) (tak, zamierzone 404)
🔗 **Project page:** [esej.space/projekty/simba-runner](https://esej.space/projekty/simba-runner/)

---

## 🎯 About

Simba — maine coon, 7 kg żywego protestu przeciwko ludzkim deadline'om.

Pomysł: endless runner w stylu Chrome dino, ale:
- **na 404 page** — strona błędu nie musi być nudna
- **z kotem zamiast dinozaura** — Simba jest fotogeniczniejszy niż T-Rex
- **z parallax tłem** — bez parallax to byłaby kolejna gra dino
- **z power-upami** — każda gra zasługuje na shield, magnet, slow-mo
- **z leaderboardem** — bez konkurencji nie ma motywacji

## ✨ Features

- 🐈 **Simba jako protagonista** — biegnie, skacze, łapie power-upy, czasem ginie
- 🏔️ **Parallax background** — góry + sylwetka miasta + dryfujące chmury
- ⭐ **Particle effects** — przy zbieraniu, śmierci, milestone'ach
- 🌅 **Day-night cycle** co 1100m — niebo zmienia gradient, gwiazdy w nocy
- 💎 **5 power-upów** — TARCZA / MAGNES / x2 / SLOW-MO / BOOST
- 🏆 **Leaderboard top 50** w `localStorage`
- 💾 **Zero backend** — wszystko client-side, działa offline po pierwszym load
- 📱 **Touch controls** — tap to jump na mobile

## 💎 Power-ups

| icon | nazwa | czas | efekt |
|---|---|---|---|
| 🛡️ | TARCZA | 8s | Jeden hit i tarcza znika, ale Simba żyje |
| 🧲 | MAGNES | 10s | Wszystkie monety w promieniu 200px przyciągane |
| ×2 | DOUBLE POINTS | 12s | Każdy punkt liczy się podwójnie |
| 🐌 | SLOW-MO | 5s | Świat zwalnia 2x, Simba normalnie |
| 🚀 | BOOST | 3s | Simba sprintem, 3x prędkość |

## 🎮 Controls

| akcja | klawisz | touch |
|---|---|---|
| skok | `Space` lub `↑` | tap |
| podwójny skok | 2× `Space` | 2× tap |
| schylenie | `↓` | swipe down |
| pause | `P` lub `Esc` | — |
| restart | `R` | tap on game over |

**Save modal:** `Space`/`Enter` submit · `Esc` skip · nick bez spacji.

## 🛠️ Stack

| layer | what | why |
|---|---|---|
| engine | vanilla JS + Canvas 2D | endless runner nie potrzebuje WebGL ani Unity |
| render | `requestAnimationFrame` | 60 FPS na każdym sprzęcie od 2010 |
| storage | `localStorage` (`simba_leaderboard_v2`) | zero backend, zero kosztów |
| physics | własny (gravity + collision boxes) | ~50 linii kodu, działa |
| assets | SVG inline + emoji | brak HTTP requestów |

## 📜 Changelog

**v2.0** — 2026-05-19 — *Power-up Edition*
- 5 power-upów (TARCZA / MAGNES / x2 / SLOW-MO / BOOST)
- Parallax background (góry + miasto + chmury)
- Particle effects
- Day-night cycle co 1100m
- Save modal z Space/Enter/Esc

**v1.0** — Initial release
- Endless runner core gameplay
- Score counter, basic leaderboard
- Single static background

## 🗺️ Roadmap

- **v2.1 Polish** — sound effects, music toggle, settings panel, colorblind mode
- **v2.2 Biomes** — las (firefly nocą), kosmos (lower gravity), random rotation co 1500m
- **v2.3 Enemies** — drony, pies sąsiada, boss = odkurzacz Roomba co 3000m
- **v3.0 Global LB** — REST endpoint, anti-cheat, daily challenges

## 📜 License

MIT. Bierz, modyfikuj, host na własnym 404.

---

> *Simba nigdy nie zagrał w simba-runner. Twierdzi że to obraźliwe — kot nie biega 12km bez powodu.*

[esej.space](https://esej.space) · [@esejowsky](https://github.com/esejowsky)
