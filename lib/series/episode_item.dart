import 'package:animewatch/browse/browse.dart';
import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:animewatch/series/episode.dart';
import 'package:animewatch/series/series.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:flutter/material.dart';

class EpisodeItem extends StatelessWidget {
  final Episode episodeCard;
  const EpisodeItem({super.key, required this.episodeCard});

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: episodeCard.banner,
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (BuildContext context) => EpisodeScreen(
                  episode: episodeCard,
                ),
              ),
            );
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                child: Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: Text(
                    episodeCard.title,
                    style: const TextStyle(
                      height: 1.5,
                      fontWeight: FontWeight.bold,
                    ),
                    overflow: TextOverflow.fade,
                    softWrap: false,
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
