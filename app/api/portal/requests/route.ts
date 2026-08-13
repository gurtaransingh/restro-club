import { NextRequest, NextResponse } from "next/server";
import { portalRequests } from "@/lib/portal-data";
import { validatePortalRequest } from "@/lib/portal-service";

export function GET() {
  return NextResponse.json({ requests: portalRequests });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const validation = validatePortalRequest(payload);

  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  return NextResponse.json({ request: validation.request }, { status: 201 });
}
