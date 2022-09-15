import "./HeaderLogo.scss";

export interface HeaderLogoProps {
  logoName: string;
  srcLink: string;
}

const HeaderLogo = (props: HeaderLogoProps) => {
  return (
    <div className="header_logo">
      <img id="logo_image" src={props.srcLink} />
      <div id="logo_name">{props.logoName}</div>
    </div>
  );
};
export default HeaderLogo;
