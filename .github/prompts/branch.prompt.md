# Copilot Custom Command: /branch

## Purpose
Create a new Git branch based on a Jira ticket. The ticket info can come from an XML export, pasted text, or direct user input.

## Instructions

1. **Get ticket information** – Ask the user or parse from the provided context. Accept any of these formats:
   - **Jira XML export** (RSS format): Extract `<title>`, `<project key="...">`, `<type>`, and `<description>` from the `<item>` element.
   - **Pasted text**: The user may paste a ticket key and title like `PAGENT-1234 - Some feature description`.
   - **Direct input**: The user may just say the ticket number and describe the work.

2. **Parse the ticket details**:
   - **Ticket key**: e.g., `PAGENT-3961` (extract from XML `<title>` tag pattern `[PAGENT-XXXX]` or from pasted text).
   - **Ticket type**: e.g., `Feature`, `Bug`, `Spike`, `Task` (from XML `<type>` tag or user input).
   - **Short description**: A brief summary of the work (from the ticket title, cleaned up).

3. **Determine branch prefix** based on ticket type:

   | Ticket Type                       | Branch Prefix  |
   |-----------------------------------|----------------|
   | Bug / Hotfix                      | `bugfix/`      |
   | Feature / Story                   | `feature/`     |
   | Techdebt / Refactor / Improvement | `techdebt/`    |
4. | Spike                             | `spike/`       |
   | Task / Sub-task                   | `task/`        |
   | Other / Unknown                   | `feature/`     |

4. **Generate the branch name** following this pattern:
   ```
   <prefix><TICKET-KEY>-<short-kebab-case-description>
   ```
   ### Rules:
   - Use **kebab-case** (lowercase, hyphens) for the description part.
   - Keep the description part to **3–6 words max** — concise but meaningful.
   - Total branch name should be ≤ 80 characters.
   - Strip special characters, parentheses, brackets from the description.
   - The ticket key stays **UPPERCASE** (e.g., `PAGENT-3961`).

   ### Examples:
   ```
   feature/PAGENT-3961-mmm-budget-constraint-feasibility
   bugfix/PAGENT-4002-fix-reach-null-response
   spike/PAGENT-3900-investigate-numba-performance
   ```

5. **Check for conflicts** – Run `git branch -a | grep -i <TICKET-KEY>` to see if a branch for this ticket already exists (locally or remotely). If it does, show it to the user and ask whether to:
   - Switch to the existing branch (`git checkout <branch>`).
   - Create a new branch anyway with a different suffix.

6. **Fetch latest and create the branch**:
   ```
   git fetch origin
   git checkout -b <branch-name> origin/main
   ```
   If `origin/main` doesn't exist, try `origin/master` or ask the user for the base branch.

7. **Push the branch upstream**:
   ```
   git push -u origin HEAD
   ```

8. **Confirm** – Show the final output:
   - Branch name
   - Base branch it was created from
   - `git log --oneline -1` to confirm the HEAD

## Example workflow

**User provides Jira XML:**
```xml
<title>[PAGENT-3961] [Spike &amp; Feature] MMM (Revenue) - Budget Constraint on Period - feasibility validation</title>
<type id="10001" iconUrl="...">Story</type>
```

**Agent extracts:**
- Ticket: `PAGENT-3961`
- Type: Story → prefix `feature/`
- Description: "MMM Budget Constraint Period feasibility validation"

**Generated branch:**
```
feature/PAGENT-3961-mmm-budget-constraint-feasibility
```

