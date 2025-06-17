#!/usr/bin/env bash
###############################################################################
#   setup.sh – Bootstrap local do monorrepo Teologia-FATEAL                  #
#   - Instala dependências Node, PNPM, Flutter SDK                           #
#   - Cria .envs de exemplo se faltarem                                      #
#   - Executa Prisma migrate + generate                                      #
#   - Faz build de frontend & backend (produção)                             #
###############################################################################
set -euo pipefail

cyan () { echo -e "\033[1;36m$*\033[0m"; }
green() { echo -e "\033[1;32m$*\033[0m"; }

ROOT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "$ROOT_DIR"

cyan "⚙️  Instalando Node / PNPM / dependências…"
if ! command -v pnpm &>/dev/null; then
  npm i -g pnpm
fi

pnpm install --dir backend_teologia
pnpm install --dir frontend_teologia

cyan "📦 Instalando Flutter… (skip se já instalado)"
if ! command -v flutter &>/dev/null; then
  git clone https://github.com/flutter/flutter.git -b stable "$HOME/flutter"
  export PATH="$HOME/flutter/bin:$PATH"
fi
flutter pub get --directory mobile_teologia

cyan "🔑 Gerando .envs de exemplo…"
for FILE in backend_teologia/.env frontend_teologia/.env; do
  [[ -f $FILE ]] || cp "${FILE}.example" "$FILE"
done

cyan "🛢️  Rodando migrations / Prisma Client"
pushd backend_teologia >/dev/null
pnpm prisma migrate deploy
pnpm prisma generate
popd >/dev/null

cyan "🏗️  Build de produção"
pnpm --dir backend_teologia run build
pnpm --dir frontend_teologia run build

green "✅ Ambiente pronto!  Rode './scripts/dev.sh' para subir tudo em modo DEV."