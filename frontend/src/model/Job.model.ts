export interface JobModel {
  id: number;
  job: string;
  path: string;
  ci: number;
}

export interface JobStatusModel {
  name: string;
  buildNumber: string;
  buildStatus: string;
  buildUrl: string;
  jobUrl: string;
}
