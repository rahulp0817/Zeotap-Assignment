import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Rule } from '@/app/models/rule.model';

export async function POST(request: Request) {
  try {
    const { name, description, ruleString } = await request.json();

    if (!name || !ruleString) {
      return NextResponse.json({ message: 'Name and ruleString are required' }, { status: 400 });
    }

    await connectDB();
    const newRule = await Rule.create({
      name,
      description,
      ruleString,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Rule created successfully', rule: newRule }, { status: 201 });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json({ message: 'Failed to create rule', error: error.message }, { status: 500 });
  }
}
