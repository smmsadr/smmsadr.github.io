# Copilot Custom Command: /pull_request

## Purpose
Create a GitHub pull request with a properly formatted title and body based on the current branch, commits, and the project's PR template.

## Instructions

1. **Gather context** – Run the following commands to understand the current state:
   ```bash
   git branch --show-current
   git log origin/main..HEAD --oneline
   git diff origin/main..HEAD --stat
   ```

2. **Extract ticket number** – Parse the Jira ticket from the branch name (e.g., `PAGENT-3547` from `spike/PAGENT-3547-local-methods-nonlinear-constraints`).

3. **Determine PR type** from the branch prefix:

   | Branch prefix | PR type   | Title prefix |
   |---------------|-----------|--------------|
   | `feature/`    | Feature   | `[Feature]`  |
   | `bugfix/`     | Bugfix    | `[Bugfix]`   |
   | `techdebt/`   | TechDebt  | `[Techdebt]` |
   | `spike/`      | Other     | `[Spike]`    |
   | `ci/`         | Other     | `[CI]`       |
   | other         | Other     | _(none)_     |

4. **Generate the PR title** following the established patterns from the repo:
   - Feature: `[Feature] PAGENT-XXXX: Short description`
   - Bugfix: `[Bugfix] PAGENT-XXXX: Short description`
   - TechDebt: `[Techdebt] PAGENT-XXXX: Short description`
   - Spike: `[Spike] PAGENT-XXXX: Short description`
   - Other: `PAGENT-XXXX: Short description`

   The description should be concise, imperative mood, ≤ 72 characters.

5. **Generate the PR body** using this template structure:

   ```markdown
   *JIRA link:* https://kinesso.atlassian.net/browse/<TICKET-NUMBER>

   ## Summary
   <1-2 sentence overview of what this PR does and why>

   ## Changes
   - <bullet list of key changes, grouped by file or area>

   *PR type:*
   - [ ] Feature
   - [ ] TechDebt
   - [ ] Bugfix
   - [ ] Other

   *Changelog updated:*
   - [ ] Yes
   - [x] No

   *Breaking changes:*
   - [ ] Yes
   - [x] No
   ```

   ### Body rules:
   - Check the appropriate PR type checkbox (use `[x]`).
   - The **Summary** section should explain *what* and *why*, not *how*.
   - The **Changes** section should list modified files/areas with brief descriptions.
   - If commits reference breaking changes, check the breaking changes box.
   - Default "Changelog updated" to No unless a CHANGELOG file was modified.
   - Wrap body text at 80 characters for readability.

6. **Show the proposed PR title and body** to the user and explain reasoning.

7. **Create the PR** – Run:
   ```bash
   gh pr create --title "<title>" --body "<body>" --base main
   ```
   If `gh` CLI is not authenticated or unavailable, show the user the formatted title and body to copy manually.

8. **Confirm** – Show the PR URL from the `gh pr create` output.

## Example output

Title:
```
[Feature] PAGENT-3960: MMM - Budget Constraint on Period
```

Body:
```markdown
*JIRA link:* https://kinesso.atlassian.net/browse/PAGENT-3960

## Summary
Add support for MMM period-level spend constraints in optimization,
allowing payloads to constrain total spend across all media for a
given period.

## Changes
- Add `BudgetConstraintByPeriod` in `src/custom_types/mmm/planning.py`
- Add `OptimizationInput.spend_bounds_by_period` field
- Add `set_spend_bounds_by_period()` in `src/models/mmm/optimization.py`
- Update tests for new schema validation and optimization flow

*PR type:*
- [x] Feature
- [ ] TechDebt
- [ ] Bugfix
- [ ] Other

*Changelog updated:*
- [ ] Yes
- [x] No

*Breaking changes:*
- [ ] Yes
- [x] No
```

