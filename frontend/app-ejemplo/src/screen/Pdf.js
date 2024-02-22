import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";

const Pdf = () => {
    const [pdfDoc, setPdfDoc] = useState();
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState("");

    const handleFilePicker = async () => {
        let result = await ExpoDocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
        });
        setPdfDoc(result.file);
    };

    const handleUpload = async () => {
        try {
            const data = new FormData();
            data.append("Al final quiero que me digas cuantos tokens utilizaste","question", question);
            data.append("file", pdfDoc);

            const response = await fetch("http://localhost:9004/upload", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                setQuestion("");
                const responseJSON = await response.json();
                setResult(responseJSON.text);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Cargar Archivo" onPress={handleFilePicker} />
            <TextInput
                style={styles.input}
                value={question}
                onChangeText={setQuestion}
                placeholder="Ingresa tu pregunta"
            />
            <Button title="Enviar" onPress={handleUpload} />
            <Text style={styles.resultText}>{result}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    input: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: "80%",
    },
    resultText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default Pdf;
