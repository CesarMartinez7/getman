#!/bin/bash

echo "Generando push"

# Leer el nombre de la rama
read -p "Nombre Rama: " rama

# Leer el mensaje del commit
read -p "Comment_commit: " comment_commit

# Comandos Git
git add .
git commit -m "$comment_commit"
git push origin "$rama"