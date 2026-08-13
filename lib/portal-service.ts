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
