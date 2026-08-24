import { FiMessageSquare, FiCpu, FiCheckCircle } from "react-icons/fi";

export const workflow = [
  {
    step: "01",
    title: "Receive Query",
    description:
      "Customers describe their issue through text or voice, and Triage captures the request for AI-powered support.",
    icon: FiMessageSquare,
  },

  {
    step: "02",
    title: "AI Understands",
    description:
      "Triage analyzes the customer's message and determines the best response based on the conversation.",
    icon: FiCpu,
  },

  {
    step: "03",
    title: "Resolve or Escalate",
    description:
      "Customers get immediate assistance, while unresolved issues can be escalated into support tickets for further help.",
    icon: FiCheckCircle,
  },
];