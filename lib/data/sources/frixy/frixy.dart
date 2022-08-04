import 'dart:convert';
import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:http/http.dart' as http;
import 'package:animewatch/data/sources/frixy/search_model.dart';

class FrixySubs {
  Future<Search> searchForSeries(String toSearch) async {
    String uri = Uri.encodeFull(
        'https://frixysubs.pl/api/anime?limit=15&offset=0&search=${toSearch.toLowerCase()}');
    print(uri);
    try {
      final response = await http.get(Uri.parse(uri));

      if (response.statusCode == 200) {
        // If the server did return a 200 OK response,
        // then parse the JSON.
        print(response.body);
        Search found = Search.fromJson(jsonDecode(response.body));
        return found;
      } else {
        throw Exception('Failed to search for series');
      }
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<Series> fetchEpisodes(String toSearch) async {
    try {
      Search found = await searchForSeries(toSearch);
      if (found.rowsNum == 1) {
        String uri = 'https://frixysubs.pl/api/anime/${found.series[0].link}';
        final response = await http.get(Uri.parse(uri));
        if (response.statusCode == 200) {
          Series found = Series.fromJson(jsonDecode(response.body));
          return found;
        } else {
          throw Exception('Failed to search for series');
        }
      } else if (found.rowsNum == 0) {
        throw Exception('Found 0 series with this name');
      } else {
        throw Exception('Found more than one series');
      }
    } catch (e) {
      throw Exception(e);
    }
  }
}
