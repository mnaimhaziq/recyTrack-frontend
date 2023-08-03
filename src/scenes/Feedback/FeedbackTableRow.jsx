import React from "react";
import { TableRow, TableCell, IconButton, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const FeedbackTableRow = React.memo(({ feedback, toggleResolvedStatus }) => {
  const theme = useTheme();

  return (
    <TableRow key={feedback._id}>
      <TableCell>{feedback._id}</TableCell>
      <TableCell>{feedback.user.name}</TableCell>
      <TableCell>{feedback.comment}</TableCell>
      <TableCell>{new Date(feedback.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <IconButton onClick={() => toggleResolvedStatus(feedback._id)}>
          {feedback.resolved ? (
            <CheckCircle
              sx={{
                color: theme.palette.primary.main,
                fontSize: "32px",
                transition: "color 0.5s",
              }}
            />
          ) : (
            <CheckCircle
              sx={{
                color: "red",
                fontSize: "32px",
                transition: "color 0.5s",
              }}
            />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

export default FeedbackTableRow;
