// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Search _$SearchFromJson(Map<String, dynamic> json) => Search(
      series: (json['series'] as List<dynamic>)
          .map((e) => SeriesFound.fromJson(e as Map<String, dynamic>))
          .toList(),
      rowsNum: json['rows_num'] as int,
    );

Map<String, dynamic> _$SearchToJson(Search instance) => <String, dynamic>{
      'series': instance.series,
      'rows_num': instance.rowsNum,
    };

SeriesFound _$SeriesFoundFromJson(Map<String, dynamic> json) => SeriesFound(
      id: json['id'] as String,
      title: json['title'] as String,
      subtitles:
          (json['subtitles'] as List<dynamic>).map((e) => e as String).toList(),
      addedAt: json['added_at'] as String,
      lastEdit: json['last_edit'] as String,
      link: json['link'] as String,
      epCount: json['ep_count'] as int,
    );

Map<String, dynamic> _$SeriesFoundToJson(SeriesFound instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'subtitles': instance.subtitles,
      'added_at': instance.addedAt,
      'last_edit': instance.lastEdit,
      'link': instance.link,
      'ep_count': instance.epCount,
    };
