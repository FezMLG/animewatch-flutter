import 'package:json_annotation/json_annotation.dart';
part 'series_model.g.dart';

@JsonSerializable()
class Series {
  Series({
    required this.id,
    required this.addedAt,
    required this.lastEdit,
    required this.link,
    required this.epCount,
    required this.episodes,
  });

  String id;
  String addedAt;
  String lastEdit;
  String link;
  int epCount;
  List<Episode> episodes;
  factory Series.fromJson(Map<String, dynamic> json) => _$SeriesFromJson(json);
  Map<String, dynamic> toJson() => _$SeriesToJson(this);
}

@JsonSerializable()
class Episode {
  Episode({
    required this.id,
    required this.title,
    required this.description,
    required this.banner,
    required this.number,
    required this.players,
    required this.addedAt,
    required this.lastEdit,
  });

  String id;
  String title;
  String description;
  String banner;
  int number;
  List<Player> players;
  String addedAt;
  String lastEdit;
  factory Episode.fromJson(Map<String, dynamic> json) =>
      _$EpisodeFromJson(json);
  Map<String, dynamic> toJson() => _$EpisodeToJson(this);
}

@JsonSerializable()
class Player {
  Player({
    required this.name,
    required this.link,
  });

  String name;
  String link;
  factory Player.fromJson(Map<String, dynamic> json) => _$PlayerFromJson(json);
  Map<String, dynamic> toJson() => _$PlayerToJson(this);
}
