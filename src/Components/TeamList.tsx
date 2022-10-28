import {
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { TeamModel } from "../Models/TeamModel";
import CustomizedSpinner from "./CustomizedSpinner";
import "./TeamList.scss";

export interface TeamListProps {
  teams?: TeamModel[];
  title?: string;
  isRadioButtonVisible?: boolean;
  initialSelectedRadioId?: number;
  setSelectedTeam?: Function;
}

const TeamList = (props: TeamListProps) => {
  const [selectedRadioId, setSelectedRadioId] = useState<number>(-1);

  const handleRadioOnClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    team: TeamModel
  ) => {
    setSelectedRadioId(Number(e.target.id));
    // if (props.setSelectedPlayer) {
    //   props.setSelectedPlayer(player);
    // }
  };

  useEffect(() => {
    setSelectedRadioId(props.initialSelectedRadioId || -1);
  }, [props.initialSelectedRadioId]);

  return (
    <div className="register_page_container">
      <p>{props.title}</p>
      <TableContainer className="registered_team_board" component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>no</TableCell>
              {props.isRadioButtonVisible ? (
                <>
                  <TableCell>선택</TableCell>
                </>
              ) : null}
              <TableCell>팀명</TableCell>
              <TableCell>연고지</TableCell>
              <TableCell>TeamLogoSrc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.teams
              ? props.teams.map((ele, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      {props.isRadioButtonVisible ? (
                        <TableCell>
                          <Radio
                            id={String(ele.id)}
                            checked={selectedRadioId === ele.id}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleRadioOnClick(e, ele);
                            }}
                          />
                        </TableCell>
                      ) : null}
                      <TableCell>{ele.name}</TableCell>
                      <TableCell>{ele.hometown}</TableCell>
                      <TableCell>{ele.teamLogoSrc}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.teams ? <CustomizedSpinner color="black" /> : null}
    </div>
  );
};

export default TeamList;
