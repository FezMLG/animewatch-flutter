import 'package:animewatch/series/series.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:flutter/material.dart';

class SeriesItem extends StatelessWidget {
  final SeriesCard seriesCard;
  const SeriesItem({super.key, required this.seriesCard});

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: seriesCard.coverImage.extraLarge,
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (BuildContext context) =>
                    SeriesScreen(seriesId: seriesCard.id),
              ),
            );
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                flex: 3,
                child: SizedBox(
                  child: Image.network(
                    seriesCard.coverImage.extraLarge,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
              Flexible(
                child: Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: Text(
                    seriesCard.title.romaji,
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
