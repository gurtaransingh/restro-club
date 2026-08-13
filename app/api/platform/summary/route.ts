import { NextResponse } from "next/server";
import { adminMetrics, experiences, menuItems, roles } from "@/lib/platform-data";

export function GET() {
  return NextResponse.json({
    location: "Banur / Mohali National Highway",
    modules: experiences.length,
    menuItems: menuItems.length,
    roles: roles.length,
    metrics: adminMetrics,
  });
}
