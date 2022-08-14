// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'series_details_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SeriesDetails _$SeriesDetailsFromJson(Map<String, dynamic> json) =>
    SeriesDetails(
      id: json['id'] as int,
      format: json['format'] as String,
      status: json['status'] as String,
      description: json['description'] as String,
      startDate: json['startDate'] == null
          ? null
          : Date.fromJson(json['startDate'] as Map<String, dynamic>),
      endDate: json['endDate'] == null
          ? null
          : Date.fromJson(json['endDate'] as Map<String, dynamic>),
      season: json['season'] as String,
      seasonYear: json['seasonYear'] as int,
      episodes: json['episodes'] as int,
      duration: json['duration'] as int,
      trailer: json['trailer'] == null
          ? null
          : Trailer.fromJson(json['trailer'] as Map<String, dynamic>),
      genres:
          (json['genres'] as List<dynamic>).map((e) => e as String).toList(),
      averageScore: json['averageScore'] as int,
      meanScore: json['meanScore'] as int,
      popularity: json['popularity'] as int,
      tags: (json['tags'] as List<dynamic>?)
          ?.map((e) => Tag.fromJson(e as Map<String, dynamic>))
          .toList(),
      nextAiringEpisode: json['nextAiringEpisode'] == null
          ? null
          : NextAiringEpisode.fromJson(
              json['nextAiringEpisode'] as Map<String, dynamic>),
      siteUrl: json['siteUrl'] as String,
      title: Title.fromJson(json['title'] as Map<String, dynamic>),
      coverImage:
          CoverImage.fromJson(json['coverImage'] as Map<String, dynamic>),
      bannerImage: json['bannerImage'] as String,
    );

Map<String, dynamic> _$SeriesDetailsToJson(SeriesDetails instance) =>
    <String, dynamic>{
      'id': instance.id,
      'format': instance.format,
      'status': instance.status,
      'description': instance.description,
      'startDate': instance.startDate,
      'endDate': instance.endDate,
      'season': instance.season,
      'seasonYear': instance.seasonYear,
      'episodes': instance.episodes,
      'duration': instance.duration,
      'trailer': instance.trailer,
      'genres': instance.genres,
      'averageScore': instance.averageScore,
      'meanScore': instance.meanScore,
      'popularity': instance.popularity,
      'tags': instance.tags,
      'nextAiringEpisode': instance.nextAiringEpisode,
      'siteUrl': instance.siteUrl,
      'title': instance.title,
      'coverImage': instance.coverImage,
      'bannerImage': instance.bannerImage,
    };

CoverImage _$CoverImageFromJson(Map<String, dynamic> json) => CoverImage(
      extraLarge: json['extraLarge'] as String,
      large: json['large'] as String,
      medium: json['medium'] as String,
      color: json['color'] as String,
    );

Map<String, dynamic> _$CoverImageToJson(CoverImage instance) =>
    <String, dynamic>{
      'extraLarge': instance.extraLarge,
      'large': instance.large,
      'medium': instance.medium,
      'color': instance.color,
    };

Date _$DateFromJson(Map<String, dynamic> json) => Date(
      year: json['year'] as int?,
      month: json['month'] as int?,
      day: json['day'] as int?,
    );

Map<String, dynamic> _$DateToJson(Date instance) => <String, dynamic>{
      'year': instance.year,
      'month': instance.month,
      'day': instance.day,
    };

NextAiringEpisode _$NextAiringEpisodeFromJson(Map<String, dynamic> json) =>
    NextAiringEpisode(
      id: json['id'] as int,
      airingAt: json['airingAt'] as int,
      episode: json['episode'] as int,
    );

Map<String, dynamic> _$NextAiringEpisodeToJson(NextAiringEpisode instance) =>
    <String, dynamic>{
      'id': instance.id,
      'airingAt': instance.airingAt,
      'episode': instance.episode,
    };

Tag _$TagFromJson(Map<String, dynamic> json) => Tag(
      id: json['id'] as int,
      name: json['name'] as String,
    );

Map<String, dynamic> _$TagToJson(Tag instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
    };

Title _$TitleFromJson(Map<String, dynamic> json) => Title(
      english: json['english'] as String? ?? '',
      romaji: json['romaji'] as String,
    );

Map<String, dynamic> _$TitleToJson(Title instance) => <String, dynamic>{
      'english': instance.english,
      'romaji': instance.romaji,
    };

Trailer _$TrailerFromJson(Map<String, dynamic> json) => Trailer(
      id: json['id'] as String,
      site: json['site'] as String,
      thumbnail: json['thumbnail'] as String,
    );

Map<String, dynamic> _$TrailerToJson(Trailer instance) => <String, dynamic>{
      'id': instance.id,
      'site': instance.site,
      'thumbnail': instance.thumbnail,
    };
