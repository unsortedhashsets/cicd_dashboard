import { JobModel } from './Job.model';

export interface CItoolModel {
  id: number;
  jobs: JobModel[];
  type: string;
  access: string;
  ci: string;
  link: string;
  owner: number | null;
}
