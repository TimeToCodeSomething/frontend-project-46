// eslint.config.js

export default [
		// 1) Общие настройки (игнорируемые пути, глобальные опции и т.п.)
		{
				ignores: ['dist', 'node_modules'], // игнорируемые папки/файлы
		},

		// 2) Основной блок для JS-файлов
		{
				files: ['**/*.js'],               // к каким файлам применять
				languageOptions: {
						ecmaVersion: 'latest',          // версия ECMAScript
						sourceType: 'module',           // или 'script', если используешь старый JS
				},
				rules: {
						'semi': ['error', 'always'],
						'quotes': ['error', 'single'],
						'no-console': 'off',
				},
		},
];
