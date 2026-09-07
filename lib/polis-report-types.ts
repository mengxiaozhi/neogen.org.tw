export type ReportStatement = { sid: number; text: string };
export type OpinionPoint = { x: number; y: number; group: number };
export type StatementStats = { sid: number; agrees: number; disagrees: number; passes: number; seen: number };
export type ReportGroup = {
  id: number; label: string; size: number; statsRedacted?: boolean;
  representative: { sid: number; direction: "agree" | "disagree"; prob: number; nSuccess: number; nSeen: number }[];
  statementStats?: StatementStats[];
};
export type PolisReport = {
  result: {
    computedAt: number; nParticipantsTotal: number; nParticipantsClustered: number;
    nVotes: number; nStatements: number; inclusionThreshold: number; k: number;
    points: OpinionPoint[]; groups: ReportGroup[]; statementStats: StatementStats[];
    consensus: { agree: { sid: number; prob: number }[]; disagree: { sid: number; prob: number }[] };
    bridging?: { statements: { sid: number; score: number; polarity: number; seen: number; agrees: number }[] } | null;
  };
  you: OpinionPoint | null;
};
export type SynthesisReady = {
  status: "ready"; generationMode: "ai" | "deterministic"; model: string;
  generatedAt: number; isStale?: boolean; refreshPending?: boolean;
  provenance: { generatedAt: number; participantCount: number; clusteredCount: number; statementCount: number; voteCount: number; groupCount: number };
  overview: { summary: string; participantContext: string; citedStatementIds: number[] };
  themes: { id: string; title: string; description: string; statementIds: number[]; primaryStatementIds: number[]; secondaryStatementIds: number[] }[];
  commonGround: { summary: string; keyPoints: { title: string; description: string; direction: "agree" | "disagree"; citedStatementIds: number[] }[] };
  groupPortraits: { groupId: number; groupLabel: string; size: number; title: string; summary: string; keyStances: { sid: number; stance: "agree" | "disagree"; summary: string }[]; citedStatementIds: number[] }[];
  tensions: { groupAId: number; groupALabel: string; groupBId: number; groupBLabel: string; topic: string; groupAPerspective: string; groupBPerspective: string; tensions: string; bridgingQuestion: string; citedStatementIds: number[] }[];
};
export type PolisSynthesis = SynthesisReady
  | { status: "pending"; retryAfterMs?: number }
  | { status: "insufficient"; reason: string; counts: { participants: number; clustered: number; statements: number; votes: number } }
  | { status: "unavailable"; reason: string; retryAfter?: number };
