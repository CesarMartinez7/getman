#!/bin/bash

# Asignacion de los colores para la terminal de bash
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"


echo "Generando push"

# Rama actual para Push
concurrent_rama=$(git branch --show-current)

# Leer el mensaje del commit
read -p "Comentario Commit: " comment_commit

# Para ejecutar los condicionales en bash las sintaxis es muy importante para generar esto 

# Para saber la longitud de los caracteres de una variable se pone primero el colchon en la parte de la variable para saber el numero de caracteres o logitud q tiene una variable o cadena de texto

if [[ ${#comment_commit} == 0 ]]
then
    echo Asegurate de poner texto en tu Commit
else
    # Comandos Git
    # Utilizamos el caret para hacer que nuestra variable al menos en esa parte este en mayuscula, si queremos que se la primera letra entonces la , al final de la variable y si quermemos que todas sean minusculas entonces las cambiamos a una sola caret ^
    echo -e "${GREEN}Rama a la Ejecutar push ${concurrent_rama^^}, ${ENDCOLOR}"
    git add .
    git commit -m "$comment_commit"
    # Ejecucion del comando entre por asi decirlo tuplas para ejecutar el comando y guardarlo en una variable
    resultado=$(git push origin "$cocurrent_rama")
    echo $resultado

    read -p "Deseas pushear a la rama ${cocurrent_rama}" push_submit


    
fi








