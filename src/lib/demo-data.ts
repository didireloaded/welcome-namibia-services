import type { SavedRequest } from "./request-schema";
export type DemoApplication = {
  id: string;
  client: string;
  service: string;
  date: string;
  status: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
  events?: { status: string; at: string }[];
  enquiry?: SavedRequest;
};
export const demoApplications: DemoApplication[] = [
  {
    id: "DEMO-001",
    client: "Sample client A",
    service: "Study permit support",
    date: "12 Jan 2027",
    status: "Under review",
    amount: 2400,
  },
  {
    id: "DEMO-002",
    client: "Sample client B",
    service: "Work permit support",
    date: "13 Jan 2027",
    status: "Documents needed",
    amount: 3600,
  },
  {
    id: "DEMO-003",
    client: "Sample client C",
    service: "Airport transfer",
    date: "14 Jan 2027",
    status: "Confirmed",
    amount: 750,
  },
  {
    id: "DEMO-004",
    client: "Sample client D",
    service: "Accommodation enquiry",
    date: "14 Jan 2027",
    status: "Submitted",
    amount: 1650,
  },
];
export const stages = [
  "Submitted",
  "Under review",
  "Submitted to authority",
  "Decision recorded",
];
