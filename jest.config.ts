import { pathsToModuleNameMapper, type JestConfigWithTsJest }  from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
    displayName: 'card-app',
    preset: 'jest-preset-angular',
    roots: ['./'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageDirectory: '<rootDir>/coverage',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular', 
            { 
                tsconfig: '<rootDir>/tsconfig.spec.json',
                 stringifyContentPathRegex: '\\.(html|svg)$'
                }
            ]
    },
    modulePaths: ['<rootDir>'],
    modulePathIgnorePatterns: ['<rootDir>/src/environments/'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist',
    ],
    transformIgnorePatterns: ['node_modules/.pnpm/(?!(.*\\.mjs|.*\\.js|@ionic/angular))'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ]
};