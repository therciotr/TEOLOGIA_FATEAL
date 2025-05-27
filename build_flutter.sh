#!/bin/bash
echo "Gerando build Flutter para produção..."
flutter clean
flutter pub get
flutter build apk --release
echo "Build APK gerado com sucesso em build/app/outputs/flutter-apk/app-release.apk"
