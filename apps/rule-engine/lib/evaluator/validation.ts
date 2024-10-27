import { RuleNode } from '../types';

export class RuleEvaluator {
  private nodes: Map<string, RuleNode>;

  constructor(nodes: RuleNode[]) {
    this.nodes = new Map(nodes.map(node => [node.id, node]));
  }

  private evaluateNode(nodeId: string, data: Record<string, any>): boolean {
    const node = this.nodes.get(nodeId);
    if (!node) throw new Error(`Node ${nodeId} not found`);

    if (node.type === 'operand') {
      const value = data[node.field!];
      switch (node.operator) {
        case '>': return value > node.value;
        case '<': return value < node.value;
        case '=': return value === node.value;
        case '>=': return value >= node.value;
        case '<=': return value <= node.value;
        default: throw new Error(`Invalid operator ${node.operator}`);
      }
    }

    const leftResult = this.evaluateNode(node.left!, data);
    const rightResult = this.evaluateNode(node.right!, data);

    switch (node.operator) {
      case 'AND': return leftResult && rightResult;
      case 'OR': return leftResult || rightResult;
      default: throw new Error(`Invalid operator ${node.operator}`);
    }
  }

  evaluate(data: Record<string, any>): boolean {
    const rootNode = Array.from(this.nodes.values())[0];
    return this.evaluateNode(rootNode.id, data);
  }
}