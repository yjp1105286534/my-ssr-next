import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log(22222);
  console.log(req);
}
