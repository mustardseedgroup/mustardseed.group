export const sensitiveKeywords = [
  "secret",
  "token",
  "api key",
  "prompt",
  "system prompt",
  "runbook",
  "scoring",
  "lead engine",
  "memory schema",
  "client data",
  "internal",
  "private",
  "pricing logic",
  "unreleased",
  "exploit",
  "credential",
  "webhook secret",
];

export type SafetyResult = {
  safe: boolean;
  matches: string[];
};

export function safetyCheck(input: unknown): SafetyResult {
  const text = JSON.stringify(input).toLowerCase();
  const matches = sensitiveKeywords.filter((keyword) => text.includes(keyword));
  return {
    safe: matches.length === 0,
    matches,
  };
}
