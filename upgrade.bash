#!/bin/bash
# Asignacion de los colores para la terminal de bash

RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"


echo "Generando push"


# Leer el mensaje del commit
read -p "Comentario Commit: " comment_commit

# Ejecucion del comando entre por asi decirlo tuplas para ejecutar el comando y guardarlo en una variable
concurrent_rama=$(git branch --show-current)


# Utilizamos el caret para hacer que nuestra variable al menos en esa parte este en mayuscula, si queremos que se la primera letra entonces la , al final de la variable y si quermemos que todas sean minusculas entonces las cambiamos a una sola caret ^

echo -e "${GREEN}Rama a la Ejecutar push ${concurrent_rama^^}, ${ENDCOLOR}"


# Comandos Git
git add .
git commit -m "$comment_commit"
resultado=$(git push origin "$cocurrent_rama")

echo resultado