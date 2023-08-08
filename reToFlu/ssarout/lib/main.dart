import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter WebView',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple, // 이 부분은 앱의 기본 테마 설정입니다.
      ),
      home: const WebViewPage(), // WebViewPage를 앱의 초기 화면으로 설정합니다.
    );
  }
}

class WebViewPage extends StatelessWidget {
  const WebViewPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Web Page in WebView'),
      ),
      body: const WebView(
        initialUrl: 'https://i9e203.p.ssafy.io/', // React 웹 페이지의 URL을 입력
        javascriptMode: JavascriptMode.unrestricted,
      ),
    );
  }
}
