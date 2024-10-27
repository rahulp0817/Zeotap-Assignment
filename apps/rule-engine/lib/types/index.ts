export type NodeType = 'operator' | 'operand';
export type Operator = 'AND' | 'OR' | '>' | '<' | '=' | '>=' | '<=';

export interface Node {
  type: NodeType;
  operator: Operator;
  left?: Node;
  right?: Node;
  field?: string;
  value?: any;
}

export interface Rule {
  _id?: string;
  name: string;
  description: string;
  ruleString: string;
  ast: Node;
  createdAt: Date;
  updatedAt: Date;
}