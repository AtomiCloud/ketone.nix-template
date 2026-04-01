import { type Cyan, type CyanGlob, StartTemplateWithLambda, GlobType } from '@atomicloud/cyan-sdk';

const prefix = 'cyan/nix/';

StartTemplateWithLambda(async (i, d) => {
  const basic = await i.select(
    'Add basic binaries (coreutils etc)?',
    ['yes', 'no'],
    `${prefix}basic`,
  );

  const llm = await i.select(
    'Add LLM support (CLAUDE.md and skills)?',
    ['yes', 'no'],
    `${prefix}llm`,
  );

  const basicGlobs: CyanGlob[] =
    basic === 'yes'
      ? [
          {
            root: 'templates/basic',
            glob: '**/*',
            type: GlobType.Template,
            exclude: [],
          },
        ]
      : [];

  const llmGlobs: CyanGlob[] =
    llm === 'yes'
      ? [
          {
            root: 'templates/llm',
            glob: '**/*',
            type: GlobType.Template,
            exclude: [],
          },
        ]
      : [];

  const config = {
    vars: {},
    parser: {
      varSyntax: [],
    },
  };

  const processors = [
    {
      name: 'cyan/default',
      files: [
        {
          root: 'templates/base',
          glob: '**/*',
          type: GlobType.Template,
          exclude: [],
        },
      ],
      config,
    },
  ];

  if (basic === 'yes') {
    processors.push({
      name: 'cyan/default',
      files: [
        {
          root: 'templates/basic',
          glob: '**/*',
          type: GlobType.Template,
          exclude: [],
        },
      ],
      config,
    });
  }

  if (llm === 'yes') {
    processors.push({
      name: 'cyan/default',
      files: [
        {
          root: 'templates/llm',
          glob: '**/*',
          type: GlobType.Template,
          exclude: [],
        },
      ],
      config,
    });
  }

  return {
    processors,
    plugins: [],
  };
});
