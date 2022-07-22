import 'package:animewatch/data/graphql/request/anilist_api.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:animewatch/shared/drawer_nav.dart';
import 'package:animewatch/shared/shared.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class BrowseScreen extends StatelessWidget {
  const BrowseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<SeriesCard>>(
      future: AniList().getListOfSeries(id: 123),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingScreen();
        } else if (snapshot.hasError) {
          return Center(
            child: ErrorMessage(message: snapshot.error.toString()),
          );
        } else if (snapshot.hasData) {
          print("hasData**********");
          var series = snapshot.data!;
          print(series);
          return Text(series.toString());

          // return Scaffold(
          //   appBar: AppBar(
          //     backgroundColor: Colors.deepPurple,
          //     title: const Text('Browse'),
          //     actions: [
          //       IconButton(
          //         icon: Icon(
          //           FontAwesomeIcons.circleUser,
          //           color: Colors.pink[200],
          //         ),
          //         onPressed: () => Navigator.pushNamed(context, '/'),
          //       )
          //     ],
          //   ),
          //   body: GridView.count(
          //     primary: false,
          //     padding: const EdgeInsets.all(20.0),
          //     crossAxisSpacing: 10.0,
          //     crossAxisCount: 2,
          //     children: const <Widget>[Text("1"), Text("2"), Text("3")],
          //   ),
          //   drawer: const DrawerNav(),
          // );
        } else {
          return Text("nod atata");
        }
      },
    );
  }
}
