import 'dart:io';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class QRCodeScannerPage extends StatefulWidget {
  const QRCodeScannerPage({super.key});

  @override
  State<QRCodeScannerPage> createState() => _QRCodeScannerPageState();
}

class _QRCodeScannerPageState extends State<QRCodeScannerPage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? _controller;
  String? _lastCode;
  bool _flashOn = false;

  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      _controller?.resumeCamera();
    } else if (Platform.isIOS) {
      _controller?.pauseCamera();
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final local = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(local.scanQrCode),
        actions: [
          IconButton(
            tooltip: _flashOn ? local.themeLight : local.themeDark,
            icon: Icon(_flashOn ? Icons.flash_off : Icons.flash_on),
            onPressed: () async {
              await _controller?.toggleFlash();
              final status = await _controller?.getFlashStatus();
              if (mounted) setState(() => _flashOn = status ?? false);
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // VISOR DO SCANNER
          Expanded(
            flex: 5,
            child: QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
              overlay: QrScannerOverlayShape(
                borderColor: Theme.of(context).colorScheme.secondary,
                borderWidth: 6,
                borderRadius: 12,
                cutOutSize: MediaQuery.of(context).size.width * 0.75,
              ),
              onPermissionSet: (ctrl, granted) {
                if (!granted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(local.networkError)),
                  );
                }
              },
            ),
          ),

          // RESULTADO LIDO
          Expanded(
            flex: 1,
            child: Center(
              child: _lastCode == null
                  ? Text(local.scanQrCode)
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          local.ok,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8),
                          child: SelectableText(
                            _lastCode!,
                            textAlign: TextAlign.center,
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            FilledButton.icon(
                              onPressed: () => Navigator.pop(context, _lastCode),
                              icon: const Icon(Icons.check),
                              label: Text(local.confirmar),
                            ),
                            const SizedBox(width: 12),
                            OutlinedButton.icon(
                              onPressed: () {
                                setState(() => _lastCode = null);
                                _controller?.resumeCamera();
                              },
                              icon: const Icon(Icons.refresh),
                              label: Text(local.tryAgain),
                            ),
                          ],
                        ),
                      ],
                    ),
            ),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    _controller = controller;

    controller.scannedDataStream.listen((scanData) {
      if (!mounted) return;
      if (scanData.code == _lastCode) return;

      setState(() => _lastCode = scanData.code);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('QR lido com sucesso!'),
          duration: const Duration(seconds: 1),
        ),
      );

      // Pause automático se necessário
      // _controller?.pauseCamera();
    });
  }
}