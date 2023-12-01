import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { DependencyType, JsonFile } from 'projen';

const project = new CdklabsConstructLibrary({
  author: 'AWS',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.80.0',
  jsiiVersion: '~5.0.0',
  defaultReleaseBranch: 'main',
  name: '@aws-cdk/aws-lambda-dotnet',
  projenrcTs: true,
  release: false,
  repositoryUrl: 'https://github.com/cdklabs/awscdk-lambda-dotnet.git',
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation', 'dependabot[bot]', 'mergify[bot]'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  prettier: true,
  gitignore: [
    '*.d.ts',
    '*.generated.ts',
    '*.js',
    '**/integ.*.snapshot/asset.*/',
    '**/bin',
    '**/obj',
  ],
  publishToPypi: {
    distName: 'cdklabs.aws-lambda-dotnet',
    module: 'cdklabs.aws_lambda_dotnet',
  },
  publishToNuget: {
    packageId: 'Cdklabs.AWS.Lambda.DotNet',
    dotNetNamespace: 'Cdklabs.AWS.Lambda.DotNet',
  },
  publishToMaven: {
    mavenGroupId: 'io.github.cdklabs',
    javaPackage: 'io.github.cdklabs.aws.lambda.dotnet',
    mavenArtifactId: 'cdklabs-aws-lambda-dotnet',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-lambda-dotnet',
  },
});

project.package.addField('prettier', {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
});
project.eslint?.addRules({
  'prettier/prettier': [
    'error',
    { singleQuote: true, semi: true, trailingComma: 'es5' },
  ],
});

project.deps.addDependency(
  '@aws-cdk/integ-tests-alpha@2.80.0-alpha.0',
  DependencyType.TEST
);
new JsonFile(project, 'test/tsconfig.json', {
  obj: {
    extends: '../tsconfig.dev.json',
    include: ['./**/integ.*.ts'],
  },
});

project.synth();
