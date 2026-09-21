export const leadershipMembers = [
  { role: "理事長", name: "陳庭楚" },
  { role: "副理事長", name: "吳憶祖" },
  { role: "副理事長", name: "江珮綺" },
] as const;

export const teamGroups = [
  {
    id: "directors",
    title: "理事成員",
    label: "DIRECTORS",
    members: [
      { role: "理事", name: "莊智程" },
      { role: "理事", name: "呂佳倪" },
      { role: "理事", name: "廖冠霆" },
      { role: "理事", name: "尤偉哲" },
      { role: "理事", name: "許程富" },
      { role: "理事", name: "林妤蕎" },
    ],
  },
  {
    id: "supervisors",
    title: "監事成員",
    label: "SUPERVISORS",
    members: [
      { role: "常務監事", name: "鄧述維" },
      { role: "監事", name: "陳柏睿" },
      { role: "監事", name: "吳梓瑜" },
    ],
  },
  {
    id: "secretariat",
    title: "秘書處",
    label: "SECRETARIAT",
    members: [
      { role: "秘書長", name: "李家緯" },
      { role: "副秘書長", name: "劉訊志" },
      { role: "副秘書長", name: "陳冠聿" },
      { role: "副秘書長", name: "劉曉陽" },
    ],
  },
] as const;

export type TeamMember = {
  readonly role: string;
  readonly name: string;
};

export const allTeamMembers: readonly TeamMember[] = [
  ...leadershipMembers,
  ...teamGroups[0].members,
  ...teamGroups[1].members,
  ...teamGroups[2].members,
];
