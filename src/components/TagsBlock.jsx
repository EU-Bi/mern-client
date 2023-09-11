import React from "react";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Scores">
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell align="left">Test</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Score</TableCell>
          </TableHead>
          <TableBody>
            {(isLoading ? [...Array(5)] : items).map((score, i) => (
              <TableRow key={i} disablePadding>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    <TableCell>{score.userId.fullName}</TableCell>
                    <TableCell>{score.testId.title}</TableCell>
                    <TableCell>{score.score}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SideBlock>
  );
};
