import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:flutter/material.dart';

class EpisodeScreen extends StatelessWidget {
  final Player player;
  const EpisodeScreen({super.key, required this.player});

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Text(player.name));
  }
}
