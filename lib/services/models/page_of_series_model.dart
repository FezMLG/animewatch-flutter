import 'package:json_annotation/json_annotation.dart';
part 'page_of_series_model.g.dart';

@JsonSerializable()
class PageOfSeries {
  PageOfSeries({
    required this.pageInfo,
    required this.media,
  });

  PageInfo pageInfo;
  List<SeriesCard> media;
  factory PageOfSeries.fromJson(Map<String, dynamic> json) =>
      _$PageOfSeriesFromJson(json);
  Map<String, dynamic> toJson() => _$PageOfSeriesToJson(this);
}

@JsonSerializable()
class SeriesCard {
  SeriesCard({
    required this.id,
    required this.title,
    required this.coverImage,
  });

  int id;
  Title title;
  CoverImage coverImage;

  factory SeriesCard.fromJson(Map<String, dynamic> json) =>
      _$SeriesCardFromJson(json);
  Map<String, dynamic> toJson() => _$SeriesCardToJson(this);
}

@JsonSerializable()
class Title {
  Title({
    required this.romaji,
  });

  String romaji;
  factory Title.fromJson(Map<String, dynamic> json) => _$TitleFromJson(json);
  Map<String, dynamic> toJson() => _$TitleToJson(this);
}

@JsonSerializable()
class CoverImage {
  CoverImage({
    required this.extraLarge,
  });

  String extraLarge;
  factory CoverImage.fromJson(Map<String, dynamic> json) =>
      _$CoverImageFromJson(json);
  Map<String, dynamic> toJson() => _$CoverImageToJson(this);
}

@JsonSerializable()
class PageInfo {
  PageInfo({
    required this.total,
    required this.currentPage,
    required this.lastPage,
    required this.hasNextPage,
    required this.perPage,
  });

  int total;
  int currentPage;
  int lastPage;
  bool hasNextPage;
  int perPage;

  factory PageInfo.fromJson(Map<String, dynamic> json) =>
      _$PageInfoFromJson(json);
  Map<String, dynamic> toJson() => _$PageInfoToJson(this);
}
