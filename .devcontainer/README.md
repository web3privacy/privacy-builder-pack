# Dev container

Runs the Next.js app in `app/` with **Claude Code** and the same **Git over SSH** setup you use on the host.

## GitHub access — you do not need `gh`

This repo uses SSH remotes (`git@github.com:...`), not HTTPS. Auth comes from:

| Mechanism | What it does |
|-----------|----------------|
| `~/.ssh` bind mount (read-only) | Your `config`, keys (`id_git_ilge`, etc.), and `known_hosts` |
| macOS SSH agent socket | Forwards keys already loaded in the host agent (`SSH_AUTH_SOCK`) |

That matches how most dev containers “just work” without GitHub CLI: the editor forwards the agent, and/or `.ssh` is available inside the container.

`gh` is **not** installed in this devcontainer. You only need it if you personally use the GitHub CLI for other tasks.

### Before first open (host)

1. **Claude** — sign in once so `~/.claude` exists: `claude`
2. **SSH** — confirm push works on the host:

   ```bash
   ssh -T git@github.com
   git -C /path/to/privacy-builder-pack push --dry-run
   ```

   If the agent has no keys after reboot, run `ssh -T git@github.com` once on the host (your `~/.ssh/config` uses `AddKeysToAgent` for `github.com`).

3. **Docker** + **Dev Containers** extension in VS Code or Cursor

### Optional env vars

Forwarded from the host if set: `ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, `GITHUB_TOKEN` (for tools/APIs, not required for `git push` over SSH).

## Open the container

1. **Dev Containers: Reopen in Container**
2. `cd app && npm run dev`
3. `claude`
4. Verify git: `ssh -T git@github.com` then `git push --dry-run`

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Permission denied (publickey)` | On the **host**, run `ssh -T git@github.com`. Rebuild the container after keys are in the agent. |
| Agent socket missing (Linux/Windows Docker) | The `/run/host-services/ssh-auth.sock` mount is macOS Docker Desktop. On Linux, rely on the `~/.ssh` mount; on Windows use WSL2 + Docker in WSL. |
| `~/.ssh` permissions too open | `post-start.sh` tightens modes; rebuild once. |
| Claude asks to sign in again | Ensure host `~/.claude` exists and `CLAUDE_CONFIG_DIR=/home/node/.claude`. |

## Files

- `devcontainer.json` — Claude mount, SSH + gitconfig mounts, agent socket (macOS)
- `Dockerfile` — Node 24 LTS base image (`javascript-node:24`; patch pinned in `app/.nvmrc` as `24.16.0`)
- `post-create.sh` — git identity, `npm ci`
- `post-start.sh` — mount permissions, Claude IDE symlink
