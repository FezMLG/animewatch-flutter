import 'package:animewatch/browse/browse.dart';
import 'package:animewatch/home/home.dart';
import 'package:animewatch/login/login.dart';
import 'package:animewatch/shared/shared.dart';

var appRoutes = {
  '/': (context) => const HomeScreen(),
  '/login': (context) => const LoginScreen(),
  '/browse': (context) => const BrowseScreen(),
};
