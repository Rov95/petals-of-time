module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: './tsconfig.json' }], 
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], 
    globals: {
        'ts-jest': {
        useESM: true, 
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
};