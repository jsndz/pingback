import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ token: null }, { status: 401 });
    }
    const tokenSet = await auth0.getAccessToken();
    return NextResponse.json({ token: tokenSet.token });
  } catch {
    return NextResponse.json({ token: null }, { status: 401 });
  }
}
