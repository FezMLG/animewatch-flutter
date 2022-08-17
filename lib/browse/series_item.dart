import 'package:animewatch/series/series.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:flutter/material.dart';

class SeriesItem extends StatelessWidget {
  final SeriesCard seriesCard;
  const SeriesItem({super.key, required this.seriesCard});

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          Navigator.pushNamed(
            context,
            '/series',
            arguments: SeriesArguments(
              id: seriesCard.id,
              title: seriesCard.title.romaji,
            ),
          );
        },
        child: SizedBox(
          height: 340,
          width: 200,
          child: Column(
            // crossAxisAlignment: CrossAxisAlignment.stretch,
            // mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Image.network(
                height: 300,
                width: 200,
                seriesCard.coverImage.extraLarge,
                fit: BoxFit.cover,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 10, right: 10, top: 5),
                child: Text(
                  seriesCard.title.romaji,
                  style: const TextStyle(
                    overflow: TextOverflow.ellipsis,
                    height: 1.5,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                  softWrap: true,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
