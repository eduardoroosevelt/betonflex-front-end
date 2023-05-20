#!/bin/sh

if [ ! -d "node_modules" ]; then
echo "Sí, sí existe."
else
  npm install
fi

exec "$@"