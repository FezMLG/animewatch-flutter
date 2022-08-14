import 'package:flutter/material.dart';

class FocusText extends StatelessWidget {
  final String text;
  final double height;
  final double fontSize;
  final FontWeight fontWeight;
  final EdgeInsetsGeometry padding;

  const FocusText({
    super.key,
    required this.text,
    this.height = 0,
    this.fontSize = 14,
    this.fontWeight = FontWeight.normal,
    this.padding = const EdgeInsets.only(top: 20),
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Focus(
        child: Text(
          text,
          style: TextStyle(
            height: height,
            fontSize: fontSize,
            fontWeight: fontWeight,
          ),
        ),
      ),
    );
  }
}
