#!/bin/bash

BRANCH="main"   # change if needed
INTERVAL=600    # 10 minutes

cd "$(dirname "$0")"

echo "🚀 Auto Git started on branch: $BRANCH"

while true
do
  # Check if there are changes
  if [[ -n $(git status --porcelain) ]]; then
    echo "🔄 Changes detected..."
    git add .
    # Better commit message
    MSG="auto: $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$MSG"
    git push origin $BRANCH
    echo " Pushed: $MSG"
  else
    echo "😴 No changes..."
  fi
  sleep $INTERVAL
done