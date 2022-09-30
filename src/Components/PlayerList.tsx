import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerList.scss";

export interface PlayerListProps {
  players: PlayerModel[];
}

const PlayerList = (props: PlayerListProps) => {
  return (
    <div className="register_page_container">
      <p>- 현재 등록된 선수 명단 -</p>
      <TableContainer className="registered_player_board" component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>no</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Family Name</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>포지션</TableCell>
              <TableCell>등번호</TableCell>
              <TableCell>좌우명</TableCell>
              <TableCell>profileImgSrc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.players
              ? props.players.map((ele, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{ele.name}</TableCell>
                      <TableCell>{ele.firstNameEng}</TableCell>
                      <TableCell>{ele.familyNameEng}</TableCell>
                      <TableCell>
                        {moment(ele.birth).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>{ele.position}</TableCell>
                      <TableCell>{ele.backNo}</TableCell>
                      <TableCell>{ele.moto}</TableCell>
                      <TableCell>{ele.profileImgSrc}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerList;
