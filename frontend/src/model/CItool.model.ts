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

export const defaultCItool: CItoolModel = {
  id: 0,
  jobs: [],
  type: '',
  access: '',
  ci: '',
  link: '',
  owner: null,
};
