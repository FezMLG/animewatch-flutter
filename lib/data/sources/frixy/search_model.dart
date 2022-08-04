import 'package:json_annotation/json_annotation.dart';
part 'search_model.g.dart';

@JsonSerializable()
class Search {
  Search({
    required this.series,
    required this.rowsNum,
  });

  List<Series> series;
  int rowsNum;
  factory Search.fromJson(Map<String, dynamic> json) => _$SearchFromJson(json);
  Map<String, dynamic> toJson() => _$SearchToJson(this);
}

@JsonSerializable()
class Series {
  Series({
    required this.id,
    required this.title,
    required this.subtitles,
    required this.addedAt,
    required this.lastEdit,
    required this.link,
    required this.epCount,
  });

  String id;
  String title;
  List<String> subtitles;
  String addedAt;
  String lastEdit;
  String link;
  int epCount;
  factory Series.fromJson(Map<String, dynamic> json) => _$SeriesFromJson(json);
  Map<String, dynamic> toJson() => _$SeriesToJson(this);
}
