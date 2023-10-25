import React, { FC, ReactElement, useEffect, useReducer } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import UpdateIcon from "@material-ui/icons/Update";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import StateRow from "./StateRow";
import useLocalStorage from "../utils/useLocalStorage";
import { GroupModel } from "../model/Group.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        background: `${theme.palette.primary.dark}`,
      },
    },
    content: {
      "& > *": {
        background: `${theme.palette.primary.light}`,
      },
    },
  })
);

// define interface to represent component props
interface PropsR {
  _Group: GroupModel;
  open_g: boolean | null;
}

const StateCollapsibleTableGroupRow: FC<PropsR> = ({
  _Group,
  open_g,
}): ReactElement => {
  const classes = useStyles();

  const [isTableOpen, setTableOpen] = useLocalStorage(
    "G_" + String(_Group.id),
    true
  );

  useEffect(() => {
    if (open_g != null) {
      setTableOpen(open_g);
    }
  }, [open_g]);

  const toggleTable = () => {
    setTableOpen((prevValue) => !prevValue);
  };

  const [force, forceUpdate] = useReducer((x) => x + 1, 0);

  if (_Group.jobs?.length === 0) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ width: "62px" }} />
          <TableCell style={{ color: "white" }}>{_Group.group}</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableBody />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root} key={_Group.id}>
        <TableCell style={{ width: "62px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={toggleTable}
            style={{ color: "white" }}
          >
            {isTableOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: "white" }}>{_Group.group}</TableCell>
        <TableCell align="right">
          <IconButton>
            <UpdateIcon onClick={forceUpdate} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={classes.content}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isTableOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="jobs">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 50 }}></TableCell>
                    <TableCell style={{ width: 300 }}>Job name</TableCell>
                    <TableCell style={{ width: 100 }}>Branch</TableCell>
                    <TableCell>Job link</TableCell>
                    <TableCell>Last build link</TableCell>
                    <TableCell>Last build number</TableCell>
                    <TableCell>Commands</TableCell>
                    <TableCell>Last build status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_Group.jobs?.map((childrenRow) => (
                    <StateRow
                      update={force}
                      jobRow={childrenRow}
                      pictures={true}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default StateCollapsibleTableGroupRow;
