import 'package:animewatch/services/models/list_of_series_model.dart';
import 'package:flutter/material.dart';

class SeriesItem extends StatelessWidget {
  final Media media;
  const SeriesItem({super.key, required this.media});

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: media.coverImage.extraLarge,
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          // onTap: () {
          //   Navigator.of(context).push(
          //     MaterialPageRoute(
          //       builder: (BuildContext context) => TopicScreen(topic: topic),
          //     ),
          //   );
          // },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                flex: 3,
                child: SizedBox(
                  child: Image.asset(
                    media.coverImage.extraLarge,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
              Flexible(
                child: Padding(
                  padding: const EdgeInsets.only(left: 10, right: 10),
                  child: Text(
                    media.title.romaji,
                    style: const TextStyle(
                      height: 1.5,
                      fontWeight: FontWeight.bold,
                    ),
                    overflow: TextOverflow.fade,
                    softWrap: false,
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
