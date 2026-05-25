#!/usr/bin/env bash
set -euo pipefail

if [[ -d /home/node/.claude ]]; then
  sudo chown -R node:node /home/node/.claude 2>/dev/null || true
fi

# SSH bind mounts must stay private to the node user.
if [[ -d /home/node/.ssh ]]; then
  sudo chown -R node:node /home/node/.ssh 2>/dev/null || true
  chmod 700 /home/node/.ssh 2>/dev/null || true
  find /home/node/.ssh -type f -name 'id_*' ! -name '*.pub' -exec chmod 600 {} + 2>/dev/null || true
fi

if [[ -n "${CLAUDE_CONFIG_DIR:-}" && "${CLAUDE_CONFIG_DIR}" != "${HOME}/.claude" ]]; then
  ln -sfn "${CLAUDE_CONFIG_DIR}" "${HOME}/.claude"
fi
