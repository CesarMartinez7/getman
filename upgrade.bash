#!/bin/bash

set -e  # Detener el script si algun comando no se ejecuta correctamente


# Si una funcion no tiene parametros no hace falta que se pongan las comillas para generar los comentarios
status_git(){
    git status 
}


# Los parametros en las funciones en bash se pasan por posiciones la primera posicion es el nombre del archivo / funcion a realizar el segundo parametro si es el argumento que se le pasa
type_commit(){
    echo "Hola escribe aqui el tipo de commit que quieres hacer $1 "
}

status_git
type_commit "Cesr"



# Asignacion de colores para la terminal de Bash
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

echo "Generando Commit"

# Obtener la rama actual
concurrent_rama=$(git branch --show-current)

# Leer el mensaje del committ
read -p "Comentario del commit:      " comment_commit

# Verificar que el mensaje no esté vacío
# El argumento -z define si una cadena de string esta vacia mejor dicho
if [[ -z "$comment_commit" ]]; then
    echo -e "${RED}Error: Asegúrate de poner texto en tu commit.${ENDCOLOR}"
    # Exit 1 para salirme del script, es un equivalente a exit() algo asi en python 0 para no salirse.
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
