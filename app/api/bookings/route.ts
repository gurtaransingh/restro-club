import { NextResponse } from "next/server";
import { bookingSteps, experiences } from "@/lib/platform-data";

export function GET() {
  return NextResponse.json({ bookingSteps, facilities: experiences });
}
