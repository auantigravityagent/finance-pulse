\# Universal Portability Rules

\- \*\*Rule 1:\*\* Use relative paths (e.g., `./src`) for all file operations and imports.

\- \*\*Rule 2:\*\* Never hardcode drive letters (e.g., `C:\\`) or machine-specific usernames.

\- \*\*Rule 3:\*\* All environment variables must be accessed via `process.env` and defined in a `.env.example` template.

\- \*\*Rule 4:\*\* Treat the folder `C:\\AG\\WORKSPACES\\FinancePulse` as the absolute root; do not reference files outside of this boundary.

