#!/bin/bash
# Auto-rebuild watcher: monitors frontend src/ for changes and rebuilds automatically
WATCH_DIR="/app/frontend/src"
BUILD_DIR="/app/frontend"
LOCK_FILE="/tmp/frontend_build.lock"

echo "[watcher] Starting auto-rebuild watcher on $WATCH_DIR"

while true; do
  inotifywait -r -e modify,create,delete,move "$WATCH_DIR" --timeout 86400 2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "[watcher] Change detected, waiting 2s for batch edits..."
    sleep 2
    
    # Skip if already building
    if [ -f "$LOCK_FILE" ]; then
      echo "[watcher] Build already in progress, skipping"
      continue
    fi
    
    touch "$LOCK_FILE"
    echo "[watcher] Rebuilding frontend..."
    cd "$BUILD_DIR" && yarn build 2>&1 | tail -3
    
    if [ $? -eq 0 ]; then
      echo "[watcher] Build success, restarting server..."
      sudo supervisorctl restart frontend
      echo "[watcher] Done! Changes are live."
    else
      echo "[watcher] Build failed!"
    fi
    
    rm -f "$LOCK_FILE"
  fi
done
