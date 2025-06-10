#!/bin/bash

# Define la URL localhost original
API_URL="http://localhost:8000"

# Reemplaza todas las ocurrencias de la IP por localhost en archivos fuente
echo "Revirtiendo URLs en archivos fuente..."
grep -rl 'http://88.198.109.171:8000' ./src | xargs sed -i "s|http://88.198.109.171:8000|$API_URL|g"

echo "Reversión completa."
