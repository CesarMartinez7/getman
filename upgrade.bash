
echo "Generando push"


read -p "Nombre Rama":
read -p "Comment_commit"

git add .
git commit -m "$comment_commit"
git push origin $rama_principal