import 'dart:async';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewPlayer extends StatelessWidget {
  String title;
  String selectedUrl;

  final Completer<WebViewController> _controller =
      Completer<WebViewController>();

  WebViewPlayer({
    super.key,
    this.title = '',
    this.selectedUrl = '',
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: WebView(
      initialUrl: selectedUrl,
      javascriptMode: JavascriptMode.unrestricted,
      onWebViewCreated: (WebViewController webViewController) {
        _controller.complete(webViewController);
      },
    ));
  }
}
