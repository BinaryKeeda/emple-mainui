import { useQuery } from "@apollo/client";
import { RANK_DATA } from "./ApiCalls";

export const useRankData = ({
  id,
  college,
}: {
  id: string;
  college: string;
}) => {
  return useQuery(RANK_DATA, {
    variables: {
      userId: id,
      university: college,
      hey:"w"
    },
    fetchPolicy: "network-only",
  });
};
