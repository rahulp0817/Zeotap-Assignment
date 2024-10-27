import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { RuleEngine } from '@/lib/utils/rule-engine';
import { Rule } from '@/app/models/rule.model';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    if (!data) {
      return NextResponse.json({ message: 'No test data provided' }, { status: 400 });
    }

    await connectDB();
    const rule = await Rule.findOne().sort({ createdAt: -1 }); // Fetch the latest rule

    if (!rule) {
      return NextResponse.json({ message: 'No rules found' }, { status: 404 });
    }

    // Assuming your Rule model has a property `ruleString`
    const result = RuleEngine.evaluateRule(rule.ruleString, data); // Make sure to adjust this according to your actual logic
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error in evaluating rule:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to evaluate rule' },
      { status: 500 }
    );
  }
}
