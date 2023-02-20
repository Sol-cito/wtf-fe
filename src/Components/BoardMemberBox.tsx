import { BoardMemberModel } from "../Models/BoardMemberModel";
import "./BoardMemberBox.scss";

export interface BoardMemberBoxProps {
  boardMemberList: BoardMemberModel[];
}

const BoardMemberBox = (props: BoardMemberBoxProps) => {
  return (
    <div className="board_member_container">
      {props.boardMemberList.map && props.boardMemberList.map.length > 0
        ? props.boardMemberList.map((ele, idx) => {
            return (
              <div key={idx} className="member">
                <span id="board_name"> {ele.boardName}</span>
                <span id="player_name"> {ele.player.name}</span>
                <span id="assigned_date"> ({ele.assignedDate}~) </span>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default BoardMemberBox;
