import 'dart:async';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewPlayer extends StatelessWidget {
  String title;
  String selectedUrl;

  final Completer<WebViewController> _controller =
      Completer<WebViewController>();
  late WebViewController webcon;

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
          // webViewController.runJavascript(
          //     'document.querySelectorAll("video").forEach((e)=>{e.play();alert(e)})');
          _controller.complete(webViewController);
          webcon = webViewController;
        },
      ),
      floatingActionButton: FloatingActionButton(
        autofocus: true,
        // child: const Icon(Icons.arrow_upward),
        onPressed: () {
          print(selectedUrl);
          webcon.runJavascript(
              'document.querySelectorAll("video").forEach((e)=>{e.play()})');
        },
      ),
    );
  }
}
