# simba-runner

> An endless runner where a cat is the hero, parallax is the backdrop, and the 404 page is the stage.

[![status](https://img.shields.io/badge/status-live-success)]() [![version](https://img.shields.io/badge/version-2.0-blue)]() [![deps](https://img.shields.io/badge/deps-0-7c4dff)]() [![runtime](https://img.shields.io/badge/runtime-vanilla%20JS-yellow)]() [![size](https://img.shields.io/badge/size-18%20KB-green)]() [![license](https://img.shields.io/badge/license-MIT-green)]()

Every site has a 404. Most 404s say *"Page not found, go back."* Mine is an **arcade with a cat**. Because Simba deserves more than lazy naps on the keyboard (although he's good at those too).

▶ **Play now:** [esej.space/404](https://esej.space/404) (yes, the 404 is on purpose)
🔗 **Project page:** [esej.space/projekty/simba-runner](https://esej.space/projekty/simba-runner/)

---

## 🎯 About

Simba — maine coon, 7 kg of living protest against human deadlines.

The pitch: a Chrome-dino-style endless runner, but:
- **on the 404 page** — an error page doesn't have to be boring
- **with a cat instead of a dinosaur** — Simba is more photogenic than a T-Rex
- **with a parallax background** — without parallax it's just another dino clone
- **with power-ups** — every game deserves a shield, a magnet, and slow-mo
- **with a leaderboard** — without competition, there's no motivation

## ✨ Features

- 🐈 **Simba as the protagonist** — runs, jumps, grabs power-ups, occasionally dies
- 🏔️ **Parallax background** — mountains + city silhouette + drifting clouds
- ⭐ **Particle effects** — on pickups, deaths, and 1000m milestones
- 🌅 **Day-night cycle** every 1100m — sky shifts gradient, stars twinkle at night
- 💎 **5 power-ups** — SHIELD / MAGNET / x2 / SLOW-MO / BOOST
- 🏆 **Top 50 leaderboard** in `localStorage`
- 💾 **Zero backend** — fully client-side, works offline after first load
- 📱 **Touch controls** — tap to jump on mobile

## 💎 Power-ups

| icon | name | duration | effect |
|---|---|---|---|
| 🛡️ | SHIELD | 8s | One hit and the shield's gone, but Simba lives |
| 🧲 | MAGNET | 10s | All coins within 200px get pulled in |
| ×2 | DOUBLE POINTS | 12s | Every point counts twice |
| 🐌 | SLOW-MO | 5s | World slows to 0.5x, Simba doesn't |
| 🚀 | BOOST | 3s | Simba sprints at 3x base speed |

## 🎮 Controls

| action | key | touch |
|---|---|---|
| jump | `Space` or `↑` | tap |
| double jump | 2× `Space` | 2× tap |
| crouch | `↓` | swipe down |
| pause | `P` or `Esc` | — |
| restart | `R` | tap on game over |

**Save modal:** `Space`/`Enter` to submit · `Esc` to skip · no spaces in nick.

## 🛠️ Stack

| layer | what | why |
|---|---|---|
| engine | vanilla JS + Canvas 2D | an endless runner doesn't need WebGL or Unity |
| render | `requestAnimationFrame` | 60 FPS on anything built since 2010 |
| storage | `localStorage` (`simba_leaderboard_v2`) | zero backend, zero cost |
| physics | custom (gravity + AABB collisions) | ~50 lines of code, gets the job done |
| assets | inline SVG + emoji | no HTTP requests for graphics |

## 📜 Changelog

**v2.0** — 2026-05-19 — *Power-up Edition*
- 5 power-ups (SHIELD / MAGNET / x2 / SLOW-MO / BOOST)
- Parallax background (mountains + city + clouds)
- Particle effects
- Day-night cycle every 1100m
- Save modal with Space/Enter/Esc

**v1.0** — Initial release
- Endless runner core gameplay
- Score counter, basic leaderboard
- Single static background

## 🗺️ Roadmap

- **v2.1 Polish** — sound effects, music toggle, settings panel, colorblind mode
- **v2.2 Biomes** — forest (fireflies at night), space (lower gravity), rotation every 1500m
- **v2.3 Enemies** — drones, the neighbor's dog, boss = Roomba every 3000m
- **v3.0 Global LB** — REST endpoint, anti-cheat, daily challenges

## 📜 License

MIT. Take it, modify it, host it on your own 404.

---

> *Simba has never played simba-runner. Says it's offensive — cats don't run 12km without a reason.*

[esej.space](https://esej.space) · [@esejowsky](https://github.com/esejowsky)
