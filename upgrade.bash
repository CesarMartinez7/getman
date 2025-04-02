#!/bin/bash

set -e  # Detiene el script si algún comando falla

# Asignacion de colores para la terminal de Bash
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

echo "Generando Commit"

# Obtener la rama actual
concurrent_rama=$(git branch --show-current)

# Leer el mensaje del commit
read -p "Comentario del Commit: " comment_commit

# Verificar que el mensaje no esté vacío
if [[ -z "$comment_commit" ]]; then
    echo -e "${RED}Error: Asegúrate de poner texto en tu commit.${ENDCOLOR}"
    exit 1
fi

# Mostrar la rama en la que se hará el push
echo -e "${GREEN}Rama actual: ${concurrent_rama^^}${ENDCOLOR}"

# Ejecutar comandos Git
git add .
git commit -m "$comment_commit"

# Preguntar si desea hacer push
read -p "¿Deseas pushear a la rama ${concurrent_rama}? [Y/N]: " push_submit

# Convertir la respuesta a minúsculas para evitar errores
push_submit=${push_submit,,}

if [[ "$push_submit" == "y" ]]; then
    echo -e "${GREEN}Pusheando a la rama ${concurrent_rama}...${ENDCOLOR}"
    git push origin "$concurrent_rama"
else
    echo -e "${RED}Push cancelado.${ENDCOLOR}"
    exit 1
fi
