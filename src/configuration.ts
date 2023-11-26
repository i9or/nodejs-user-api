type MaybeUndefinedConfigurationMap<T extends string> = {
  readonly [key in T]: Readonly<string | undefined>;
};

type ConfigurationMap<T extends string> = {
  readonly [key in T]: Readonly<string>;
};

const defineConfiguration = <T extends string>(
  configuration: MaybeUndefinedConfigurationMap<T>,
) => {
  // Simple validation that every environment variable is defined
  Object.entries(configuration).map(([key, value]) => {
    if (!value) {
      throw new Error(
        `Property ${key} is not defined, check your environment variables!`,
      );
    }
  });

  return configuration as ConfigurationMap<keyof typeof configuration>;
};

const ENV = defineConfiguration({
  PORT: process.env.PORT,
  POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING,
});

export const PORT = parseInt(ENV.PORT);
export const POSTGRES_CONNECTION_STRING = ENV.POSTGRES_CONNECTION_STRING;
