# Finance Pulse - Master Context Anchor (AG IDE)

This file serves as the "Save Game" state for the Finance Pulse dashboard. Any AI agent reading this repository must abide by the architectural decisions, stack constraints, and formatting rules defined below.

## 1. Technology Stack
- **Core Framework:** React (bootstrapped with Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4

## 2. Rules and Constraints (The "Suitcase")
- **Portability Protocol:** All file modifications and imports MUST use strictly **relative paths** (e.g., `src/App.tsx` or `../types`). Absolute paths are strictly forbidden. Reference `.agent/rules/portability.md`.
- **Aesthetic Protocol:** Strict adherence to the `clean-ui` dark mode theme defined in `.agent/skills/clean-ui/SKILL.md`. This requires the extensive usage of `slate` colors (e.g., `bg-slate-900/50`, `border-slate-800`, `text-slate-200`) and sophisticated visual classes like `backdrop-blur`, subtle gradients, and transition effects.

## 3. Core Architecture
- **State Management & Database:** All complex local data and network state logic are encapsulated in modular custom hooks.
  - `src/hooks/useExpenses.ts`: Handles the initialization, addition, deletion, and robust synchronization of user expense data securely with a **Supabase PostgreSQL** backend, replacing the legacy `localStorage` cache. Includes optimistic UI rendering via an `isLoading` skeleton.
  - `src/lib/supabase.ts`: The singleton initialization file mapping the cloud database strictly to VITE environment secrets.
  - `src/hooks/useCurrency.ts`: Encapsulates native `fetch` API logic connecting to the Frankfurter API for real-time USD/EUR exchange rates.
- **Data Types:** To prevent circular dependencies, shared Types/Interfaces (specifically the `Expense` interface and Zod schemas) are centrally defined and exported from `src/types.ts`.
- **Data Visualization:** The `recharts` library is leveraged for charting structures (e.g., the `ExpenseChart` component). Rendering defaults must be explicitly overridden by custom inline styling props (e.g., `style={{ backgroundColor: 'transparent' }}`) to prevent visual collisions with our `clean-ui` dark mode blocks.

## 4. Security & Quality Assurance
- **Input Validation:** The `AddExpenseForm` component strictly implements schema-driven data validation utilizing **Zod** (`ExpenseSchema`).
- **Validation Rules:** Form submission is halted unless the Expense name is length > 0 and the Amount strictly exceeds 0.
- **UI Feedback:** Error instances dynamically toggle inline borders and render specific feedback flags via `text-red-400` classes immediately beneath broken inputs, ensuring browser-native `alert()` dialogs are never instantiated.

## 5. DevOps & Continuous Deployment (CI/CD)
- **Pipeline:** A unified GitHub Actions validation and deployment pipeline resides at `.github/workflows/ci.yml`.
- **Trigger Logistics:** The pipeline is wired to process automatically upon any `push` action directed to the `main` branch.
- **Deterministic Deployment Matrix:** Driven from an `ubuntu-latest` image, the job installs dependencies securely via `npm ci` utilizing Node.js v20. It executes a strict `npm run build` command (injecting Supabase secrets via GitHub Repository Secrets) and automatically deploys the transpiled `/dist` payload to the repository's `gh-pages` branch for live hosting.

## 6. Educational Context
- **AI Pairing Guide:** A comprehensive playbook detailing the exact workflow, checklist, and Human-in-the-Loop (HITL) prompt methodologies used to construct this application exists in the [LEARNING_GUIDE.md](./LEARNING_GUIDE.md). Reference this document for mastering agentic coding workflows.
