import { gql } from "@apollo/client";

export default gql`
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
        type: ANIME_LIST
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
