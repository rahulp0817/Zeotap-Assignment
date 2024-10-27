import { Node, Operator } from '@/lib/types';

// Assuming you have these types defined somewhere
export type Operator = 'AND' | 'OR' | '>' | '<' | '=' | '>=' | '<=';

export class RuleEngine {
  private static isValidOperator(op: string): op is Operator {
    return ['AND', 'OR', '>', '<', '=', '>=', '<='].includes(op);
  }

  static createRule(ruleString: string): Node {
    try {
      const cleanRule = ruleString.replace(/\s+/g, ' ').trim();
      if (!this.validateParentheses(cleanRule)) {
        throw new Error('Invalid parentheses matching');
      }
      return this.parseExpression(cleanRule);
    } catch (error) {
      throw new Error(`Invalid rule string: ${error.message}`);
    }
  }

  private static validateParentheses(expr: string): boolean {
    let count = 0;
    for (const char of expr) {
      if (char === '(') count++;
      if (char === ')') count--;
      if (count < 0) return false; // More closing than opening
    }
    return count === 0; // Ensure all parentheses are closed
  }

  private static parseExpression(expr: string): Node {
    // Remove outer parentheses if they exist
    expr = expr.replace(/^\((.*)\)$/, '$1');

    let depth = 0;
    let splitIndex = -1;
    let operator: Operator | '' = ''; // Initialize as empty string

    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '(') depth++;
      else if (expr[i] === ')') depth--;
      else if (depth === 0) {
        if (expr.startsWith(' AND ', i)) {
          splitIndex = i;
          operator = 'AND';
          break;
        } else if (expr.startsWith(' OR ', i)) {
          splitIndex = i;
          operator = 'OR';
          break;
        }
      }
    }

    if (splitIndex !== -1) {
      const left = expr.substring(0, splitIndex).trim();
      const right = expr.substring(splitIndex + (operator === 'AND' ? 5 : 4)).trim();
      return {
        type: 'operator',
        operator,
        left: this.parseExpression(left),
        right: this.parseExpression(right),
      };
    }

    const comparisonMatch = expr.match(/(\w+)\s*([><=]+)\s*(['"]?)([^'"]+)\3/);
    if (!comparisonMatch) {
      throw new Error(`Invalid comparison expression: ${expr}`);
    }

    const [, field, operatorMatch, , value] = comparisonMatch;
    
    // Type assertion for operatorMatch
    if (!this.isValidOperator(operatorMatch)) {
      throw new Error(`Invalid operator: ${operatorMatch}`);
    }

    return {
      type: 'operand',
      operator: operatorMatch as Operator,
      field,
      value: this.parseValue(value),
    };
  }

  private static parseValue(value: string): any {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      return numValue; // Return numeric value if it's a number
    }
    return value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
  }

  static evaluateRule(node: Node, data: Record<string, any>): boolean {
    if (node.type === 'operator') {
      const leftResult = node.left ? this.evaluateRule(node.left, data) : false;
      const rightResult = node.right ? this.evaluateRule(node.right, data) : false;

      switch (node.operator) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          throw new Error(`Invalid operator: ${node.operator}`);
      }
    }

    if (node.type === 'operand') {
      const fieldValue = data[node.field]; // Use non-null assertion since field is defined here
      if (fieldValue === undefined) {
        throw new Error(`Field not found in data: ${node.field}`);
      }

      switch (node.operator) {
        case '>': return fieldValue > node.value;
        case '<': return fieldValue < node.value;
        case '=': return fieldValue === node.value;
        case '>=': return fieldValue >= node.value;
        case '<=': return fieldValue <= node.value;
        default: throw new Error(`Invalid comparison operator: ${node.operator}`);
      }
    }

    throw new Error('Invalid node type or missing field');
  }
}
