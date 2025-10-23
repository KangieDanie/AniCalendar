import { DocumentNode, gql } from "@apollo/client";

const GET_AIRING_SCHEDULE = (): DocumentNode => {
  return gql`
    query ($userId: Int, $page: Int) {
      Page(page: $page, perPage: 50) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        mediaList(userId: $userId, status: CURRENT, type: ANIME) {
          media {
            id
            title {
              userPreferred
            }
            coverImage {
              large
            }
            bannerImage
            format
            status
            nextAiringEpisode {
              airingAt
              episode
            }
          }
        }
      }
    }
  `;
};

export default GET_AIRING_SCHEDULE;
