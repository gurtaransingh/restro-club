import { NextResponse } from "next/server";
import {
  accountSummary,
  availabilitySlots,
  cartPreview,
  loyaltyTiers,
  portalAgenda,
  portalPreferences,
  portalRequests,
  roomStatuses,
  sportsSchedule,
  testimonials,
} from "@/lib/portal-data";

export function GET() {
  return NextResponse.json({
    account: accountSummary,
    agenda: portalAgenda,
    availability: availabilitySlots,
    cart: cartPreview,
    loyalty: loyaltyTiers,
    preferences: portalPreferences,
    requests: portalRequests,
    rooms: roomStatuses,
    sports: sportsSchedule,
    testimonials,
  });
}
