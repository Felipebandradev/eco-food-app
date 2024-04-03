import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import SafeContainer from "../components/SafeContainer";


export default function Inicial({navigation}){
    return(
        <SafeContainer>
            <View style={styles.container}>
                <TouchableOpacity style={styles.botaoCadastrar} onPress={()=>{
                    navigation.navigate("Cadastro")
                }}>
                    <Text style={styles.textoBotao}>cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoLogin}>
                    <Text style={styles.textoBotao}>login</Text>
                </TouchableOpacity>
            </View>

        </SafeContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        gap: 15,
    },

    botaoCadastrar: {
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    },

    botaoLogin: {
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
    },

    textoBotao: {
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight: "bold",
    }
})