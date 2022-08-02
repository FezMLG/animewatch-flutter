import 'package:animewatch/data/graphql/api_client.dart';
import 'package:animewatch/data/graphql/query.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:animewatch/services/models/series_details_model.dart';

class AniList extends GraphQLAPIClient {
  Future<List<SeriesCard>> getListOfSeries() async {
    final result = await execute(listOfAnimeQuery);
    List snapshot = result.data!["Page"]["media"];
    var listOfSeries = snapshot.map((d) => SeriesCard.fromJson(d)).toList();
    return listOfSeries;
  }

  Future<SeriesDetails> getDetailsOfSeries({required int id}) async {
    final result = await execute(titleInfoQuery, {'id': id});
    Map<String, dynamic> snapshot = result.data!["Media"];
    var detailsOfSeries = await SeriesDetails.fromJson(snapshot);
    return detailsOfSeries;
  }
}
