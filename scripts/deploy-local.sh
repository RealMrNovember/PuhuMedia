#!/usr/bin/env bash
# Puhu Media — build & deploy on the same server.
# Usage: ./scripts/deploy-local.sh
#
# Touches only:
#   /www/wwwroot/puhumedia.com.tr/current
#   /www/wwwroot/puhumedia.com.tr/release-tools
# Uploads live in /www/wwwroot/puhumedia.com.tr/uploads (persisted via symlink).

set -euo pipefail

ROOT="/www/wwwroot/puhumedia.com.tr"
APP="${ROOT}/app"
REMOTE_DIR="${ROOT}"
NODE_BIN="${REMOTE_DIR}/.node/bin"
PM2_HOME="${REMOTE_DIR}/.pm2"
UPLOADS="${REMOTE_DIR}/uploads"

export PATH="${NODE_BIN}:$PATH"
export PM2_HOME

cd "${APP}"

echo "==> Prisma generate + migrate..."
npx prisma generate
npx prisma migrate deploy
rsync -a --delete "${APP}/prisma/" "${REMOTE_DIR}/release-tools/prisma/"

echo "==> Building..."
npm run build

echo "==> Assembling standalone bundle..."
rm -rf .next/standalone/.next/static .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
# Never ship uploads inside the bundle; use persistent volume
rm -rf .next/standalone/public/uploads

echo "==> Swapping current..."
pm2 stop puhumedia || true
rm -rf "${REMOTE_DIR}/current_prev"
mv "${REMOTE_DIR}/current" "${REMOTE_DIR}/current_prev"
mkdir -p "${REMOTE_DIR}/current"
# Dereference most files but restore uploads symlink after copy
cp -a .next/standalone/. "${REMOTE_DIR}/current/"
cp "${REMOTE_DIR}/current_prev/.env" "${REMOTE_DIR}/current/.env"
cp "${REMOTE_DIR}/current_prev/ecosystem.config.js" "${REMOTE_DIR}/current/ecosystem.config.js" 2>/dev/null || cp "${APP}/ecosystem.config.js" "${REMOTE_DIR}/current/ecosystem.config.js"

mkdir -p "${UPLOADS}"
ln -sfn "${UPLOADS}" "${REMOTE_DIR}/current/public/uploads"

cd "${REMOTE_DIR}/current"
npm install sharp --no-save --legacy-peer-deps >/dev/null

pm2 restart puhumedia || pm2 start ecosystem.config.js
pm2 save

sleep 2
if curl -sf -o /dev/null http://127.0.0.1:3010/; then
  echo "Health check OK"
  rm -rf "${REMOTE_DIR}/current_prev"
else
  echo "Health check FAILED - rolling back"
  rm -rf "${REMOTE_DIR}/current"
  mv "${REMOTE_DIR}/current_prev" "${REMOTE_DIR}/current"
  pm2 restart puhumedia
  exit 1
fi

echo "==> Deploy complete."
