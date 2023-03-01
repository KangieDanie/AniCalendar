import { DocumentNode, gql } from "@apollo/client";

const getCorrectType = (type: string) => {
  switch (type) {
    case "anime":
      return "ANIME_LIST";
    case "manga":
      return "MANGA_LIST";
    case "animemanga":
      return "MEDIA_LIST";
  }
};

const GET_ACTIVITIES = (type: string): DocumentNode => {
  const correctType = getCorrectType(type);
  return gql`
    query ($page: Int, $dateLess: Int, $dateGreater: Int, $userId: Int) {
      Page(page: $page, perPage: 50) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        activities(
          userId: $userId
          type: ${correctType}
          sort: [ID_DESC]
          createdAt_lesser: $dateLess
          createdAt_greater: $dateGreater
        ) {
          ... on ListActivity {
            type
            status
            createdAt
            siteUrl
            progress
            user {
              name
              avatar {
                large
              }
            }
            media {
              id
              bannerImage
              format
              title {
                userPreferred
              }
              coverImage {
                large
              }
            }
          }
        }
      }
    }
  `;
};

export default GET_ACTIVITIES;
