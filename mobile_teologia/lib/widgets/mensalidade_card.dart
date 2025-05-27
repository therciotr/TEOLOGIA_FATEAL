import 'package:flutter/material.dart';

class MensalidadeCard extends StatelessWidget {
  final Map mensalidade;

  const MensalidadeCard({required this.mensalidade});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text(mensalidade['aluno']),
        subtitle: Text("Vencimento: ${mensalidade['vencimento']}"),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("R\$ ${mensalidade['valor']}"),
            Text(mensalidade['status'], style: TextStyle(
              color: mensalidade['status'] == "Pago" ? Colors.green : Colors.red,
            )),
          ],
        ),
      ),
    );
  }
}