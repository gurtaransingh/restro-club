import { NextResponse } from "next/server";
import { menuItems } from "@/lib/platform-data";

export function GET() {
  return NextResponse.json({ items: menuItems });
}
