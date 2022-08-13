import "./HeaderLogo.scss";

export interface HeaderLogoProps {
  logoName: string;
}

const HeaderLogo = (props: HeaderLogoProps) => {
  return (
    <div className="header_logo">
      <div className="logo_name">{props.logoName}</div>
    </div>
  );
};
export default HeaderLogo;
