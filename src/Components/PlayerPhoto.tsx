import "./PlayerPhoto.scss";

export interface PlayerPhotoProps {
  src: string;
}

const PlayerPhoto = (props: PlayerPhotoProps) => {
  return (
    <div className="photo_container">
      <img src={props.src} />
    </div>
  );
};

export default PlayerPhoto;
