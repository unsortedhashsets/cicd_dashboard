interface JobModel {
  id: number;
  job: string;
  path: string;
  ci: number;
}

const JobModels: JobModel[] = [];

export default JobModel;
