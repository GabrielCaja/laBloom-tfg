#!/bin/bash

# Define la nueva URL de API
API_URL="http://88.198.109.171:8000"

# Reemplaza todas las ocurrencias de http://localhost:8000 por la IP en archivos fuente
echo "Reemplazando URLs en archivos fuente..."
grep -rl 'http://localhost:8000' ./src | xargs sed -i "s|http://localhost:8000|$API_URL|g"

echo "Reemplazo completo."
