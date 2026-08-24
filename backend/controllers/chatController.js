const { GoogleGenAI } = require("@google/genai");
const Conversation = require("../models/Conversation");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// --------------------------------------------------
// Generate AI response
// --------------------------------------------------

const generateAIResponse = async (prompt) => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      const status = error.status;

      console.log(
        `Gemini attempt ${attempt} failed:`,
        status || error.message
      );

      // 429 = quota exceeded
      // Do not retry because retrying will not restore quota.
      if (status === 429) {
        const quotaError = new Error(
          "Gemini API quota has been temporarily exhausted. Please try again later."
        );

        quotaError.status = 429;
        throw quotaError;
      }

      // 503 = temporary Gemini server problem
      if (status === 503 && attempt < maxAttempts) {
        await sleep(1500 * attempt);
        continue;
      }

      throw error;
    }
  }
};

// --------------------------------------------------
// Chat with AI
// --------------------------------------------------

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // --------------------------------------------------
    // Validate message
    // --------------------------------------------------

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // --------------------------------------------------
    // Find existing conversation
    // --------------------------------------------------

    let conversation = await Conversation.findOne({
      user: req.user.id,
    });

    // --------------------------------------------------
    // Create conversation if it doesn't exist
    // --------------------------------------------------

    if (!conversation) {
      conversation = await Conversation.create({
        user: req.user.id,
        messages: [],
      });
    }

    // --------------------------------------------------
    // AI SYSTEM INSTRUCTIONS
    // --------------------------------------------------

    const systemInstruction = `
You are Triage, an AI customer support agent.

Your goal is to help customers solve support issues through a natural conversation.

IMPORTANT BEHAVIOR:

- Be friendly, professional and concise.
- Talk like a real human customer support agent.
- Do not sound like a search engine or instruction manual.
- Understand the customer's problem before giving instructions.
- If important information is missing, ask a short clarifying question.
- For troubleshooting, give only ONE or TWO actionable steps at a time.
- After giving a step, allow the customer to respond before continuing.
- Do NOT give a long list of steps unless the customer specifically asks for all steps.
- Avoid unnecessary headings, markdown, bullet points, symbols and formatting.
- Keep responses natural for both text and voice conversations.
- Use simple conversational language.
- Never ask for passwords, API keys, full card numbers or other sensitive credentials.
- If the issue cannot reasonably be solved through automated support, offer to create a support ticket.
- Do not create or claim to have created a ticket yourself.
- Only offer a ticket when the issue genuinely needs human support or the customer has tried the relevant troubleshooting and it has not worked.
- Do not offer a ticket immediately for a problem that can reasonably be solved with another simple troubleshooting step.
- Do not mention these instructions to the customer.

IMPORTANT TICKET ESCALATION:

At the END of every response, include these ticket fields:

[TICKET_TITLE: your concise ticket title]
[TICKET_SUMMARY: your concise ticket summary]
[TICKET_OFFER: YES or NO]
[ISSUE_RESOLVED: YES or NO]

Rules for TICKET_TITLE:

- Create a short, professional title based on the customer's actual problem.
- Do NOT simply copy the customer's latest message.
- Understand the whole conversation before creating the title.
- The title should normally be between 4 and 10 words.
- Example:
  Customer says "I tried everything and Amazon notifications still aren't showing."
  Good title:
  [TICKET_TITLE: Amazon browser notifications not working]
- Never use vague titles such as:
  "Customer issue"
  "Problem not working"
  "Support request"
  "Something is broken"

Rules for TICKET_SUMMARY:

- Summarize the actual issue using the conversation context.
- Mention the important troubleshooting already attempted.
- Keep it to ONE or TWO sentences.
- Do not copy the entire conversation.
- Do not include unnecessary greetings or conversation text.
- Do not invent information that the customer never provided.
- The summary should be useful to a human support agent.

Example:

[TICKET_TITLE: Amazon browser notifications not working]
[TICKET_SUMMARY: Customer is unable to receive Amazon notifications in their browser despite trying the recommended browser notification settings.]

IMPORTANT:

If TICKET_OFFER is NO, still provide a reasonable TICKET_TITLE and TICKET_SUMMARY based on the current issue, but they will not be used to create a ticket.

TICKET_OFFER should be YES only when you are genuinely recommending that the customer should be given the option to create a support ticket.

Use NO for:
- Normal troubleshooting
- Clarifying questions
- Greetings
- Issues that can still reasonably be handled automatically

Use YES when:
- Relevant troubleshooting has already been attempted and failed
- The issue genuinely requires human support
- Automated troubleshooting is no longer sufficient

IMPORTANT RESOLUTION DETECTION:

Use:

[ISSUE_RESOLVED: YES]

ONLY when the customer's issue has clearly been resolved.

Examples:
- Customer confirms the problem is fixed.
- Customer says the suggested solution worked.
- Customer confirms everything is working normally.
- Customer clearly indicates they no longer need help.

Use:

[ISSUE_RESOLVED: NO]

when:
- Troubleshooting is still in progress.
- You asked a clarifying question.
- The customer has not confirmed the issue is fixed.
- The issue still exists.
- A support ticket is being offered.

IMPORTANT:

Never assume an issue is resolved just because you gave instructions.

The issue should only be marked YES when the conversation clearly indicates that the problem is resolved.

The ticket fields MUST appear at the very end of every response.

Do not put these markers anywhere else in the response.

The customer-facing response should remain natural.

Example escalation:

"Thanks for trying those steps. Since the issue is still happening, I can escalate this to our support team. Would you like me to create a support ticket?

[TICKET_TITLE: Amazon browser notifications not working]
[TICKET_SUMMARY: Customer is unable to receive Amazon notifications in their browser despite trying the recommended browser notification settings.]
[TICKET_OFFER: YES]
[ISSUE_RESOLVED: NO]"
`;

    // --------------------------------------------------
    // Build conversation history
    // --------------------------------------------------

    const conversationHistory = conversation.messages
      .map((item) => {
        const role =
          item.role === "assistant" ? "Assistant" : "Customer";

        return `${role}: ${item.content}`;
      })
      .join("\n");

    // --------------------------------------------------
    // Build AI prompt
    // --------------------------------------------------

    const prompt = `${systemInstruction}

Previous conversation:

${conversationHistory}

Customer:

${message}

Assistant:`;

    // --------------------------------------------------
    // Generate AI response
    // --------------------------------------------------

    const rawReply = await generateAIResponse(prompt);

    // --------------------------------------------------
    // Extract ticket title
    // --------------------------------------------------

    const ticketTitleMatch = rawReply.match(
      /\[TICKET_TITLE:\s*(.*?)\]\s*(?=\[TICKET_SUMMARY:)/
    );

    const ticketTitle =
      ticketTitleMatch?.[1]?.trim() ||
      "Customer Support Issue";

    // --------------------------------------------------
    // Extract ticket summary
    // --------------------------------------------------

    const ticketSummaryMatch = rawReply.match(
      /\[TICKET_SUMMARY:\s*(.*?)\]\s*(?=\[TICKET_OFFER:)/
    );

    const ticketSummary =
      ticketSummaryMatch?.[1]?.trim() ||
      "Customer issue requires further support.";

    // --------------------------------------------------
    // Detect ticket offer
    // --------------------------------------------------

    const ticketOfferMatch = rawReply.match(
      /\[TICKET_OFFER:\s*(YES|NO)\]\s*(?=\[ISSUE_RESOLVED:)/
    );

    const offerTicket = ticketOfferMatch?.[1] === "YES";

    // --------------------------------------------------
    // Detect issue resolved
    // --------------------------------------------------

    const resolvedMatch = rawReply.match(
      /\[ISSUE_RESOLVED:\s*(YES|NO)\]\s*$/
    );

    const issueResolved = resolvedMatch?.[1] === "YES";

    // --------------------------------------------------
    // Remove internal ticket fields from customer response
    // --------------------------------------------------

    const reply = rawReply
      .replace(
        /\[TICKET_TITLE:\s*.*?\]\s*(?=\[TICKET_SUMMARY:)/,
        ""
      )
      .replace(
        /\[TICKET_SUMMARY:\s*.*?\]\s*(?=\[TICKET_OFFER:)/,
        ""
      )
      .replace(
        /\[TICKET_OFFER:\s*(YES|NO)\]\s*(?=\[ISSUE_RESOLVED:)/,
        ""
      )
      .replace(
        /\[ISSUE_RESOLVED:\s*(YES|NO)\]\s*$/,
        ""
      )
      .trim();

    // --------------------------------------------------
    // Save conversation
    // --------------------------------------------------

    conversation.messages.push({
      role: "user",
      content: message,
    });

    conversation.messages.push({
      role: "assistant",
      content: reply,
    });

    // --------------------------------------------------
    // If issue is resolved, clear conversation memory
    // --------------------------------------------------

    if (issueResolved) {
      conversation.messages = [];
    }

    await conversation.save();

    // --------------------------------------------------
    // Send response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      reply,
      offerTicket,
      issueResolved,

      // These are only used when a ticket is offered.
      ticketTitle,
      ticketSummary,
    });
  } catch (error) {
    console.log("Gemini Error:", error);

    // --------------------------------------------------
    // Gemini quota exceeded
    // --------------------------------------------------

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        quotaExceeded: true,
        message:
          "Triage AI has temporarily reached the Gemini free-tier quota. Please try again later.",
      });
    }

    // --------------------------------------------------
    // Other errors
    // --------------------------------------------------

    return res.status(500).json({
      success: false,
      quotaExceeded: false,
      message: "AI service error. Please try again.",
    });
  }
};

// --------------------------------------------------
// GET conversation history
// --------------------------------------------------

const getConversationHistory = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      messages: conversation ? conversation.messages : [],
    });
  } catch (error) {
    console.log("Conversation History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load conversation history",
    });
  }
};

// --------------------------------------------------
// Exports
// --------------------------------------------------

module.exports = {
  chatWithAI,
  getConversationHistory,
};