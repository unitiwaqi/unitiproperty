# CLAUDE.md

## Vault — durable project knowledge
A knowledge vault for this project lives at `~/Desktop/tech/VAULT/unitiproperty` (Obsidian,
git-ignored, outside this repo — never commit or reference vault content in code comments or
commit messages). Start at `00 Index.md` before any non-trivial task: a design decision, a gap
analysis, a bug that touches more than one file, anything you'd hate to re-derive next session.
This file is always loaded, so treat it as the guarantee that the vault gets checked — but the
vault itself is where the actual answers live, not here.

Update the vault as part of finishing real work (`Sessions/Worklog.md` for what shipped,
`Gotchas/Gotchas Index.md` for traps, the matching `Domain/` note for anything about how the
system itself works) — not only when asked to.

## Git workflow
- Integration branch: `main`
- PR required before landing: **No** — user has push rights and no branch protection.
  Land directly: `git push origin <branch>:main`.
- Never edit while `main` itself is checked out — branch first, always.
Full mechanics in `~/Desktop/tech/VAULT/unitiproperty/Project/Git Workflow.md`.
