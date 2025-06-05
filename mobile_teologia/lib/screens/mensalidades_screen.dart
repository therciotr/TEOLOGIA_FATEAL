import 'package:flutter/material.dart';
import '../services/api_service.dart';

class MensalidadesScreen extends StatefulWidget {
  @override
  _MensalidadesScreenState createState() => _MensalidadesScreenState();
}

class _MensalidadesScreenState extends State<MensalidadesScreen> {
  List<dynamic> mensalidades = [];
  bool carregando = true;

  @override
  void initState() {
    super.initState();
    carregarMensalidades();
  }

  void carregarMensalidades() async {
    final data = await ApiService.getMensalidades();
    setState(() {
      mensalidades = data;
      carregando = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Mensalidades')),
      body: carregando
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: mensalidades.length,
              itemBuilder: (context, index) {
                final m = mensalidades[index];
                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    title: Text(m['aluno']),
                    subtitle: Text("Vencimento: ${m['vencimento']}"),
                    trailing: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text("R\$ ${m['valor']}"),
                        Text(m['status'], style: TextStyle(
                          color: m['status'] == "Pago" ? Colors.green : Colors.red,
                        )),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}