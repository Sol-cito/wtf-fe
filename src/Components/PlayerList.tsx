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
import moment from "moment";
import { useState, useEffect } from "react";
import { PlayerModel } from "../Models/PlayerModel";
import CustomizedSpinner from "./CustomizedSpinner";
import "./PlayerList.scss";

export interface PlayerListProps {
  players?: PlayerModel[];
  title?: string;
  isRadioButtonVisible?: boolean;
  initialSelectedRadioId?: number;
  setSelectedPlayer?: Function;
}

const PlayerList = (props: PlayerListProps) => {
  const [selectedRadioId, setSelectedRadioId] = useState<number>(-1);

  const handleRadioOnClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: PlayerModel
  ) => {
    setSelectedRadioId(Number(e.target.id));
    if (props.setSelectedPlayer) {
      props.setSelectedPlayer(player);
    }
  };

  useEffect(() => {
    setSelectedRadioId(props.initialSelectedRadioId || -1);
  }, [props.initialSelectedRadioId]);

  return (
    <div className="register_page_container">
      <p>{props.title}</p>
      <TableContainer className="registered_player_board" component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>no</TableCell>
              {props.isRadioButtonVisible ? (
                <>
                  <TableCell>선택</TableCell>
                </>
              ) : null}
              <TableCell>이름</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Family Name</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>포지션</TableCell>
              <TableCell>등번호</TableCell>
              <TableCell>좌우명</TableCell>
              <TableCell>활동여부</TableCell>
              <TableCell>profileImgSrc</TableCell>
              <TableCell>profileTorsoImgSrc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.players
              ? props.players.map((ele, idx) => {
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
                      <TableCell>{ele.firstNameEng}</TableCell>
                      <TableCell>{ele.familyNameEng}</TableCell>
                      <TableCell>
                        {moment(ele.birth).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>{ele.position}</TableCell>
                      <TableCell>{ele.backNo}</TableCell>
                      <TableCell>{ele.moto}</TableCell>
                      <TableCell>{ele.curYn}</TableCell>
                      <TableCell>{ele.profileImgSrc}</TableCell>
                      <TableCell>{ele.profileTorsoImgSrc}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.players ? <CustomizedSpinner color="black" /> : null}
    </div>
  );
};

export default PlayerList;
