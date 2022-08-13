import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:animewatch/shared/video_player.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class EpisodeItem extends StatelessWidget {
  final Episode episodeCard;
  EpisodeItem({super.key, required this.episodeCard});

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Padding(
                padding: const EdgeInsets.only(left: 10, right: 10),
                child: Text(
                  '${episodeCard.number}. ${episodeCard.title}',
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
            Flexible(
              child: Padding(
                padding: const EdgeInsets.only(left: 10, right: 10),
                child: PopupMenuButton(
                  icon: const Icon(Icons.more_vert),
                  itemBuilder: (BuildContext context) => episodeCard.players
                      .map((e) => PopupMenuItem<Player>(
                            value: e,
                            child: Text(e.name),
                          ))
                      .toList(),
                  onSelected: (Player value) async {
                    var videoLink = await decryptKey(value.link);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (BuildContext context) => VideoPlayer(
                                listOfSources: [videoLink],
                                title: episodeCard.title,
                              )
                          // WebViewPlayer(
                          //   selectedUrl:
                          //       'https://vwaw898.cda.pl/f3MgUWrkp36IlCwd6mxgMw/1660173241/lqdbd3840b39d708eb3b23f9dd3cc42a6a.mp4',
                          //   title: value.name,
                          // ),
                          ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<String> decryptKey(String key, {bool https = false}) async {
    List<String> removeKeys = [
      "_XDDD",
      "_CDA",
      "_ADC",
      "_CXD",
      "_QWE",
      "_Q5",
      "_IKSDE"
    ];
    var result = '';
    RegExp file = RegExp('"file":"(.*?)(?:")');
    var res = await http.get(Uri.parse(key));
    String html = res.body;
    var firstMatch = file.allMatches(html);
    String match = '';
    match = Uri.decodeFull(firstMatch.elementAt(0).group(1)!);

    for (var vkey in removeKeys) {
      match = match.replaceAll(vkey, "");
    }

    for (String c in match.split('')) {
      if (c.codeUnitAt(0) >= 33 && c.codeUnitAt(0) <= 126) {
        result += String.fromCharCode(33 + ((c.codeUnitAt(0) + 14) % 94));
      } else {
        result += c;
      }
    }

    result = result.replaceAll(".cda.mp4", "");
    result = result.replaceAll(".2cda.pl", ".cda.pl");
    result = result.replaceAll(".3cda.pl", ".cda.pl");

    return "https://$result.mp4";
  }
}
