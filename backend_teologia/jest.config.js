/**
 * @jest-environment node
 * Jest config for testing the NestJS application
 */
module.exports = {
  // Usa o preset para TypeScript (ts-jest)
  preset: 'ts-jest',

  // Define o ambiente de teste (Node.js)
  testEnvironment: 'node',

  // Extensões de arquivos que o Jest vai entender
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Diretório raiz onde os testes estão localizados
  rootDir: 'src',

  // Regex para encontrar arquivos de teste (spec.ts)
  testRegex: '.*\\.spec\\.ts$',

  // Transformações para arquivos TypeScript e JavaScript
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Gera cobertura de código (opcional, recomendado)
  collectCoverage: true,
  coverageDirectory: '../coverage', // pasta onde fica o relatório
  coverageReporters: ['text', 'lcov'],

  // Mapeamento de módulos se necessário (ex: paths do tsconfig)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Suporte para @/ caminho do src
  },

  // Ativa logs mais detalhados nos testes
  verbose: true,
};