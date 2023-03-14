import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-web';

export default function Abertas({ route }) {
    const [manutencao, setManutencao] = useState([]);

    useEffect(() => {
        listarManutencao();
    }, [])

    const listarManutencao = () => {
        fetch("http://localhost:5000/manutencao")
            .then(response => { return response.json(); })
            .then(data => {
                setManutencao(data);
            })
    }

    return (
        <View style={styles.v} >
            <ScrollView>
                <Text style={styles.text} >Manutenções</Text>
                {
                    manutencao.map((manutencao, index) => {
                        return (
                            <View style={styles.tarefa} key={index}>
                                <View style={styles.tarefaL} >
                                    <Text style={styles.info}>Id da Manutencao : {manutencao.id}</Text>
                                    <Text style={styles.info}>Data de Inicio : {manutencao.data_inicio}</Text>
                                    <Text style={styles.info}>Data de Fim : {manutencao.data_fim}</Text>
                                    <Text style={styles.info}>Valor : {manutencao.valor}</Text>
                                    <Text style={styles.info}>Descrição : {manutencao.descricao}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viBTN: {
        display: "flex",
        flexDirection: "row",
        gap: "30px"
    },
    v: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#505050",
        width: "100%",
        flex: 1,
        padding: 20
    },
    sv: {
        height: "100%",
        backgroundColor: "#46589c",
        width: "100%",
    },
    btn: {
        height: 40,
        width: 70,
        backgroundColor: "#e53f86",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "Black",
        borderWidth: "1px",
        borderRadius: "10px"
    },
    te: {
        fontSize: "10pt"
    },
    tarefa: {
        width: "100%",
        height: "200px",
        backgroundColor: "#46589c",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: "20px",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "30px"
    },
    tarefaL: {
        maxWidth: "78%"
    },
    info: {
        fontSize: "13pt",
        fontWeight: "bold",
        color: "#fff"
    },
    infoP: {
        fontSize: "11pt",
        fontWeight: "normal",
        color: "#000"
    },
    text: {
        fontSize: "30pt",
        color: "#fff"
    }

});