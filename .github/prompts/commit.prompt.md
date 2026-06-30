# Copilot Custom Command: /commit

## Purpose
Analyze staged (and unstaged) changes, generate a properly formatted conventional commit message, commit the code, and push it to the remote.

## Instructions

1. **Gather context** – Run `git status` and `git diff --staged` (and `git diff` for unstaged changes) in the terminal to understand what has changed.

2. **Stage modified files if nothing is staged** – If `git diff --staged` is empty but there are unstaged changes, run `git add -u` to stage only tracked (existing) files with modifications. Do **not** stage untracked (new) files automatically. Confirm what was staged by re-running `git status`.

3. **Generate a commit message** following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

   ```
   <TICKET-NUMBER>: <type>(<optional scope>): <short summary>

   <optional body – wrapped at 72 chars>
   ```

   ### Type must be one of:
   | Type        | When to use                                             |
   |-------------|---------------------------------------------------------|
   | `feat`      | A new feature                                           |
   | `fix`       | A bug fix                                               |
   | `docs`      | Documentation only                                      |
   | `style`     | Formatting, missing semicolons, etc. (no logic change)  |
   | `refactor`  | Code change that neither fixes a bug nor adds a feature |
   | `perf`      | Performance improvement                                 |
   | `test`      | Adding or updating tests                                |
   | `build`     | Build system or external dependency changes             |
   | `ci`        | CI/CD configuration changes                             |
   | `chore`     | Other changes that don't modify src or test files       |
   | `revert`    | Reverts a previous commit                               |

   ### Rules:
   - **Summary** line ≤ 72 characters, imperative mood, no period at the end.
   - **Ticket number** must be extracted from the current branch name (run `git branch --show-current`). If the branch contains a Jira ticket pattern (e.g., `PAGENT-1234`), prefix the commit title with it. If no ticket is found, omit the prefix.
   - **Scope** should reflect the area of the codebase (e.g., `reach`, `mmm`, `registry`, `docker`, `config`, `deps`).
   - **Body** (if needed) explains *what* and *why*, not *how*. Wrap at 72 chars.
   - If multiple logical changes exist, suggest splitting OR use a multi-paragraph body.

4. **Show the proposed commit message** to the user and explain the reasoning.

5. **Commit** – Run `git commit -m "<title>" -m "<body>"` (or just `-m "<title>"` if no body is needed).

6. **Push** – Run `git push`. If the branch has no upstream, use `git push -u origin HEAD`.

7. **Confirm** – Show the final `git log --oneline -1` output to confirm success.

## Example output

```
PAGENT-3961: feat(reach): add planning-agent async endpoint

Implement POST /reach/pa/async that enqueues planning-agent
jobs via run_background_task and returns a job_id for polling.
```

