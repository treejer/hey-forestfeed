import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-v2-mumbai-live.lens.dev',
  customFetch: 'node-fetch',
  documents: './documents/**/*.graphql',
  generates: {
    'generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher'
      ]
    }
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix', 'prettier --write']
  }
};

export default config;
