String titleInfoQuery = """
query (\$id: Int!) {
  Media(id: \$id) {
    id
    format
    status
    description
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    season
    seasonYear
    episodes
    duration
    trailer {
      id
      site
      thumbnail
    }
    genres
    averageScore
    meanScore
    popularity
    tags {
      id
      name
    }
    nextAiringEpisode {
      id
      airingAt
      episode
    }
    siteUrl
    title {
      english
      romaji
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
  }
}

""";

String listOfAnimeQuery = """
query (\$id: Int, \$page: Int, \$perPage: Int, \$search: String) {
  Page(page: \$page, perPage: \$perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(id: \$id, search: \$search) {
      id
      title {
        romaji
      }
      coverImage {
        extraLarge
      }
    }
  }
}
""";
