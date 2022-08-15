import 'package:flutter/material.dart';

class ExposedDropdownMenu extends StatefulWidget {
  final List<String> dropDownOptions;
  final String defaultValue;

  const ExposedDropdownMenu(
      {Key? key, required this.dropDownOptions, this.defaultValue = ''})
      : super(key: key);

  @override
  ExposedDropdownMenuState createState() => ExposedDropdownMenuState();
}

class ExposedDropdownMenuState extends State<ExposedDropdownMenu> {
  late String _dropdownValue;

  @override
  void initState() {
    super.initState();
    _dropdownValue = widget.defaultValue;
  }

  void dropdownCallback(String? selectedValue) {
    if (selectedValue is String) {
      setState(() {
        _dropdownValue = selectedValue;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return DropdownButton(
      items:
          widget.dropDownOptions.map<DropdownMenuItem<String>>((String mascot) {
        return DropdownMenuItem<String>(
          value: mascot,
          child: Text(mascot),
        );
      }).toList(),
      value: _dropdownValue,
      onChanged: dropdownCallback,
      // Customizations
      //iconSize: 42.0,
      //iconEnabledColor: Colors.green,
      //icon: const Icon(Icons.flutter_dash),
      //isExpanded: true,
      style: const TextStyle(
        color: Colors.white,
      ),
    );
  }
}
