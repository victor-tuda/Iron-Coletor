import {View, Text, StyleSheet, ScrollView, Alert, Image, Dimensions, Touchable, TouchableOpacity} from 'react-native';

const Card = ({ idAprendiz, nome, sobrenome, cargo, setor, dataInicioContratacao, borderColor }) => (
      <View style={[styles.card, { borderColor }]}>
        <View style={styles.contentContainer}>
          <View style={styles.circle}>
            <Image
              source={require('../../../assets/images/aprendiz.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{nome}  {sobrenome}</Text>
            <Text style={styles.setorText}>{cargo}/{setor}</Text>
          </View>
          <Text style={styles.dateText}>{dataInicioContratacao}</Text>
        </View>
      </View>
  );

  const screenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    card: {
      marginHorizontal: 30,
      marginTop: 30,
      height: screenHeight * 0.15,
      backgroundColor: "#D3E0EA",
      borderRadius: 20,
      justifyContent: "center",
      borderRadius: 20,
      borderWidth: 2,
    },
    contentContainer: {
      flexDirection: "row", // Arrange the circle and text in a row
      alignItems: "center",
    },
    circle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderColor: "black",
      borderWidth: 2,
      marginLeft: 15,
    },
    image: {
      width: 60,
      height: 60,
    },
    textContainer: {
      marginLeft: 15, // Add spacing between the circle and text
    },
    nameText: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 1
    },
    setorText: {
      fontSize: 14,
    },
    dateText: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "right", 
    },
});


  
export default Card;