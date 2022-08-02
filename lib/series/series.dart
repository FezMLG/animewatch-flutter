import 'package:animewatch/data/graphql/request/anilist_api.dart';
import 'package:animewatch/services/models/series_details_model.dart';
import 'package:animewatch/shared/hex_color.dart';
import 'package:animewatch/shared/shared.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SeriesScreen extends StatelessWidget {
  final int seriesId;
  const SeriesScreen({super.key, required this.seriesId});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<SeriesDetails>(
      future: AniList().getDetailsOfSeries(id: seriesId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingScreen();
        } else if (snapshot.hasError) {
          return Center(
            child: ErrorMessage(message: snapshot.error.toString()),
          );
        } else if (snapshot.hasData) {
          SeriesDetails series = snapshot.data!;
          // return Text(series[0].title.romaji);

          return Scaffold(
            appBar: AppBar(
              backgroundColor: HexColor.fromHex(series.coverImage.color),
              title: Text(series.title.romaji),
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
              padding: const EdgeInsets.all(20.0),
              crossAxisSpacing: 10.0,
              crossAxisCount: 2,
              children: [Text(series.description)],
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
