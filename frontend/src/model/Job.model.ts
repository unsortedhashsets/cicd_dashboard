export interface JobModel {
  id: number;
  job: string;
  path: string;
  ci: number;
  branch: string | null;
  workflow: string | null;
  // Special properties for group view
  type: string;
  access: string;
  ci_name: string;
  link: string;
  group: number | null;
  group_name: string | null;
}

export interface JobStatusModel {
  name: string;
  buildNumber: string;
  buildStatus: string;
  buildUrl: string;
  jobUrl: string;
}

export const defaultJobStatusModel: JobStatusModel = {
  name: '',
  buildNumber: '',
  buildStatus: '',
  buildUrl: '',
  jobUrl: '',
};
