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
import { MatchResultModel } from "../Models/MatchResultModel";
import CustomizedSpinner from "./CustomizedSpinner";
import MatchResult from "./MatchResult";
import "./TeamList.scss";

export interface MatchResultListProps {
  matchResults?: MatchResultModel[];
  title?: string;
  isRadioButtonVisible?: boolean;
  initialSelectedRadioId?: number;
  setSelectedMatch?: Function;
}

const MatchResultList = (props: MatchResultListProps) => {
  const [selectedRadioId, setSelectedRadioId] = useState<number>(0);

  const handleRadioOnClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    matchResult: MatchResultModel
  ) => {
    setSelectedRadioId(Number(e.target.id));
    if (props.setSelectedMatch) {
      props.setSelectedMatch(matchResult);
    }
  };

  useEffect(() => {
    setSelectedRadioId(props.initialSelectedRadioId || -1);
  }, [props.initialSelectedRadioId]);

  return (
    <div className="register_page_container">
      <p>{props.title}</p>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>no</TableCell>
              {props.isRadioButtonVisible ? (
                <>
                  <TableCell>선택</TableCell>
                </>
              ) : null}
              <TableCell>상대팀명</TableCell>
              <TableCell>매치종류</TableCell>
              <TableCell>매치장소</TableCell>
              <TableCell>득점</TableCell>
              <TableCell>실점</TableCell>
              <TableCell>결과</TableCell>
              <TableCell>승부차기Y/N</TableCell>
              <TableCell>시합날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.matchResults
              ? props.matchResults.map((ele, idx) => {
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
                      <TableCell>{ele.opposingTeam.name}</TableCell>
                      <TableCell>{ele.matchType.matchTypeName}</TableCell>
                      <TableCell>{ele.matchLocation}</TableCell>
                      <TableCell>{ele.goalsScored}</TableCell>
                      <TableCell>{ele.goalsLost}</TableCell>
                      <TableCell>{ele.matchResult}</TableCell>
                      <TableCell>{ele.shootOutYn}</TableCell>
                      <TableCell>
                        {moment(ele.matchDate).format("YYYY-MM-DD")}
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.matchResults ? <CustomizedSpinner color="black" /> : null}
    </div>
  );
};

export default MatchResultList;
