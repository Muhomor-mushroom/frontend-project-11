install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

deploy:
	npx webpack serve
	
lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

publish:
	npm publish

serve:
	npx webpack serve