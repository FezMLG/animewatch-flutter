import 'package:animewatch/browse/series_item.dart';
import 'package:animewatch/data/graphql/request/anilist_api.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:animewatch/shared/shared.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class BrowseScreen extends StatelessWidget {
  const BrowseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<SeriesCard>>(
      future: AniList().getListOfSeries(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingScreen();
        } else if (snapshot.hasError) {
          return Center(
            child: ErrorMessage(message: snapshot.error.toString()),
          );
        } else if (snapshot.hasData) {
          List<SeriesCard> series = snapshot.data!;

          return Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.deepPurple,
              title: const Text('Browse'),
              actions: [
                IconButton(
                  icon: Icon(
                    FontAwesomeIcons.circleUser,
                    color: Colors.pink[200],
                  ),
                  onPressed: () => Navigator.pushNamed(context, '/'),
                )
              ],
            ),
            body: GridView.count(
              primary: false,
              padding: const EdgeInsets.all(40.0),
              crossAxisSpacing: 20.0,
              crossAxisCount: 5,
              children: series.map((e) => SeriesItem(seriesCard: e)).toList(),
            ),
            drawer: const DrawerNav(),
          );
        } else {
          return const Text("no data");
        }
      },
    );
  }
}
