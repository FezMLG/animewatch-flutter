// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'series_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Series _$SeriesFromJson(Map<String, dynamic> json) => Series(
      id: json['id'] as String,
      addedAt: json['addedAt'] as String,
      lastEdit: json['lastEdit'] as String,
      link: json['link'] as String,
      epCount: json['epCount'] as int,
      episodes: (json['episodes'] as List<dynamic>)
          .map((e) => Episode.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SeriesToJson(Series instance) => <String, dynamic>{
      'id': instance.id,
      'addedAt': instance.addedAt,
      'lastEdit': instance.lastEdit,
      'link': instance.link,
      'epCount': instance.epCount,
      'episodes': instance.episodes,
    };

Episode _$EpisodeFromJson(Map<String, dynamic> json) => Episode(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      number: json['number'] as int,
      players: (json['players'] as List<dynamic>)
          .map((e) => Player.fromJson(e as Map<String, dynamic>))
          .toList(),
      addedAt: json['addedAt'] as String,
      lastEdit: json['lastEdit'] as String,
    );

Map<String, dynamic> _$EpisodeToJson(Episode instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'description': instance.description,
      'number': instance.number,
      'players': instance.players,
      'addedAt': instance.addedAt,
      'lastEdit': instance.lastEdit,
    };

Player _$PlayerFromJson(Map<String, dynamic> json) => Player(
      name: json['name'] as String,
      link: json['link'] as String,
    );

Map<String, dynamic> _$PlayerToJson(Player instance) => <String, dynamic>{
      'name': instance.name,
      'link': instance.link,
    };
