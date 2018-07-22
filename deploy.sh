#!/bin/bash
rm -rf ../build
rm -rf ./build

echo 'REMOVED OLD BUILD FOLDERS!!!';

echo 'BUILD STARTED!!!';

npm run build

if [[ "$?" -ne 0 ]] ; then
  echo 'BUILD FAILED!!!'; exit $rc
fi

echo 'BUILD SCCESSED!!!';

cp -rf ./build/ ../build/

echo 'COPY FOLDER!!!';

cd ../build/

echo 'CONTECTED TO BUILD DIRECTORY!!!';

git init
git remote add origin https://github.com/baaraak/tarely-client.git
git checkout -b deployment
git add .
git commit -am "push to deploy"
git push -u origin deployment

