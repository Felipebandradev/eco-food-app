import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase.config";

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = async () => {
    if (!email || !senha || !nome) {  
      Alert.alert("Atenção!", "Preencha nome, e-mail e senha!");
      return;
    }

    try {
      const contaUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      if (contaUsuario.user) {
        await updateProfile(auth.currentUser, { displayName: nome });
        console.log(contaUsuario.user.displayName);
      }

      Alert.alert("Cadastro", "Seu cadastro foi concluído com sucesso!", [
        {
          style: "cancel",
          text: "Ficar aqui mesmo",
          onPress: () => {
            return;
          },
        },
        {
          style: "default",
          text: "Ir para a área logada",
          onPress: () => navigation.replace("Home"),
        },
      ]);
    } catch (error) {
      // console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/email-already-in-use":
          mensagem = "E-mail já cadastrado!";
          break;
        case "auth/weak-password":
          mensagem = "Senha fraca (mínimo de 6 caracteres)";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido!";
          break;
        default:
          mensagem = "Houve um erro, tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }
  };

  return (
    <SafeContainer>
      <View style={styles.formulario}>
        <View style={styles.campoCadastro}>
          <TextInput
            placeholder="Nome Completo"
            style={styles.input}
            keyboardType="default"
            onChangeText={(valor) => setNome(valor)}
          />
        </View>
        <View style={styles.campoCadastro}>
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(valor) => setEmail(valor)}
          />
        </View>

        <View style={styles.campoCadastro}>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            keyboardType="default"
            secureTextEntry
            onChangeText={(valor) => setSenha(valor)}
          />
        </View>

        <Pressable
          style={styles.botaoCadastro}
          onPress={cadastrar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>cadastrar</Text>
        </Pressable>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  formulario: {
    gap: 30,
    alignItems: "center",
  },

  campoCadastro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
  },

  input: {
    height: 50,
    padding: 8,
    width: "80%",
  },

  iconeInput: {
    marginRight: 10,
  },

  botaoCadastro: {
    height: 50,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a8cf45",
  },

  textoBotao: {
    fontSize: 18,
    color: "#466060",
    fontFamily: "Comfortaa",
  },
});
