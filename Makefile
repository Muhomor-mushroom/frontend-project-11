install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

develop:
	npx webpack serve
	
lint:
	npx eslint .

linter-fix:
	npx eslint --fix .

publish:
	npm publish

serve:
	npx webpack serve