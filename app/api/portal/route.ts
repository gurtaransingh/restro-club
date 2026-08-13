import { NextResponse } from "next/server";
import {
  accountSummary,
  availabilitySlots,
  cartPreview,
  loyaltyTiers,
  portalAgenda,
  portalInvoices,
  portalNotifications,
  portalPreferences,
  portalQuickActions,
  portalReadiness,
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
    invoices: portalInvoices,
    loyalty: loyaltyTiers,
    notifications: portalNotifications,
    preferences: portalPreferences,
    quickActions: portalQuickActions,
    readiness: portalReadiness,
    requests: portalRequests,
    rooms: roomStatuses,
    sports: sportsSchedule,
    testimonials,
  });
}
