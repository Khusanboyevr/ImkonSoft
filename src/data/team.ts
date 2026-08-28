export type Department = "tech" | "media";

export interface TeamMember {
  slug: string;
  name: string;
  department: Department;
  /** Card image — designer-made, 960x1280 (3:4) */
  image: string;
  role: { uz: string; ru: string };
  experience: { uz: string; ru: string };
  /** Second stat — already carries its own noun ("50+ loyiha", "200+ mijoz"). */
  output?: { uz: string; ru: string };
  /** Shown instead of a second stat when the card lists tools. */
  tools?: string[];
  /** Set only for the three people in the leadership pyramid above the groups. */
  leadership?: {
    /** "center" sits on top; "left" and "right" flank it slightly lower. */
    position: "left" | "center" | "right";
    title: { uz: string; ru: string };
  };
}

/**
 * Bumped whenever the designers ship new card artwork. The filenames stay the
 * same, so without this the optimizer and the browser keep serving the old file.
 */
const ART_VERSION = 2;

const card = (file: string) => `/image/team/${file}?v=${ART_VERSION}`;

export const TEAM: TeamMember[] = [
  {
    slug: "muhammadaziz",
    name: "Muhammadaziz",
    department: "media",
    image: card("muhammadaziz.png"),
    role: { uz: "Proekt Menejer + Mobilograf", ru: "Проект-менеджер + Мобилограф" },
    experience: { uz: "3 yil tajriba", ru: "3 года опыта" },
    output: { uz: "30+ loyiha", ru: "30+ проектов" },
    leadership: {
      position: "right",
      title: { uz: "Media Jamoasi Founderi", ru: "Основатель медиа-команды" },
    },
  },
  {
    slug: "zafarjon",
    name: "Zafarjon",
    department: "tech",
    image: card("zafarjon.png"),
    role: { uz: "Backend Developer · Strong Middle Python", ru: "Backend-разработчик · Strong Middle Python" },
    experience: { uz: "5+ yillik tajriba", ru: "5+ лет опыта" },
    output: { uz: "20+ loyiha", ru: "20+ проектов" },
  },
  {
    slug: "ilhomjon",
    name: "Ilhomjon",
    department: "tech",
    image: card("ilhomjon.png"),
    role: { uz: "Kotlin Developer · Middle", ru: "Kotlin-разработчик · Middle" },
    experience: { uz: "5+ yillik tajriba", ru: "5+ лет опыта" },
    output: { uz: "20+ loyiha", ru: "20+ проектов" },
  },
  {
    slug: "otabek",
    name: "Otabek",
    department: "tech",
    image: card("otabek.png"),
    role: { uz: "React Native Developer · JavaScript", ru: "React Native-разработчик · JavaScript" },
    experience: { uz: "2+ yillik tajriba", ru: "2+ года опыта" },
    output: { uz: "10+ loyiha", ru: "10+ проектов" },
  },
  {
    slug: "rahmatillo",
    name: "Rahmatillo",
    department: "tech",
    image: card("rahmatillo.jpg"),
    role: { uz: "Frontend Developer · JavaScript", ru: "Frontend-разработчик · JavaScript" },
    experience: { uz: "2+ yillik tajriba", ru: "2+ года опыта" },
    output: { uz: "10+ loyiha", ru: "10+ проектов" },
    leadership: {
      position: "left",
      title: { uz: "Bosh Founder", ru: "Главный основатель" },
    },
  },
  {
    slug: "asilbek",
    name: "Asilbek",
    department: "tech",
    image: card("asilbek.png"),
    role: { uz: "Django Developer · Middle Python", ru: "Django-разработчик · Middle Python" },
    experience: { uz: "2+ yillik tajriba", ru: "2+ года опыта" },
    output: { uz: "2+ loyiha", ru: "2+ проекта" },
    leadership: {
      position: "center",
      title: { uz: "CEO", ru: "CEO" },
    },
  },
  {
    slug: "islomjon",
    name: "Islomjon",
    department: "tech",
    image: card("islomjon.png"),
    role: { uz: "Flutter Developer · Junior", ru: "Flutter-разработчик · Junior" },
    experience: { uz: "1+ yillik tajriba", ru: "1+ год опыта" },
    output: { uz: "5+ loyiha", ru: "5+ проектов" },
  },
  {
    slug: "jahongir",
    name: "Jahongir",
    department: "tech",
    image: card("jahongir.png"),
    role: { uz: "AI Video Mutaxassisi", ru: "AI Video-специалист" },
    experience: { uz: "2+ yillik tajriba", ru: "2+ года опыта" },
    output: { uz: "10+ loyiha", ru: "10+ проектов" },
  },
  {
    slug: "shukurullo",
    name: "Shukurullo",
    department: "tech",
    image: card("shukurullo.png"),
    role: { uz: "Kiber Xavfsizlik Mutaxassisi", ru: "Специалист по кибербезопасности" },
    experience: { uz: "2+ yillik tajriba", ru: "2+ года опыта" },
    output: { uz: "5+ loyiha", ru: "5+ проектов" },
  },
  {
    slug: "shukurulloh",
    name: "Shukurulloh",
    department: "tech",
    image: card("shukurulloh.png"),
    role: { uz: "Kiber Xavfsizlik Mutaxassisi", ru: "Специалист по кибербезопасности" },
    experience: { uz: "2+ yillik tajriba", ru: "2+ года опыта" },
    output: { uz: "5+ loyiha", ru: "5+ проектов" },
  },
  {
    slug: "akbarshox",
    name: "Akbarshox",
    department: "media",
    image: card("akbarshox.png"),
    role: { uz: "Videograf · To'y syomka", ru: "Видеограф · Свадебная съёмка" },
    experience: { uz: "10+ yillik tajriba", ru: "10+ лет опыта" },
    output: { uz: "200+ mijoz", ru: "200+ клиентов" },
  },
  {
    slug: "sevara",
    name: "Sevara",
    department: "media",
    image: card("sevara.png"),
    role: { uz: "SMM Mutaxassisi", ru: "SMM-специалист" },
    experience: { uz: "6+ yillik tajriba", ru: "6+ лет опыта" },
    output: { uz: "10+ hamkor", ru: "10+ партнёров" },
  },
  {
    slug: "sarvinoz",
    name: "Sarvinoz",
    department: "media",
    image: card("sarvinoz.png"),
    role: { uz: "Targetolog", ru: "Таргетолог" },
    experience: { uz: "4 yil tajriba", ru: "4 года опыта" },
    output: { uz: "50+ loyiha", ru: "50+ проектов" },
  },
  {
    slug: "robiya",
    name: "Robiya",
    department: "media",
    image: card("robiya.png"),
    role: { uz: "Grafik Dizayner", ru: "Графический дизайнер" },
    experience: { uz: "1 yil tajriba", ru: "1 год опыта" },
    tools: ["Photoshop", "Illustrator", "Figma", "InDesign"],
  },
];
