install: deps-install
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

deps-install:
	npm ci

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm run test-coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: install run deps-install deps-update test test-coverage lint publish
