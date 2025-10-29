import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  return NextResponse.redirect(new URL("/admin/dashboard", request.url));
};
