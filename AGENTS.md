# Git safety

- Never modify files directly on `main`.
- Before any file edit, check the current branch.
- If the current branch is `main`, create or switch to a dedicated branch first.
- Do not include assistant, model, or tool names in branch names.
- Do not commit, push, or open a pull request unless explicitly asked.

# Branch naming

- Use a short, descriptive branch name that explains the work, not who or what created it.
- Use the format `<type>/<short-description>`.
- Use lowercase ASCII letters, numbers, and hyphens only.
- Use hyphens to separate words.
- Keep branch names concise; prefer 3 to 7 words after the type.
- Include an issue or ticket id only when it is part of the human workflow.
- Avoid dates, personal names, environment names, and implementation noise unless they are necessary to identify the work.
- Rename unclear branches before pushing them.

Recommended branch types:

- `feature/` for new user-facing behavior.
- `fix/` for bug fixes.
- `refactor/` for behavior-preserving code changes.
- `perf/` for performance work.
- `docs/` for documentation-only changes.
- `test/` for test-only changes.
- `chore/` for maintenance tasks.
- `ci/` for CI/CD changes.
- `build/` for build system or dependency changes.
- `hotfix/` for urgent production fixes.

Examples:

- `feature/add-contact-form`
- `fix/header-mobile-overflow`
- `refactor/migrate-axios-to-fetch`
- `docs/update-agent-branch-rules`
- `ci/cache-node-dependencies`

Avoid:

- `main`
- `work`
- `updates`
- `fix-stuff`
- `assistant/add-contact-form`
- `codex/refactor-navbar`
- `feature/Add Contact Form`
- `feature/add_contact_form`
