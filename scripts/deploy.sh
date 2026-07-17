#!/usr/bin/env bash
# Puhu Media — local build, remote deploy script.
# Usage: ./scripts/deploy.sh
#
# Builds the app locally, packages the Next.js standalone output, and ships
# it to the production server via SSH. Only touches:
#   /www/wwwroot/puhumedia.com.tr/current       (app runtime)
#   /www/wwwroot/puhumedia.com.tr/release-tools (prisma CLI for migrations)
# Never touches any other site or service on the server.

set -euo pipefail

SERVER="root@31.40.199.47"
REMOTE_DIR="/www/wwwroot/puhumedia.com.tr"
NODE_BIN="${REMOTE_DIR}/.node/bin"
PM2_HOME="${REMOTE_DIR}/.pm2"
TMP_TAR="/tmp/puhumedia-deploy-$(date +%s).tar.gz"

echo "==> Building locally..."
npm run build

echo "==> Assembling standalone bundle..."
rm -rf .next/standalone/.next/static .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
rm -rf .next/standalone/public/uploads

echo "==> Packaging (dereferencing symlinks so it works cross-platform)..."
tar -czhf "$TMP_TAR" -C .next/standalone .

echo "==> Uploading..."
scp "$TMP_TAR" "${SERVER}:/tmp/puhumedia-deploy.tar.gz"
rm -f "$TMP_TAR"

echo "==> Deploying on server..."
ssh "$SERVER" bash -s <<REMOTE
set -e
export PATH="${NODE_BIN}:\$PATH"
export PM2_HOME="${PM2_HOME}"

pm2 stop puhumedia || true
rm -rf "${REMOTE_DIR}/current_prev"
mv "${REMOTE_DIR}/current" "${REMOTE_DIR}/current_prev"
mkdir -p "${REMOTE_DIR}/current"
tar -xzf /tmp/puhumedia-deploy.tar.gz -C "${REMOTE_DIR}/current"
cp "${REMOTE_DIR}/current_prev/.env" "${REMOTE_DIR}/current/.env"
cp "${REMOTE_DIR}/current_prev/ecosystem.config.js" "${REMOTE_DIR}/current/ecosystem.config.js"
rm -f /tmp/puhumedia-deploy.tar.gz

cd "${REMOTE_DIR}/current"
npm install sharp --no-save --legacy-peer-deps

cd "${REMOTE_DIR}/release-tools"
npx prisma migrate deploy

cd "${REMOTE_DIR}/current"
pm2 restart puhumedia
pm2 save

sleep 2
curl -sf -o /dev/null http://127.0.0.1:3010/ && echo "Health check OK" || (echo "Health check FAILED - rolling back" && rm -rf "${REMOTE_DIR}/current" && mv "${REMOTE_DIR}/current_prev" "${REMOTE_DIR}/current" && pm2 restart puhumedia && exit 1)

rm -rf "${REMOTE_DIR}/current_prev"
REMOTE

echo "==> Deploy complete."
