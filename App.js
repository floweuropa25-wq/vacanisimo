import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!apiKey || !input) {
      Alert.alert("¡Falta información!", "Debes ingresar tu clave OpenAI y una petición.");
      return;
    }
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Eres un asistente que automejora apps y genera código React Native según instrucciones en español." },
            { role: "user", content: input }
          ],
          max_tokens: 800
        }),
      });
      const data = await res.json();
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content);
      } else {
        setResponse("Respuesta vacía o error: " + JSON.stringify(data));
      }
    } catch (e) {
      setResponse("Error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vacanisimo 🤖</Text>
      <TextInput
        style={styles.input}
        placeholder="Pega aquí tu clave de OpenAI"
        secureTextEntry
        value={apiKey}
        onChangeText={setApiKey}
      />
      <TextInput
        style={styles.input}
        placeholder="¿Cómo quieres automejorar la app? Escribe aquí en español"
        value={input}
        onChangeText={setInput}
        multiline
      />
      <Button title={loading ? "Enviando..." : "Enviar a OpenAI"} onPress={sendPrompt} disabled={loading} />
      <ScrollView style={styles.response}>
        <Text selectable>{response}</Text>
      </ScrollView>
      <Text style={styles.info}>Pide mejoras en español: “Automejóra tu diseño”, “hazte un editor de video”, “crea un juego”, etc.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f9f9f9', paddingTop: Constants.statusBarHeight },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 18, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  response: { marginTop: 16, backgroundColor: '#eee', borderRadius: 8, padding: 10, flex: 1 },
  info: { color: '#888', marginTop: 10, fontSize: 12, textAlign: 'center' }
});
