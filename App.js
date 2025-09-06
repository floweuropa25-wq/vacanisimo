import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, ScrollView } from 'react-native';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy Vacanísimo. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [autoMejora, setAutoMejora] = useState(false);

  // Simulación sencilla para automejora (ficticia, real sería con lógica avanzada)
  const handleSend = async () => {
    let newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    // Activar modo automejora
    if (input.trim().toLowerCase() === 'automejora') {
      setAutoMejora(true);
      setInput('');
      newMessages.push({ role: 'assistant', content: 'Modo automejora activado. Escribe tu sugerencia para mejorar la app.' });
      setMessages([...newMessages]);
      return;
    }

    // Respuesta básica (simulación)
    let response = 'Esta es una respuesta simulada. (Aquí irá la integración con OpenAI)';
    if (autoMejora) {
      response = `¡Gracias por tu sugerencia! La app mejorará pronto: "${input}"`;
      setAutoMejora(false);
    }

    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: response }]);
      setInput('');
    }, 700);
  };

  if (!showChat) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Vacanísimo</Text>
        <Text style={styles.label}>Ingresa tu clave de OpenAI:</Text>
        <TextInput
          style={styles.input}
          placeholder="sk-..."
          value={apiKey}
          onChangeText={setApiKey}
          secureTextEntry
        />
        <Button
          title="Guardar y continuar"
          onPress={() => {
            setSavedKey(apiKey);
            setShowChat(true);
          }}
          disabled={!apiKey}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.containerChat}>
      <Text style={styles.title}>Vacanísimo Chat</Text>
      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={{ padding: 10 }}
      >
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.bubble,
              msg.role === 'assistant' ? styles.bubbleBot : styles.bubbleUser
            ]}
          >
            <Text style={{ color: msg.role === 'assistant' ? '#222' : '#fff' }}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputChat}
          placeholder="Escribe tu mensaje"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <Button title="Enviar" onPress={handleSend} disabled={!input} />
      </View>
      <Text style={styles.apiKeyInfo}>API Key: {savedKey ? 'Guardada' : 'No guardada'}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  containerChat: {
    flex: 1, backgroundColor: '#f6f7fa', paddingTop: 40,
  },
  title: {
    fontSize: 30, fontWeight: 'bold', marginBottom: 18, alignSelf: 'center'
  },
  label: {
    fontSize: 17, marginBottom: 12, textAlign: 'center'
  },
  input: {
    width: 260, padding: 12, borderWidth: 1, borderColor: '#888', borderRadius: 8, marginBottom: 16,
    backgroundColor: '#fff'
  },
  chatArea: {
    flex: 1, marginHorizontal: 10, marginBottom: 10, backgroundColor: '#eef1f5', borderRadius: 12
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 16
  },
  inputChat: {
    flex: 1, padding: 12, borderWidth: 1, borderColor: '#bbb', borderRadius: 8, backgroundColor: '#fff', marginRight: 8
  },
  bubble: {
    marginVertical: 4, padding: 10, borderRadius: 10, maxWidth: '85%'
  },
  bubbleUser: {
    backgroundColor: '#4f8ef7', alignSelf: 'flex-end'
  },
  bubbleBot: {
    backgroundColor: '#fff', alignSelf: 'flex-start'
  },
  apiKeyInfo: {
    fontSize: 12, color: '#888', alignSelf: 'center', marginBottom: 8
  }
});