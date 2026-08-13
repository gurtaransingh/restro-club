import { NextResponse } from "next/server";
import {
  availabilitySlots,
  cartPreview,
  loyaltyTiers,
  roomStatuses,
  sportsSchedule,
  testimonials,
} from "@/lib/portal-data";

export function GET() {
  return NextResponse.json({
    availability: availabilitySlots,
    cart: cartPreview,
    loyalty: loyaltyTiers,
    rooms: roomStatuses,
    sports: sportsSchedule,
    testimonials,
  });
}
