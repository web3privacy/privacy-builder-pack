#!/usr/bin/env bash
set -euo pipefail

if [[ -f /home/node/.host-gitconfig ]]; then
  git config --global include.path /home/node/.host-gitconfig
fi

export NVM_DIR=/usr/local/share/nvm
# shellcheck source=/dev/null
. "${NVM_DIR}/nvm.sh"

cd app
nvm install
nvm use
npm ci
