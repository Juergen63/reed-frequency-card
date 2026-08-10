#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SOURCE_FILE="$SCRIPT_DIR/reed-frequency-card.js"
TARGET_DIR="/Volumes/config/www/reed-frequency-card"
TARGET_FILE="$TARGET_DIR/reed-frequency-card.js"

if [ ! -f "$SOURCE_FILE" ]; then
  echo "Quelldatei nicht gefunden: $SOURCE_FILE" >&2
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "Home-Assistant-Freigabe nicht gefunden: $TARGET_DIR" >&2
  exit 1
fi

cp "$SOURCE_FILE" "$TARGET_FILE"

echo "Bereitgestellt: $TARGET_FILE"
