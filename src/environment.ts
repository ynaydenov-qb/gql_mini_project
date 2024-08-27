import dotenv from 'dotenv';

dotenv.config();

type EnvConfig = {
  NODE_ENV: string;
  AUTH_TOKEN: string;
};

class Environment {
  private static instance: Environment;

  private envConfig: EnvConfig;

  private constructor() {
    this.envConfig = this.loadEnv();
  }

  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  private loadEnv(): EnvConfig {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const authToken = process.env.AUTH_TOKEN;

    if (!authToken) {
      throw new Error('Missing required environment variable: AUTH_TOKEN');
    }

    return {
      NODE_ENV: nodeEnv,
      AUTH_TOKEN: authToken,
    };
  }

  public get(key: keyof EnvConfig): string {
    return this.envConfig[key];
  }
}

export const env = Environment.getInstance();
