# 🏁 Async Race

**Self-assessed score: 400 / 400** (excludes the reviewer-only "Overall Code Quality" 100 pts)

**Deployed UI (Vercel):** https://async-race-xi.vercel.app/#/garage

> ℹ️ The reviewer runs the [mock server](https://github.com/mikhama/async-race-api) locally on `http://localhost:3000`. This deployed app points there by default, so it talks to your local backend out of the box — nothing to configure.

A single-page application to manage a collection of cars, control their engines, run drag races and track winners. Built against the [mikhama/async-race-api](https://github.com/mikhama/async-race-api) mock server.

---

## Tech stack

- **React 18** + **TypeScript** (`strict` + `noImplicitAny`)
- **Redux Toolkit** + **RTK Query** (state management & data fetching)
- **React Router** (HashRouter — works on any static host)
- **Vite** (build/dev)
- **ESLint** (Airbnb config) + **Prettier**

## Architecture

Clear separation of concerns:

| Layer | Location |
| --- | --- |
| API interaction | `src/api/` (RTK Query: `garageApi`, `winnersApi`, `engineApi`) |
| State management | `src/app/store.ts`, `src/features/*/**Slice.ts` |
| UI rendering | `src/components/`, `src/features/*/**.tsx` |
| Domain logic / helpers | `src/utils/`, `src/features/garage/useEngine.ts`, `useRace.ts` |
| Types / constants | `src/types/`, `src/constants/` |

## Getting started

```bash
# 1. Start the mock server (in a separate folder)
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start            # serves http://localhost:3000

# 2. Run this app
npm install
npm run dev          # serves http://localhost:5173
```

The API base URL defaults to `http://localhost:3000` and can be overridden with `VITE_API_BASE_URL` (see `.env.example`).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint (Airbnb) check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier auto-format |
| `npm run ci:format` | Prettier check (no writes) |

## Deployment

`vite.config.ts` uses `base: './'` (relative asset paths) and the app uses `HashRouter`, so the same `dist/` build works on GitHub Pages, Netlify, Vercel and Cloudflare Pages with no extra config.

- **Vercel (used here):** import the repo — Vite is auto-detected. Build command `npm run build`, output directory `dist`. **Leave `VITE_API_BASE_URL` unset** so the app keeps targeting the reviewer's local `http://localhost:3000` backend.
- **Netlify / Cloudflare Pages / GitHub Pages:** build command `npm run build`, publish directory `dist` (the relative-base build works as-is on any static host).

After deploying, paste the live URL at the top of this file.

---

## Checklist 400/400 pts

### 🚀 UI Deployment

- [x] **Deployment Platform** — deployed on Vercel; relative-base build + HashRouter (paste the live link at the top).

### ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance** — Conventional Commits, lowercase types, imperative mood.
- [x] **Checklist included in README.md**
- [x] **Score calculation**
- [x] **UI Deployment link in README.md** — placeholder at the top; fill after deploy.

### Basic Structure (80 pts)

- [x] **Two Views (10)** — Garage & Winners.
- [x] **Garage View Content (30)** — view name, create/edit panel, race control panel, garage section.
- [x] **Winners View Content (10)** — view name, table, pagination.
- [x] **Persistent State (30)** — page numbers, create/edit inputs and winners sort all preserved via Redux when switching views.

### Garage View (90 pts)

- [x] **CRUD Operations (20)** — create/update/delete; empty & too-long (>25) names handled; delete also removes the winners record.
- [x] **Color Selection (10)** — RGB color picker; colour shown on the car icon and name.
- [x] **Random Car Creation (20)** — 100 cars/click; names from 12 brands × 12 models; random colour.
- [x] **Car Management Buttons (10)** — Select / Remove next to each car.
- [x] **Pagination (10)** — 7 cars per page.
- [x] **EXTRA (20)** — friendly "No cars" message; auto step-back when the last car on a page is removed.

### 🏆 Winners View (50 pts)

- [x] **Display Winners (15)** — winners appear after a race.
- [x] **Pagination for Winners (10)** — 10 per page.
- [x] **Winners Table (15)** — №, icon, name, wins, best time; wins incremented, best time kept.
- [x] **Sorting Functionality (10)** — sort by wins & time, asc/desc, via API query params.

### 🚗 Race (170 pts)

- [x] **Start Engine Animation (20)** — waits for velocity, animates, requests drive; 500 freezes the car.
- [x] **Stop Engine Animation (20)** — waits for stop, returns the car to the start.
- [x] **Responsive Animation (30)** — `requestAnimationFrame` recomputed from live lane width; works at 500px.
- [x] **Start Race Button (10)** — starts every car on the current page.
- [x] **Reset Race Button (15)** — returns all cars to the start.
- [x] **Winner Announcement (5)** — banner with the winning car's name and time.
- [x] **Button States (20)** — start disabled while driving; stop disabled at the initial position.
- [x] **Actions during the race (50)** — during a race, navigation, CRUD, generate and pagination are blocked for predictable behaviour; Reset re-enables everything.

### 🎨 Prettier and ESLint (10 pts)

- [x] **Prettier Setup (5)** — `format` and `ci:format` scripts.
- [x] **ESLint Configuration (5)** — Airbnb config, `lint` script, strict TS settings.

### 🌟 Overall Code Quality (100 pts) — _reviewer-awarded, skipped in self-check_

- Modular design (API / state / UI layers), functions ≤ 40 lines, constants instead of magic numbers, custom hooks, React Router.
