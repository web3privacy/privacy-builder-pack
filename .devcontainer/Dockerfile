FROM mcr.microsoft.com/devcontainers/javascript-node:24

ENV NVM_DIR=/usr/local/share/nvm

# Match app/package.json engines and app/.nvmrc (single source: .nvmrc)
COPY app/.nvmrc /tmp/node-version
RUN NODE_VERSION="$(sed 's/^v//' /tmp/node-version | tr -d '\r\n')" \
  && su node -c ". \"${NVM_DIR}/nvm.sh\" && nvm install \"${NODE_VERSION}\" && nvm alias default \"${NODE_VERSION}\""

RUN mkdir -p /home/node/.claude /home/node/.ssh \
  && chown -R node:node /home/node/.claude /home/node/.ssh \
  && chmod 700 /home/node/.ssh
