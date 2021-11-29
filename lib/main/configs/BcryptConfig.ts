class BcryptConfig {
  get saltLenght(): number {
    return 8;
  }
}

export const bcryptConfig = new BcryptConfig();
