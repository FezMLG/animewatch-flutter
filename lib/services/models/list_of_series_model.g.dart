// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'list_of_series_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PageOfSeries _$PageOfSeriesFromJson(Map<String, dynamic> json) => PageOfSeries(
      pageInfo: PageInfo.fromJson(json['pageInfo'] as Map<String, dynamic>),
      media: (json['media'] as List<dynamic>)
          .map((e) => Media.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$PageOfSeriesToJson(PageOfSeries instance) =>
    <String, dynamic>{
      'pageInfo': instance.pageInfo,
      'media': instance.media,
    };

Media _$MediaFromJson(Map<String, dynamic> json) => Media(
      id: json['id'] as int,
      title: Title.fromJson(json['title'] as Map<String, dynamic>),
      coverImage:
          CoverImage.fromJson(json['coverImage'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$MediaToJson(Media instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'coverImage': instance.coverImage,
    };

Title _$TitleFromJson(Map<String, dynamic> json) => Title(
      romaji: json['romaji'] as String,
    );

Map<String, dynamic> _$TitleToJson(Title instance) => <String, dynamic>{
      'romaji': instance.romaji,
    };

CoverImage _$CoverImageFromJson(Map<String, dynamic> json) => CoverImage(
      extraLarge: json['extraLarge'] as String,
    );

Map<String, dynamic> _$CoverImageToJson(CoverImage instance) =>
    <String, dynamic>{
      'extraLarge': instance.extraLarge,
    };

PageInfo _$PageInfoFromJson(Map<String, dynamic> json) => PageInfo(
      total: json['total'] as int,
      currentPage: json['currentPage'] as int,
      lastPage: json['lastPage'] as int,
      hasNextPage: json['hasNextPage'] as bool,
      perPage: json['perPage'] as int,
    );

Map<String, dynamic> _$PageInfoToJson(PageInfo instance) => <String, dynamic>{
      'total': instance.total,
      'currentPage': instance.currentPage,
      'lastPage': instance.lastPage,
      'hasNextPage': instance.hasNextPage,
      'perPage': instance.perPage,
    };
