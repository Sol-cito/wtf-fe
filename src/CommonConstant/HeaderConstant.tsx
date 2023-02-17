import { WTF_LOGO_IMG_PATH } from "./ImgConstant";

const HEADER_CONSTANT_DATA = {
  headerLogo: {
    name: "W T F",
    srcLink: WTF_LOGO_IMG_PATH,
  },

  headerButton: [
    {
      name: "home",
      url: "/",
    },
    {
      name: "about",
      url: "/about",
    },
    {
      name: "match",
      url: "/match",
    },
    {
      name: "players",
      url: "/players",
    },
    // TO-DO : 게시판 구현
    // {
    //   name: "community",
    //   url: "/community",
    // },
    {
      name: "contact",
      url: "/contact",
    },
  ],
};

export default HEADER_CONSTANT_DATA;
