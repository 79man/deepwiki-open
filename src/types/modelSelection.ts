export type ModelSelectionParams = {
  provider: string;
  model: string;
  isCustomModel: boolean;
  customModel: string;
  isComprehensiveView: boolean;
  excludedDirs?: string;
  excludedFiles?: string;
  includedDirs?: string;
  includedFiles?: string;
  token?: string;
  authCode?: string;
};
