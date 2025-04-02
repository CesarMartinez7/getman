#!/bin/bash

echo "Generando push"


# Leer el mensaje del commit
read -p "Comment_commit: " comment_commit

# Ejecucion del comando entre por asi decirlo tuplas para ejecutar el comando y guardarlo en una variable
concurrent_rama=$(git branch --show-current)

echo Rama a la ejecutar push $concurrent_rama


# Comandos Git
git add .
git commit -m "$comment_commit"
git push origin "$cocurrent_rama"