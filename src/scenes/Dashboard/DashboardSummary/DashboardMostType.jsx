import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Newspaper } from "@mui/icons-material";
import { useUser } from "../../../context/UserContext";

export const DashboardMostType = (props) => {
  const { type, sx } = props;

  const user = useUser();

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {user.isAdmin
                ? "Most Recycled Types"
                : "Your Most Recycled Types"}
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {type ? type : "None"}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Newspaper />
            </SvgIcon>
          </Avatar>
        </Stack>
        {type && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography color="text.secondary" variant="h6">
              Well done, eco-conscious friend!
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

DashboardMostType.propTypes = {
  type: PropTypes.string,
  sx: PropTypes.object,
};
