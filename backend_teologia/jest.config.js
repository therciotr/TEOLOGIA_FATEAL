/**
 * @jest-environment node
 * Jest config for testing the NestJS application
 */

module.exports = {
  // Usa o preset para TypeScript (ts-jest)
  preset: 'ts-jest',

  // Define o ambiente de teste (Node.js)
  testEnvironment: 'node',

  // Define as extensões que o Jest irá reconhecer
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Define a raiz dos arquivos de testes
  rootDir: 'src',

  // Expressão para localizar os arquivos de teste (padrão: *.spec.ts)
  testRegex: '.*\\.spec\\.ts$',

  // Define como os arquivos devem ser transformados
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Relatórios de cobertura de código
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Caminhos personalizados (alias)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',       // permite usar @/ no lugar de caminhos relativos
  },

  // Ignora transformações de node_modules (se algum der erro)
  transformIgnorePatterns: ['node_modules'],

  // Ativa saída detalhada dos testes
  verbose: true,

  // Ignora arquivos de definição de tipos nos testes
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Ignora arquivos gerados na cobertura
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '.module.ts',
    '.dto.ts',
    '.entity.ts',
  ],
};