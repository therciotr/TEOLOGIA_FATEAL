
# 📱 Mobile Teologia FATEAL

Aplicativo mobile oficial da plataforma Teologia FATEAL, desenvolvido em Flutter. Este app permite que alunos consultem suas mensalidades, perfis, notificações e documentos, com integração total ao backend.

---

## 🚀 Tecnologias Utilizadas

- Flutter
- Dart
- Firebase Authentication
- Firebase Storage
- REST API (NestJS)
- Gerenciamento de estado: `setState`, `Provider` ou outro (dependendo do projeto)
- Suporte a múltiplos idiomas (i18n)

---

## 📦 Requisitos

Antes de iniciar, você precisará ter instalado:

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (recomenda-se a versão mais recente estável)
- [Android Studio](https://developer.android.com/studio) ou [Visual Studio Code](https://code.visualstudio.com/)
- Android Emulator ou dispositivo físico
- Conta Firebase com projeto criado
- `.env` com `API_URL` apontando para seu backend

---

## 🔧 Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/mobile_teologia.git
cd mobile_teologia
```

### 2. Instale as dependências

```bash
flutter pub get
```

### 3. Configure o Firebase

- Adicione seu arquivo `google-services.json` na pasta `android/app/`
- Adicione seu arquivo `GoogleService-Info.plist` na pasta `ios/Runner/` (se for usar iOS)

### 4. Crie um arquivo `.env`

Na raiz do projeto, crie um arquivo `.env` com:

```
API_URL=https://seudominio.com/api
```

> **Nota:** o projeto já utiliza `flutter_dotenv` para ler variáveis de ambiente.

---

## ▶️ Rodando o Projeto

### Em modo debug:

```bash
flutter run
```

### Para gerar build Android (APK):

```bash
flutter build apk --release
```

### Para gerar build Android (AAB - Play Store):

```bash
flutter build appbundle
```

---

## 🌐 Internacionalização

O projeto utiliza suporte a múltiplos idiomas com arquivos de tradução (`.arb`, `.json` ou equivalente) e chaveamento via configurações no app.

---

## 🛠️ Estrutura de Pastas

```bash
lib/
│
├── main.dart                # Ponto de entrada
├── models/                 # Modelos de dados (Aluno, Mensalidade, etc.)
├── services/               # Serviços de API, Firebase, etc.
├── screens/                # Telas (perfil, home, notificações, etc.)
├── widgets/                # Componentes reutilizáveis
├── l10n/                   # Arquivos de tradução
└── routes.dart             # Rotas de navegação
```

---

## 🧪 Testes

Você pode rodar testes com:

```bash
flutter test
```

---

## ✅ Funcionalidades Implementadas

- [x] Login com Firebase
- [x] Consulta de perfil
- [x] Visualização de mensalidades e status
- [x] Notificações individuais
- [x] Upload de documentos
- [x] Suporte a vários idiomas
- [x] Logout e segurança de sessão

---

## 🧩 Contribuindo

Pull requests são bem-vindos! Para grandes mudanças, abra uma issue primeiro.

---

## 🧑‍💻 Autor

Desenvolvido por TR TECNOLOGIAS

---

## 📄 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
