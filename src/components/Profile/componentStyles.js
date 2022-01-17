import themeColors from "./colors";

// classes for profile page
const componentStyles = () => ({
  containerRoot: {
    margin: "0",
    padding: '0'
  },
  gridItemRoot: {
    marginBottom: "0!important",
  },
  cardRoot: {
    border: "0!important",
  },
  cardRootSecondary: {
    backgroundColor: themeColors.secondary.main,
  },
  cardHeaderRoot: {
    backgroundColor: themeColors.white.main + "!important",
  },
  typographyRootH6: {
    textTransform: "uppercase",
  },
  plLg4: {
    paddingLeft: "1.5rem",
  },
  formLabelRoot: {
    color: themeColors.gray[800],
  },
  profileImage: {
    backgroundRepeat: "no-repeat",
    width: "50%",
    borderRadius: "50%",
  },
  profileTextField: {
    width: "90%",
    marginTop: "1rem !important",
    marginRight: "1rem !important",
    color: themeColors.gray[600] + "!important",
  },
});

export default componentStyles;
