import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box mb="30px">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
