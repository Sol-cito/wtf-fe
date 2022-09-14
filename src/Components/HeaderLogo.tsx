import "./HeaderLogo.scss";

export interface HeaderLogoProps {
  logoName: string;
}

const HeaderLogo = (props: HeaderLogoProps) => {
  return (
    <div className="header_logo">
      <img className="logo_image" src="img/logo_yellow.jpg" />
      <div className="logo_name">{props.logoName}</div>
    </div>
  );
};
export default HeaderLogo;
