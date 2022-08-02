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
    return MaterialApp(
      home: DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            bottom: const TabBar(
              tabs: [
                Tab(icon: Icon(Icons.directions_car)),
                Tab(icon: Icon(Icons.directions_transit)),
              ],
            ),
            title: const Text('Tabs Demo'),
          ),
          body: TabBarView(
            children: [
              DetailsTab(seriesId: seriesId),
              const Icon(Icons.directions_transit),
            ],
          ),
        ),
      ),
    );
  }
}

class DetailsTab extends StatelessWidget {
  final int seriesId;
  const DetailsTab({super.key, required this.seriesId});

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
              bottom: const TabBar(
                tabs: [
                  Tab(icon: Icon(Icons.directions_car)),
                  Tab(icon: Icon(Icons.directions_transit)),
                ],
              ),
            ),
            body: ListView(children: [
              Hero(
                tag: series.coverImage.extraLarge,
                child: Image.network(
                  series.coverImage.extraLarge,
                  fit: BoxFit.contain,
                  width: MediaQuery.of(context).size.width,
                  height: MediaQuery.of(context).size.height,
                ),
              ),
              Text(
                series.title.romaji,
                style: const TextStyle(
                    height: 2, fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ]),
            drawer: const DrawerNav(),
          );
        } else {
          return const Text("no data");
        }
      },
    );
  }
}
