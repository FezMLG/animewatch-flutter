import 'package:animewatch/data/sources/frixy/series_model.dart';
import 'package:animewatch/shared/other_player.dart';
import 'package:animewatch/shared/shared.dart';
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
        child: SizedBox(
          width: 200,
          height: 100,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Padding(
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
              Padding(
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
                    print(videoLink);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (BuildContext context) => VideoPlayer(
                                source: videoLink,
                                title: episodeCard.title,
                              )
                          //     AutoFullscreenOrientationPage(
                          //   url: videoLink,
                          // ),
                          ),
                    );
                  },
                ),
              ),
            ],
          ),
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
