Publishing steps:
- Update package.json version
- npm i
- npm run build
- cp package.json ./lib
- cp README.md ./lib
- cp assets ./lib
- cd lib
- npm publish