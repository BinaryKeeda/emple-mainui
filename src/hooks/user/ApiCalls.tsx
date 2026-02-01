// queries/rankQuery.ts
import { gql } from "@apollo/client";

export const RANK_DATA = gql`
  query GetRank($userId: ID!, $university: String!) {
    getRank(userId: $userId, university: $university) {
      globalRank
      universityRank
      userRank {
        points
        solutions {
          aptitude { attempted average }
          core { attempted average }
          miscellaneous { attempted average }
          easy { attempted average }
          medium { attempted average }
          hard { attempted average }
        }
      }
      topGlobal {
        university
        rank
        avatar
        points
        name
      }
      topUniversity {
        university
        rank
        avatar
        points
        name
      }
    }
  }
`;
