import 'package:animewatch/browse/series_item.dart';
import 'package:animewatch/data/graphql/request/anilist_api.dart';
import 'package:animewatch/services/models/page_of_series_model.dart';
import 'package:animewatch/shared/shared.dart';
import 'package:animewatch/ui/exposed_dropdown.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class BrowseScreen extends StatelessWidget {
  BrowseScreen({super.key});

  DateTime? selectedDate = DateTime.now();

  Future<void> _selectDate(BuildContext context) async {
    selectedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate!,
      firstDate: DateTime(1950),
      lastDate: DateTime(2023),
      initialDatePickerMode: DatePickerMode.year,
    );
    selectedDate ??= DateTime.now();
  }

  String currentSeason() {
    int now = DateTime.now().month;
    switch (now) {
      case 12:
      case 1:
      case 2:
        return 'Winter';
      case 3:
      case 4:
      case 5:
        return 'Spring';
      case 6:
      case 7:
      case 8:
        return 'Summer';
      default:
        return 'Fall';
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<SeriesCard>>(
      future: AniList().getListOfSeries(currentSeason(), selectedDate!.year),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingScreen();
        } else if (snapshot.hasError) {
          return Center(
            child: ErrorMessage(message: snapshot.error.toString()),
          );
        } else if (snapshot.hasData) {
          List<SeriesCard> series = snapshot.data!;

          return Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.deepPurple,
              title: const Text('Browse'),
              actions: [
                IconButton(
                  icon: Icon(
                    FontAwesomeIcons.circleUser,
                    color: Colors.pink[200],
                  ),
                  onPressed: () => Navigator.pushNamed(context, '/'),
                )
              ],
            ),
            body: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(
                      left: 20, right: 20, top: 20, bottom: 20),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Row(
                      children: [
                        Text('${currentSeason()} ${selectedDate!.year}'),
                        SizedBox(
                          child: OutlinedButton(
                            onPressed: () => _selectDate(context),
                            child: const Text('Change season'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: Center(
                    child: SingleChildScrollView(
                      child: Wrap(
                        spacing: 20,
                        runSpacing: 20,
                        children: [
                          for (var item in series)
                            SeriesItem(
                              seriesCard: item,
                            )
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            drawer: const DrawerNav(),
          );
        } else {
          return const Text("no data");
        }
      },
    );
  }
}

// SizedBox(
//                           child: ExposedDropdownMenu(
//                             dropDownOptions: const [
//                               'Winter',
//                               'Spring',
//                               'Summer',
//                               'Fall'
//                             ],
//                             defaultValue: currentSeason(),
//                           ),
//                         ),
//                         SizedBox(
//                           child: OutlinedButton(
//                             onPressed: () => _selectDate(context),
//                             child: Text(selectedDate!.year.toString()),
//                           ),
//                         ),
//                         SizedBox(
//                           child: ElevatedButton(
//                             onPressed: () async =>
//                                 await AniList().getListOfSeries('Winter', 2021),
//                             child: const Text('Browse'),
//                           ),
//                         ),
