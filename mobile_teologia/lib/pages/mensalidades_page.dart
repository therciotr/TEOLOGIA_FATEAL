import 'package:flutter/material.dart';
import '../widgets/custom_drawer.dart';
import '../services/api_service.dart';
import '../widgets/mensalidade_card.dart';

class MensalidadesPage extends StatefulWidget {
  @override
  _MensalidadesPageState createState() => _MensalidadesPageState();
}

class _MensalidadesPageState extends State<MensalidadesPage> {
  List<dynamic> mensalidades = [];
  bool carregando = true;

  @override
  void initState() {
    super.initState();
    carregarMensalidades();
  }

  void carregarMensalidades() async {
    mensalidades = await ApiService.getMensalidades();
    setState(() {
      carregando = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: CustomDrawer(),
      appBar: AppBar(title: Text('Mensalidades')),
      body: carregando
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: mensalidades.length,
              itemBuilder: (context, index) {
                return MensalidadeCard(mensalidade: mensalidades[index]);
              },
            ),
    );
  }
}