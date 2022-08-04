// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Search _$SearchFromJson(Map<String, dynamic> json) => Search(
      series: (json['series'] as List<dynamic>)
          .map((e) => Series.fromJson(e as Map<String, dynamic>))
          .toList(),
      rowsNum: json['rowsNum'] as int,
    );

Map<String, dynamic> _$SearchToJson(Search instance) => <String, dynamic>{
      'series': instance.series,
      'rowsNum': instance.rowsNum,
    };

Series _$SeriesFromJson(Map<String, dynamic> json) => Series(
      id: json['id'] as String,
      title: json['title'] as String,
      subtitles:
          (json['subtitles'] as List<dynamic>).map((e) => e as String).toList(),
      addedAt: json['addedAt'] as String,
      lastEdit: json['lastEdit'] as String,
      link: json['link'] as String,
      epCount: json['epCount'] as int,
    );

Map<String, dynamic> _$SeriesToJson(Series instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'subtitles': instance.subtitles,
      'addedAt': instance.addedAt,
      'lastEdit': instance.lastEdit,
      'link': instance.link,
      'epCount': instance.epCount,
    };
