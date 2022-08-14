import "./ThumbnailCard.scss";

export interface ThumbnailCardProps {
  url: string;
}

const ThumbnailCard = (props: ThumbnailCardProps) => {
  return (
    <div className="thumbnail_card">
      <img src={props.url} />
    </div>
  );
};
export default ThumbnailCard;
