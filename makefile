install: install-deps

install-deps:
	npm ci

gendiff:
	bin/gendiff.js	

lint: 
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
