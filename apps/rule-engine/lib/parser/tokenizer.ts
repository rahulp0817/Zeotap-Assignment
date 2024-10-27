export class Tokenizer {
  private input: string;
  private tokens: string[] = [];
  private current = 0;

  constructor(input: string) {
    this.input = input;
  }

  tokenize(): string[] {
    return this.input
      .replace(/([()><=])/g, ' $1 ')
      .replace(/AND|OR/g, ' $& ')
      .split(/\s+/)
      .filter(t => t.length > 0);
  }
}
