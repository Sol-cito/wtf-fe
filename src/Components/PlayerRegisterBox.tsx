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
import { useEffect, useState } from "react";
import { PlayerModel } from "../Models/PlayerModel";
import { getAllPlayersService } from "../Service/PlayerService";

import "./PlayerRegisterBox.scss";

const PlayerRegisterBox = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersService();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  return (
    <>
      <div className="register_info_area">
        선수 등록
        <p>
          <span>이름(한글) : </span>
          <input />
        </p>
        <p>
          <span>First Name (English) : </span>
          <input />
        </p>
        <p>
          <span>Family Name (English) : </span>
          <input />
        </p>
        <p>
          <span>생년월일(0000-00-00) : </span>
          <input />
        </p>
        <p>
          <span>포지션 : </span>
          <input />
        </p>
        <p>
          <span>등번호 : </span>
          <input />
        </p>
        <p>
          <span>좌우명(최대 15자) : </span>
          <input />
        </p>
      </div>

      <div className="register_page_container">
        <p>현재 등록된 선수 명단</p>
        <TableContainer className="registered_player_board" component={Paper}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
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
              {players
                ? players.map((ele, idx) => {
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
    </>
  );
};
export default PlayerRegisterBox;
