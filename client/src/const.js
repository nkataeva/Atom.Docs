export const APPRoute = {
  ENTRY: `/`,
  REGISTRATION: "/registration",
  LOGIN: "/login",
  MAIN: "/main",
  FORSIGNING: "/forsigning",
  SIGNING: "/signing",
  SHOW: "/show",
  CREATURE: "/creature",
  SIGN: "/sign",
  NOTFOUND: `*`,
};

export const pdfStyle = {
  container: {
    padding: 30,
  },
  header: {
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "right",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 5,
  },
};

export const template = [
  {
    value: "1",
    label: "Заявка на информационный обмен",
  },
  {
    value: "2",
    label:
      "Заявка для направления в командировку/для направления в служебную поездку",
  },
  {
    value: "3",
    label: "Заявка на предоставление отпуска",
  },
  {
    value: "4",
    label: "Заявление на увольнение",
  },
];

export const templateFormatedData = {
  1: "Заявка на информационный обмен",
  2: "Заявка для направления в командировку/для направления в служебную поездку",
  3: "Заявка на предоставление отпуска",
  4: "Заявление на увольнение",
};
