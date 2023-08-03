import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export const DashboardLatestHistory = (props) => {
  const { recyclingHistories, sx } = props;
const user = useUser();
  if (!recyclingHistories) {
    return (
      <Card sx={sx}>
        <CardHeader title="Latest Recycling History" />
        <Box
          sx={{
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>No recycling history available.</h3>
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Link to="/recyclinghistory">
            <Button
              color="inherit"
              endIcon={
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              }
              size="small"
              variant="text"
            >
              View all
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
  else{
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Recycling History" />

      <Box sx={{ height: "80%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
            {user.isAdmin &&<TableCell>User </TableCell>}
              <TableCell>Recycling Method</TableCell>
              <TableCell>Waste Type</TableCell>
              <TableCell sortDirection="desc">Quantity (KG)</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recyclingHistories.map((recyclingHistory) => {
              return (
                <TableRow hover key={recyclingHistory._id}>
                 {user.isAdmin && <TableCell>{recyclingHistory.user.name}</TableCell>}
                  <TableCell>{recyclingHistory.recyclingMethod}</TableCell>
                  <TableCell>{recyclingHistory.wasteType}</TableCell>
                  <TableCell>{recyclingHistory.quantity}</TableCell>
                  <TableCell>
                    {new Date(recyclingHistory.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link to="/recyclinghistory">
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </CardActions>
    </Card>
  );}
};

DashboardLatestHistory.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
