import { NextRequest } from 'next/server';

const PUBLIC_PATH = /\.(.*)$/;

export function middleware(req: NextRequest) {
  // 1. 上报日志
  if (!PUBLIC_PATH.test(req?.nextUrl?.pathname)) {
    // console.log(11111);
    // console.log(req.nextUrl.href);
    // console.log(req.referrer);
    // console.log(req.ua);
    // console.log(req.geo);
    // 接口上报
  }

  // 2. 重定向
  if (req?.nextUrl?.pathname === '/tag') {
    // return NextResponse?.redirect('/user/2');
  }
}
