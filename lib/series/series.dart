import 'package:animewatch/data/graphql/request/anilist_api.dart';
import 'package:animewatch/data/sources/frixy/frixy.dart';
import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:animewatch/series/episode_item.dart';
import 'package:animewatch/services/models/series_details_model.dart';
import 'package:animewatch/shared/hex_color.dart';
import 'package:animewatch/shared/shared.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class EpisodeListScreen extends StatelessWidget {
  final String seriesName;
  const EpisodeListScreen({super.key, required this.seriesName});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Series>(
      future: FrixySubs().fetchEpisodes(seriesName),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingScreen();
        } else if (snapshot.hasError) {
          return Center(
            child: ErrorMessage(message: snapshot.error.toString()),
          );
        } else if (snapshot.hasData) {
          Series series = snapshot.data!;

          return Scaffold(
            body: GridView.count(
              primary: false,
              padding: const EdgeInsets.all(40.0),
              crossAxisSpacing: 20.0,
              crossAxisCount: 5,
              children: series.episodes
                  .map((e) => EpisodeItem(episodeCard: e))
                  .toList(),
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

class SeriesScreen extends StatelessWidget {
  final int seriesId;
  const SeriesScreen({super.key, required this.seriesId});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: 2,
        child: FutureBuilder<SeriesDetails>(
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
                      Tab(
                        text: 'Details',
                      ),
                      Tab(
                        text: 'Episodes',
                      ),
                    ],
                  ),
                ),
                body: TabBarView(
                  children: [
                    ListView(
                      children: [
                        Container(
                          margin: const EdgeInsets.only(bottom: 30),
                          child: Image.network(
                            series.bannerImage,
                            width: MediaQuery.of(context).size.width,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 50),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                series.title.romaji,
                                style: const TextStyle(
                                    height: 2,
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold),
                              ),
                              Text(
                                series.title.english,
                                style: const TextStyle(
                                    height: 0,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w300),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 20),
                                child: Text(
                                  series.description,
                                  style: const TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.normal),
                                ),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                    EpisodeListScreen(
                      seriesName: series.title.romaji,
                    ),
                  ],
                ),
                drawer: const DrawerNav(),
              );
            } else {
              return const Text("no data");
            }
          },
        ),
      ),
    );
  }
}
