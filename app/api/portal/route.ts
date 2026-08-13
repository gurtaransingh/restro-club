import { NextResponse } from "next/server";
import { getPortalSummary } from "@/lib/portal-service";
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
    invoices: portalInvoices,
    loyalty: loyaltyTiers,
    notifications: portalNotifications,
    preferences: portalPreferences,
    quickActions: portalQuickActions,
    readiness: portalReadiness,
    preferences: portalPreferences,
    requests: portalRequests,
    rooms: roomStatuses,
    sports: sportsSchedule,
    summary: getPortalSummary(),
    testimonials,
  });
}
