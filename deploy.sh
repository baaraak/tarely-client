#!/bin/bash
rm -rf ../buildClient
rm -rf ./build

echo 'REMOVED OLD BUILD FOLDERS!!!';

echo 'BUILD STARTED!!!';

npm run build

if [[ "$?" -ne 0 ]] ; then
  echo 'BUILD FAILED!!!'; exit $rc
fi

echo 'BUILD SCCESSED!!!';

cp -rf ./build/ ../buildClient/
cp -rf ./composer.json ../buildClient/

echo 'COPY FOLDER!!!';

cd ../buildClient
find . -name "*.js.map" -exec rm {} \;
find . -name "*.css.map" -exec rm {} \;

echo 'CONTECTED TO BUILD DIRECTORY!!!';


git init
git remote add origin https://github.com/baaraak/tarely-client.git
git checkout -b deployment
git fetch
git rebase deployment
git add .
git commit -am "push to deploy"
git push -u -f origin deployment
