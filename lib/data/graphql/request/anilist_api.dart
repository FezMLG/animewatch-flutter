import 'package:animewatch/data/graphql/api_client.dart';
import 'package:animewatch/data/graphql/query.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';

class AniList extends GraphQLAPIClient {
  Future<List<SeriesCard>> getListOfSeries({required int id}) async {
    final result = await execute(listOfAnimeQuery);
    List snapshot = result.data!["Page"]["media"];
    var listOfSeries = snapshot.map((d) => SeriesCard.fromJson(d)).toList();
    return listOfSeries;
  }
}
