import 'package:animewatch/data/graphql/api_client.dart';
import 'package:animewatch/data/graphql/query.dart';
import 'package:animewatch/services/models/list_of_series_model.dart';

class AniList extends GraphQLAPIClient {
  Future<List<Media>> getListOfSeries({required int id}) async {
    final result = await execute(listOfAnimeQuery);
    var snapshot = result.data!["Page"]["media"];
    var listOfSeries = snapshot.map((d) => Media.fromJson(d));
    return listOfSeries.toList();
  }
}
