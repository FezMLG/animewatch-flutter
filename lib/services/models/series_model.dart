import 'package:json_annotation/json_annotation.dart';
part 'series_model.g.dart';

@JsonSerializable()
class Media {
  Media({
    required this.id,
    required this.format,
    required this.status,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.season,
    required this.seasonYear,
    required this.episodes,
    required this.duration,
    required this.trailer,
    required this.genres,
    required this.averageScore,
    required this.meanScore,
    required this.popularity,
    required this.tags,
    required this.nextAiringEpisode,
    required this.siteUrl,
    required this.title,
    required this.coverImage,
    required this.bannerImage,
  });

  int id;
  String format;
  String status;
  String description;
  Date startDate;
  Date endDate;
  String season;
  int seasonYear;
  int episodes;
  int duration;
  Trailer trailer;
  List<String> genres;
  int averageScore;
  int meanScore;
  int popularity;
  List<Tag> tags;
  NextAiringEpisode nextAiringEpisode;
  String siteUrl;
  Title title;
  CoverImage coverImage;
  String bannerImage;

  factory Media.fromJson(Map<String, dynamic> json) => _$MediaFromJson(json);
  Map<String, dynamic> toJson() => _$MediaToJson(this);
}

@JsonSerializable()
class CoverImage {
  CoverImage({
    required this.extraLarge,
    required this.large,
    required this.medium,
    required this.color,
  });

  String extraLarge;
  String large;
  String medium;
  String color;

  factory CoverImage.fromJson(Map<String, dynamic> json) =>
      _$CoverImageFromJson(json);
  Map<String, dynamic> toJson() => _$CoverImageToJson(this);
}

@JsonSerializable()
class Date {
  Date({
    required this.year,
    required this.month,
    required this.day,
  });

  int year;
  int month;
  int day;

  factory Date.fromJson(Map<String, dynamic> json) => _$DateFromJson(json);
  Map<String, dynamic> toJson() => _$DateToJson(this);
}

@JsonSerializable()
class NextAiringEpisode {
  NextAiringEpisode({
    required this.id,
    required this.airingAt,
    required this.episode,
  });

  int id;
  int airingAt;
  int episode;

  factory NextAiringEpisode.fromJson(Map<String, dynamic> json) =>
      _$NextAiringEpisodeFromJson(json);
  Map<String, dynamic> toJson() => _$NextAiringEpisodeToJson(this);
}

@JsonSerializable()
class Tag {
  Tag({
    required this.id,
    required this.name,
  });

  int id;
  String name;

  factory Tag.fromJson(Map<String, dynamic> json) => _$TagFromJson(json);
  Map<String, dynamic> toJson() => _$TagToJson(this);
}

@JsonSerializable()
class Title {
  Title({
    required this.english,
    required this.romaji,
  });

  String english;
  String romaji;

  factory Title.fromJson(Map<String, dynamic> json) => _$TitleFromJson(json);
  Map<String, dynamic> toJson() => _$TitleToJson(this);
}

@JsonSerializable()
class Trailer {
  Trailer({
    required this.id,
    required this.site,
    required this.thumbnail,
  });

  String id;
  String site;
  String thumbnail;

  factory Trailer.fromJson(Map<String, dynamic> json) =>
      _$TrailerFromJson(json);
  Map<String, dynamic> toJson() => _$TrailerToJson(this);
}
