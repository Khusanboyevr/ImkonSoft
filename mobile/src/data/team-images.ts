import type { ImageSourcePropType } from "react-native";

/**
 * The shared roster stores web URLs for the card artwork; native builds need the
 * assets bundled, so each slug is mapped to its local copy here. Keep in step
 * with ../../assets/team (compressed from ../../../public/image/team).
 */
export const TEAM_IMAGES: Record<string, ImageSourcePropType> = {
  muhammadaziz: require("../../assets/team/muhammadaziz.jpg"),
  zafarjon: require("../../assets/team/zafarjon.jpg"),
  ilhomjon: require("../../assets/team/ilhomjon.jpg"),
  otabek: require("../../assets/team/otabek.jpg"),
  rahmatillo: require("../../assets/team/rahmatillo.jpg"),
  asilbek: require("../../assets/team/asilbek.jpg"),
  islomjon: require("../../assets/team/islomjon.jpg"),
  jahongir: require("../../assets/team/jahongir.jpg"),
  shukurullo: require("../../assets/team/shukurullo.jpg"),
  akbarshox: require("../../assets/team/akbarshox.jpg"),
  sevara: require("../../assets/team/sevara.jpg"),
  sarvinoz: require("../../assets/team/sarvinoz.jpg"),
  robiya: require("../../assets/team/robiya.jpg"),
};
