echo "Generando push"

echo "Rama principal"
read rama_principal :
echo "Commit comment"
read comment_commit
git add .
git commit -m $comment_commit
git push origin $rama_principal