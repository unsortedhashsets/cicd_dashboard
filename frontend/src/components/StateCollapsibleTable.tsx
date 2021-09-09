import React, { FC, ReactElement, useState } from 'react';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core/';
import { CItoolModel } from '../model/CItool.model';
import useLocalStorage from '../utils/useLocalStorage';
import { GroupModel } from '../model/Group.model';
import { user } from '../model/User.model';
import StateCollapsibleTableCIRow from './StateCollapsibleTableCIRow';
import StateCollapsibleTableGroupRow from './StateCollapsibleTableGroupRow';

const SortGroups = (CIs: CItoolModel[], Groups: GroupModel[]) => {
  for (let ci of CIs) {
    for (let job of ci.jobs) {
      job.access = ci.access;
      job.type = ci.type;
      job.link = ci.link;
      job.ci_name = ci.ci;
      if (job.access === 'Private') {
        job.group = -1;
        job.group_name = 'Private';
        if (!Groups.find((i) => i.id === -1)) {
          Groups.push({
            id: -1,
            group: 'Private',
            owner: user.id,
            owner_name: user.username,
            jobs: [],
          });
        }
      } else {
        job.group = ci.group;
        if (job.group === null) {
          job.group = 0;
          job.group_name = 'Undefined';
          if (!Groups.find((i) => i.id === 0)) {
            Groups.push({
              id: 0,
              group: 'Undefined',
              owner: null,
              owner_name: '',
              jobs: [],
            });
          }
        } else {
          job.group_name = ci.group_name;
        }
      }
      let x = Groups.find((i) => i.id === job.group);
      if (x) {
        if (!x.jobs) {
          x.jobs = [];
        }
        if (!x.jobs.find((i) => i.id === job.id)) {
          x.jobs.push(job);
        }
      }
    }
  }
};

// define interface to represent component props
interface PropsCT {
  CItools: CItoolModel[];
  Groups: GroupModel[];
}

const StateCollapsibleTable: FC<PropsCT> = ({
  CItools,
  Groups,
}): ReactElement => {
  const [switchState, setSwitchState] = useLocalStorage('GroupView', {
    checked: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
    window.location.reload();
  };

  const [state_c, setCState] = useState<boolean | null>(null);
  const [state_g, setGState] = useState<boolean | null>(null);

  const closeState = () => {
    if (switchState.checked) {
      setGState(false);
    } else {
      setCState(false);
    }
  };

  const openState = () => {
    if (switchState.checked) {
      setGState(true);
    } else {
      setCState(true);
    }
  };

  if (switchState.checked) {
    SortGroups(CItools, Groups);
  }

  return (
    <TableContainer component={Paper}>
      <Button
        style={{ marginBottom: '15px' }}
        variant='contained'
        color='secondary'
        onClick={closeState}
      >
        Close All
      </Button>
      <Button
        style={{ marginBottom: '15px', marginLeft: '15px' }}
        variant='contained'
        color='secondary'
        onClick={openState}
      >
        Open All
      </Button>

      <FormControlLabel
        style={{ marginBottom: '15px', marginLeft: '15px' }}
        control={
          <Switch
            checked={switchState.checked}
            onChange={handleChange}
            name='checked'
            color='secondary'
          />
        }
        label='Group View'
      />

      <Table aria-label='collapsible table'>
        <TableHead></TableHead>

        <TableBody>
          {switchState.checked
            ? Groups.map((Group) => (
                <StateCollapsibleTableGroupRow
                  key={Group.id}
                  _Group={Group}
                  open_g={state_g}
                />
              ))
            : CItools.map((CItool) => (
                <StateCollapsibleTableCIRow
                  key={CItool.ci}
                  _CItool={CItool}
                  open_c={state_c}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StateCollapsibleTable;
