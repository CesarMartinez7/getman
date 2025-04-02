#!/bin/bash

echo "Generando push"

# Leer el nombre de la rama
read -p "Nombre Rama: " rama

# Leer el mensaje del commit
read -p "Comment_commit: " comment_commit


concurrent_rama = $("git branch --show-current")



# Comandos Git
git add .
git commit -m "$comment_commit"
git push origin "$rama"