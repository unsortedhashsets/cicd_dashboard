import { JobModel } from './Job.model';

export interface GroupModel {
  id: number;
  group: string;
  owner: number | null;
  owner_name: string;
  jobs: JobModel[];
}

export const defaulGroup: GroupModel = {
  id: 0,
  group: '',
  owner: null,
  owner_name: '',
  jobs: [],
};
