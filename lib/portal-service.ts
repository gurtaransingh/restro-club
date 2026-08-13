import type { PortalRequest } from "@/lib/portal-data";
import {
  portalAgenda,
  portalInvoices,
  portalNotifications,
  portalReadiness,
  portalRequests,
} from "@/lib/portal-data";

export type PortalSummaryMetric = {
  label: string;
  value: string;
  detail: string;
};

export type PortalSummary = {
  metrics: PortalSummaryMetric[];
  actionRequiredCount: number;
  modeledModulesCount: number;
  paidInvoiceCount: number;
};

export type PortalRequestInput = {
  topic?: unknown;
  details?: unknown;
  preferredChannel?: unknown;
};

export type PortalRequestValidation = {
  ok: true;
  request: PortalRequest;
} | {
  ok: false;
  errors: string[];
};

export function getPortalSummary(): PortalSummary {
  const actionRequiredCount = portalNotifications.filter((notification) => notification.urgency === "Action needed").length
    + portalRequests.filter((request) => request.status !== "Resolved").length;
  const modeledModulesCount = portalReadiness.filter((item) => item.progress === "Modeled").length;
  const paidInvoiceCount = portalInvoices.filter((invoice) => invoice.status === "Paid").length;

  return {
    actionRequiredCount,
    modeledModulesCount,
    paidInvoiceCount,
    metrics: [
      {
        label: "Upcoming items",
        value: String(portalAgenda.length),
        detail: "Dining, sports, stay and pool moments are visible together",
      },
      {
        label: "Action required",
        value: String(actionRequiredCount),
        detail: "Open requests and urgent notifications needing guest input",
      },
      {
        label: "Paid invoices",
        value: String(paidInvoiceCount),
        detail: "Restaurant, sports and membership records ready for download",
      },
      {
        label: "Modeled modules",
        value: String(modeledModulesCount),
        detail: "Identity, ordering, booking, loyalty and support handoffs documented",
      },
    ],
  };
}

export function validatePortalRequest(input: PortalRequestInput): PortalRequestValidation {
  const errors: string[] = [];
  const topic = typeof input.topic === "string" ? input.topic.trim() : "";
  const details = typeof input.details === "string" ? input.details.trim() : "";
  const preferredChannel = typeof input.preferredChannel === "string" ? input.preferredChannel.trim() : "";

  if (topic.length < 6) {
    errors.push("Topic must be at least 6 characters.");
  }

  if (details.length < 12) {
    errors.push("Details must be at least 12 characters.");
  }

  if (!preferredChannel) {
    errors.push("Preferred channel is required.");
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    request: {
      id: "REQ-DRAFT",
      topic,
      status: "Open",
      nextStep: `Concierge team will respond on ${preferredChannel}`,
    },
  };
}
