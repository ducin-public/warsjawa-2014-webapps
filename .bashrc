function publish {
  grunt build
  git add .
  git commit --amend --no-edit
  git push origin master --force
  echo "done."
}
