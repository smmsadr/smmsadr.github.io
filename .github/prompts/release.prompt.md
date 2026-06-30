# Copilot Custom Command: /release

## Purpose
Create or update a GitHub release by first inspecting the repository's recent release/tag patterns, then automatically determining the next release metadata, drafting release notes in the established format, and publishing the release.

## Instructions

1. **Inspect the existing release/tag format first** – Before proposing anything, gather the release conventions actually used in this repo.

   Run:
   ```bash
   git fetch --tags origin
   git --no-pager tag --sort=-creatordate
   gh release list --limit 10
   ```

   Then inspect the last 3-5 releases in detail:
   ```bash
   gh release view <tag-name> --json name,tagName,body,publishedAt,targetCommitish
   ```

   If `gh` is unavailable or unauthenticated, fall back to annotated tags:
   ```bash
   git --no-pager tag -n99 <tag-name>
   ```

2. **Understand the dominant release structure** – Infer the release-note format from the latest releases, not from guesswork.

   In this repository, prefer the newer, richer manual format used by recent releases such as `v1.1.5`, `v1.1.6`, and `v1.2`, rather than the older auto-generated style used by some earlier releases.

   The dominant structure is usually:
   ```markdown
   # `short release headline` 🚀

   ## Release Notes

   ### Overview
   `1 paragraph summarising the release themes`

   ### Key Updates

   #### 🔥 Features
   - `PR title` by @`author` in #`number`
     + `optional detail`

   #### 🐞 Bug Fixes
   - ...

   #### 🛠️ Tech Debt
   - ...

   #### 📝 Research & benchmarks
   - ...   # only if notebooks / spike work is present

   ### Contributors
   - @user1
   - @user2

   Full Changelog: https://github.com/Kinesso/budget-allocation-modelling/compare/`previous-tag`...`new-tag`
   ```

   Rules:
   - Omit empty sections.
   - Keep the note style concise and grouped by change type.
   - Use the compare link with **tag names**, not release titles.
   - If recent releases mix `## Release Notes` and `## What's Changed`, prefer the richer sectioned structure above.

3. **Determine the release version, title, and tag automatically** – Use repository state before asking the user.

   Gather version context:
   ```bash
   git branch --show-current
   git status --short
   python -c 'import tomllib, pathlib; print(tomllib.loads(pathlib.Path("pyproject.toml").read_text())["project"]["version"])'
   ```

   Then:
   - Read `project.version` from `pyproject.toml`.
   - Parse the latest valid semver-like tag matching `^v[0-9]+(\.[0-9]+){1,2}$`.
   - Ignore malformed historical tags such as `v.1.1.0` when computing the next release.
   - Default the **release title** to `v<pyproject-version>`.
   - Default the **release tag** to `v<pyproject-version>` if that tag does not already exist.
   - If the exact tag already exists, do **not** recreate it; inspect whether the release should be edited instead.
   - If the title already exists on GitHub, treat that as an existing release and stop to avoid duplicates.

   If `pyproject.toml` is not ahead of the latest valid tag, infer the next version automatically from unreleased changes:
   - **major**: any breaking-change marker (`BREAKING CHANGE`, `!`, explicit breaking API/schema change)
   - **minor**: any feature-level change (`Feature/`, `feat`, new endpoint, new payload field, new model capability)
   - **patch**: bugfix, docs, refactor, tech debt, dependency, or internal behavior change only

   If a bump is needed, update `pyproject.toml` before releasing so runtime version and release metadata stay aligned.

4. **Build the unreleased change set** – Use the previous release/tag as the lower bound.

   Determine the previous release boundary from the latest valid published tag, then collect changes on `origin/main`:
   ```bash
   git log <previous-tag>..origin/main --first-parent --merges --oneline
   git diff <previous-tag>..origin/main --stat
   ```

   If `gh` is available, enrich merged PRs with metadata:
   ```bash
   gh pr list --state merged --base main --limit 100
   gh pr view <pr-number> --json title,number,author,body,files
   ```

   Categorise changes using both PR title prefixes and touched paths:
   - `Feature/`, `feat` → **Features**
   - `Bugfix/`, `fix` → **Bug Fixes**
   - `Techdebt/`, `refactor`, `build`, `ci`, dependency changes → **Tech Debt**
   - changes mainly under `notebooks/`, benchmark work, or `Spike/` titles → **Research & benchmarks**
   - anything else → **Other** (include only if important)

   Prefer one bullet per merged PR. Add `+` detail lines only when they clarify important API/model/schema changes.

5. **Write the release headline and overview automatically** – Make them specific to the actual change set.

   - Headline should be 3-8 words and reflect the dominant themes across the merged PRs.
   - Overview should be 2-4 sentences describing the main areas changed (for example: reach flighting, MMM optimization, async APIs, logging, validation, notebooks).
   - Mention the release version in the overview.
   - Do not invent features that are not visible in the merged changes.

6. **Validate release readiness before publishing** – Do the checks, not just the writing.

   Run:
   ```bash
   git fetch origin
   git checkout main
   git pull --ff-only origin main
   uv run pytest
   ```

   Notes:
   - If the working tree is dirty, stop and explain what must be committed or stashed first.
   - If tests fail, do not publish the release.
   - In this repository, app/router tests import `app.main`, so local test execution may require `db-model` to be running because the FastAPI lifespan triggers Alembic startup.

7. **Create or update the tag and GitHub release** – Automate as much as possible.

   Recommended flow:
   ```bash
   git tag -a <new-tag> -m "<release-title>"
   git push origin <new-tag>
   gh release create <new-tag> \
     --title "<release-title>" \
     --notes-file <release-notes-file> \
     --verify-tag \
     --latest
   ```

   If the tag already exists but the release does not, reuse the existing tag.

   If the release already exists, update it instead of creating a duplicate:
   ```bash
   gh release edit <tag> \
     --title "<release-title>" \
     --notes-file <release-notes-file>
   ```

   If `gh` is unavailable, still generate:
   - release title
   - release tag
   - full markdown release notes
   - exact `git tag` and `git push` commands
   so the user can complete the release manually.

8. **Confirm the result clearly** – Show:
   - previous tag
   - new tag
   - release title
   - whether `pyproject.toml` was bumped
   - compare range
   - release URL (if created)

## Automation rules

- Prefer `main` as the release target unless the repo history clearly shows another release branch.
- Prefer `v<full-semver>` tags when creating a new release, even if a previous release had a shortened tag by exception.
- Never create duplicate tags or duplicate release titles.
- Always inspect the last releases first before drafting new notes.
- Keep the release body consistent with the current repo style, not generic GitHub auto-notes.
- Use `pyproject.toml` as the source of truth for the release title/version shown to users.
- Use the computed tag names in the compare link.

## Example output

Release title:
```text
v1.2.2
```

Release tag:
```text
v1.2.2
```

Release notes:
```markdown
# Reach flighting and validation updates 🚀

## Release Notes

### Overview
This release (v1.2.2) focuses on reach flighting improvements, stronger
validation around Planning Agent payloads, and operational hardening in
API and registry flows.

### Key Updates

#### 🔥 Features
- Feature/PAGENT-XXXX: Add `feature summary` by @user in #123
  + Adds `important endpoint/model/schema detail`

#### 🐞 Bug Fixes
- Bugfix/PAGENT-YYYY: Fix `bug summary` by @user in #124

#### 🛠️ Tech Debt
- Techdebt/PAGENT-ZZZZ: Refactor `area` by @user in #125

### Contributors
- @user
- @another-user

Full Changelog: https://github.com/Kinesso/budget-allocation-modelling/compare/v1.2.1...v1.2.2
```
