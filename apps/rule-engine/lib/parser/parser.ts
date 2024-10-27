import { NodeType, Operator, RuleNode } from '../types';
import { Tokenizer } from './tokenizer';

export class RuleParser {
  private tokens: string[] = [];
  private current = 0;

  constructor(private input: string) {
    const tokenizer = new Tokenizer(input);
    this.tokens = tokenizer.tokenize();
  }

  private isOperator(token: string): boolean {
    return ['AND', 'OR', '>', '<', '=', '>=', '<='].includes(token);
  }

  private parseCondition(): RuleNode {
    const field = this.tokens[this.current++];
    const operator = this.tokens[this.current++] as Operator;
    const value = this.tokens[this.current++];

    return {
      id: crypto.randomUUID(),
      type: 'operand',
      field,
      operator,
      value: isNaN(Number(value)) ? value.replace(/['"]/g, '') : Number(value),
      ruleId: '' // This will be set when saving to database
    };
  }

  private parseExpression(): RuleNode {
    if (this.tokens[this.current] === '(') {
      this.current++; // Skip (
      const left = this.parseExpression();
      const operator = this.tokens[this.current++] as Operator;
      const right = this.parseExpression();
      this.current++; // Skip )

      return {
        id: crypto.randomUUID(),
        type: 'operator',
        operator,
        left: left.id,
        right: right.id,
        ruleId: '' // This will be set when saving to database
      };
    }

    return this.parseCondition();
  }

  parse(): RuleNode {
    return this.parseExpression();
  }
}