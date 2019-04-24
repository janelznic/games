export interface Call {
  readonly id: number;
  readonly called_at: Date;
}

export interface GetCallsOptions {
  readonly dayInWeek: string;
}
