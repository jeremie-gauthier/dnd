export interface ActionLog {
  type: string;
  createdAt: Date;
  data: Record<string, unknown>;
}
