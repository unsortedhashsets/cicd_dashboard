import { JobModel } from './Job.model';

export interface CItoolModel {
  id: number;
  jobs: JobModel[];
  type: string;
  access: string;
  ci: string;
  link: string;
  owner: number | null;
  group: number | null;
  owner_name: string | null;
  group_name: string | null;
}

export const defaultCItool: CItoolModel = {
  id: 0,
  jobs: [],
  type: '',
  access: '',
  ci: '',
  link: '',
  owner: null,
  group: null,
  owner_name: null,
  group_name: null,
};
