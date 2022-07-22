import 'package:animewatch/login/login.dart';
import 'package:animewatch/browse/browse.dart';
import 'package:animewatch/shared/error.dart';
import 'package:animewatch/shared/loading.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingScreen();
        } else if (snapshot.hasError) {
          return const Center(
            child: ErrorMessage(),
          );
        } else if (snapshot.hasData) {
          return const BrowseScreen();
        } else {
          return const LoginScreen();
        }
      },
    );
  }
}
