import React, { useReducer } from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { RWDModal } from "../../model/RWDModal";
import { user } from "../../model/User.model";
import { JobModel } from "../../model/Job.model";
import { CItoolModel } from "../../model/CItool.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    Btn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: `${theme.palette.primary.dark}`,
    },
    card: {
      background: `${theme.palette.primary.main}`,
      marginTop: theme.spacing(0),
    },
  })
);

type State = {
  job: string;
  path: string;
  ci: string;
  branch: string;
  workflow: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

type Action =
  | { type: "setJob"; payload: string }
  | { type: "setPath"; payload: string }
  | { type: "setCI"; payload: string }
  | { type: "setBranch"; payload: string }
  | { type: "setWorkflow"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "ChangeSuccess"; payload: string }
  | { type: "ChangeFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setJob":
      return {
        ...state,
        job: action.payload,
      };
    case "setPath":
      return {
        ...state,
        path: action.payload,
      };
    case "setCI":
      return {
        ...state,
        ci: action.payload,
      };
    case "setBranch":
      return {
        ...state,
        branch: action.payload,
      };
    case "setWorkflow":
      return {
        ...state,
        workflow: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "ChangeSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "ChangeFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

interface JobModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  job?: JobModel;
  ci?: CItoolModel;
  aim?: string;
}

export const JobModal: React.FC<JobModalProps> = ({
  isModalVisible,
  onBackdropClick,
  job,
  aim,
  ci,
}) => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    job: job?.job || "name",
    path: job?.path || "path",
    branch: job?.branch || "branch",
    workflow: job?.workflow || "",
    ci: job?.ci.toString() || ci?.id.toString() || "0",
    isButtonDisabled: false,
    helperText: "",
    isError: false,
  });

  const handleAIM = (): void => {
    if (aim === "Add") {
      axios
        .post(`/api/job/`, {
          withCredentials: true,
          job: state.job,
          ci: state.ci,
          path: state.path,
          branch: state.branch,
          workflow: state.workflow,
        })
        .then(() => {
          dispatch({
            type: "ChangeSuccess",
            payload: `Job ${aim}ed Successfully`,
          });
          onBackdropClick();
          window.location.reload();
        })
        .catch((e) => {
          dispatch({
            type: "ChangeFailed",
            payload: "Something failed",
          });
        });
    } else {
      axios
        .put(`/api/job/${job?.id}/`, {
          withCredentials: true,
          job: state.job,
          ci: state.ci,
          path: state.path,
          branch: state.branch,
          workflow: state.workflow,
        })
        .then(() => {
          dispatch({
            type: "ChangeSuccess",
            payload: `Job ${aim}ed Successfully`,
          });
          onBackdropClick();
          window.location.reload();
        })
        .catch((e) => {
          dispatch({
            type: "ChangeFailed",
            payload: "Something failed",
          });
        });
    }
  };

  const handleJobChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setJob",
      payload: event.target.value,
    });
  };

  const handlePathChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPath",
      payload: event.target.value,
    });
  };

  const handleBranchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setBranch",
      payload: event.target.value,
    });
  };

  const handleWorkflowChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setWorkflow",
      payload: event.target.value,
    });
  };

  return (
    <RWDModal
      onBackdropClick={onBackdropClick}
      isModalVisible={isModalVisible}
      content={
        <form className={classes.container} noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardHeader className={classes.header} title={`${aim} Job`} />
            <CardContent>
              <div>
                <TextField
                  error={state.isError}
                  fullWidth
                  id="job_name"
                  label="Job Name"
                  placeholder={state.job || "Name"}
                  defaultValue={state.job}
                  margin="normal"
                  onChange={handleJobChange}
                  helperText={state.helperText}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id="job_path"
                  label="Job path (/view/Fuse%20Tooling.next/...)"
                  placeholder={state.path || "/view/Fuse%20Tooling.next/..."}
                  defaultValue={state.path}
                  margin="normal"
                  onChange={handlePathChange}
                  helperText={state.helperText}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id="job_branch"
                  label="Job branch for Travis,Circle and GH (By default main)"
                  placeholder={state.branch || "main"}
                  defaultValue={state.branch}
                  margin="normal"
                  onChange={handleBranchChange}
                  helperText={state.helperText}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id="job_workflow"
                  label="Job workflow (Only github actions)"
                  placeholder={state.workflow || ""}
                  defaultValue={state.workflow}
                  margin="normal"
                  onChange={handleWorkflowChange}
                  helperText={state.helperText}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.Btn}
                onClick={handleAIM}
                disabled={!user.isLogin}
              >
                {aim}
              </Button>
            </CardActions>
          </Card>
        </form>
      }
    />
  );
};
