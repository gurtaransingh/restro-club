import { NextResponse } from "next/server";
import {
  auditEvents,
  eventEnquiries,
  inventoryItems,
  notificationTemplates,
  paymentRecords,
  staffRecords,
} from "@/lib/operations-data";

export function GET() {
  return NextResponse.json({
    inventory: inventoryItems,
    payments: paymentRecords,
    events: eventEnquiries,
    notifications: notificationTemplates,
    staff: staffRecords,
    audit: auditEvents,
  });
}
