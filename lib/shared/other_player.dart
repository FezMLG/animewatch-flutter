import 'package:better_player/better_player.dart';
import 'package:flutter/material.dart';

class AutoFullscreenOrientationPage extends StatefulWidget {
  final String url;

  AutoFullscreenOrientationPage({Key? key, required this.url})
      : super(key: key);

  @override
  _AutoFullscreenOrientationPageState createState() =>
      _AutoFullscreenOrientationPageState();
}

class _AutoFullscreenOrientationPageState
    extends State<AutoFullscreenOrientationPage> {
  late BetterPlayerController _betterPlayerController;

  @override
  void initState() {
    BetterPlayerConfiguration betterPlayerConfiguration =
        const BetterPlayerConfiguration(
      aspectRatio: 16 / 9,
      fit: BoxFit.contain,
      autoDetectFullscreenDeviceOrientation: true,
      autoDetectFullscreenAspectRatio: true,
    );
    BetterPlayerDataSource dataSource =
        BetterPlayerDataSource(BetterPlayerDataSourceType.network, widget.url);
    _betterPlayerController = BetterPlayerController(betterPlayerConfiguration);
    _betterPlayerController.setupDataSource(dataSource);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BetterPlayer(controller: _betterPlayerController);
  }
}
