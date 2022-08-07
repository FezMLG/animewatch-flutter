import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:flutter/material.dart';

class EpisodeScreen extends StatelessWidget {
  final Episode episode;
  const EpisodeScreen({super.key, required this.episode});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridView.count(
        primary: false,
        padding: const EdgeInsets.all(40.0),
        crossAxisSpacing: 20.0,
        crossAxisCount: 5,
        children: episode.players.map((e) => Text(e.link)).toList(),
      ),
    );
  }
}
