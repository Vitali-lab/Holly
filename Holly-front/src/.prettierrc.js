

export default {
  semi: true,                // всегда ставим точку с запятой
  singleQuote: true,          // одинарные кавычки для JS/TS и JSX
  jsxSingleQuote: false,      // но в JSX — двойные кавычки (удобнее для HTML‑атрибутов)
  trailingComma: 'es5',       // запятая в объектах/массивах для удобного диффа
  tabWidth: 2,                // стандартный отступ в 2 пробела
  useTabs: false,             // пробелы вместо табов
  printWidth: 100,            // ширина строки — чуть больше стандартных 80, чтобы анимации/props не ломались
  bracketSpacing: true,       // пробелы внутри { ... }
  arrowParens: 'always',      // всегда скобки у стрелочных функций
  endOfLine: 'lf',            // единый стиль переноса строк
  overrides: [
    {
      files: '*.css',
      options: { singleQuote: false } // в CSS лучше двойные кавычки
    }
  ]
};